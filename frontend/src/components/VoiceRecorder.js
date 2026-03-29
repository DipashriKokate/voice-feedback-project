import React, { useState } from "react";

function VoiceRecorder() {
  const [recording, setRecording] = useState(false);

  const toggleRecording = () => {
    setRecording(!recording);
  };

  return (
    <div>
      <h2>🎤 Voice Recorder</h2>

      <button onClick={toggleRecording}>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
}

export default VoiceRecorder;