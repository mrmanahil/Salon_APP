import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../api/category.api";
import classNames from "classnames";

function CategoryTable() {
  const { data: categories } = useQuery(["categories"], getCategories);

  return (
    <div className="overflow-auto rounded-lg shadow m-3">
      <table className="w-full table-fixed">
        <thead className="bg-gray-100 border-b-2 border-gray-200">
          <tr>
            <th className={classNames("p-3", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap")}>Category Name</th>{" "}
            <th className={classNames("p-3", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap")}>Image</th>{" "}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 ">
          {categories?.data.data.map((category, index) => (
            <tr className={`${(index + 1) % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
              <td className={classNames("group", "p-3", "text-sm", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis")}>{category.categoryName}</td>{" "}
              <td className={classNames("group", "p-3", "text-sm", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis")}>
                <img src={category.categoryImageUrl} style={{ width: 20, height: 20, borderRadius: 10 }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;
