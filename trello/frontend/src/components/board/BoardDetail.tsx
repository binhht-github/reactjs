import React, { useEffect, useState } from "react";
import { socket } from "../../socket";

interface ITask {
    id: number,
    name: string,
    stack: number,
    createDate: string,
    createUser: string,
    status: boolean,
    cardId: number
}

var taksArr = [
    {
        "id": 0,
        "name": " Task 0",
        "stack": 0,
        "createDate": " Task",
        "createUser": " Task",
        "status": true,
        "cardId": 1
    },
    {
        "id": 1,
        "name": " Task 1",
        "stack": 0,
        "createDate": " Task",
        "createUser": " Task",
        "status": false,
        "cardId": 1
    },
    {
        "id": 2,
        "name": " Task 2",
        "stack": 0,
        "createDate": " Task",
        "createUser": " Task",
        "status": true,
        "cardId": 1
    },
    {
        "id": 3,
        "name": " Task 3",
        "stack": 0,
        "createDate": " Task",
        "createUser": " Task",
        "status": true,
        "cardId": 3
    },
    {
        "id": 4,
        "name": " Task 4",
        "stack": 0,
        "createDate": " Task",
        "createUser": " Task",
        "status": true,
        "cardId": 2
    },
    {
        "id": 5,
        "name": " Task 5",
        "stack": 0,
        "createDate": " Task",
        "createUser": " Task",
        "status": false,
        "cardId": 3
    },
]

