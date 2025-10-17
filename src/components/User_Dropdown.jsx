import React from "react";

function User_Dropdown() {
  return (
    <div className="text-sm text-zinc-400 font-bold text-black text-xm">
      <form action="">
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
      </form>
    </div>
  );
}

export default User_Dropdown;
