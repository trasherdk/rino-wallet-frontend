import React from "react";
import classNames from "classnames";

type InputType = "email" | "text" | "password";

type Props = {
  type: InputType,
  value?: string;
  name?: string;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  ref?: any;
  autoComplete?: "on" | "off" | "current-password" | "new-password";
};

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    autoComplete = "on",
    type,
    value = "",
    name = "",
    placeholder = "",
    error = "",
    className = "",
    maxLength,
    onChange,
    onBlur = ():void => undefined,
    disabled = false,
  } = props;
  return (
    <div>
      <input
        autoComplete={autoComplete}
        ref={ref}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        className={classNames(
          className,
          "w-full font-lato inline-flex border-solid border placeholder-gray-400 theme-text px-6 py-3.25 rounded-medium appearance-none",
          {
            "theme-control-border": !error,
            "theme-border-error": !!error,
          }
        )}
        disabled={disabled}
      />
      {
        error && <div id={`${name}-error`} className="theme-text-error text-base mt-1">{error}</div>
      }
    </div>
  );
})
