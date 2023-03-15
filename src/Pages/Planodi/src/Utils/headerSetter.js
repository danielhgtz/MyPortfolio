export const userHeaders = (post = true, token = undefined) => {
  const config = {
    headers: {},
  };
  if (post) {
    config.headers["Content-type"] = "application/json";
  }
  const sessionToken = localStorage.getItem("userToken");
  if (token) {
    config.headers["x-auth-token"] = token;
  } else if (sessionToken) {
    config.headers["x-auth-token"] = sessionToken;
  }
  return config;
};
