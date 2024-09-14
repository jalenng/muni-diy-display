import { ClassAttributes, InputHTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";

function Input(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLInputElement> &
    InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className="my-2 px-3 py-2.5 bg-white border-[#d5d5d6] border rounded-[4px] placeholder:text-[#636667] w-full"
    />
  );
}

export default Input;
