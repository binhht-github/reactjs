import React, { useEffect, useState } from "react";
import BoardDetail from "./BoardDetail";
import { useOutsideClick } from "../../utils/RefHook";

interface Iprops {
    onChangeTitle: Function;
}

interface IList {
    id: number,
    name: string,
    stack: number,
    createDate: string,
    createUser: string,
    listId: number
}
const cardItems = [
    {
        "id": 0,
        "name": " string 0",
        "stack": 0,
        "createDate": " string",
        "createUser": " string",
        "listId": 1
    },
    {
        "id": 0,
        "name": " string 1",
        "stack": 0,
        "createDate": " string",
        "createUser": " string",
        "listId": 1
    },
    {
        "id": 1,
        "name": " string 2",
        "stack": 0,
        "createDate": " string",
        "createUser": " string",
        "listId": 4
    },
    {
        "id": 2,
        "name": " string 3",
        "stack": 0,
        "createDate": " string",
        "createUser": " string",
        "listId": 3
    },
    {
        "id": 3,
        "name": " string 4",
        "stack": 0,
        "createDate": " string",
        "createUser": " string",
        "listId": 2
    },
    {
        "id": 4,
        "name": " string 5",
        "stack": 0,
        "createDate": " string",
        "createUser": " string",
        "listId": 3
    },
]

function BoardItem(props: any) {
    const [cards, setCards] = useState<IList[]>([]);
    const [title, setTitle] = useState("");
    const [newCard, setNewCard] = useState("")
    const [showAddCard, setShowAddCard] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<IList | null>(null);



    useEffect(() => {
        setTitle(props.item.name)
        setCards(cardItems.filter((item) => { return item.listId == props.item.id }))
    }, [props.item])


    const ref = useOutsideClick(() => {
        setShowDetail(null)
    });

    const refNewCard = useOutsideClick(() => {
        setShowAddCard(false)
    });

    const handleOnchange = (event: any) => {
        setTitle(event.target.value);
    };
    const handleOnchangeNameItem = (event: any) => {
        setNewCard(event.target.value);
    };
    const onCreateCard = () => {
        if (newCard !== null && newCard !== "") {
            setCards((prev) => [...prev, {
                "id": cardItems[cardItems.length - 1].id + 1,
                "name": newCard,
                "stack": 0,
                "createDate": " string",
                "createUser": " string",
                "listId": 3
            }])
            setNewCard("")
            setShowAddCard(false)
        }
    };


    return (
        <>
            <div className="px-2 h-full">
                <div className="w-[272px]  bg-gray-200 rounded-lg max-h-full relative flex flex-col">
                    <div className=" flex px-2 pt-3 ">
                        <div className=" flex-grow">
                            <textarea
                                value={title}
                                className="cursor-pointer font-bold sticky min-h-5 h-[32px] w-full top-0 left-0 right-0 bottom-0 px-2 py-1 m-0 rounded-lg overflow-hidden bg-opacity-0"
                                name=""
                                id=""
                                onChange={handleOnchange}
                                onFocus={(event) => {
                                    console.log("focus");
                                    event.target.style.background = "white";
                                    event.target.style.cursor = "auto";
                                }}
                                onBlur={(event) => {
                                    event.target.style.background = "transparent";
                                    event.target.style.cursor = "pointer";
                                }}
                                style={{ background: "transparent" }}
                            ></textarea>
                        </div>
                        <div className="flex-grow-0 px-3 hover:bg-slate-500 rounded-lg font-bold">
                            <button>...</button>
                        </div>
                    </div>

                    <ol className="overflow-y-auto flex flex-col flex-shrink flex-grow ">
                        {cards.map((item, index) => {
                            return <li key={"card" + item.id} className="px-2 h-full cursor-pointer" onClick={() => {
                                setShowDetail(item)
                            }}>
                                <div className="w-full min-h-9 p-2 mb-2 rounded-lg bg-white">
                                    <h1>{item.name}</h1>
                                </div>
                            </li>
                        })}




                    </ol>

                    <div className="h-auto my-2" ref={refNewCard}>
                        {showAddCard ? (
                            <div className="px-2 py-2  ">
                                <div>
                                    <textarea onChange={handleOnchangeNameItem} className="w-full p-1 h-auto rounded-lg" />
                                </div>
                                <div className="mt-2">
                                    <button
                                        className="px-4 py-1 bg-blue-500 rounded-md"
                                        onClick={onCreateCard}
                                    >
                                        Thêm
                                    </button>
                                    <span
                                        className="px-4 py-1 ml-3 bg-gray-500 rounded-md cursor-pointer"
                                        onClick={() => {
                                            setShowAddCard(false);
                                        }}
                                    >
                                        x
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="min-h-4 cursor-pointer mb-2 hover:bg-white p-2 rounded-lg flex items-center mx-2"
                                onClick={() => {
                                    setShowAddCard(true);
                                }}
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-plus size-4"
                                    >
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </span>
                                <span className="px-2">Thêm thẻ</span>
                            </div>
                        )}
                        {/* <button className="w-full min-h-8 mb-1 rounded-lg bg-red-500">Thêm thẻ</button> */}
                    </div>
                </div>
            </div>
            <div >
                {showDetail !== null ? <BoardDetail cardId={showDetail.id} cardName={showDetail.name} listName={props.item.name} ref={ref} setShowDetail={setShowDetail} /> : null}
            </div>
        </>
    );
}

export default BoardItem;
