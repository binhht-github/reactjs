import Board from "./views/Board";
import Comment from "./views/Comment";
import Dashboard from "./views/Dashboard";
import Imgage from "./views/Imgage";
import Page from "./views/Page";
import Post from "./views/Post";

import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import SmsIcon from "@mui/icons-material/Sms";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon sx={{ color: "#ffffff" }} />,
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/post",
    name: "Post",
    icon: <NewspaperIcon sx={{ color: "#ffffff" }} />,
    component: <Post />,
    layout: "/admin",
  },
  {
    path: "/images",
    name: "Images",
    icon: <ImageIcon sx={{ color: "#ffffff" }} />,
    component: <Imgage />,
    layout: "/admin",
  },
  {
    path: "/page",
    name: "Page",
    icon: <DescriptionIcon sx={{ color: "#ffffff" }} />,
    component: <Page />,
    layout: "/admin",
  },
  {
    path: "/cmt",
    name: "Comment",
    icon: <SmsIcon sx={{ color: "#ffffff" }} />,
    component: <Comment />,
    layout: "/admin",
  },
  {
    path: "/board",
    name: "Khong Gian Lam Viec",
    icon: <CalendarMonthIcon sx={{ color: "#ffffff" }} />,
    component: <Board />,
    layout: "/admin",
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  // component: <Register />,
  //   layout: "/auth",
  // },
];
export default routes;
