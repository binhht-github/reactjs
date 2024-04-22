import React, { useState } from "react";

interface cardProp {
  name: string;
}
function WorkCard({ name }: cardProp) {

  const [model, setModel] = useState(false);


  return (
    <>
      <div className="mb-2 h-auto min-h-10 w-full rounded-lg bg-[white] pl-2 pt-2 cursor-pointer" onClick={() => { setModel(true) }}>
        <label htmlFor="The Lam Viec" className="text-[#333]">
          {name}
        </label>
      </div>
      {model ? (
        <>
          <div className="w-[60%] h-[90%] bg-[#eeeeee] absolute inset-0 left-[20%] top-[4%] z-50 rounded-lg p-6">
            <div className="w-full h-16 ">
              <div className="flex items-center justify-between">
                <label htmlFor="" className="text-black">Ten the</label> <label htmlFor="">X</label>
              </div>
              <label htmlFor="" className="text-black">trong danh sach: (ten danh sach)</label>
            </div>
            <hr />
            <div className="w-full  h-[calc(100%-64px)] flex bg-[green]">
              <div className="bg-[yellow]  w-[75%] h-full bg-opacity-50">
                  <div className="w-full h-fit">Thong bao</div>
                  <div className="w-full h-fit flex justify-center flex-col">
                    <label htmlFor="">Mo ta</label>
                    <div className="w-full">
                      <textarea name="" id="" cols={60} rows={10}></textarea>
                    </div>
                    <div className="w-full">
                      <button>Luu</button><button>Huy</button>
                    </div>
                  </div>
                  <div className="w-full h-fit">viec can lam</div>
                  <div className="w-full h-fit">hoat dong vs cmt</div>
              </div>
              <div className="bg-[red] w-[25%] h-full bg-opacity-50">

              </div>
            </div>
          </div>

          <div className="bg-[black] bg-opacity-50 w-screen h-screen fixed inset-0 z-40" onClick={() => { setModel(false) }}>

          </div>
        </>
      ) : null}

    </>
  );
}

export default WorkCard;
