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

  const putMenuItem = async (id, item, token) => {
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    };

    return await fetchData(
      import.meta.env.VITE_API_URL + "/menu/" + id,
      fetchOptions,
    );
  };

  return { getMenu, putMenuItem };
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
