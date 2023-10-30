import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { authAPI } from "api/aws-axios.config";
import * as qs from "qs";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const awsCode = searchParams.get("code");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const localStorageToken = localStorage.getItem("token");
      const localStorageRefreshToken = localStorage.getItem("refreshToken");
      let response;
      if (localStorageToken && localStorageRefreshToken) {
        const data = qs.stringify({
          grant_type: "refresh_token",
          client_id: "3a3ubhmdd830haol1mkb2bqe91",
          refresh_token: localStorageRefreshToken,
          redirect_uri: "https://tinyurl.com/ub5fe3ue",
        });

        response = await authAPI.post("/oauth2/token", data, {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
        });
      } else if (awsCode) {
        const data = qs.stringify({
          grant_type: "authorization_code",
          client_id: "3a3ubhmdd830haol1mkb2bqe91",
          code: awsCode,
          redirect_uri: "https://tinyurl.com/ub5fe3ue",
        });
        response = await authAPI.post("/oauth2/token", data, {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
        });
      }

      if (response && response.data && response.data.id_token) {
        const idToken = response.data.id_token;
        localStorage.setItem("token", idToken);
        if (response.data.refresh_token) {
          localStorage.setItem("refreshToken", response.data.refresh_token);
        }
        setIsLoggedIn(true);
      }
    })();
  }, [awsCode]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
