import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../UserSide_CSS(Files)/ListeningPFDUR.css";

const ListeningPDFUR = () => {
  const location = useLocation();
  const [audioURL, setAudioURL] = useState(location.state);

  return (
    <div className="ListeningPDFUR-wrapper">
      <div className="ListeningPDFUR-listeningContainer">
        <audio controls class="ListeningPDFUR-audioPlayer">
          <source src={audioURL} />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default ListeningPDFUR;
