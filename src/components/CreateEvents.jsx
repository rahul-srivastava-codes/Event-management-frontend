import Timezone from "./Timezone";
import User_Dropdown from "./User_Dropdown";
function CreateEvents() {
  return (
    <div className="bg-white px-4 py-2 rounded-lg text-sm flex-col gap-2">
      <div className="text-xl font-bold mb-3">Create Event</div>
      <form action="" className="flex-col items-center gap-6 ">
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
            />
            <input
              type="time"
              className="w-[5vw] px-2 py-1 bg-zinc-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="">End Date & Time</label>
          <div className="flex gap-2  ">
            <input
              type="date"
              className="w-[25vw] px-2 py-1 bg-zinc-200 rounded-lg cursor-pointer"
            />
            <input
              type="time"
              className="w-[5vw] px-2 py-1 bg-zinc-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>
        <button className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-400 text-white w-full cursor-pointer">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvents;
