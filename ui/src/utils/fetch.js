import fetchIntercept from "fetch-intercept";
import { LoginService, TokenService } from "../services";
import LoginUtils from "./login";

const configureUrl = (url) => ` http://localhost:3001/${url}`;

fetchIntercept.register({
  request: function (url, config) {
    const token = TokenService.getAuth();
    if (token && !LoginUtils.isTokenExpired(token)) {
      config = {
        ...config,
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "content-type": "application/json",
        },
      };
    }

    return [url, config];
  },
  response: function (response) {
    if (response.status === 401) {
      const token = TokenService.getAuth();
      if (!LoginUtils.isTokenExpired(token)) {
        LoginService.refresh(token.refreshToken).then((accessToken) => {
          TokenService.setAuth({ ...token, accessToken });
        });
      }
      return Promise.reject(response.error);
    }
    return response;
  },
});

const fetchInstance = async (url, ...params) => {
  return await fetch(configureUrl(url), ...params);
};

export default fetchInstance;
