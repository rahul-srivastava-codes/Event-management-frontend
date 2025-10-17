import React, { useState } from "react";
import moment from "moment-timezone";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function Timezone() {
  const [selectedZone, setSelectedZone] = useState(moment.tz.guess());
  const timezones = moment.tz.names(); // gets IANA timezone names

  return (
    <div>
      <select
        className="bg-zinc-300 px-2 py-1"
        id="timezone-select"
        value={selectedZone}
        onChange={(e) => setSelectedZone(e.target.value)}
      >
        {timezones.map((zone) => (
          <option className="px-1 py-0.5" value={zone} key={zone}>
            {zone}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Timezone;
