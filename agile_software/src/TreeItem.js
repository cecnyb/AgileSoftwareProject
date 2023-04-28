import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";

const db = firebase.firestore();

function TreeItem({ path, name, onClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [children, setChildren] = useState(null);

  useEffect(() => {
    const unsubscribe = db
      .doc(path)
      .collection(name)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChildren(data);
      });
    return unsubscribe;
  }, [path, name]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClick = () => {
    onClick(`${path}/${name}`);
  };

  if (!children) {
    return <div>Loading...</div>;
  }

  return (
    <TreeView
      nodeLabel={name}
      collapsed={!isExpanded}
      onClick={handleClick}
      onToggle={handleToggle}
    >
      {children.map((child) => (
        <TreeItem
          key={child.id}
          path={`${path}/${name}`}
          name={child.id}
          onClick={onClick}
        />
      ))}
    </TreeView>
  );
}
