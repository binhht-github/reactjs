import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <div className="w-screen h-[48px] bg-[#ffffff] flex justify-between">
            <div className=" h-full flex items-center px-5  h-full font-bold"><NavLink to={`/`} ><h2>Trello</h2></NavLink></div>
            <div className=" h-full flex items-center px-2 ">
                <div className="">

                    <input type="text" className="border-2 rounded-md h-8 p-1" placeholder="Tìm kiếm" />
                </div>
                <div className="size-8 ml-2 text-center rounded-[50%] hover:bg-slate-500 cursor-pointer">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline-block"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 0C12.5523 0 13 0.447715 13 1V2.07089C16.3923 2.55612 19 5.47353 19 9V10.1036C19 11.7412 19.5741 13.3269 20.6225 14.5849L21.0346 15.0794C22.6629 17.0334 21.2734 20 18.7299 20H16C16 22.2091 14.2092 24 12 24C9.79088 24 8.00001 22.2091 8.00001 20H5.2701C2.72659 20 1.33711 17.0334 2.96543 15.0794L3.37756 14.5849C4.4259 13.3269 5.00002 11.7412 5.00002 10.1036V9C5.00002 5.47353 7.60772 2.55612 11 2.07089V1C11 0.447715 11.4477 0 12 0ZM10 20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20H10ZM5.2701 18C4.42226 18 3.95911 17.0111 4.50187 16.3598L4.91401 15.8653C6.26187 14.2478 7.00001 12.209 7.00001 10.1036V9C7.00001 6.23858 9.23859 4 12 4C14.7614 4 17 6.23858 17 9V10.1036C17 12.209 17.7382 14.2478 19.086 15.8653L19.4982 16.3598C20.0409 17.0111 19.5778 18 18.7299 18H5.2701ZM4.59986 2.20043C5.04145 2.53212 5.13054 3.15899 4.79885 3.60058C3.83817 4.87956 3.21105 6.42127 3.0445 8.0988C2.98993 8.64838 2.50017 9.04967 1.95059 8.99511C1.40101 8.94054 0.999717 8.45078 1.05428 7.9012C1.25806 5.84876 2.02605 3.96196 3.19972 2.39942C3.53141 1.95783 4.15827 1.86874 4.59986 2.20043ZM19.4002 2.20043C19.8418 1.86874 20.4686 1.95783 20.8003 2.39942C21.974 3.96196 22.742 5.84876 22.9457 7.9012C23.0003 8.45078 22.599 8.94054 22.0494 8.99511C21.4999 9.04967 21.0101 8.64838 20.9555 8.0988C20.789 6.42127 20.1619 4.87956 19.2012 3.60058C18.8695 3.15899 18.9586 2.53212 19.4002 2.20043Z"
                            fill="#333"
                        ></path>
                    </svg>
                </div>
                <div className="size-8 mx-2 rounded-[50%] hover:bg-slate-500 flex justify-center items-center cursor-pointer">
                    <div className="size-6 bg-gradient-to-br from-white via-[#00bfd8] to-[#0083f5] rounded-[50%] font-800  flex justify-center items-center"><span className="text-xs">HB</span></div>
                </div>
            </div>
        </div>
    );
}

export default Nav;
