import { client } from "filestack-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AudioCheck = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const handleClick = async () => {
    alert("In function");
    const reffilestack = client.init("ATuYVTP9T1a7cWnFl3uUAz");
    const audioURL = await reffilestack.upload(file);

    navigate("/audio", { state: audioURL.url });
  };
  return (
    <div>
      <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={() => handleClick()}>Button</button>
    </div>
  );
};

export default AudioCheck;
