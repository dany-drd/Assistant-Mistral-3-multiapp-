import React from "react";
import { TfiReload } from "react-icons/tfi";
import { VscCopy } from "react-icons/vsc";
import { copyToClipboard } from "../../helper/copy-value";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
//import { marked } from "marked";
import { marked } from "marked";

import ReactMarkdown from "react-markdown";
import { insertHtmlAtCursor, replaceSelectedWithHtml } from "../../../utilities/office-document";

interface TextMessageBoxProps {
  message: any; // Title to display in the message box
  position: "left" | "right"; // Position of the message box
  handleContentInSelection: (content: string, type: string) => void; // Function to handle content selection
  regenerate: (message: any) => void; // Corrected function type for regenerate
}

const TextMessageBox: React.FC<TextMessageBoxProps> = ({ message, position, regenerate }) => {
  const copyMessage = async () => {
    let data = await copyToClipboard(message.content);
    console.log(data);
  };
  const Regenerate = () => {
    regenerate(message);
  };

  //let content = marked(message.content);

  let content = <ReactMarkdown>{message.content}</ReactMarkdown>;
  const htmlContent = marked.parse(message.content); // This is now a string, not JSX

  const handleReplace = () => {
    replaceSelectedWithHtml(message.content);
  };
  const handleInsert = () => {
    insertHtmlAtCursor(message.content);
  };

  console.log("rcvd prop", message.content);
  return (
    <div className={`message-box ${position} message-box-images-container`}>
      <p
        style={{
          margin: "5px",
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {content}
      </p>

      <div className="message-box-images-btn">
        <div
          style={{
            display: "flex",
          }}
        >
          {Office.context.host !== Office.HostType.Outlook && <button onClick={handleReplace}>Replace</button>}
          <button onClick={handleInsert}>Insert</button>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <Tooltip title="Copy" arrow placement="top">
            <IconButton
              style={{
                border: "none",
                backgroundColor: "#f5f5f5",
              }}
            >
              <VscCopy
                onClick={copyMessage}
                strokeWidth={0.5}
                fontSize={20}
                style={{
                  marginBottom: "4px",
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Regenerate" arrow placement="top">
            <IconButton
              style={{
                border: "none",
                backgroundColor: "#f5f5f5",
              }}
            >
              <TfiReload
                onClick={Regenerate}
                fontSize={19}
                style={{
                  marginBottom: "4px",
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default TextMessageBox;
