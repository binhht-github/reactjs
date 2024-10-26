import React from "react";
import Taskbar from "../nav/Taskbar";
import SpaceTaskBar from "../nav/SpaceTaskBar";
import SpaceItem from "./SpaceItem";
import Board from "../board/Board";

function WorkSpace() {
    return (
        <div className="w-screen h-[calc(100vh-60px)] flex justify-center">
            <Taskbar></Taskbar>

            {/* <SpaceTaskBar></SpaceTaskBar> */}

            <SpaceItem></SpaceItem>
            {/* <Board></Board> */}

        </div>
    );
}

export default WorkSpace;
