import clsx from "clsx";
import { ClassAttributes, InputHTMLAttributes, useRef } from "react";
import { JSX } from "react/jsx-runtime";
import Button from "./Button";
import { Copy, ClipboardPaste } from "lucide-react";

function Input(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLInputElement> &
    InputHTMLAttributes<HTMLInputElement> & {
      showCopyButton?: boolean;
      showPasteButton?: boolean;
    }
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { className, showCopyButton, showPasteButton, ...rest } = props;

  return (
    <div className="relative w-full my-2">
      <input
        ref={inputRef}
        {...rest}
        className={clsx(
          "px-3 py-2.5 bg-white border-[#d5d5d6] border rounded-[4px] placeholder:text-[#636667] w-full invalid:border-red-500 valid:border-green-500",
          className
        )}
      />

      <div className="flex flex-row gap-2 absolute bottom-1.5 top-1.5 right-2">
        {showCopyButton && (
          <Button
            title="Copy"
            isIconOnly
            onClick={async () => {
              if (inputRef.current) {
                navigator.clipboard.writeText(inputRef.current.value.trim());
              }
            }}
          >
            <Copy size={16} />
          </Button>
        )}
        {showPasteButton && (
          <Button
            title="Paste"
            isIconOnly
            onClick={async () => {
              const clipboardText = await navigator.clipboard.readText();
              if (inputRef.current) {
                inputRef.current.value = clipboardText.trim();
                const changeEvent = new Event("change", { bubbles: true });
                inputRef.current.dispatchEvent(changeEvent);
              }
            }}
          >
            <ClipboardPaste size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Input;
