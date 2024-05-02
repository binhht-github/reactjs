import React, { useEffect, useState } from "react";
import NavBoard from "../components/board/NavBoard";
import ColumnSpace from "../components/board/ColumnSpace";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { getProject } from "../api/ProjectApi";


interface prtemplate {
  id: number,
  projectName: string,
  createDate: string,
  listUser: [],
  createUser: string
}

interface restmp {
  success: boolean,
  data :prtemplate[],
}

function Board() {
  const [isActiveBoard, setIsActiveBoard] = useState(true);

  
  const  pr = [
    {id:1,
      name: "web huong dan nau an"
    },
    {id:2,
      name: "web learning"
    },
    {id:3,
      name: "Bluzone"
    },
    {id:4,
      name: "Du an tot nghiep"
    },
    {id:5,
      name: "ho tro tai chinh abc"
    }
  ]
  const [projects, setProjects] = useState<prtemplate[]>([]);

  const [project, setProject] = useState<prtemplate>(
    {
      id:0,
      projectName: "",
      createDate: "",
      listUser: [],
      createUser: ""
  });

  useEffect(()=>{
    getProject()
    .then((res)=>{
      if(res){
        setProjects(res)
      }
      // console.log(res.data);
    })
    .catch((e)=>{console.log(e);
    })
  },[])

  return (
    <div className="h-screen w-[calc(100%-240px)] flex">
      <div className={` ${!isActiveBoard ? "w-1" : "w-52"} h-ful flex`}>
        <div className="w-full h-full bg-black bg-opacity-30 backdrop-blur-lg">
          <div className={`${!isActiveBoard ? "invisible" : "visible"}`}>
            <div className="w-full h-12">
            </div>
            <hr />
            <ul className="text-white p-2 [&>li]:cursor-pointer w-full [&>li]:pl-6 [&>li]:py-2 mt-4"><BusinessCenterIcon className="mr-2" />project information
              <li>Ganeral Informaiton</li>
              <li>Member</li>
              <li>Position</li>
            </ul>
            <ul className="text-white   [&>li]:pl-6 [&>li]:py-2 cursor-pointer mt-4">
              <div onClick={()=>{}}><AccountTreeIcon className="mr-2" /> Board List</div>
              {projects.map((item, index) => {
                return (
                  <li key={index} onClick={() => { setProject(item) }}>  {item.projectName}</li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center h-full">
          <div className="bg-[black] w-6 h-6 rounded-full flex items-center justify-center   bg-opacity-60 backdrop-blur-30 cursor-pointer absolute"
            onClick={() => { setIsActiveBoard(!isActiveBoard) }}
          >
            {!isActiveBoard ? <ArrowRightIcon sx={{ color: "#ffffff" }} /> : <ArrowLeftIcon sx={{ color: "#ffffff" }} />}
          </div>
        </div>
      </div>
      <div className={`${isActiveBoard? " w-[calc(100%-208px)]":" w-[calc(100%-4px)]"}`}>
        {project.id == 0 ? null :
          (<>
            <NavBoard projectId={project.id} projectName={project.projectName} />
            <ColumnSpace idSpace={project.id} nameSpace={project.projectName} />
          </>
          )}
      </div>
    </div>
  );
}

export default Board;
<h1>Khong gian lam viec</h1>;
