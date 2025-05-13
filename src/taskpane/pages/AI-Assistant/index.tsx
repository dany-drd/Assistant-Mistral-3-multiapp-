import React, { useState, useRef, useEffect } from "react";
import TopBar from "../../components/top-bar";
import "../../styles/Assistant.css";
import { MessageBox } from "react-chat-elements";
import AssistantInput from "../../components/assistant-input";
import { TbPencilBolt } from "react-icons/tb";
import TextMessageBox from "../../components/text-message-box";
import Loader from "../../components/loader/ai-loader";
import SpinnerLoader from "../../components/loader/spinner";
import { useNavigate } from "react-router-dom";
import { callMistralChat } from "../../../api-services";
// Define message type for role and content
interface Message {
  role: "user" | "assistant";
  content: string;
  message: string;
  context: boolean;
}

const Assistant: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContent, setSelectedContent] = useState<string | null>(""); // Selected content type
  const [chatLoading, setChatLoading] = useState<boolean>(false); // chatLoading state
  const [signOutLoader, setSignOutLoader] = useState<boolean>(false); // chatLoading state
  const [showMessages, setShowMessages] = useState<boolean>(false); // chatLoading state
  const [selectedContext, setSelectedContext] = useState<boolean>(false); // chatLoading state

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const handleFocusInput = () => {
    document.getElementById("textArea").focus();
  };

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (messageText: string, context: boolean) => {
    const userInstruction = inputText.trim() ? inputText : messageText;

    setInputText("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userInstruction, message: userInstruction, context: context },
    ]);

    setChatLoading(true); // Show loader
    setShowMessages(true);

    // Call the API to get the assistant's response
    callMistralChat(userInstruction, context)
      .then((res: string) => {
        const messageContent = res;
        console.log(messageContent);

        // Add the assistant's response to the messages
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: messageContent, message: userInstruction, context: context },
        ]);
      })
      .catch((error) => {
        console.error("Error in API call:", error);

        // Add a fallback error message
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: "quelque chose s'est mal passé, veuillez réessayer.",
            message: userInstruction,
            context: context,
          },
        ]);
      })
      .finally(() => {
        setChatLoading(false); // Hide loader
      });
  };
  const handleContentInSelection = (content: string, type: string) => {
    console.log("object", content, type);
  };

  // const handleLogout = () => {
  //   setSignOutLoader(true); // Show loader while logging out
  //   // logOut()
  //   //   .then((res) => {
  //   //.log(res); // Log the response
  //   window.localStorage.removeItem("session_id");
  //   window.localStorage.removeItem("session_token");
  //   window.localStorage.removeItem("proposalId");
  //   navigate("/");
  //   //  })
  //   // .catch((error) => {
  //   //   console.error("Logout failed:", error); // Handle errors
  //   // })
  //   // .finally(() => {
  //   // setSignOutLoader(false); // Always hide the loader
  //   // });
  // };
  const regenerate = (message: any) => {
    console.log(message);
    // setInputText(message);
    handleSend(message.message, message.context);
  };

  return (
    <div className="assistant-container">
      <TopBar
        // handleLogout={handleLogout}
        setShowMessages={setShowMessages}
        setInputText={setInputText}
        setMessages={setMessages}
        setSelectedContent={setSelectedContent}
        setChatLoading={setChatLoading}
        setSignOutLoader={setSignOutLoader}
      />
      {signOutLoader && <SpinnerLoader />}

      <div>
        {!showMessages ? (
          <div className="Assistant-Home">
            <div className="messageBox-home-container">
              <img src="assets/logo-filled.png" alt="" className="home-logo" style={{ width: 100 }} />

              <h3>Avec quoi puis-je vous aider?</h3>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <div className="messageBox-home-btn" style={{ cursor: "pointer" }} onClick={handleFocusInput}>
                  <span>
                    <TbPencilBolt
                      fontSize={20}
                      style={{
                        marginBottom: "3px",
                        color: "#947AD3",
                        marginRight: "6px",
                        cursor: "pointer",
                      }}
                    />{" "}
                    Aide-moi à écrire
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="messageBox-container">
            {/* Render messages */}
            {messages.map((message, index) => (
              <div key={index} className="message-container">
                {/* Text Content */}
                {message.role === "user" ? (
                  <MessageBox
                    position="right"
                    styles={{
                      backgroundColor: "#464646",
                    }}
                    title=""
                    type="text"
                    text={message.content}
                    date={null}
                    replyButton={false}
                    id="1"
                    focus={false}
                    titleColor="#000"
                    forwarded={false}
                    notch={false}
                    removeButton={false}
                    status={null}
                    retracted={false}
                  />
                ) : (
                  // Display text for assistant messages
                  typeof message.content === "string" && (
                    <TextMessageBox
                      key={index}
                      message={message}
                      position="left"
                      handleContentInSelection={handleContentInSelection}
                      regenerate={regenerate}
                    />
                  )
                )}

                <div ref={messagesEndRef} />
              </div>
            ))}

            {/* Show loader if chatLoading */}
            {chatLoading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px 0",
                }}
              >
                <Loader />
              </div>
            )}
          </div>
        )}
        {/* Input Section */}
        <div className="assistant-input">
          <AssistantInput
            prompt={inputText}
            onInputChange={setInputText}
            onSend={(content, context) => handleSend(content, context)}
            selectedContent={selectedContent}
            setSelectedContent={setSelectedContent}
            setSelectedContext={setSelectedContext}
            selectedContext={selectedContext}
          />
        </div>
      </div>
    </div>
  );
};

export default Assistant;
