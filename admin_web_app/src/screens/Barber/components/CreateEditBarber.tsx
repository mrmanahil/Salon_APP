import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../../../components/Util/Input/Input";
import { Form } from "@radix-ui/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCountries } from "../../../api/country.api";
import { getAllCities } from "../../../api/city.api";
import { getAllStates } from "../../../api/state.api";
import { CreateBarberInput } from "../../../api/barber.api";
import Button from "../../../components/Util/Button/Button";
import * as barberApi from "../../../api/barber.api";

const formDefaultValues: CreateBarberInput = {
  address: {
    addressLine1: "",
    addressLine2: "",
    cityID: NaN,
    countryID: NaN,
    stateID: NaN,
  },
  totalExperienceInYear: 0,
  email: "",
  name: "",
  password: "",
  userTypeID: 0,
};

function CreateEditBarber() {
  const [file, setFile] = useState<File>();

  const { data: countries } = useQuery(["countries"], getAllCountries);
  const { data: states } = useQuery(["states"], getAllStates);
  const { data: cities } = useQuery(["cities"], getAllCities);

  const uploadImageRef = useRef<HTMLInputElement>(null);

  const formMethods = useForm({
    defaultValues: formDefaultValues,
  });

  const client = useQueryClient();

  const { mutate: uploadImage } = useMutation(barberApi.uploadBarberImage, {});

  const { mutate: addService, isLoading } = useMutation(barberApi.create, {
    onSuccess: (data) => {
      client.invalidateQueries(["barbers"]);

      if (file) {
        uploadImage({
          barberID: data.data.data.barber.barberID,
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
      address: {
        ...values.address,
        cityID: +values.address.cityID,
        countryID: +values.address.countryID,
        stateID: +values.address.stateID,
      },
    });
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <div className="">
          <div className="flex gap-1 flex-wrap">
            <Controller
              control={formMethods.control}
              name="name"
              render={({ field }) => <Input name={field.name} label="Barber Name" onBlur={field.onBlur} onChange={field.onChange} value={field.value} />}
            />
            <Controller
              control={formMethods.control}
              name="email"
              render={({ field }) => <Input name={field.name} label="Barber Email" onBlur={field.onBlur} onChange={field.onChange} value={field.value} />}
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            <Controller
              control={formMethods.control}
              name="address.countryID"
              render={({ field }) => (
                <div className="w-[200px]">
                  <label htmlFor={field.name} className="text-xs">
                    Country
                  </label>
                  <select
                    name={field.name}
                    id={field.name}
                    onChange={field.onChange}
                    value={field.value}
                    onBlur={field.onBlur}
                    className="w-full block text-sm rounded-md p-2 border-2 shadow-sm border-b-dark-200 border-opacity-30 border-b-4 bg-white outline-none transition-all duration-200 focus:border-b-dark focus:border-b-4 focus:outline-none"
                  >
                    <option value="0">Select Country</option>
                    {countries?.data.data.map((country) => (
                      <option value={country.countryID}>{country.countryName}</option>
                    ))}
                  </select>
                </div>
              )}
            />

            <Controller
              control={formMethods.control}
              name="address.stateID"
              render={({ field }) => (
                <div className="w-[200px]">
                  <label htmlFor={field.name} className="text-xs">
                    State
                  </label>
                  <select
                    name={field.name}
                    id={field.name}
                    onChange={field.onChange}
                    value={field.value}
                    onBlur={field.onBlur}
                    className="w-full block text-sm rounded-md p-2 border-2 shadow-sm border-b-dark-200 border-opacity-30 border-b-4 bg-white outline-none transition-all duration-200 focus:border-b-dark focus:border-b-4 focus:outline-none"
                  >
                    <option value="0">Select State</option>
                    {states?.data.data.map((state) => (
                      <option value={state.stateID}>{state.stateName}</option>
                    ))}
                  </select>
                </div>
              )}
            />

            <Controller
              control={formMethods.control}
              name="address.cityID"
              render={({ field }) => (
                <div className="w-[200px]">
                  <label htmlFor={field.name} className="text-xs">
                    City
                  </label>
                  <select
                    name={field.name}
                    id={field.name}
                    onChange={field.onChange}
                    value={field.value}
                    onBlur={field.onBlur}
                    className="w-full block text-sm rounded-md p-2 border-2 shadow-sm border-b-dark-200 border-opacity-30 border-b-4 bg-white outline-none transition-all duration-200 focus:border-b-dark focus:border-b-4 focus:outline-none"
                  >
                    <option value="0">Select City</option>
                    {cities?.data.data.map((city) => (
                      <option value={city.cityID}>{city.cityName}</option>
                    ))}
                  </select>
                </div>
              )}
            />
          </div>

          <div className="mt-3" />

          <div className="flex gap-1 flex-wrap">
            <Controller
              control={formMethods.control}
              name="address.addressLine1"
              render={({ field }) => <Input name={field.name} label="Address Line 1" onBlur={field.onBlur} onChange={field.onChange} value={field.value} />}
            />
            <Controller
              control={formMethods.control}
              name="address.addressLine2"
              render={({ field }) => <Input name={field.name} label="Address Line 2" onBlur={field.onBlur} onChange={field.onChange} value={field.value} />}
            />
          </div>

          <div className="flex gap-1 flex-wrap mb-7 flex-col">
            <div>
              <Input
                name="barber_image"
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
