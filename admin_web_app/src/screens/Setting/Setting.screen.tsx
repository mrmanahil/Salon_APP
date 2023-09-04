import Button from "../../components/Util/Button/Button";
import { Controller, useForm } from "react-hook-form";
import Input from "../../components/Util/Input/Input";
import { Form } from "@radix-ui/react-form";

function SettingScreen() {
  const formMethods = useForm();

  function onSubmit() {
    console.log("asd");
  }

  return (
    <div className="w-full">
      <div className="w-full bg-dark p-4 rounded-md">
        <h1 className="text-light font-bold">Salon Profile Settings</h1>
      </div>

      <div className="mt-5">
        <Form onSubmit={onSubmit}>
          <div className="">
            <div className="flex gap-1 flex-wrap">
              <Controller
                control={formMethods.control}
                name="serviceName"
                render={({ field }) => <Input name={field.name} label="Salon Name" onBlur={field.onBlur} onChange={field.onChange} value={field.value} />}
              />
              <Controller
                control={formMethods.control}
                name="servicePrice"
                render={({ field }) => <Input name={field.name} label="Shop Address" onBlur={field.onBlur} onChange={field.onChange} value={field.value} />}
              />
            </div>
          </div>

          <Button text="Update" style={{ width: 100, marginTop: 20 }} type="submit" />
        </Form>
      </div>
    </div>
  );
}

export default SettingScreen;
