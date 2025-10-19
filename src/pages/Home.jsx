import Heading from "../components/Heading";
import User_Dropdown from "../components/User_Dropdown";
import CreateEvents from "../components/CreateEvents";
import Events from "../components/Events";
import Cards from "../components/Cards";

function Home() {
  document.title = "Event Management";
  return (
    <div className="w-full h-[100vh] bg-zinc-200 flex-col items-center justify-center px-[10vw]  py-5">
      <div className="flex items-center justify-between text-4xl font-bold ">
        <Heading />
        <User_Dropdown />
      </div>
      <div className="flex gap-4">
        <Cards
          className="flex items-center justify-around px-5 py-3 gap-4"
          components={<CreateEvents />}
        />
        <Cards
          className="flex items-center justify-around px-5 py-3 gap-4"
          components={<Events />}
        />
      </div>
    </div>
  );
}

export default Home;
