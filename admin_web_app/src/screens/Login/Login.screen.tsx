import { Form } from "@radix-ui/react-form";
import { FiArrowRight } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Input from "../../components/Util/Input/Input";
import Button from "../../components/Util/Button/Button";
import { login } from "../../api/user.api";
import handleError from "../../utils/handleError";
import useUserContext from "../../hooks/useUserContext";
import getResponseData from "../../utils/getResponseData";
import { useNavigate } from "react-router-dom";

interface UserLoginResponse {
  email: string;
  isVerified: boolean;
  userID: number;
  userTypeID: number;
}

function LoginScreen() {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const { isLoading, mutate: loginFunc } = useMutation(login, {
    onSuccess: (data) => {
      const resData = getResponseData<UserLoginResponse>(data);

      setUser({
        userEmail: resData.email,
        userID: resData.userID,
        isVerified: resData.isVerified,
        userTypeID: resData.userTypeID,
      });

      navigate("/home");
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const formMethods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const values = formMethods.getValues();

    loginFunc({
      email: values.email,
      password: values.password,
      userTypeID: "2",
    });
  }

  return (
    <div className="flex content-center justify-center">
      <div className="w-1/3 mt-6 shadow-lg p-6 rounded-md flex flex-col">
        <h1 className="font-bold text-3xl">Login</h1>
        <span className="text-xs mt-1">Enter Details to Login</span>
        <div className="block mt-3">
          <Form onSubmit={onSubmit}>
            <Controller
              name="email"
              control={formMethods.control}
              render={({ field }) => <Input name={field.name} label="Email" onChange={field.onChange} onBlur={field.onBlur} value={field.value} />}
            />
            <Controller
              name="password"
              control={formMethods.control}
              render={({ field }) => (
                <Input
                  name={field.name}
                  label="Password"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  inputProps={{
                    type: "password",
                  }}
                />
              )}
            />

            <Button text="Login" className="mt-3" icon={<FiArrowRight />} isLoading={isLoading} />
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
