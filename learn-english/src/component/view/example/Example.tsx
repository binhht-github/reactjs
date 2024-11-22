import React, { useEffect, useState } from "react";
import Exercise from "./example/Exercise";
import ImportExample from "./example/ImportExample";



function Example() {
    const [menu, setMenu] = useState<boolean>(false);
    return (
        <div className="w-full h-[90%] bg-gray-200 flex flex-col justify-center items-center ">
            {menu ? (
                <Exercise />
            ) : (
                <ImportExample />
            )
            }
            <div className="size-14 fixed bottom-[25%] right-8" >
                <button className="bg-green-400 rounded-xl p-2 m-1" onClick={() => {
                    setMenu(!menu);
                }}>{!menu ? "EXAMPLE" : "ADD"}</button>
            </div>
        </div >
    );
}



export default Example;
