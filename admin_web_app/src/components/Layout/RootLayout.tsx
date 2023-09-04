import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { socket } from "../../socket";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

function RootLayout() {
  const queryClient = useQueryClient();

  function onBooking() {
    toast.success("New Booking");

    queryClient.invalidateQueries(["bookings"]);
  }

  useEffect(() => {
    socket.on("new_booking", onBooking);

    return () => {
      socket.off("new_booking", onBooking);
    };
  }, []);

  return (
    <div className="bg-light">
      <Sidebar />

      <div className="pageContent p-2 w-full lg:w-[calc(100%-300px)] absolute lg:left-[300px] top-[70px] lg:top-0">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
