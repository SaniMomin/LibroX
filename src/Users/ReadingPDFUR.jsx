import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "../UserSide_CSS(Files)/ReadingPDFUR.css";

const ReadingPDFUR = () => {
  const location = useLocation();
  const [pdfURL, setPDFURL] = useState(location.state);

  const iframeRef = useRef(null); // creates a reference

  const handleFullScreen=()=>{
    iframeRef.current.requestFullscreen();
  };

  return (
    <div className="ReadingPDFUR-wrapper">
      <div className="ReadingPDFUR-readingContainer">
        <iframe
          ref={iframeRef}
          src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(
            pdfURL
          )}
            #toolbar=0&navpanes=0&view=FitH&disableDownload=true`}
          className="ReadingPDFUR-iframe"
          title="PDF Viewer"
        />
        <button onClick={() => handleFullScreen()}>Full Screen</button>
      </div>
    </div>
  );
};

export default ReadingPDFUR;
