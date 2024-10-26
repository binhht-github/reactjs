import React, { useEffect, useRef, useState } from "react";
import BoardNav from "../nav/BoardNav";
import BoardItem from "./BoardItem";
import { useSearchParams } from "react-router-dom";
import { useOutsideClick } from "../../utils/RefHook";

export const ListArr = [
    {
        "id": 1,
        "name": "Todo",
        "stack": 1,
        "createDate": "createDate",
        "createUser": "createUse",
        "boardId": 1
    },
    {
        "id": 2,
        "name": "doing",
        "stack": 1,
        "createDate": "createDate",
        "createUser": "createUse",
        "boardId": 1
    },
    {
        "id": 3,
        "name": " done",
        "stack": 1,
        "createDate": "createDate",
        "createUser": "createUse",
        "boardId": 2
    },
    {
        "id": 4,
        "name": "Error",
        "stack": 1,
        "createDate": "createDate",
        "createUser": "createUse",
        "boardId": 3
    },
]

interface IList {
    id: number,
    name: string,
    stack: number
    createDate: string,
    createUser: string,
    boardId: number
}


function Board(props: any) {
    const [List, setList] = useState<IList[]>([])
    const [showAddList, setShowAddList] = useState<boolean>(false)
    const [newList, setNewList] = useState<string>("")

    useEffect(() => {
        setList(ListArr.filter(item => { return item.boardId == props.item.id }))
    }, [props.item.id])


    const refNewList = useOutsideClick(() => {
        setShowAddList(false)
    });

    const handleChangeNewList = (e: any) => {
        setNewList(e.target.value)
    }
    const onCreateList = () => {
        if (newList != null && newList != "") {
            setList((prev) => [...prev, {
                "id": ListArr[ListArr.length - 1].id + 1,
                "name": newList,
                "stack": 1,
                "createDate": "createDate",
                "createUser": "createUse",
                "boardId": 3
            }])
            setNewList("")
            setShowAddList(false)
        }
    }
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            onCreateList()
        }
    }

    return (
        <>
            {/* <BoardDetail /> */}
            <div className="flex flex-grow flex-shrink basis-0 flex-col">
                <div className="relative">
                    <div
                        id="test"
                        className="absolute2 top-0 right-0 left-0 bottom-0 backdrop:blur-sm"
                    >
                        <BoardNav item={props.item.name}></BoardNav>
                    </div>
                </div>
                <div className="relative h-full">
                    <ol className="absolute  mt-3 left-0 top-0 right-0 bottom-0 overflow-x-auto overflow-y-hidden mb-2 pb-2 flex">
                        {List.map((item) => {
                            return <li key={item.id}>
                                <BoardItem item={item} />
                            </li>

                        })}

                        <li className="px-2 py-0 h-full">
                            <div className="w-[272px]  rounded-lg max-h-full " ref={refNewList}>
                                {!showAddList ?
                                    <div className=" cursor-pointer py-2 bg-[#f1f2f4] hover:bg-opacity-30 bg-opacity-20  rounded-lg flex items-center px-4  " onClick={() => { setShowAddList(true) }}>
                                        <span >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-plus size-4 text-white"
                                            >
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                        </span>
                                        <span className="px-2 text-white font-bold">Thêm danh sách khác</span>
                                    </div>
                                    :
                                    <div className=" p-2 bg-[#f1f2f4] rounded-lg">
                                        <input onChange={handleChangeNewList} onKeyDown={handleKeyDown} value={newList} className="w-full p-1 m-1 rounded-lg" type="text" name="" id=" " />
                                        <div className="m-1">
                                            <div className="mt-2">
                                                <button onClick={onCreateList} className="px-4 py-1 bg-blue-500 rounded-md" >Thêm danh sách</button>
                                                <span className="px-4 py-1 ml-3 bg-gray-500 rounded-md cursor-pointer" onClick={() => { setShowAddList(false) }}>x</span>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </li>

                    </ol>
                </div>
            </div>
        </>
    );
}

export default Board;
