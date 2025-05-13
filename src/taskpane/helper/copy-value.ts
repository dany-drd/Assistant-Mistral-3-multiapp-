export function copyToClipboard(value) {
  // Create a temporary textarea element
  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = value; // Set the value to copy
  tempTextarea.style.position = "absolute";
  tempTextarea.style.left = "-9999px"; // Position off-screen to prevent visual glitches
  document.body.appendChild(tempTextarea);

  // Select the text and execute the copy command
  tempTextarea.select();
  tempTextarea.setSelectionRange(0, value.length); // For mobile devices

  try {
    const successful = document.execCommand("copy");
    console.log(successful ? "Copied to clipboard!" : "Failed to copy.");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }

  // Remove the temporary textarea
  document.body.removeChild(tempTextarea);
}
