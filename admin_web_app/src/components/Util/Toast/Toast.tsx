import { Provider, Root, Title, Viewport } from "@radix-ui/react-toast";

interface ToastProps {
  isOpen: boolean;
}

function Toast(props: ToastProps) {
  const { isOpen } = props;

  return (
    <Provider swipeDirection="right">
      <Root
        className="absolute z-50 w-auto bg-dark rounded-md shadow-md right-5 bottom-5 min-w-[350px] radix-state-open:right-[500px]"
        onOpenChange={(open) => {
          console.log(open);
        }}
        open={isOpen}
      >
        <div className="p-5">
          <Title className="text-sm font-medium text-gray-900 dark:text-gray-100">This is a test toast</Title>
        </div>
      </Root>

      <Viewport />
    </Provider>
  );
}

export default Toast;
