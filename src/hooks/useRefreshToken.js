import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const token = JSON.stringify(auth.accessToken);

  const refresh = async () => {
    const response = await axios.post("/auth/refreshToken", {
      headers: { Authorization: "Bearer" + token },
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.jwt);
      return { ...prev, accessToken: response.data.jwt };
    });
    return response.data.jwt;
  };

  return refresh;
}

export default useRefreshToken;
