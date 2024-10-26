import ProjectManagement from "./views/ProjectManagement";
import Messages from "./views/Messages";
import UserManagement from "./views/UserManagement";
import DepartmentsManagement from "./views/DepartmentsManagement";
import TimekeepingManagement from "./views/TimekeepingManagement";
import Mail from "./views/Mail";

import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import SmsIcon from "@mui/icons-material/Sms";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WidgetsIcon from '@mui/icons-material/Widgets';
import WorkIcon from '@mui/icons-material/Work';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import EmailIcon from '@mui/icons-material/Email';
import DepartmentManagement from "./views/DepartmentsManagement";
import FactoryIcon from '@mui/icons-material/Factory';
import GroupIcon from '@mui/icons-material/Group';
import Positionmanagerment from "./views/Positionmanagerment";
// var boardRoutes = [
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     icon: <HomeIcon sx={{ color: "#ffffff" }} />,
//   // component: (authen)=>{return(<Dashboard authenticated={authen}/>)} ,
//     component: <UserManagement />,
//     layout: "/admin",
//   },
//   {
//     path: "/post",
//     name: "Post",
//     icon: <NewspaperIcon sx={{ color: "#ffffff" }} />,
//     component: <DepartmentsManagement />,
//     layout: "/admin",
//   },
//   {
//     path: "/images",
//     name: "Images",
//     icon: <ImageIcon sx={{ color: "#ffffff" }} />,
//     component: <TimekeepingManagement />,
//     layout: "/admin",
//   },
//   {
//     path: "/page",
//     name: "Page",
//     icon: <DescriptionIcon sx={{ color: "#ffffff" }} />,
//     component: <Mail />,
//     layout: "/admin",
//   },
//   {
//     path: "/cmt",
//     name: "Comment",
//     icon: <SmsIcon sx={{ color: "#ffffff" }} />,
//     component: <Messages />,
//     layout: "/admin",
//   },
//   {
//     path: "/board",
//     name: "Khong Gian Lam Viec",
//     icon: <CalendarMonthIcon sx={{ color: "#ffffff" }} />,
//     component: <ProjectManagement />,
//     layout: "/admin",
//   },
//   // {
//   //   path: "/register",
//   //   name: "Register",
//   //   icon: "ni ni-circle-08 text-pink",
//   // component: <Register />,
//   //   layout: "/auth",
//   // },
// ];
// export default boardRoutes;

let roles= ["NV","GD","admin"]


export var routers =[
   {
    path: "/user-manager",
    name: "Quản lý nhân sự",
    icon: <ManageAccountsIcon sx={{ color: "#333" }} />,
    component: <UserManagement />,
    role:["GD","NV","admin"],
    layout: "/admin",
  },
  {
    path: "/department-manager",
    name: "Quản lý bộ phận",
    icon: <FactoryIcon sx={{ color: "#333" }} />,
    component: <DepartmentManagement />,
    role:["GD","NV","admin"],
    layout: "/admin",
  },
  {
    path: "/position-manager",
    name: "Quản lý Chức vụ",
    icon: <GroupIcon sx={{ color: "#333" }} />,
    component: <Positionmanagerment />,
    role:["GD","NV","admin"],
    layout: "/admin",
  },
  {
   path: "/timekeeping",
   name: "Quản lý chấm công",
   icon: <TouchAppIcon sx={{ color: "#333"}}  />,
   component: <TimekeepingManagement />,
   role:roles,
   layout: "NV",
 },
   {
    path: "/project-manager/*",
    name: "Quản lý dự án",
    icon: <WorkIcon sx={{ color: "#333" }} />,
    component: <ProjectManagement />,
    role:roles,
    layout: "NV",
  },
   {
    path: "/calendar",
    name: "Lịch",
    icon: <CalendarMonthIcon sx={{ color: "#333" }} />,
    component: <Mail />,
    role:roles,
    layout: "NV",
  },
   {
    path: "/mail",
    name: "Mail",
    icon: <EmailIcon sx={{ color: "#333" }} />,
    component: <Mail />,
    role:roles,
    layout: "NV",
  },

]
// export default routers;