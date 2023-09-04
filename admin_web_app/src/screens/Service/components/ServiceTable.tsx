import { useQuery } from "@tanstack/react-query";
import * as serviceApi from "../../../api/service.api";
import classNames from "classnames";

function ServiceTable() {
  const { data: services } = useQuery(["services"], serviceApi.get);

  return (
    <div className="overflow-auto rounded-lg shadow m-3">
      <table className="w-full table-fixed">
        <thead className="bg-gray-100 border-b-2 border-gray-200">
          <tr>
            <th className={classNames("p-3", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap")}>Service Name</th>{" "}
            <th className={classNames("p-3", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap")}>Service Price</th>{" "}
            <th className={classNames("p-3", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap")}>Image</th>{" "}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 ">
          {services?.data.data.map((service, index) => (
            <tr className={`${(index + 1) % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
              <td className={classNames("group", "p-3", "text-sm", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis")}>{service.serviceName}</td>{" "}
              <td className={classNames("group", "p-3", "text-sm", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis")}>{service.servicePrice || 0}</td>{" "}
              <td className={classNames("group", "p-3", "text-sm", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis")}>
                <img src={service.serviceImageUrl} style={{ width: 20, height: 20, borderRadius: 10 }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceTable;
