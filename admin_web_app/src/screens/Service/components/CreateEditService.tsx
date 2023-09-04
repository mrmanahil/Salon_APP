import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../../../components/Util/Input/Input";
import { Form } from "@radix-ui/react-form";
import { CreateServiceInput } from "../../../api/service.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as serviceApi from "../../../api/service.api";
import * as categoryApi from "../../../api/category.api";
import Button from "../../../components/Util/Button/Button";

const formDefaultValues: CreateServiceInput = {
  serviceName: "",
  servicePrice: 0,
  categoryID: 0,
  serviceDiscountPrice: 0,
  serviceDurationInMinutes: 0,
  shopID: 0,
};

function CreateEditService() {
  const [file, setFile] = useState<File>();

  const uploadImageRef = useRef<HTMLInputElement>(null);

  const formMethods = useForm({
    defaultValues: formDefaultValues,
  });

  const client = useQueryClient();

  const { mutate: uploadImage } = useMutation(serviceApi.uploadServiceImage, {});
  const { data: categories } = useQuery(["categories"], categoryApi.getCategories);

  const { mutate: addService, isLoading } = useMutation(serviceApi.create, {
    onSuccess: (data) => {
      client.invalidateQueries(["services"]);

      if (file) {
        uploadImage({
          serviceID: data.data.data.serviceID,
          file,
        });
      }
    },
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const values = formMethods.getValues();

    addService({
      ...values,
      shopID: 2,
      categoryID: +values.categoryID,
      servicePrice: +values.servicePrice,
      serviceDiscountPrice: +values.serviceDiscountPrice,
      serviceDurationInMinutes: +values.serviceDurationInMinutes,
    });
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <div className="">
          <div className="flex gap-1 flex-wrap">
            <Controller
              control={formMethods.control}
              name="serviceName"
              render={({ field }) => <Input name={field.name} label="Service Name" onBlur={field.onBlur} onChange={field.onChange} value={field.value} />}
            />
            <Controller
              control={formMethods.control}
              name="servicePrice"
              render={({ field }) => <Input name={field.name} inputProps={{ type: "number" }} label="Service Price" onBlur={field.onBlur} onChange={field.onChange} value={field.value} />}
            />

            <Controller
              control={formMethods.control}
              name="categoryID"
              render={({ field }) => (
                <div className="w-[400px]">
                  <label htmlFor={field.name} className="text-xs">
                    Category
                  </label>
                  <select
                    name={field.name}
                    id={field.name}
                    onChange={field.onChange}
                    value={field.value}
                    onBlur={field.onBlur}
                    className="w-full block text-sm rounded-md p-2 border-2 shadow-sm border-b-dark-200 border-opacity-30 border-b-4 bg-white outline-none transition-all duration-200 focus:border-b-dark focus:border-b-4 focus:outline-none"
                  >
                    <option value="0">Select Category</option>
                    {categories?.data.data.map((category) => (
                      <option value={category.categoryID}>{category.categoryName}</option>
                    ))}
                  </select>
                </div>
              )}
            />

            <Controller
              control={formMethods.control}
              name="serviceDurationInMinutes"
              render={({ field }) => (
                <Input name={field.name} inputProps={{ type: "number" }} label="Service Duration In Minutes" onBlur={field.onBlur} onChange={field.onChange} value={field.value} />
              )}
            />

            <Controller
              control={formMethods.control}
              name="serviceDiscountPrice"
              render={({ field }) => <Input name={field.name} inputProps={{ type: "number" }} label="Service Discount Price" onBlur={field.onBlur} onChange={field.onChange} value={field.value} />}
            />
          </div>

          <div className="flex gap-1 flex-wrap mb-7 flex-col">
            <div>
              <Input
                name="service_image"
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

export default CreateEditService;
