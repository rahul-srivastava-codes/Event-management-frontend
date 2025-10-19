import { useEffect, useState } from "react";
import Timezone from "./Timezone";
import { useSelector } from "react-redux";

function Events() {
  const username = useSelector((state) => state.username.value);
  const userdetail = useSelector((state) => state.userdetail.value);
  const timezone = useSelector((state) => state.timezone.value);

  const [filteredItems, setFilteredItems] = useState([]);

  function filter(userd, usern) {
    return userd.filter((u) => u.name.toLowerCase() === usern.toLowerCase());
  }

  useEffect(() => {
    const filteredData = filter(userdetail, username);
    setFilteredItems(filteredData);
  }, [userdetail, username, timezone]);

  return (
    <div className="bg-white px-4 py-2 rounded-lg">
      <div>View in Timezone</div>
      <Timezone />
      <div>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, i) => (
            <div key={i}>
              <div>{item.name}</div>
              <div>{item.timezone}</div>
              <div>
                {item.start_date} <span>{item.start_time}</span>
              </div>
              <div>
                {item.end_date} <span>{item.end_time}</span>
              </div>
            </div>
          ))
        ) : (
          <div>No details found</div>
        )}
      </div>
    </div>
  );
}

export default Events;
