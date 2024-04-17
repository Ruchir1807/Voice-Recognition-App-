import React from "react";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

import { useState } from "react";

const App = () => {
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy);
  const [buttonText, setButtonText] = useState("Copy To Clipboard");

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
    setButtonText("Copy to Clipboard");
  };

  const stopListening = () => SpeechRecognition.stopListening();
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) return null;
  const handleCopyClick = () => {
    setTextToCopy(transcript);
    setCopied();
    setButtonText("Copied");
  };

  return (
    <>
      <div className="container">
        <h2>Speech To Text Converter</h2>
        <br />
        <p>
          A React Hook that converts speech from microphone and converts it into
          text with more options
        </p>
        <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          {transcript}
        </div>
        <div className="btn-style">
          <button onClick={handleCopyClick}>{buttonText}</button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={stopListening}>Stop Listening</button>
        </div>
      </div>
    </>
  );
};

export default App;
