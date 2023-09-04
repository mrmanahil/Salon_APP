import { useState } from "react";
import Button from "../../components/Util/Button/Button";
import CreateEditCategory from "./components/CreateEditCategory";
import CategoryTable from "./components/CategoryTable";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/category.api";

function CategoryScreen() {
  const [showCreate, setShowCreate] = useState(false);
  const { data: categories } = useQuery(["categories"], getCategories);

  function toggleCreate() {
    setShowCreate((prev) => !prev);
  }

  return (
    <div className="w-full">
      <div className="w-full bg-dark p-4 rounded-md">
        <h1 className="text-light font-bold">Categories</h1>
        <p className="text-gray-300 text-xs italic">Total Categories: {categories?.data.data.length} </p>
      </div>

      <div className="mt-2 w-full">
        <div className="w-full flex items-end justify-end">
          {showCreate ? <Button text="View Categories List" fit onClick={toggleCreate} /> : <Button text="Create New Category" fit onClick={toggleCreate} />}
        </div>
      </div>

      {showCreate ? <CreateEditCategory /> : <CategoryTable />}
    </div>
  );
}

export default CategoryScreen;
