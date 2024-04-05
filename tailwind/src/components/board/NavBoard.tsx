import React, { useState } from "react";
import { Avatar } from "../avatar/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import FilterListIcon from "@mui/icons-material/FilterList";

function NavBoard() {
  const [avt, setAvt] = useState([
    "https://i.pinimg.com/736x/2c/d8/a7/2cd8a74b799243e32d4ee504771a82d0.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYrep2Ye25MojZvZG2OsW0VbCOX91ALTvEq1cK_9kZ_eUi4TMX0R2fc5YcxEqcyiUOEWs&usqp=CAU",
    "https://upload.wikimedia.org/wikipedia/vi/c/c1/Nh%C3%A2n_v%E1%BA%ADt_v%E1%BA%BD_theo_phong_c%C3%A1ch_anime_-_manga_%C4%91%C6%B0%E1%BB%A3c_t%E1%BA%A1o_t%E1%BB%B1_%C4%91%E1%BB%99ng_b%E1%BB%9Fi_AI_%282%29.jpeg",
    "https://ngoaingutomato.edu.vn/Data/images/hinh-anh-co-gai-cute-anime.jpeg",
  ]);
  return (
    <div className="flex h-12 w-full items-center justify-between bg-[black] bg-opacity-30">
      <div className="flex h-full items-center  ">
        <div className="pl-4">
          {/* <input type="text" className="bg bg-opacity-0" /> */}
          <h1 className="w-auto font-bold text-[#ffffff]">
            Ten Khong Gian Lam Viec
          </h1>
        </div>
      </div>
      <div className="flex h-full flex-row-reverse items-center space-x-3">
        <div className="flex h-full w-12 items-center justify-center">
          <MenuIcon style={{ color: "white" }} />
        </div>
        <div className="flex flex-row-reverse p-2">
          {avt.map((item, index) => {
            // index > 0;
            return (
              <div className={index > 0 ? "" : ""} key={index}>
                {/* <span className="text-[white]">{index}</span> */}
                <Avatar size={30} url={item} />
              </div>
            );
          })}
          {/* <Avatar size={30} url="" /> */}
        </div>
        <div className="flex h-full  items-center justify-center p-2">
          <FilterListIcon style={{ color: "#ffffff" }} />
          <label htmlFor="Bộ lọc" className=" text-sm text-[#ffffff]">
            Bộ Lọc
          </label>
        </div>
        {/* <div className="h-full w-12 bg-[blue]"></div> */}
      </div>
    </div>
  );
}

export default NavBoard;
