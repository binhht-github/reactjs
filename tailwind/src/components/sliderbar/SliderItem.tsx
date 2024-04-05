import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface sliderProps {
  path: string;
  title: string;
  icon: ReactNode;
  textColor: string;
}

export const SliderItem: React.FC<sliderProps> = ({
  path,
  title,
  icon,
  textColor,
}: sliderProps) => {
  return (
    <NavLink to={`${path}`} style={{ textDecoration: "none" }}>
      <div className="mb-1 mt-1 flex h-8 w-full  cursor-pointer items-center space-x-3 pl-2 pr-2 active:bg-indigo-100 active:text-indigo-500">
        {icon}
        <label htmlFor={`${title}`} className={`text-[${textColor}]`}>
          {title}
        </label>
      </div>
    </NavLink>
  );
};
