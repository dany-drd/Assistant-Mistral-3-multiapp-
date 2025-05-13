import React from "react";
import "../../styles/TopBar.css";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { Save } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, InputAdornment, Tooltip } from "@mui/material"; // Tooltip added
import "./topbar.css";

const TopBar = ({
  setShowMessages,
  setInputText,
  setMessages,
  setSelectedContent,
  setChatLoading,
  setSignOutLoader,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [apiKey, setApiKey] = React.useState("");
  const [modelId, setModelId] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const savedApiKey = window.localStorage.getItem("apiKey");
    const savedModel = window.localStorage.getItem("model");

    if (savedApiKey) setApiKey(savedApiKey);
    if (savedModel) setModelId(savedModel);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClearChat = () => {
    setShowMessages(false);
    setInputText("");
    setMessages([]);
    setSelectedContent("");
    setChatLoading(false);
    setSignOutLoader(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSaveApiKey = () => {
    localStorage.setItem("apiKey", apiKey);
  };

  const handleSaveModelId = () => {
    localStorage.setItem("model", modelId);
  };

  const handleSignOut = () => {
    setApiKey("");
    setModelId("");
    window.localStorage.removeItem("apiKey");
    window.localStorage.removeItem("model");
    navigate("/");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="topbar-container">
      <div>
        <IconButton onClick={handleClearChat}>
          <FaRegPenToSquare fontSize={20} />
        </IconButton>
      </div>
      <div>
        <IconButton onClick={handleClick}>
          <IoSettingsOutline style={{ color: "black" }} />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          PaperProps={{
            style: {
              width: 360,
              padding: "24px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
            },
          }}
        >
          <div>
            <div style={{ marginBottom: "20px" }}>
              <Typography variant="subtitle2" style={{ color: "#333", marginBottom: 6 }}>
                API Key
              </Typography>
              <TextField
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                InputProps={{
                  style: { backgroundColor: "#fff", borderRadius: 6 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Save API Key">
                        <IconButton onClick={handleSaveApiKey}>
                          <Save style={{ color: "#4caf50" }} />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <Typography variant="subtitle2" style={{ color: "#333", marginBottom: 6 }}>
                Model ID
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="e.g. mistral-7b-instruct"
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                InputProps={{
                  style: { backgroundColor: "#fff", borderRadius: 6 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Save Model ID">
                        <IconButton onClick={handleSaveModelId}>
                          <Save style={{ color: "#4caf50" }} />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleSignOut}
              style={{
                textTransform: "none",
                fontWeight: 500,
                backgroundColor: "#f44336",
                color: "#fff",
                borderRadius: 6,
              }}
            >
              Sign out
            </Button>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default TopBar;
