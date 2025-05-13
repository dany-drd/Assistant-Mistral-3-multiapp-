import React, { useEffect, useState } from "react";
import { Button } from "@fluentui/react-components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Checkbox } from "@fluentui/react-components";

interface AssistantInputProps {
  prompt: string;
  onInputChange: (text: string) => void;
  onSend: (content: string | null, context: boolean | null) => void;
  selectedContent: string | null;
  setSelectedContent: (content: string | null) => void;
  setSelectedContext: (selectedContext: boolean | null) => void;
  selectedContext: boolean | null;
}

const AssistantInput: React.FC<AssistantInputProps> = ({
  prompt,
  onInputChange,
  onSend,
  selectedContent,
  setSelectedContext,
  selectedContext,
}) => {
  // useEffect(() => {
  //   let interval: NodeJS.Timeout;

  //   const fetchData = async () => {
  //     try {
  //       const message = await getSelectedShape();
  //       console.log(message);
  //       setSelectedContent(message);
  //     } catch (error) {
  //       setSelectedContent(null);
  //       console.error(error);
  //     }
  //   };

  //   const timeout = setTimeout(() => {
  //     fetchData();
  //     interval = setInterval(fetchData, 2000);
  //     setIntervalId(interval);
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timeout);
  //     if (interval) clearInterval(interval);
  //   };
  // }, [setSelectedContent]);

  const handleSend = () => {
    onSend(selectedContent, selectedContext);
  };

  const handleSendKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent cursor movement to the next line
      onSend(selectedContent, selectedContext);
    }
  };
  const handleCheckboxChange = () => {
    setSelectedContext(!selectedContext);
    console.log("Checkbox is checked:", !selectedContext);
  };

  return (
    <div className="input-container">
      <div className="assistant-input-container">
        {Office.context.host !== Office.HostType.Outlook && (
          <div className="Text-Selected">
            <Checkbox checked={selectedContext} onChange={handleCheckboxChange} />{" "}
            <span>
              Utiliser la <a href="">sélection</a> comme contexte
            </span>
          </div>
        )}
        <textarea
          id="textArea"
          onChange={(e) => onInputChange(e.target.value)}
          value={prompt}
          placeholder="Demandez n'importe quoi, sélectionnez un texte à utiliser..."
          className="assistant-input"
          onKeyDown={handleSendKeyDown}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            margin: "4px",
          }}
        >
          <Button
            icon={<ArrowUpwardIcon />}
            onClick={handleSend}
            className={prompt.trim() ? "send-prompt-btn-active" : "send-prompt-btn-inactive"}
          />
        </div>
      </div>
    </div>
  );
};

AssistantInput.displayName = "AssistantInput";

export default AssistantInput;
