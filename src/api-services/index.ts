import { config } from "../config";
import { getSelectedTextInWord } from "../utilities/office-document";

const messages = [
  {
    role: "system",
    content: config.PROMPT,
  },
];

export function callMistralChat(userMessage, context) {
  return new Promise(async (resolve, reject) => {
    try {
      // Combine selected text and user message as context
      let combinedMessage = ``;
      if (context) {
        let selectedText = await getSelectedTextInWord();
        if (selectedText === 201) {
          combinedMessage = `"${userMessage}"`;
        } else {
          combinedMessage = `
        Context from selected text:
        "${selectedText}"

        User's message:
        "${userMessage}"
      `;
        }
      } else {
        combinedMessage = `"${userMessage}"`;
      }

      // Add combined message to the messages history
      messages.push({
        role: "user",
        content: combinedMessage,
      });

      // Call Mistral API with the updated message history
      const response = await fetch(config.API_URL, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("apiKey"), // 🛑 Replace securely
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: window.localStorage.getItem("model"), // or any other model you prefer
          messages: messages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return reject(new Error(`API Error: ${response.status} - ${errorData.message || "Unknown error"}`));
      }

      const data = await response.json();
      const reply = data.choices[0].message.content;

      // Add assistant's reply to the message history
      messages.push({
        role: "assistant",
        content: reply,
      });

      resolve(reply);
    } catch (err) {
      reject(err);
    }
  });
}
