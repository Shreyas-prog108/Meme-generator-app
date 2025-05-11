// pages/EditPage.js
import React, { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toJpeg } from "html-to-image";
import Text from "../components/text";
import PropTypes from 'prop-types';

const EditPage = () => {
  const [params] = useSearchParams();
  const [texts, setTexts] = useState([]);
  const [error, setError] = useState(null);
  const memeref = useRef();

  const [, drop] = useDrop(() => ({
    accept: 'text',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      
      setTexts(prevTexts => 
        prevTexts.map(text => 
          text.id === item.id ? { ...text, left, top } : text
        )
      );
    },
  }));

  const addText = () => {
    const newText = {
      id: Date.now().toString(),
      left: 50 + texts.length * 10,
      top: 50 + texts.length * 10,
    };
    setTexts((prev) => [...prev, newText]);
  };

  const generateFilename = () => {
    try {
      const textElements = Array.from(memeref.current.querySelectorAll("textarea, div"));
      const allText = textElements.map((el) => el.textContent || el.value).join(" ");
      const firstWords = allText.split(" ").slice(0, 2).join(" ");
      return firstWords ? `${firstWords}.jpg` : "meme.jpg";
    } catch (err) {
      console.error("Error generating filename:", err);
      return "meme.jpg";
    }
  };

  const saveMeme = async () => {
    try {
      setError(null);
      const filename = generateFilename();
      
      if (!memeref.current) {
        throw new Error("Meme container not found");
      }

      const dataUrl = await toJpeg(memeref.current, { 
        quality: 0.95,
        backgroundColor: '#ffffff'
      });
      
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = filename;
      link.click();
    } catch (error) {
      setError("Failed to save meme. Please try again.");
      console.error("Error saving meme:", error);
    }
  };

  const memeContainerStyle = {
    width: "700px",
    maxWidth: "100%",
    border: "1px solid black",
    padding: "10px",
    position: "relative",
    margin: "auto",
    backgroundColor: "#ffffff",
    minHeight: "400px"
  };

  const imageStyle = {
    width: "100%",
    height: "auto"
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="edit-page">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div
          ref={(node) => {
            memeref.current = node;
            drop(node);
          }}
          style={memeContainerStyle}
          className="meme mt-5 bt-5"
        >
          <img
            src={params.get("url")}
            style={imageStyle}
            alt="Meme"
          />
          {texts.map((text) => (
            <Text 
              key={text.id} 
              id={text.id} 
              left={text.left} 
              top={text.top} 
            />
          ))}
        </div>
        <div className="mt-3 text-center">
          <Button 
            onClick={addText} 
            className="m-2"
            variant="primary"
          >
            Add Text
          </Button>
          <Button 
            onClick={saveMeme} 
            className="m-2" 
            variant="success"
          >
            Save
          </Button>
        </div>
      </div>
    </DndProvider>
  );
};

EditPage.propTypes = {
  // Add prop types if needed
};

export default EditPage;
