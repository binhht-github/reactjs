import React from "react";
import { NavLink } from "react-router-dom";
import { SpacesArr } from "../Main";


const arr = [1, 2, 3, 4, 5]

function Taskbar() {
    return (
        <nav className="max-h-[90vh] w-[256px] pr-4 mt-10">
            <div className="block">
                <ul className="">
                    <li className="hover:bg-slate-400 mb-1">
                        <a href="" className="nav-btn">
                            <svg
                                id="Layer_1"
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                            >
                                <title>chart, analysis, analytics, report, statistics</title>
                                <path d="M16.67,5.4V0H7.33V8.33H0V24H24V5.4ZM7.33,22H2V10.33H7.33Zm7.34,0H9.33V2h5.34V22ZM22,22H16.67V7.4H22Z"></path>
                            </svg>
                            <span>Bảng</span>
                        </a>
                    </li>
                    <li className="hover:bg-slate-400 mb-1">
                        <a href="" className="nav-btn">
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                viewBox="0 0 50 50"
                                width="16"
                                height="16"
                            >
                                <g id="Layer_1">
                                    <polygon
                                        points="36.942,29.648 30.051,2.081 20.09,37.941 14.175,12.312 10.279,24 1,24 1,26 11.721,26 13.825,19.688 
		19.91,46.059 29.949,9.919 37.058,38.352 39.802,26 49,26 49,24 38.198,24 	"
                                    ></polygon>
                                </g>
                                <g></g>
                            </svg>
                            <span>Trang chủ</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="bg-black w-full h-[1px]" />
            <div>
                <ul className="py-3">
                    <div>
                        <span>Các không gian làm việc</span>
                    </div>
                    {SpacesArr.map((item, index) => {
                        return <li key={item.id} className="hover:bg-slate-400 mb-1">
                            <NavLink to={`w/${item.id}/`} className="nav-btn">
                                <div className="i-works i-works2">{item.name.slice(0, 1)}</div>
                                <span>{item.name}</span>
                            </NavLink>
                        </li>
                    })}


                </ul>
            </div>
        </nav>
    );
}

export default Taskbar;
