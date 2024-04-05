import React from "react";

interface cardProp {
  name: string;
}
function WorkCard({ name }: cardProp) {
  return (
    <div className="mb-2 h-auto min-h-10 w-full rounded-lg bg-[#313131] pl-3 pt-2">
      <label htmlFor="The Lam Viec" className="text-[#ffffff]">
        {name}
      </label>
    </div>
  );
}

export default WorkCard;
