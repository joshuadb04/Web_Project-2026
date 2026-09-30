import fetchData from "../utils/fetchData";

const useAuthentication = () => {
  const postLogin = async (credentials) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    };

    return await fetchData(
      import.meta.env.VITE_API_URL + "/users/login",
      fetchOptions,
    );
  };

  return { postLogin };
};

const useMenu = () => {
  const getMenu = async () => {
    return await fetchData(import.meta.env.VITE_API_URL + "/menu");
  };

  return { getMenu };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return await fetchData(
      import.meta.env.VITE_API_URL + "/users/token",
      fetchOptions,
    );
  };

  return { getUserByToken };
};

export { useAuthentication, useMenu, useUser };
