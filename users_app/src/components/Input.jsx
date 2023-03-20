import React from "react";

function Input({ title, type, onChange }) {
  return (
    <div>
      <label
        htmlFor="firstName"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title}
      </label>
      <div className="mt-2">
        <input
          type={type}
          onInput={(e) => onChange(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

export default Input;
