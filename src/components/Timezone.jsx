import { useEffect, useState } from "react";
import moment from "moment-timezone";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useSelector, useDispatch } from "react-redux";
import { addtimezone } from "../Redux/Reducers/Timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function Timezone() {
  const timezones = moment.tz.names();
  const timezone = useSelector((state) => state.timezone.value);
  const [selectedZone, setSelectedZone] = useState(timezone);
  const dispatch = useDispatch();
  function changetimezone() {
    dispatch(addtimezone(selectedZone));
  }
  useEffect(() => {
    changetimezone();
  }, [selectedZone]);
  console.log(timezone);

  return (
    <div>
      <select
        className="bg-zinc-300 px-2 py-1"
        id="timezone-select"
        value={selectedZone}
        onChange={(e) => setSelectedZone(e.target.value)}
      >
        {timezones.map((z, i) => (
          <option className="px-1 py-0.5" value={z} key={i}>
            {z}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Timezone;
