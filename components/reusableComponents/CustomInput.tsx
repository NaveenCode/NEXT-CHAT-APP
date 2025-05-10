import React from "react";

type CustomInputProps = {
  label: string;
  type: string;
  placeholder?: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean;
  togglePasswordVisibility?: () => void;
  showPassword?: boolean;
  fileName?: string; // for showing selected file name
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  showToggle = false,
  togglePasswordVisibility,
  showPassword,
  fileName,
}) => {
  const isFileType = type === "file";

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <div className="flex items-center relative">
        <input
          type={type}
          id={name}
          name={name}
          value={isFileType ? undefined : value}
          placeholder={isFileType ? undefined : placeholder}
          className={`border border-gray-300 rounded-md p-2 pr-16 w-full focus:outline-blue-500 ${
            isFileType
              ? "file:border file:border-gray-600 file:rounded-lg file:mr-2 file:bg-gray-100 file:p-2 "
              : ""
          }`}
          onChange={onChange}
          //   required={!isFileType}
        />
        {showToggle && togglePasswordVisibility && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 text-sm text-gray-600 bg-blue-100 px-4 py-2 rounded-lg hover:bg-blue-200"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {/* {fileName && (
        <span className="text-sm text-gray-500">Selected: {fileName}</span>
      )} */}
    </div>
  );
};

export default CustomInput;
