import React from 'react';
import { NavLink } from 'react-router-dom';

function SpaceItem() {
    return (
        <div className="min-w-64 max-w-[825px] w-full h-[100vh-60px] bg-white mt-10 mx-4">
            <div>
                <div className="w-full max-h-[186px]">
                    <div className="flex items-center ">
                        <div className="">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                width={16}
                                height={16}
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <span className="block p-2 font-bold">Đã xem gần đây</span>
                    </div>
                    <div className="h-fit">
                        <ul className="flex h-full flex-wrap justify-start  [&>li]:mr-[2%] [&>li]:mb-[2%] [&>li:nth-child(4n)]:mr-0">
                            <li className=" w-[23.5%]  rounded-lg">
                                <NavLink to={`/w/1/board/1`}
                                    className="bg-red-400 block no-underline p-2 h-full bg-opacity-50 relative  rounded-lg"
                                    style={{
                                        backgroundImage:
                                            `url(https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-41.jpg)`,
                                        // backgroundColor: "green",
                                        backgroundPosition: "50%",
                                        backgroundSize: " cover",
                                        color: " #fff",
                                        fontWeight: '700'

                                    }}
                                >
                                    <span className="absolute top-0 right-0 left-0  bottom-0  rounded-lg bg-black bg-opacity-30"></span>
                                    <div className="relative h-[80px]">
                                        <span className="absolute">Tên Bảng</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className=" w-[23.5%]  rounded-lg">
                                <a
                                    href=""
                                    className="bg-red-400 block no-underline p-2 h-full bg-opacity-50 relative  rounded-lg"
                                    style={{
                                        backgroundImage:
                                            `url(https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-41.jpg)`,
                                        // backgroundColor: "green",
                                        backgroundPosition: "50%",
                                        backgroundSize: " cover",
                                        color: " #fff",
                                        fontWeight: '700'

                                    }}
                                >
                                    <span className="absolute top-0 right-0 left-0  bottom-0  rounded-lg bg-black bg-opacity-30"></span>
                                    <div className="relative h-[80px]">
                                        <span className="absolute">Tên Bảng</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="flex items-center ">

                        <h3 className="block py-2 font-bold">CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN</h3>
                    </div>
                    <div>
                        <div className="mb-4">
                            <div className="flex  items-center">
                                <div className="bg-gradient-to-br from-white via-[#00bfd8] to-[#0083f5] px-2 py-1 rounded-sm font-bold text-white">N</div>
                                <span className="px-4 font-bold">Ten bang</span>
                            </div>
                        </div>
                        <div className="h-fit">
                            <ul className="flex h-full flex-wrap justify-start  [&>li]:mr-[2%] [&>li]:mb-[2%] [&>li:nth-child(4n)]:mr-0">
                                <li className=" w-[23.5%]  rounded-lg">
                                    <a
                                        href=""
                                        className="bg-red-400 block no-underline p-2 h-full bg-opacity-50 relative  rounded-lg"
                                        style={{
                                            backgroundImage:
                                                `url(https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-41.jpg)`,
                                            // backgroundColor: "green",
                                            backgroundPosition: "50%",
                                            backgroundSize: " cover",
                                            color: " #fff",
                                            fontWeight: '700'

                                        }}
                                    >
                                        <span className="absolute top-0 right-0 left-0  bottom-0  rounded-lg bg-black bg-opacity-30"></span>
                                        <div className="relative h-[80px]">
                                            <span className="absolute">Tên Bảng</span>
                                        </div>
                                    </a>
                                </li>

                                <li className=" w-[23.5%]  rounded-lg">
                                    <a
                                        href=""
                                        className="bg-red-400 block no-underline p-2 h-full bg-opacity-50 relative  rounded-lg"
                                        style={{
                                            backgroundImage:
                                                `url(https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-41.jpg)`,
                                            // backgroundColor: "green",
                                            backgroundPosition: "50%",
                                            backgroundSize: " cover",
                                            color: " #fff",
                                            fontWeight: '700'

                                        }}
                                    >
                                        <span className="absolute top-0 right-0 left-0  bottom-0  rounded-lg bg-black bg-opacity-30"></span>
                                        <div className="relative h-[80px]">
                                            <span className="absolute">Tên Bảng</span>
                                        </div>
                                    </a>
                                </li>
                                <li className=" w-[23.5%]  rounded-lg">
                                    <a
                                        href=""
                                        className="bg-red-400 block no-underline p-2 h-full bg-opacity-50 relative  rounded-lg"
                                        style={{
                                            backgroundImage:
                                                `url(https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-41.jpg)`,
                                            // backgroundColor: "green",
                                            backgroundPosition: "50%",
                                            backgroundSize: " cover",
                                            color: " #fff",
                                            fontWeight: '700'

                                        }}
                                    >
                                        <span className="absolute top-0 right-0 left-0  bottom-0  rounded-lg bg-black bg-opacity-30"></span>
                                        <div className="relative h-[80px]">
                                            <span className="absolute">Tên Bảng</span>
                                        </div>
                                    </a>
                                </li>
                                <li className=" w-[23.5%]  rounded-lg">
                                    <a
                                        href=""
                                        className="bg-red-400 block no-underline p-2 h-full bg-opacity-50 relative  rounded-lg"
                                        style={{
                                            backgroundImage:
                                                `url(https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-41.jpg)`,
                                            // backgroundColor: "green",
                                            backgroundPosition: "50%",
                                            backgroundSize: " cover",
                                            color: " #fff",
                                            fontWeight: '700'

                                        }}
                                    >
                                        <span className="absolute top-0 right-0 left-0  bottom-0  rounded-lg bg-black bg-opacity-30"></span>
                                        <div className="relative h-[80px]">
                                            <span className="absolute">Tên Bảng</span>
                                        </div>
                                    </a>
                                </li>
                                <li className=" w-[23.5%]  rounded-lg">
                                    <a
                                        href=""
                                        className="bg-red-400 block no-underline p-2 h-full bg-opacity-50 relative  rounded-lg"
                                        style={{
                                            backgroundImage:
                                                `url(https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-41.jpg)`,
                                            // backgroundColor: "green",
                                            backgroundPosition: "50%",
                                            backgroundSize: " cover",
                                            color: " #fff",
                                            fontWeight: '700'

                                        }}
                                    >
                                        <span className="absolute top-0 right-0 left-0  bottom-0  rounded-lg bg-black bg-opacity-30"></span>
                                        <div className="relative h-[80px]">
                                            <span className="absolute">Tên Bảng</span>
                                        </div>
                                    </a>
                                </li>
                                <li className=" w-[23.5%]  rounded-lg">
                                    <a
                                        href=""
                                        className="bg-red-400 block no-underline p-2 h-full bg-opacity-50 relative  rounded-lg"
                                        style={{
                                            backgroundImage:
                                                `url(https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-41.jpg)`,
                                            // backgroundColor: "green",
                                            backgroundPosition: "50%",
                                            backgroundSize: " cover",
                                            color: " #fff",
                                            fontWeight: '700'

                                        }}
                                    >
                                        <span className="absolute top-0 right-0 left-0  bottom-0  rounded-lg bg-black bg-opacity-30"></span>
                                        <div className="relative h-[80px]">
                                            <span className="absolute">Tên Bảng</span>
                                        </div>
                                    </a>
                                </li>
                                <li className=" w-[23.5%]  rounded-lg">
                                    <a
                                        href=""
                                        className="bg-red-400 block no-underline p-2 h-full bg-opacity-50 relative  rounded-lg"
                                        style={{
                                            backgroundImage:
                                                `url(https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-41.jpg)`,
                                            // backgroundColor: "green",
                                            backgroundPosition: "50%",
                                            backgroundSize: " cover",
                                            color: " #fff",
                                            fontWeight: '700'

                                        }}
                                    >
                                        <span className="absolute top-0 right-0 left-0  bottom-0  rounded-lg bg-black bg-opacity-30"></span>
                                        <div className="relative h-[80px]">
                                            <span className="absolute">Tên Bảng</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>


                </div>
            </div>
            <div></div>
        </div>
    );
}

export default SpaceItem;
