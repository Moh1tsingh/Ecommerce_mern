import { useCookies } from "react-cookie";

export const useGetTokens = () => {
  const [cookies, _] = useCookies(["access_token"]);

  return { headers: {authorization:cookies.access_token }};
};
