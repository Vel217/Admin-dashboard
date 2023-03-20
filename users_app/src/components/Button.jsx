import React from "react";

function Button({ type, title, onClick }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="flex w-full justify-center rounded-md bg-emerald-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
    >
      {title}
    </button>
  );
}

export default Button;
