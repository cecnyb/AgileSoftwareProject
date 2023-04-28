import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import "../DatabaseAccess.css"; 

firebase.initializeApp({
    apiKey: "AIzaSyBMg7qvLxlpbnM1ayFnep7Y_xShenT8EkQ",
    authDomain: "vk-vattenskoter.firebaseapp.com",
    projectId: "vk-vattenskoter",
    storageBucket: "vk-vattenskoter.appspot.com",
    messagingSenderId: "967558583555",
    appId: "1:967558583555:web:be81fea2b86c02be494536",
    measurementId: "G-CP25S8F63K"
});

const db = firebase.firestore();

function AddItemForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    db.collection("/courses/Vattenskotern/Chapters").add({
      name,
      description,
      createdAt: new Date(),
    });
    setName("");
    setDescription("");
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-input">
        <label className="form-label">
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label className="form-label">
          Description:
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <br />
        <button type="submit" className="form-button">Add to Firestore</button>
      </form>
    </div>
  );
}

function RemoveItem({ item }) {
  function handleRemove() {
    db.collection("/courses/Vattenskotern/Chapters").doc(item.id).delete();
  }

  return (
    <li>
      {item.title} - {item.id}{" "}      
      <button onClick={handleRemove} className='delete-button'>Remove</button>
    </li>
  );
}

function RemoveItemForm() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("/courses/Vattenskotern/Chapters").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(data);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="form-container">
      <ul>
        {items.map((item) => (
          <RemoveItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function DatabaseAccess() {
  return (
    <div>
      <AddItemForm />
      <RemoveItemForm />
    </div>
  );
}
  export default DatabaseAccess;