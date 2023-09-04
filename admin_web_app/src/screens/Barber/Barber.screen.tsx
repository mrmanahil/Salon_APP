import * as barberApi from "../../api/barber.api";
import { useState } from "react";
import Button from "../../components/Util/Button/Button";
import CreateEditBarber from "./components/CreateEditBarber";
import BarberTable from "./components/BarberTable";
import { useQuery } from "@tanstack/react-query";

function BarberScreen() {
  const { data: barbers } = useQuery(["barbers"], barberApi.get);
  const [showCreate, setShowCreate] = useState(false);

  function toggleCreate() {
    setShowCreate((prev) => !prev);
  }

  return (
    <div className="w-full">
      <div className="w-full bg-dark p-4 rounded-md">
        <h1 className="text-light font-bold">Barbers</h1>
        <p className="text-gray-300 text-xs italic">Total Barbers: {barbers?.data.data.length}</p>
      </div>

      <div className="mt-2 w-full">
        <div className="w-full flex items-end justify-end">
          {showCreate ? <Button text="View Barbers List" fit onClick={toggleCreate} /> : <Button text="Create New Barber" fit onClick={toggleCreate} />}
        </div>
      </div>

      {showCreate ? <CreateEditBarber /> : <BarberTable />}
    </div>
  );
}

export default BarberScreen;
