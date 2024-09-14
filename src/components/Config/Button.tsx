import clsx from "clsx";
import { ClassAttributes, ButtonHTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";

function Button(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement> & { isPrimary?: boolean }
) {
  const { children, isPrimary, ...rest } = props;
  return (
    <button
      {...rest}
      className={clsx("px-3 py-2 rounded-[4px] text-white", {
        "bg-[#BF2B45]": isPrimary,
        "bg-[#6C757D]": !isPrimary,
      })}
    >
      {children}
    </button>
  );
}

export default Button;
