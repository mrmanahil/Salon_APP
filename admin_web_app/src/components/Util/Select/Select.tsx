import { Root, Trigger, Value, Icon, Portal, Content, Viewport, Item, ItemText } from "@radix-ui/react-select";
import { AiFillCaretDown } from "react-icons/ai";

interface SelectProps<T> {
  options: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  heading: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function Select<T extends object>(props: SelectProps<T>) {
  const { value, labelKey, valueKey, options, heading, placeholder, onChange } = props;

  return (
    <Root value={value as string} onValueChange={onChange}>
      <div className="flex flex-col items-start justify-center gap-1 w-full mt-1">
        <span className="text-xs">{heading}</span>
        <Trigger className="w-full p-[10.9px] flex justify-between items-center text-sm rounded-md border-2 shadow-sm border-b-dark-200 border-opacity-30 border-b-4 bg-white outline-none transition-all duration-200 focus:border-b-dark focus:border-b-4 focus:outline-none">
          <Value placeholder={placeholder} />
          <Icon>
            <AiFillCaretDown />
          </Icon>
        </Trigger>
      </div>

      <Portal>
        <Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Viewport className="p-[5px]">
            {options.map((option) => (
              <Item
                value={option[valueKey] as string}
                className="text-[13px] cursor-pointer leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
              >
                <ItemText>
                  <span>{option[labelKey] as string}</span>
                </ItemText>
              </Item>
            ))}
          </Viewport>
        </Content>
      </Portal>
    </Root>
  );
}

export default Select;
