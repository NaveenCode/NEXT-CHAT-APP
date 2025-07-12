import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <ScaleLoader height={20} color="#ffffff" />
    </div>
  );
};

export default Loader;
