import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state) => state.user.isLoggedIn,
  wrapperDisplayName: "UserIsAuthenticated",
  redirectPath: "/login",
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  // Want to redirect the user when they are authenticated
  authenticatedSelector: (state) => !state.user.isLoggedIn,
  wrapperDisplayName: "UserIsNotAuthenticated",

  // Chỉnh lại route cho trường hợp chạy đường dẫn login trong trạng thái đã đăng nhập
  redirectPath: (state, ownProps) => {
    const roleId = state.user?.userInfo?.roleId;
    if (roleId === "R1") return "/system/user-manage";
    if (roleId === "R2") return "/doctor/manage-schedule";
    return "/home";
  },

  allowRedirectBack: false,
});
