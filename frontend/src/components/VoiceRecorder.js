import React, { useState, useRef } from "react";

function VoiceRecorder() {
  // track recording state
  const [recording, setRecording] = useState(false);

  // store recorder and chunks properly
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const toggleRecording = async () => {

    // 👉 START RECORDING
    if (!recording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
        console.log("Chunk received");
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        }
       
      );

        console.log("Final Audio:", audioBlob);

        // play audio
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
         mediaRecorder.stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);

      console.log("Recording started");
    }

    // 👉 STOP RECORDING
    else {
      mediaRecorderRef.current.stop();
      setRecording(false);

      console.log("Recording stopped");
    }
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