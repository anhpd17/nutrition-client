import { ElNotification } from "element-plus";

export const checkPermissionAdmin = () => {
    let roleIDUser = JSON.parse(localStorage.getItem("userInfo")).roleId;
    if (roleIDUser != 1) {
        ElNotification({
            title: "Notice",
            message: "You are not allowed to access this",
            duration: 3000,
            type: "error",
            position: "bottom-right",
        });
        return false;
    }
    return true;
};

export const isAdminRole = () => {
    let roleIDUser = JSON.parse(localStorage.getItem("userInfo")).roleId;
    return roleIDUser == 1;
};
