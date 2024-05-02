import React, { useEffect, useState } from 'react';
import { createNewTaskWork, deleteTaskWork, getTaskWorkByTask, updateStatusTaskWork } from '../../api/TaskWorkApi';

interface Iprops {
    taskID: number,
}

interface ITaskWork {
    taskWorkId: number;
    taskId: number;
    taskWorkName: string;
    creaeteDate: string;
    creaeteUser: string;
    status: boolean;
    test: string
}
function TaskWork({ taskID }: Iprops) {

    const [listWorks, setListWorks] = useState<ITaskWork[]>([])

    const [model, setModel] = useState(false);
    const [currentTaskWork, setCurrentTaskWork] = useState<string>("")
    const [counRank, setCountRank] = useState<number>(0);

    const [process, setProcess] = useState<string>("0");
    const [processTotal, setProcessTotal] = useState<number>(0);


    useEffect(() => {
        getTaskWorkByTask(taskID).then((res) => {
            setListWorks(res);

            let rank: number = 0;
            let total: number = 0;
            res.map((item: ITaskWork, index: number) => {
                rank = (rank + (item.status ? 1 : 0))
                total = (total + 1);
            }
            )
            // console.log(taskID+" "+total/rank+ " length "+res.length+" processTotal "+total+" rank "+rank);
            if (total > 0) {
                setProcess(Math.round(rank / total * 100) + "")

            }
        })

    }, [taskID])


    const handleCreateNewTaskWork = () => {
        if (currentTaskWork != "") {
            createNewTaskWork({ id: taskID }, currentTaskWork, "admin").then((res) => {
                setListWorks((prev) => [...prev, res])
            })

            setCurrentTaskWork("")
            setModel(false)
        }
    }

    useEffect(() => {
        let rank: number = 0;
        let total: number = 0;
        listWorks.map((item: ITaskWork, index: number) => {
            rank = (rank + (item.status ? 1 : 0))
            total = (total + 1);
        }
        )
        if (total > 0) {
            setProcess(Math.round(rank / total * 100) + "")

        }
    }, [listWorks])

    const handleUpadteStatus = (workID: number) => {
        console.log("update ", listWorks[1]);

        listWorks.map((prve) => {
            if (prve.taskWorkId == workID) {
                prve.status = !prve.status
                updateStatusTaskWork(
                    prve.taskWorkId,
                    taskID,
                    prve.taskWorkName,
                    prve.creaeteDate,
                    prve.creaeteUser,
                    prve.status).then((res)=>{
                        if(res == null || res ==""){
                            return
                        }
                })
                return prve
            }
        })
        let rank: number = 0;
        let total: number = 0;
        listWorks.map((item: ITaskWork, index: number) => {
            rank = (rank + (item.status ? 1 : 0))
            total = (total + 1);
        }
        )
        // console.log(taskID+" "+total/rank+ " length "+res.length+" processTotal "+total+" rank "+rank);
        if (total > 0) {
            setProcess(Math.round(rank / total * 100) + "")

        }
    }

    const handleDeleteWork = (workID:number) =>{
        console.log("delete "+workID);
        deleteTaskWork(workID).then((res:any)=>{
            if(res.status == 200){
                const newItems = listWorks.filter((item) => item.taskWorkId !== workID);
                setListWorks(newItems);
            }
        })
    }



    return (
        <div className='w-full h-fit'>
            {/* process */}
            <div className="relative">
                <span className="absolute -left-9 -top-2 text-xs">{process}%</span>
                <div className="w-full h-1 bg-[#3B444c] bg-opacity-60 my-2 relative">
                    <div className={`bg-[#43ce34] h-1  absolute transition-all `} style={{ width: `${process}%` }} />
                </div>
            </div>
            {/* end process */}
            {listWorks.length > 0 ? listWorks.map((item, index) => {

                return (
                    <div key={index} className='relative flex justify-between'>
                        <div>
                        <input type="checkbox" defaultChecked={item.status} onChange={() => { handleUpadteStatus(item.taskWorkId) }} className='absolute top-1.5 -left-7 cursor-pointer' />
                        <label htmlFor="" >{item.taskWorkName}</label>
                        
                        </div>
                        <span className='text-xs cursor-pointer hover:bg-[#cbcacaad] p-2 px-4 rounded-md' onClick={()=>{handleDeleteWork(item.taskWorkId)}}>Xóa</span>
                    </div>
                )
            }) : null}
            <div className="py-2">
                {!model ? (<button className="bg-[#85B8FF] w-auto px-2 h-8 hover:bg-[#adc7ff] rounded-md mr-2 " onClick={() => { setModel(true) }}>Thêm một mục</button>) : null}
                <div className="" style={{ display: `${!model ? "none" : "block"}` }}>
                    <input value={currentTaskWork} type="text" name="" id="" className="w-full p-1" onChange={(e) => { setCurrentTaskWork(e.target.value) }} />
                    <div className="pt-3">
                        <button className="bg-[#85B8FF] w-12 h-8 hover:bg-[#adc7ff] rounded-md mr-2" onClick={() => { handleCreateNewTaskWork() }} >Lưu</button>
                        <button className=" w-12 h-8 hover:bg-[#adc7ff] rounded-md mr-2" onClick={() => { setModel(false) }}>Hủy</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TaskWork;
