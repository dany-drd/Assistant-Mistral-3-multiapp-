import React from "react";
import "../../styles/Home.css";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [apiKey, setApiKey] = React.useState("");
  const [modelId, setModelId] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  React.useEffect(() => {
    const savedApiKey = window.localStorage.getItem("apiKey");
    const savedModel = window.localStorage.getItem("model");

    if (savedApiKey) setApiKey(savedApiKey);
    if (savedModel) setModelId(savedModel);

    if (savedApiKey && savedModel && savedApiKey.trim() !== "" && savedModel.trim() !== "") {
      navigate("/Assistant"); // navigate to Assistant page
    }
  }, []);

  const handleSave = () => {
    if (apiKey === "" || modelId === "") {
      setError("Both API Key and Model ID are required.");
      return;
    }

    window.localStorage.setItem("apiKey", apiKey);
    window.localStorage.setItem("model", modelId);

    setError("");
    navigate("/Assistant");
  };

  return (
    <div
      className="app-settings-wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400, padding: 24 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img src="assets/logo-filled.png" alt="" style={{ width: 100, marginBottom: 12 }} />

          <Typography variant="h6">App Settings</Typography>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <Typography variant="subtitle2" style={{ marginBottom: 6 }}>
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
            error={!!error && !apiKey}
          />
          {error && !apiKey && (
            <Typography variant="body2" color="error" style={{ marginTop: 6 }}>
              Please fill out this field.
            </Typography>
          )}
        </div>

        <div style={{ marginBottom: "24px" }}>
          <Typography variant="subtitle2" style={{ marginBottom: 6 }}>
            Model ID
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="e.g. mistral-7b-instruct"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            error={!!error && !modelId}
          />
          {error && !modelId && (
            <Typography variant="body2" color="error" style={{ marginTop: 6 }}>
              Please fill out this field.
            </Typography>
          )}
        </div>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
          style={{
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 6,
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Home;
