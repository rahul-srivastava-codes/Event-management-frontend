import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../Redux/Reducers/UserSlice";
import { addusername } from "../Redux/Reducers/UsernameSlice";

function User_Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setselected] = useState(false);
  const [useradd, setuseradd] = useState(false);
  const [search, setsearch] = useState("");
  const [userdetail, setuserdetail] = useState("");
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.user.value);
  const username = useSelector((state) => state.username.value);
  const dispatch = useDispatch();

  useEffect(() => {
    // The function refers to hovering and how it disappears once we click somewhere else
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setselected(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddClick = () => {
    setIsOpen(true);
    setselected(true);
  };

  function handlesubmit() {
    setuseradd(!useradd);
    dispatch(addUser(userdetail.toLowerCase()));
    setuserdetail("");
  }

  return (
    <div
      className="relative text-sm bg-blue-400 rounded-lg px-2 py-1 "
      ref={dropdownRef}
    >
      <button onClick={handleAddClick} className="cursor-pointer">
        {username}
      </button>
      <div className="">
        {selected && isOpen ? (
          <div className="absolute w-[15vw] h-[30vh] rounded-lg shadow bg-white px-4 top-8 -left-2 py-2">
            <div>
              {/* this input is for search */}
              <input
                type="text"
                className="bg-zinc-100 px-2 py-1 rounded-lg"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-between items-center">
              <div className="w-full overflow-scroll    ">
                {user.length > 0 ? (
                  <div>
                    {search.length > 0 ? (
                      <div>
                        {user
                          .filter((u) =>
                            u.toLowerCase().includes(search.toLowerCase())
                          )
                          .map((u, i) => (
                            <button
                              className="text-black bg-blue-200 cursor-pointer w-full mt-2 rounded-lg px-2 hover:bg-blue-400"
                              key={i}
                              onClick={() => dispatch(addusername(u))}
                            >
                              {u}
                            </button>
                          ))}
                      </div>
                    ) : (
                      <div>
                        {user.map((u, i) => (
                          <button
                            className="text-black bg-blue-200 cursor-pointer w-full mt-2 rounded-lg px-2 hover:bg-blue-400"
                            key={i}
                            onClick={() => dispatch(addusername(u))}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <>No users found</>
                )}
              </div>
              <div className="flex items-end justify-center">
                {useradd ? (
                  <div className="flex flex-col justify-between items-center">
                    <div className="flex  justify-between items-end">
                      <input
                        type="text"
                        className="px-2 py-1 rounded-lg bg-zinc-100 "
                        placeholder="Add user"
                        value={userdetail}
                        onChange={(e) => setuserdetail(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        onClick={handlesubmit}
                        className="px-2 py-1 rounded-lg bg-zinc-100 cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setuseradd(!useradd)}
                    className="px-2  py-2  rounded-lg bg-zinc-100 w-full cursor-pointer"
                  >
                    Add user
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default User_Dropdown;