const BoardDetail = React.forwardRef((props: any, ref: any) => {


    const [tasks, setTasks] = useState<ITask[]>([])
    const [newTask, setNewTask] = useState<string>("")
    const [processTotal, setProcessTotal] = useState<number>(0);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [modelViecCanLam, setModelViecCanLam] = useState<boolean>(false)

    const handleTick = (event: any) => {
        console.log(event.target.value);
    };

    useEffect(() => {
        var res = taksArr.filter((item) => { return item.cardId == props.cardId });
        setTasks(res)
    }, [props.cardId])

    useEffect(() => {
        mathProcess()
    }, [tasks])

    const mathProcess = () => {
        const count = Math.round(tasks.filter((item) => { return item.status }).length / tasks.length * 100);
        setProcessTotal(count ? count : 0)
    }

    const handleChangeStatus = (event: any, item: ITask) => {
        setTasks(tasks.filter((i) => {
            if (i.id == item.id) {
                i.status = !i.status
            }
            return i
        }))

    }

    const onCreateTask = () => {
        if (newTask != null && newTask != "") {
            setTasks((prev) =>
                [...prev,
                {
                    "id": Math.floor(Math.random() * 100) + 1,
                    "name": newTask,
                    "stack": 0,
                    "createDate": " Task",
                    "createUser": " Task",
                    "status": false,
                    "cardId": 3
                }]
            )
            setNewTask("")
        }
    }



    const test = () => {
        console.log(tasks);
        console.log(taksArr);


    }

    return (
        <div className="bg-black w-[100vw] top-0 left-0 min-h-screen fixed overflow-auto bg-opacity-35 z-50 flex justify-center ">
            <div ref={ref} className="w-1/2 bg-gray-100 h-screen rounded-xl mt-[48px] px-4 py-5">
                <div className="flex relative ml-10 py-2">
                    <svg
                        id="glyph"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="size-6 shrink-0 absolute -ml-10"
                    >
                        {/* <title>web design</title> */}
                        <path d="M6,20.68v8.63H58V20.68Zm50.59,6.55a1.00292,1.00292,0,0,1-1,1H8.55a.9965.9965,0,0,1-1-1v-4.5a.99654.99654,0,0,1,1-1H55.59a1.003,1.003,0,0,1,1,1Z"></path>
                        <path d="M52.27,8.73H11.46v9.95H52.27ZM16.45,17.05a3.1802,3.1802,0,0,1,.0001-6.36A3.1802,3.1802,0,0,1,16.45,17.05Zm8.11,0a3.1802,3.1802,0,0,1,.00009-6.36A3.1802,3.1802,0,0,1,24.56,17.05Zm8.11,0a3.1802,3.1802,0,0,1,.0001-6.36A3.1802,3.1802,0,0,1,32.67,17.05Z"></path>
                        <path d="M16.45,12.69a1.18012,1.18012,0,0,0,.00005,2.36A1.18012,1.18012,0,0,0,16.45,12.69Z"></path>
                        <path d="M24.56,12.69a1.18012,1.18012,0,0,0,.00005,2.36A1.18012,1.18012,0,0,0,24.56,12.69Z"></path>
                        <path d="M32.67,12.69a1.18012,1.18012,0,0,0,0,2.36A1.18012,1.18012,0,0,0,32.67,12.69Z"></path>
                        <rect
                            x="9.54999"
                            y="23.72998"
                            width="45.04004"
                            height="2.5"
                        ></rect>
                        <rect
                            x="16.77002"
                            y="35.46002"
                            width="30.32001"
                            height="8.35999"
                        ></rect>
                        <path d="M11.46,55.27H52.27V31.31H11.46ZM45.27,52.6a.99655.99655,0,0,1-1,1H19.32a1.003,1.003,0,0,1-1-1V48.23a1.003,1.003,0,0,1,1-1H44.27a.99654.99654,0,0,1,1,1ZM14.77,34.46a1.00288,1.00288,0,0,1,1-1H48.09a1.00292,1.00292,0,0,1,1,1V44.82a1.003,1.003,0,0,1-1,1H15.77a1.00291,1.00291,0,0,1-1-1Z"></path>
                        <rect
                            x="20.32001"
                            y="49.22998"
                            width="22.95001"
                            height="2.37"
                        ></rect>
                    </svg>
                    <div className="flex-grow">
                        <h2 className="font-medium"> {props.cardName}</h2>
                        <span> trong danh sách <span className="font-bold">{props.listName}</span></span>
                    </div>
                    <div className="shrink-0 size-5">
                        <button onClick={() => {
                            console.log("click");
                            props.setShowDetail(null)
                        }}> X</button>
                    </div>
                </div>
                <div className="flex flex-col h-auto w-3/4 float-left pr-4">
                    <div className="flex ml-10 my-2">
                        <div>
                            <label htmlFor="" className="text-[14px] font-[500]">
                                Thành viên
                            </label>
                            <div className="flex">
                                <img
                                    className="size-8 rounded-full bg-cover"
                                    src="https://i.pinimg.com/564x/f7/a5/48/f7a5489830eef765b2ba8bc77f66e25d.jpg"
                                    alt=""
                                />
                                <div className="size-8 rounded-full bg-gray-300 mx-1 flex justify-center items-center cursor-pointer">
                                    <svg
                                        version="1.1"
                                        id="Layer_1"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 50 50"
                                        enableBackground="new 0 0 50 50"
                                        className="size-5"
                                    >
                                        <path
                                            d="M9.077,25.99h14v14c0,0.553,0.448,1,1,1s1-0.447,1-1v-14h14c0.552,0,1-0.447,1-1s-0.448-1-1-1h-14v-14c0-0.553-0.448-1-1-1
	                s-1,0.447-1,1v14h-14c-0.552,0-1,0.447-1,1S8.525,25.99,9.077,25.99z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="ml-4">
                            <label htmlFor="" className="text-[14px] font-[500]">
                                Nhãn
                            </label>
                            <div className="flex">
                                <div className="h-8 w-11 rounded-sm bg-green-500"></div>
                                <div className="size-8 rounded-md bg-gray-300 mx-1 flex justify-center items-center cursor-pointer">
                                    <svg
                                        version="1.1"
                                        id="Layer_1"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 50 50"
                                        enableBackground="new 0 0 50 50"
                                        className="size-5"
                                    >
                                        <path
                                            d="M9.077,25.99h14v14c0,0.553,0.448,1,1,1s1-0.447,1-1v-14h14c0.552,0,1-0.447,1-1s-0.448-1-1-1h-14v-14c0-0.553-0.448-1-1-1
	                s-1,0.447-1,1v14h-14c-0.552,0-1,0.447-1,1S8.525,25.99,9.077,25.99z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div className="flex relative ml-10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-menu size-6 absolute -ml-10"
                        >
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                        <div>
                            <h2>Mo ta</h2>
                            <textarea name="" id=""></textarea>
                        </div>
                    </div>
                    <div className=" relative ml-10">
                        <div className="flex">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check-square size-6 absolute -ml-10"
                            >
                                <polyline points="9 11 12 14 22 4"></polyline>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                            <label htmlFor="">Viec can lam</label>
                        </div>
                        <div>
                            <div className="flex items-center my-4 ">
                                <span className="size-4 absolute -ml-10 text-xs">
                                    {processTotal}%
                                </span>
                                <div className="w-full bg-gray-300 rounded-[50px]">
                                    <div
                                        style={{
                                            width: `${processTotal}%`,
                                            height: "5px",
                                            backgroundColor: `${processTotal < 90 ? "blue" : "green"
                                                }`,
                                            borderRadius: "50px",
                                        }}
                                    />
                                </div>
                            </div>
                            {tasks.map((item) => {
                                return <div className="flex items-center my-1">
                                    <input
                                        defaultChecked={item.status}
                                        onChange={(e) => { handleChangeStatus(e, item) }}
                                        // value={item.id}
                                        className="size-4 absolute -ml-9 "
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <label htmlFor="">{item.name}</label>
                                </div>
                            })}

                        </div>
                    </div>
                </div>
                <div className="w-1/4 float-right px-1">
                    <div>
                        <h3 className="text-sm">Thêm vào thẻ</h3>
                        <div className="my-2">
                            <button onClick={test} className="flex items-center bg-gray-300 h-8 px-2 rounded-md mb-2 w-full">
                                <span>
                                    <svg
                                        viewBox="0 0 64 64"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4"
                                    >
                                        <title></title>
                                        <g id="User">
                                            <path d="M41.2452,33.0349a16,16,0,1,0-18.49,0A26.0412,26.0412,0,0,0,4,58a2,2,0,0,0,2,2H58a2,2,0,0,0,2-2A26.0412,26.0412,0,0,0,41.2452,33.0349ZM20,20A12,12,0,1,1,32,32,12.0137,12.0137,0,0,1,20,20ZM8.09,56A22.0293,22.0293,0,0,1,30,36h4A22.0293,22.0293,0,0,1,55.91,56Z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="ml-3">Thành viên</span>
                            </button>
                            <button className="flex items-center bg-gray-300 h-8 px-2 rounded-md mb-2 w-full ">
                                <span>
                                    <svg
                                        width="16px"
                                        height="16px"
                                        viewBox="0 0 32 32"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>icon 147 tags</title>
                                        <desc>Created with Sketch.</desc>
                                        <defs></defs>
                                        <g
                                            id="Page-1"
                                            stroke="none"
                                            strokeWidth="1"
                                            fill="none"
                                            fillRule="evenodd"
                                        >
                                            <g id="icon-147-tags" fill="#000000">
                                                <path
                                                    d="M4.99961498,5 C3.89525812,5 3,5.88743329 3,6.99961498 L3,15 L16.3809027,28.3809027 C17.0973171,29.0973171 18.2187667,29.1607091 19.0007013,28.5717618 L5,14.5 L5,5.00678414 C5,5.00452102 5.00000749,5.00225963 5.00002245,5 L4.99961498,5 L4.99961498,5 Z M16,4 L7.99961498,4 C6.89525812,4 6,4.88743329 6,5.99961498 L6,14 L19.3809027,27.3809027 C20.1646418,28.1646418 21.433119,28.1668566 22.2115341,27.3884415 L29.3884415,20.2115341 C30.168017,19.4319586 30.1640508,18.1640508 29.3809027,17.3809027 L16,4 L16,4 Z M11.5,11 C12.3284272,11 13,10.3284272 13,9.5 C13,8.67157283 12.3284272,8 11.5,8 C10.6715728,8 10,8.67157283 10,9.5 C10,10.3284272 10.6715728,11 11.5,11 L11.5,11 Z"
                                                    id="tags"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                                <span className="ml-3">Nhãn</span>

                            </button>
                            <button className="flex items-center bg-gray-300 h-8 px-2 rounded-md mb-2 w-full relative">
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-check-square size-4"
                                    >
                                        <polyline points="9 11 12 14 22 4"></polyline>
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                    </svg>
                                </span>
                                <span onClick={() => { setModelViecCanLam(true) }} className="ml-3">Việc cần làm</span>
                                {modelViecCanLam ?
                                    <div className="w-64 h-fit bg-white absolute top-10 left-0 rounded-lg">
                                        <div className="p-2 relative">
                                            <span>Thêm danh sách công việc</span>
                                            <span onClick={() => { setModelViecCanLam(false) }} className="absolute right-2 px-1">X</span>
                                        </div>
                                        <div className="flex flex-col mt-3 text-left">
                                            <span className="pl-2">Tiêu đề</span>
                                            <input value={newTask} onChange={(e) => { setNewTask(e.target.value) }} type="text" placeholder="Việc cần làm" className="p-1 mx-2 border" />
                                            <button onClick={onCreateTask} className="mt-2 bg-blue-600 w-fit px-5 rounded-md ml-2  mb-4">Thêm</button>
                                        </div>
                                    </div>
                                    : null}
                            </button>
                            <button className="flex items-center bg-gray-300 h-8 px-2 rounded-md mb-2 w-full">
                                <span>
                                    <svg
                                        className="size-4"
                                        viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title></title>
                                        <g id="Image">
                                            <path d="M25,2H7A5,5,0,0,0,2,7V25a5,5,0,0,0,5,5H25a5,5,0,0,0,5-5V7A5,5,0,0,0,25,2ZM7,4H25a3,3,0,0,1,3,3v5.59l-1.88-1.88a3,3,0,0,0-4.24,0l-7.95,8-3-2.42a3,3,0,0,0-3.8,0L4,18.86V7A3,3,0,0,1,7,4ZM25,28H7a3,3,0,0,1-3-3V21.47l4.38-3.66a1,1,0,0,1,1.27,0l3.73,3a1,1,0,0,0,1.33-.07l8.58-8.59a1,1,0,0,1,1.42,0L28,15.41V25A3,3,0,0,1,25,28Z"></path>
                                            <path d="M10,13a3,3,0,1,0-3-3A3,3,0,0,0,10,13Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,10,9Z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="ml-3">Ảnh bìa</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm">Thao tác</h3>
                        <div className="my-2">
                            <button className="flex items-center bg-gray-300 h-8 px-2 rounded-md mb-2 w-full">
                                <span>
                                    <svg
                                        version="1.1"
                                        id="Layer_1"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 122.88 120.64"
                                        className="size-4"
                                    >
                                        <g>
                                            <path d="M108.91,66.6c1.63,1.55,3.74,2.31,5.85,2.28c2.11-0.03,4.2-0.84,5.79-2.44l0.12-0.12c1.5-1.58,2.23-3.6,2.2-5.61 c-0.03-2.01-0.82-4.01-2.37-5.55C102.85,37.5,84.9,20.03,67.11,2.48c-0.05-0.07-0.1-0.13-0.16-0.19C65.32,0.73,63.19-0.03,61.08,0 c-2.11,0.03-4.21,0.85-5.8,2.45l-0.26,0.27C37.47,20.21,19.87,37.65,2.36,55.17C0.82,56.71,0.03,58.7,0,60.71 c-0.03,2.01,0.7,4.03,2.21,5.61l0.15,0.15c1.58,1.57,3.66,2.38,5.76,2.41c2.1,0.03,4.22-0.73,5.85-2.28l47.27-47.22L108.91,66.6 L108.91,66.6z M106.91,118.37c1.62,1.54,3.73,2.29,5.83,2.26c2.11-0.03,4.2-0.84,5.79-2.44l0.12-0.12c1.5-1.57,2.23-3.6,2.21-5.61 c-0.03-2.01-0.82-4.02-2.37-5.55C101.2,89.63,84.2,71.76,67.12,54.24c-0.05-0.07-0.11-0.14-0.17-0.21 c-1.63-1.55-3.76-2.31-5.87-2.28c-2.11,0.03-4.21,0.85-5.8,2.45C38.33,71.7,21.44,89.27,4.51,106.8l-0.13,0.12 c-1.54,1.53-2.32,3.53-2.35,5.54c-0.03,2.01,0.7,4.03,2.21,5.61l0.15,0.15c1.58,1.57,3.66,2.38,5.76,2.41 c2.1,0.03,4.22-0.73,5.85-2.28l45.24-47.18L106.91,118.37L106.91,118.37z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="ml-3">Di chuyển lên</span>
                            </button>
                            <button className="flex items-center bg-gray-300 h-8 px-2 rounded-md mb-2 w-full">
                                <span>
                                    <svg
                                        enableBackground="new 0 0 26 26"
                                        id="Layer_1"
                                        version="1.1"
                                        viewBox="0 0 26 26"
                                        className="size-4"
                                    >
                                        <g>
                                            <polygon
                                                fill="#231F20"
                                                points="0.046,2.582 2.13,0.498 12.967,11.334 23.803,0.498 25.887,2.582 12.967,15.502  "
                                            ></polygon>
                                            <polygon
                                                fill="#231F20"
                                                points="0.046,13.582 2.13,11.498 12.967,22.334 23.803,11.498 25.887,13.582 12.967,26.502  "
                                            ></polygon>
                                        </g>
                                    </svg>
                                </span>
                                <span className="ml-3">Di chuyển xuống</span>
                            </button>
                            <button className="flex items-center bg-gray-300 h-8 px-2 rounded-md mb-2 w-full">
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-check-square size-4"
                                    >
                                        <polyline points="9 11 12 14 22 4"></polyline>
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                    </svg>
                                </span>
                                <span className="ml-3">Xóa thẻ</span>
                            </button>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className="bg-black w-full mb-4 float-end" />

            </div >
        </div >
    );
})

export default BoardDetail;
