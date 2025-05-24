import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Audio = () => {
  const location = useLocation();
  const [audio, setAudio] = useState(location.state);
  return (
    <div>
      <audio controls src={audio}></audio>
    </div>
  );
};

export default Audio;
