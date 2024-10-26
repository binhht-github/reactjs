let roles = ["NV", "GD", "admin"];

export var routers = [
  {
    path: "/user-manager",
    name: "Quản lý nhân sự",
    component: <UserManagement />,
    role: ["GD", "NV", "admin"],
    layout: "/admin",
  },
  {
    path: "/department-manager",
    name: "Quản lý bộ phận",
    component: <DepartmentManagement />,
    role: ["GD", "NV", "admin"],
    layout: "/admin",
  },
  {
    path: "/position-manager",
    name: "Quản lý Chức vụ",
    component: <Positionmanagerment />,
    role: ["GD", "NV", "admin"],
    layout: "/admin",
  },
  {
    path: "/timekeeping",
    name: "Quản lý chấm công",
    component: <TimekeepingManagement />,
    role: roles,
    layout: "NV",
  },
  {
    path: "/project-manager/*",
    name: "Quản lý dự án",
    component: <ProjectManagement />,
    role: roles,
    layout: "NV",
  },
  {
    path: "/calendar",
    name: "Lịch",
    component: <Mail />,
    role: roles,
    layout: "NV",
  },
  {
    path: "/mail",
    name: "Mail",
    component: <Mail />,
    role: roles,
    layout: "NV",
  },
];
// export default routers;
