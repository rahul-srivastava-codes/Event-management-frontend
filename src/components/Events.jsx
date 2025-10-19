import { useEffect, useState } from "react";
import Timezone from "./Timezone";
import { useSelector, useDispatch } from "react-redux";
import { updateUserdetail } from "../Redux/Reducers/UserdetailSlice";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

function Events() {
  const [log, setlog] = useState(false);
  const [update, setupdate] = useState(false);
  const username = useSelector((state) => state.username.value);
  const userdetail = useSelector((state) => state.userdetail.value);
  const timezone = useSelector((state) => state.timezone.value);
  const dispatch = useDispatch();

  const [filteredItems, setFilteredItems] = useState([]);
  const [editItemIndex, setEditItemIndex] = useState(null);
  const [editableData, setEditableData] = useState({
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
  });

  function filter(userd, usern) {
    return userd.filter((u) => u.name.toLowerCase() === usern.toLowerCase());
  }

  // Convert event UTC date/time to local terms in selected timezone for display
  function convertEventToTimezone(event, tz) {
    return {
      ...event,
      start_date: dayjs
        .utc(`${event.start_date}T${event.start_time}`)
        .tz(tz)
        .format("YYYY-MM-DD"),
      start_time: dayjs
        .utc(`${event.start_date}T${event.start_time}`)
        .tz(tz)
        .format("HH:mm"),
      end_date: dayjs
        .utc(`${event.end_date}T${event.end_time}`)
        .tz(tz)
        .format("YYYY-MM-DD"),
      end_time: dayjs
        .utc(`${event.end_date}T${event.end_time}`)
        .tz(tz)
        .format("HH:mm"),
      timezone: tz,
    };
  }

  // Convert local edited date/time in current tz back to UTC for saving
  function convertLocalToUTC(date, time, tz) {
    return dayjs.tz(`${date}T${time}`, tz).utc();
  }

  useEffect(() => {
    const filteredData = filter(userdetail, username).map((event) =>
      convertEventToTimezone(event, timezone)
    );
    setFilteredItems(filteredData);
  }, [userdetail, username, timezone]);

  function updateon(index) {
    setEditItemIndex(index);
    if (filteredItems[index]) {
      setEditableData({
        start_date: filteredItems[index].start_date,
        start_time: filteredItems[index].start_time,
        end_date: filteredItems[index].end_date,
        end_time: filteredItems[index].end_time,
      });
    }
    setupdate(true);
    setlog(false);
  }

  function logon() {
    setupdate(false);
    setlog(true);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  }

  function saveChanges() {
    if (editItemIndex !== null && filteredItems[editItemIndex]) {
      const originalEvent = userdetail.find(
        (event) =>
          event.name.toLowerCase() === username.toLowerCase() &&
          event.start_date === filteredItems[editItemIndex].start_date // or use unique id if available
      );

      if (!originalEvent) {
        console.error("Original event not found");
        return;
      }
      // Convert edited local times back to UTC strings
      const startUtc = convertLocalToUTC(
        editableData.start_date,
        editableData.start_time,
        timezone
      );
      const endUtc = convertLocalToUTC(
        editableData.end_date,
        editableData.end_time,
        timezone
      );

      const updatedEvent = {
        ...originalEvent,
        start_date: startUtc.format("YYYY-MM-DD"),
        start_time: startUtc.format("HH:mm"),
        end_date: endUtc.format("YYYY-MM-DD"),
        end_time: endUtc.format("HH:mm"),
        timezone: timezone,
      };

      dispatch(updateUserdetail({ index: editItemIndex, updatedEvent }));
      setupdate(false);
      console.log("Saved changes:", updatedEvent);
    }
  }

  return (
    <div className="bg-white px-4 py-2 rounded-lg">
      <div>View in Timezone</div>
      <Timezone />
      <div className="overflow-scroll">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, i) => (
            <div key={i} className="font-mono">
              <div>
                User name: <strong>{item.name}</strong>
              </div>
              <div>
                Timezone: <strong>{item.timezone}</strong>
              </div>
              <div>
                Starting At:{" "}
                <strong>
                  {item.start_date} <span>{item.start_time}</span>
                </strong>
              </div>
              <div>
                Ending At:{" "}
                <strong>
                  {item.end_date} <span>{item.end_time}</span>
                </strong>
              </div>
            </div>
          ))
        ) : (
          <div>No details found</div>
        )}
      </div>
      <div>
        {filteredItems.length > 0 ? (
          <div className="relative flex items-end justify-between">
            <div>
              <button
                onClick={() => updateon(0)}
                className="bg-blue-500 px-2 py-1 rounded-lg hover:bg-blue-300 cursor-pointer"
              >
                Update Logs
              </button>
              {update && (
                <div className="absolute px-4 py-4 rounded-lg bg-zinc-800 text-white w-64 mt-2 shadow-lg">
                  <div className="flex justify-between items-center mb-3">
                    <button
                      title="close"
                      onClick={() => setupdate(false)}
                      className="bg-red-800 px-2 py-1 cursor-pointer rounded-lg hover:bg-red-400"
                    >
                      X
                    </button>
                  </div>
                  <div className="font-mono space-y-2">
                    <div>
                      User name:{" "}
                      <strong>{filteredItems[editItemIndex]?.name}</strong>
                    </div>
                    <div>
                      Timezone: <strong>{timezone}</strong>
                    </div>

                    <div>
                      Start Date:
                      <input
                        type="date"
                        name="start_date"
                        value={editableData.start_date}
                        onChange={handleInputChange}
                        className="ml-2 rounded px-1 text-black cursor-pointer bg-zinc-50"
                      />
                    </div>
                    <div>
                      Start Time:
                      <input
                        type="time"
                        name="start_time"
                        value={editableData.start_time}
                        onChange={handleInputChange}
                        className="ml-2 rounded px-1 text-black cursor-pointer bg-zinc-50"
                      />
                    </div>
                    <div>
                      End Date:
                      <input
                        type="date"
                        name="end_date"
                        value={editableData.end_date}
                        onChange={handleInputChange}
                        className="ml-2 rounded px-1 text-black cursor-pointer bg-zinc-50"
                      />
                    </div>
                    <div>
                      End Time:
                      <input
                        type="time"
                        name="end_time"
                        value={editableData.end_time}
                        onChange={handleInputChange}
                        className="ml-2 rounded px-1 text-black cursor-pointer bg-zinc-50"
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={saveChanges}
                        className="bg-green-600 px-3 py-1 rounded hover:bg-green-400"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={logon}
                className="bg-blue-500 px-2 py-1 rounded-lg hover:bg-blue-300 cursor-pointer"
              >
                View Logs
              </button>
              {log && (
                <div className="absolute px-2 py-4 rounded-lg bg-zinc-800 text-white shadow-amber-300 w-70 mt-2 h-40 items-center justify-between">
                  <div>
                    <button
                      title="close"
                      onClick={() => setlog(false)}
                      className="bg-red-800 px-2 py-1 cursor-pointer rounded-lg hover:bg-red-400 flex items-center justify-end"
                    >
                      X
                    </button>
                  </div>
                  <div>
                    {filteredItems.map((item, i) => (
                      <div key={i} className="font-mono">
                        <div>
                          User name: <strong>{item.name}</strong>
                        </div>
                        <div>
                          Timezone: <strong>{item.timezone}</strong>
                        </div>
                        <div>
                          Starting At:{" "}
                          <strong>
                            {item.start_date} <span>{item.start_time}</span>
                          </strong>
                        </div>
                        <div>
                          Ending At:{" "}
                          <strong>
                            {item.end_date} <span>{item.end_time}</span>
                          </strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Events;
