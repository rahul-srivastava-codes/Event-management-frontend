import React from "react";

function Timezone() {
  return (
    <div>
      <select>
        <option value="default" disabled>
          Select an option
        </option>
        <input type="text" className="bg-black" />
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </select>
    </div>
  );
}

export default Timezone;
