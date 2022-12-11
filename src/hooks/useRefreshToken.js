import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const token = auth?.accessToken;

  const refresh = async () => {
    const response = await axios.post(
      "/auth/refreshToken",
      JSON.stringify({ token: token }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log("token" + token);
    console.log(response);
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      return { ...prev, accessToken: response.data.jwt };
    });
    return response.data.jwt;
  };

  return refresh;
}

export default useRefreshToken;
