import { useState } from 'react';
import axios from 'axios';
import { IoMdSend } from "react-icons/io";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("loading...");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBOPE-evXeWzRDBQz7fZ1ekGKnsWRUeEbc",
      method: "post",
      data: {
        contents: [
          { parts: [{ text: question }] },
        ]
      }
    });
    setAnswer(response.data.candidates[0].content.parts[0].text);
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className='w-full max-w-screen-md bg-white p-4 rounded-lg shadow-md '>
        <div className='mb-4'>

          <div className='text-[#432169] text-4xl font-semibold mb-2'>ConvoBot</div>
          <p className='text-gray-600 text-lg'>Welcome to the ConvoBot. Ask me anything!</p>
          <pre className='w-full mr-5'>{answer}</pre>
        </div>

        <div className="flex">
          <textarea
            className='border rounded w-full mt-4'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your message here..."
            rows={4}
          ></textarea>
          <button className="send-button" onClick={generateAnswer}><IoMdSend className='text-[30px] mt-4 pl-3' /></button>
        </div>
      </div>
    </div>
  );
}

export default App;
