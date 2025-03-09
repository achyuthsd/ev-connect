import React, { useState } from 'react';
import "./Help.css";
import { db } from './firebase';
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods

const Help = () => {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "feedback"), {
        name: name,
        email: email,
        message: text,
        timestamp: new Date()
      });

      alert("Feedback submitted successfully!");
      setName("");
      setEmail("");
      setText("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='helpcont'>
      <div className="helphead">HelpDesk / Customer Support</div>
      <div className="helpdesc">
        We value your feedback! If you have any questions, suggestions, or need assistance, 
        feel free to reach out to our customer support team. Your input helps us improve and serve you better!
      </div>

      <div className="nameflex">
        <div className="namelab">Enter name:</div>
        <input 
          value={name} 
          type="text" 
          className="name" 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>

      <div className="nameflex emflex">
        <div className="namelab emlab">Enter E-mail:</div>
        <input 
          value={email} 
          type="email" 
          className="name" 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>

      <div className="comment">
        <textarea 
          className='cominp'
          rows="10"
          cols="80"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message here..."
        ></textarea>
      </div>

      <div className="conbtn">
        <button className="confirm1" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Help;
