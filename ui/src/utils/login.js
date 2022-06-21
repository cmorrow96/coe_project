import jwtDecode from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token || !token.accessToken || !token.refreshToken) return true;

  const accessToken = jwtDecode(token.accessToken);
  const currentTime = new Date().getTime() / 1000;

  if (currentTime < accessToken.exp) return false;

  const refreshToken = jwtDecode(token.refreshToken);

  if (currentTime < refreshToken.exp) return false;

  return true;
};

// const isAdminUser = (accessToken) => {
//   if (typeof accessToken !== "string" || !accessToken) return false;

//   const { user_role_id } = jwtDecode(accessToken);

//   return user_role_id === 1;
// };

const getUsername = (accessToken) => {
  if (typeof accessToken !== "string" || !accessToken) return false;

  const { username } = jwtDecode(accessToken);

  return username;
};

const getUserID = (accessToken) => {
  if (typeof accessToken !== "string" || !accessToken) return false;

  const { sub } = jwtDecode(accessToken);

  return sub;
};

const LoginUtils = {
  isTokenExpired,
//   isAdminUser,
  getUsername,
  getUserID,
};

export default LoginUtils;
