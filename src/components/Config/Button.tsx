import clsx from "clsx";
import { ClassAttributes, ButtonHTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";

function Button(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: "primary" | "secondary" | "tertiary";
      isIconOnly?: boolean;
    }
) {
  const { children, variant, isIconOnly, className, ...rest } = props;
  return (
    <button
      {...rest}
      className={clsx(
        "rounded-[4px] whitespace-nowrap w-fit h-fit py-2",
        className,
        {
          "px-3": !isIconOnly,
          "px-2": isIconOnly,

          "bg-[#BF2B45] text-white": variant === "primary",
          "bg-[#6C757D] text-white": variant === "secondary",
          "bg-[#ffffff] text-black border border-[#e3e3e3]":
            variant === undefined || variant === "tertiary",
        }
      )}
    >
      {children}
    </button>
  );
}

export default Button;
