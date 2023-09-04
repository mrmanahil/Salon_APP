import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const menuOptions: { title: string; path: string }[] = [
  {
    title: "Bookings",
    path: "/home",
  },
  {
    title: "Categories",
    path: "/category",
  },
  {
    title: "Services",
    path: "/service",
  },
  {
    title: "Barber",
    path: "/barber",
  },
  {
    title: "Settings",
    path: "/setting",
  },
];

function Sidebar() {
  function toggleSideNav() {
    document.querySelector(".sidebar")?.classList.toggle("left-[-300px]");
  }

  const navigate = useNavigate();

  const onNavigate = (to: string) => () => {
    navigate(to);

    toggleSideNav();
  };

  return (
    <>
      <span className="absolute text-black text-4xl top-5 left-4 cursor-pointer" onClick={toggleSideNav}>
        <FiMenu />
      </span>
      <div className="sidebar border-r-4 border-r-gray-200 z-10 fixed top-0 bottom-0 lg:left-0 left-[-300px] p-2 px-4 w-[300px] overflow-y-auto text-center bg-light">
        <div className="text-gray text-xl">
          <div className="p-2.5 mt-1 flex items-center justify-between">
            <h1 className="font-bold text-dark text-[15px] ml-3">Salon App</h1>
            <div className="lg:hidden text-dark cursor-pointer" onClick={toggleSideNav}>
              <FiX />
            </div>
          </div>
        </div>
        {menuOptions.map((option) => (
          <div key={option.title} onClick={onNavigate(option.path)} className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-200 hover:bg-opacity-90">
            <span className="text-[15px] ml-1 text-dark">{option.title}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
