import OpenAI from "openai";
import React, { useState } from "react";

const ApiCheck = () => {
  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("");

  // API Key ko directly store karna (Less Secure)
  const API_KEY = "ddc-CYmTThVZ8OormysOYS9RsHdPfbiNUNd7HZGsVkepl9Xl23v9jP"; 
  const Base_URL = "https://api.openai.com/v1"; 

  const handleQues = async () => {
    try {
      const openai = new OpenAI({
        apiKey: API_KEY,
        baseURL: Base_URL,
        dangerouslyAllowBrowser: true, // React frontend ke liye zaroori hai
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: ques }],
      });

      setAns(completion.choices[0].message.content);
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong! Check console.");
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={ques}
          onChange={(e) => setQues(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={handleQues}>Send</button>
      </div>
      <div>
        <h1>{ans || "Response will appear here..."}</h1>
      </div>
    </div>
  );
};

export default ApiCheck;
