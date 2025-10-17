import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../Redux/Reducers/UserSlice";

function User_Dropdown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isAddingUser, setAddingUser] = useState(false);
  const [username, setUsername] = useState("");
  const [search, setsearch] = useState("");
  const [selecteduser, setselecteduser] = useState("Select current profile");
  const dropdownRef = useRef(null);
  const users = useSelector((state) => state.user.value); // get users from Redux
  const dispatch = useDispatch();

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setAddingUser(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  function handleAddUser() {
    if (username.trim()) {
      dispatch(addUser(username.trim())); // add user to Redux
      setUsername("");
      setAddingUser(false);
    }
  }

  return (
    <div className="relative text-sm" ref={dropdownRef}>
      <button
        className="bg-blue-300 w-[10vw] px-2 rounded-lg flex items-start justify-start"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        {selecteduser}
      </button>
      {isDropdownOpen && (
        <div className="w-[14vw] rounded-lg h-[20vh] overflow-scroll shadow bg-white absolute px-4 py-2 flex flex-col  justify-between ">
          <div>
            <input
              type="text"
              className="bg-zinc-100 rounded-lg "
              placeholder="Search User"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
            {users.length > 0 ? (
              <div className="">
                {search.length > 0
                  ? users
                      .filter((u) =>
                        u.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((u, i) => (
                        <button
                          onClick={() => setselecteduser(u)}
                          className="px-1 py-0.5 mt-1 mb-1 cursor-pointer w-full rounded-lg text-white bg-blue-400"
                          key={i}
                        >
                          {u}
                        </button>
                      ))
                  : users.map((u, i) => (
                      <button
                        onClick={() => setselecteduser(u)}
                        className="px-1 py-0.5 mt-1 mb-1 cursor-pointer w-full rounded-lg text-white bg-blue-400"
                        key={i}
                      >
                        {u}
                      </button>
                    ))}
              </div>
            ) : (
              <div>No users found</div>
            )}
          </div>
          <div>
            {isAddingUser ? (
              <div className="flex items-center justify-between gap-1">
                <input
                  type="text"
                  className="px-1 py-0.5 bg-zinc-100 w-25 text-mono rounded-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddUser();
                  }}
                />
                <button
                  onClick={handleAddUser}
                  className="cursor-pointer bg-yellow-200 px-2 py-1 w-full rounded-lg"
                >
                  Add
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAddingUser(true)}
                className="cursor-pointer bg-yellow-200 px-2 py-1 w-full rounded-lg"
              >
                Add user
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default User_Dropdown;
