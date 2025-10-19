import Timezone from "./Timezone";
import User_Dropdown from "./User_Dropdown";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { adduserdetail } from "../Redux/Reducers/UserdetailSlice";

function CreateEvents() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const timezone = useSelector((state) => state.timezone.value);

  const username = useSelector((state) => state.username.value);
  const dispatch = useDispatch();

  const [userdetail, setUserdetail] = useState({
    name: username,
    timezone: timezone,
    start_date: startDate,
    end_date: endDate,
    start_time: startTime,
    end_time: endTime,
  });

  useEffect(() => {
    setUserdetail({
      name: username,
      timezone: timezone,
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
    });
  }, [username, timezone, startDate, endDate, startTime, endTime]);

  const notify = () => toast("Event created successfully");

  const handleCreateEvent = (event) => {
    event.preventDefault();
    if (
      username.length > 0 &&
      timezone.length > 0 &&
      startDate.length > 0 &&
      endDate.length > 0 &&
      startTime.length > 0 &&
      endTime.length > 0
    ) {
      dispatch(adduserdetail(userdetail));
      setStartDate("");
      setEndDate("");
      setEndTime("");
      setStartTime("");
      notify();
      console.log("Event created with:", userdetail);
    } else {
      toast("Event not created field is empty");
    }
  };

  return (
    <div className="bg-white px-4 py-2 rounded-lg text-sm flex-col gap-2">
      <div className="text-xl font-bold mb-3">Create Event</div>
      <form>
        <div className="flex-col items-center gap-6 ">
          <div className="mb-3">
            <label>Profiles</label>
            <User_Dropdown />
          </div>
          <div className="mb-3">
            <label>Timezone</label>
            <Timezone />
          </div>
          <div className="mb-3">
            <label>Start Date & Time</label>
            <div className="flex gap-2">
              <input
                type="date"
                required
                className="w-[25vw] px-2 py-1 bg-zinc-200 rounded-lg cursor-pointer"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="time"
                required
                className="w-[5vw] px-2 py-1 bg-zinc-200 rounded-lg cursor-pointer"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>End Date & Time</label>
            <div className="flex gap-2">
              <input
                type="date"
                required
                className="w-[25vw] px-2 py-1 bg-zinc-200 rounded-lg cursor-pointer"
                min={startDate || undefined}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <input
                type="time"
                required
                className="w-[5vw] px-2 py-1 bg-zinc-200 rounded-lg cursor-pointer"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleCreateEvent}
            className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-400 text-white w-full cursor-pointer"
          >
            Create Event
          </button>
          <ToastContainer position="bottom-right" />
        </div>
      </form>
    </div>
  );
}

export default CreateEvents;
