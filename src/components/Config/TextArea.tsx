import clsx from "clsx";
import { ClassAttributes, TextareaHTMLAttributes, useRef } from "react";
import { JSX } from "react/jsx-runtime";
import Button from "./Button";
import { Copy, ClipboardPaste } from "lucide-react";

function TextArea(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLTextAreaElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement> & {
      showCopyButton?: boolean;
      showPasteButton?: boolean;
    }
) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { className, showCopyButton, showPasteButton, ...rest } = props;
  return (
    <div className="relative w-full my-2">
      <textarea
        ref={textAreaRef}
        {...rest}
        className={clsx(
          "px-3 py-2.5 bg-white border-[#d5d5d6] border rounded-[4px] placeholder:text-[#636667] w-full",
          className
        )}
      />
      <div className="flex flex-row gap-2 absolute bottom-4 right-2">
        {showCopyButton && (
          <Button
            title="Copy"
            isIconOnly
            onClick={async () => {
              if (textAreaRef.current) {
                navigator.clipboard.writeText(textAreaRef.current.value.trim());
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
              if (textAreaRef.current) {
                textAreaRef.current.value = clipboardText.trim();
                const changeEvent = new Event("change", { bubbles: true });
                textAreaRef.current.dispatchEvent(changeEvent);
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

export default TextArea;
