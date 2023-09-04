import { useState } from "react";
import * as serviceApi from "../../api/service.api";
import Button from "../../components/Util/Button/Button";
import CreateEditService from "./components/CreateEditService";
import ServiceTable from "./components/ServiceTable";
import { useQuery } from "@tanstack/react-query";

function ServiceScreen() {
  const [showCreate, setShowCreate] = useState(false);
  const { data: services } = useQuery(["services"], serviceApi.get);

  function toggleCreate() {
    setShowCreate((prev) => !prev);
  }

  return (
    <div className="w-full">
      <div className="w-full bg-dark p-4 rounded-md">
        <h1 className="text-light font-bold">Services</h1>
        <p className="text-gray-300 text-xs italic">Total Services: {services?.data.data.length} </p>
      </div>

      <div className="mt-2 w-full">
        <div className="w-full flex items-end justify-end">
          {showCreate ? <Button text="View Services List" fit onClick={toggleCreate} /> : <Button text="Create New Service" fit onClick={toggleCreate} />}
        </div>
      </div>

      {showCreate ? <CreateEditService /> : <ServiceTable />}
    </div>
  );
}

export default ServiceScreen;
