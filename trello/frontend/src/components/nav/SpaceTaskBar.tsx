import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SpacesArr } from "../Main";
import { BoardArr } from "../board/List";


// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function SpaceTaskBar(props: any) {
    const [board, setBoard] = useState();
    const [showTaskBar, setShowTaskBar] = useState<boolean>(true);


    useEffect(() => {
        console.log("reload");
    }, []);
    var test = document.getElementById("bar");
    return (
        <div
            id="bar"
            className="h-[calc(100vh-48px)] bg-[#f5f5f5] relative  bg-opacity-80"
            style={{ width: `${showTaskBar ? "260px" : "20px"}` }}
        >

            <div className="ml-2" style={{ display: `${!showTaskBar ? "block" : "none"}` }}>
                <button className="size-6 z-40" onClick={() => { setShowTaskBar(true) }}>
                    <svg
                        version="1.1"
                        id="Icons"
                        x="0px"
                        y="0px"
                        viewBox="0 0 32 32"
                    >
                        <path
                            d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M18.9,16.7l-4.2,4.2c-0.2,0.2-0.5,0.3-0.7,0.3
	s-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l3.5-3.5l-3.5-3.5c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l4.2,4.2C19.3,15.7,19.3,16.3,18.9,16.7z
	"
                        ></path>
                    </svg>
                </button>
            </div>
            <div
                className=""
                style={{ display: `${showTaskBar ? "block" : "none"}` }}
            >
                <div className="p-2 flex items-center  border-b-2 border-gray-300">
                    <div className="size-8 bg-gradient-to-br from-white via-[#00bfd8] to-[#0083f5] font-medium  flex justify-center items-center text-white font-bold">
                        {props.nameSpace.slice(0, 1)}
                    </div>
                    <div className=" px-2 grow">
                        <h2>{props.nameSpace}</h2>
                    </div>
                    <button
                        className="font-bold size-4 mx-2"
                        onClick={() => {
                            setShowTaskBar(false);
                        }}
                    >
                        <svg
                            enableBackground="new 0 0 24 24"
                            id="Layer_1"
                            version="1.0"
                            viewBox="0 0 24 24"
                        >
                            <polyline
                                fill="none"
                                points="15.5,21 6.5,12 15.5,3 "
                                stroke="#000000"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                            ></polyline>
                        </svg>
                    </button>
                </div>
                <div>
                    <div className="flex justify-between items-center py-1 px-3 ">
                        <h2 className="font-medium">Các bảng của bạn</h2>
                        <div>
                            <button className="size-5   hover:bg-gray-400">
                                <svg
                                    version="1.1"
                                    id="Layer_1"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 50 50"
                                    enableBackground="new 0 0 50 50"
                                >
                                    <path
                                        d="M9.077,25.99h14v14c0,0.553,0.448,1,1,1s1-0.447,1-1v-14h14c0.552,0,1-0.447,1-1s-0.448-1-1-1h-14v-14c0-0.553-0.448-1-1-1
	s-1,0.447-1,1v14h-14c-0.552,0-1,0.447-1,1S8.525,25.99,9.077,25.99z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <ul>

                            {BoardArr.filter(item => { return item.spaceId == props.idSpace }).map((item, index) => {
                                return <NavLink key={item.id} to={`board/${item.id}`}>
                                    <li className="px-3 h-8 hover:bg-gray-200  cursor-pointer">
                                        <div className="flex items-center ">
                                            <div>
                                                <img
                                                    className="h-5 w-8"
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw4jmmenYlY966HrbBGAWd6KWFfl4e5J9ePA&s"
                                                    alt=""
                                                />
                                            </div>
                                            <span className="px-2">{item.name}</span>
                                        </div>
                                    </li>
                                </NavLink>
                            })}

                        </ul>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default SpaceTaskBar;
