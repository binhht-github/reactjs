const API_VERSION = ''
export const API_BASE_URL = 'http://localhost:8080'
export const APP_BASE_URL2 = ''
export const baseUrl = API_BASE_URL + API_VERSION
export const ACCESS_TOKEN = 'accessToken';
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/'
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const timeout = 30000

export const APIs = {

    /** API USER */
    U_CURRENT: "/user/me",
    U_LOGIN: "/login",


    /**  API NHAN VIEN */

    N_ALL: "/nhan-vien/all",
    N_GETBYPROJECT: "/nhanviens/project",
    N_GETNOTPROJECT: "/nhanviens/project-add",
    N_CREATE: "/nhan-vien/create",
    N_UPDATE: "/repalce-nhanVien",
    N_DELETE: "/nhan-vien/delete",
    N_TOTAL: "/nhanviens/page-total",

    /** API Chuc Vu */
    CV_GETALL: "/chuc-vu/all",
    CV_CREATE: "/chuc-vu/create",
    CV_UPDATE: "/chuc-vu/update",

    /** API Phong Ban */
    PB_GETALL: "/phong-ban/all",
    PB_CREATE: "/phong-ban/create",
    PB_UPDATE: "phong-ban/update",
    PB_DELETE: "phong-ban/update",

    /** API PROJECT */
    P_GETBYPAGE: "/user/me",
    P_GETALLBYYUSER: "/project/all-by-user",
    P_GETALL: "/project/all",
    P_PAGESIZE: "/user/me",
    P_CREATE: "/project/create",
    P_ADDUSER: "/project/add-user",


    // API Column
    C_GETALLBYPROJECTID: "/column/project-id",
    C_CREATENEW: "/column/add-new",

    /** API CARD */
    C_GETALLBYCOLUMNID: "/card/column-id",
    C_CREATENEWCARD: "/card/create-new",

    /** API TASK */
    T_GETALLTASKBYTASKID: "/task/all-by-card",
    T_CREATENEWTASK: "/task/create-new",

    T_CREATENEWTASKWORK: "/task-work/create-new",
    T_GETALLTASKWORKBYTASKID: "/task-work/all-by-task",
    T_UPDATESTATUSTASKWORK: "/task-work/update-work",
    T_DELETETASKWORK: "/task-work/delete-work",

    ATW_GETBYTASK: "/active-work",


    F_UPLOAD: "/uploadFile",
    F_DOWNLOAD: "/downloadFile",
    IMG_UPLOAD: "/image-byte"
}
