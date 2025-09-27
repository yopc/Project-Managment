import { CircleX } from "lucide-react";
import React, { useState } from "react";

const DynamicInputList = () => {
  
  const [inputs, setInputs] = useState([""]);

 
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  
  const handleAddInput = () => {
    setInputs([...inputs, ""]);
  };

  
  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

 
  const handleSubmit = () => {
    console.log("Submitted data:", inputs);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Dynamic Input List</h2>
      {inputs.map((value, index) => (
        <div key={index} style={{ display: "flex", marginBottom: "8px" }}>
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            style={{ flex: 1, padding: "6px" }}
            placeholder={`Item ${index + 1}`}
          />
          <button
            onClick={() => handleRemoveInput(index)}
            style={{
              marginLeft: "5px",
              background: "red",
              color: "white",
              border: "none",
              padding: "0 8px",
              cursor: "pointer",
            }}
          >
          <CircleX/>
          </button>
        </div>
      ))}

      <button
        onClick={handleAddInput}
        style={{
          background: "green",
          color: "white",
          border: "none",
          padding: "6px 12px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        + Add Item
      </button>

      <button
        onClick={handleSubmit}
        style={{
          background: "blue",
          color: "white",
          border: "none",
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default DynamicInputList;
