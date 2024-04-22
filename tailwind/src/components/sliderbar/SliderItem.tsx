import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface sliderProps {
  path: string;
  title: string;
  icon: ReactNode;
  textColor: string;
  isActive: boolean;
  setActive:Function;
  index: Number;
}

export const SliderItem: React.FC<sliderProps> = ({
  path,
  title,
  icon,
  textColor,
  isActive,
  setActive,
  index
}: sliderProps) => {

  
  return (
    <NavLink to={`${path}`} style={{ textDecoration: "none" }}  onClick={()=>{setActive(index)}}>
      <div className={ ` ${isActive ? 'bg-[#4885e0] ': ""} rounded-lg  my-5 flex h-auto w-full py-2  cursor-pointer items-center space-x-3 pl-2 pr-2 active:bg-indigo-100 active:text-indigo-500`}>
        {icon}
        <label htmlFor={`${title}`} className={`text-[${textColor}] cursor-pointer`}>
          {title}
        </label>
      </div>
    </NavLink>
  );
};
