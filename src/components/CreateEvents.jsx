import Timezone from "./Timezone";
import User_Dropdown from "./User_Dropdown";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function CreateEvents() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const notify = () => toast("Event created successfully");

  return (
    <div className="bg-white px-4 py-2 rounded-lg text-sm flex-col gap-2">
      <div className="text-xl font-bold mb-3">Create Event</div>
      <div className="flex-col items-center gap-6 ">
        <div className="mb-3">
          <label htmlFor="">Profiles</label>
          <User_Dropdown />
        </div>
        <div className="mb-3">
          <label htmlFor="">Timezone</label>
          <Timezone />
        </div>
        <div className="mb-3">
          <label htmlFor="">Start Date & Time</label>
          <div className="flex gap-2">
            <input
              type="date"
              className="w-[25vw] px-2 py-1 bg-zinc-200 rounded-lg cursor-pointer"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input type="time" name="" id="" />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="">End Date & Time</label>
          <div className="flex gap-2  ">
            <input
              type="date"
              className="w-[25vw] px-2 py-1 bg-zinc-200 rounded-lg cursor-pointer"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || undefined}
            />
            <input type="time" name="" id="" />
          </div>
        </div>
        <button
          onClick={notify}
          className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-400 text-white w-full cursor-pointer"
        >
          Create Event
        </button>
      </div>
      <ToastContainer position="bottom-right"></ToastContainer>
    </div>
  );
}

export default CreateEvents;
