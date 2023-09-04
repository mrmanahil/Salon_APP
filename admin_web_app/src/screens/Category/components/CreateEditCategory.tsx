import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../../../components/Util/Input/Input";
import { Form } from "@radix-ui/react-form";
import { CreateCategoryInput } from "../../../api/category.api";
import Button from "../../../components/Util/Button/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as categoryApi from "../../../api/category.api";

const formDefaultValues: CreateCategoryInput = {
  categoryName: "",
};

function CreateEditBarber() {
  const [file, setFile] = useState<File>();
  const formMethods = useForm({
    defaultValues: formDefaultValues,
  });

  const client = useQueryClient();

  const uploadImageRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadImage } = useMutation(categoryApi.uploadCategoryImage, {});

  const { mutate: addCategory, isLoading } = useMutation(categoryApi.create, {
    onSuccess: (data) => {
      client.invalidateQueries(["categories"]);

      if (file) {
        uploadImage({
          categoryID: data.data.data.categoryID,
          file,
        });
      }
    },
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const values = formMethods.getValues();

    addCategory(values);
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <div className="">
          <div className="flex gap-1 flex-wrap">
            <Controller
              control={formMethods.control}
              name="categoryName"
              render={({ field }) => <Input name={field.name} label="Category Name" onBlur={field.onBlur} onChange={field.onChange} value={field.value} />}
            />
          </div>

          <div className="flex gap-1 flex-wrap mb-7 flex-col">
            <div>
              <Input
                name="category_image"
                inputProps={{
                  type: "file",
                  style: { display: "none" },
                  ref: uploadImageRef,
                }}
                label=""
                onChange={(e) => {
                  if (e.target.files && e.target.files?.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <Button
                text="Upload Image"
                type="button"
                style={{ width: 200 }}
                onClick={() => {
                  console.log(uploadImageRef.current);

                  uploadImageRef.current?.click();
                }}
              />
            </div>
            {file ? <span className="text-sm">{file.name}</span> : null}
          </div>
        </div>

        <Button text="Create" isLoading={isLoading} style={{ width: 100 }} type="submit" />
      </Form>
    </div>
  );
}

export default CreateEditBarber;
