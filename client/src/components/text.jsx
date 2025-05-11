import React, { useState } from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";

const Text = ({ id, left, top }) => {
  const [editMode, setEditMode] = useState(false);
  const [val, setVal] = useState("Double Click to Edit");
  const [textBoxSize, setTextBoxSize] = useState({ width: 200, height: 30 });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'text',
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleResize = (e) => {
    const newWidth = Math.max(50, e.target.offsetWidth);
    const newHeight = Math.max(20, e.target.offsetHeight);
    setTextBoxSize({ width: newWidth, height: newHeight });
  };

  const style = {
    position: "absolute",
    left: `${left}px`,
    top: `${top}px`,
    cursor: "move",
    width: textBoxSize.width,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={drag} style={style}>
      <div
        style={{
          backgroundColor: "#333",
          color: "white",
          padding: "4px 10px",
          cursor: "grab",
          userSelect: "none",
          fontSize: "12px",
        }}
      >
        Drag here
      </div>

      {editMode ? (
        <textarea
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onDoubleClick={() => setEditMode(false)}
          onMouseUp={handleResize}
          style={{
            width: "100%",
            height: textBoxSize.height,
            resize: "both",
            overflow: "auto",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />
      ) : (
        <div
          onDoubleClick={() => setEditMode(true)}
          style={{
            width: "100%",
            height: textBoxSize.height,
            overflow: "hidden",
            whiteSpace: "pre-wrap",
            backgroundColor: "rgba(255,255,255,0.8)",
            padding: "4px",
            fontSize: "16px",
          }}
        >
          {val}
        </div>
      )}
    </div>
  );
};

Text.propTypes = {
  id: PropTypes.string.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
};

export default Text;
