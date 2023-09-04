import { Control, Field, Label } from "@radix-ui/react-form";

interface InputProps {
  label: string;
  name: string;
  value?: any;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FormEventHandler<HTMLDivElement>;
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

function Input(props: InputProps) {
  const { label, name, onChange, value, inputProps, onBlur } = props;

  return (
    <Field name={name} onBlur={onBlur} className="mb-1">
      <Label className="FormLabel">
        <span className="text-xs">{label}</span>
      </Label>
      <Control asChild>
        <input
          value={value}
          className="w-full text-sm rounded-md p-2 border-2 shadow-sm border-b-dark-200 border-opacity-30 border-b-4 bg-white outline-none transition-all duration-200 focus:border-b-dark focus:border-b-4 focus:outline-none"
          type="text"
          onChange={onChange}
          {...inputProps}
        />
      </Control>
    </Field>
  );
}

export default Input;
