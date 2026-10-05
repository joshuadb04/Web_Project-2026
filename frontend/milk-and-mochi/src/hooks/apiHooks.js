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

  const postRegister = async (user) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    return await fetchData(
      import.meta.env.VITE_API_URL + "/users",
      fetchOptions,
    );
  };

  return { postLogin, postRegister };
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

  const postMenuItem = async (item, token) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    };

    return await fetchData(
      import.meta.env.VITE_API_URL + "/menu",
      fetchOptions,
    );
  };

  const deleteMenuItem = async (id, token) => {
    const fetchOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return await fetchData(
      import.meta.env.VITE_API_URL + "/menu/" + id,
      fetchOptions,
    );
  };

  return { getMenu, putMenuItem, deleteMenuItem, postMenuItem };
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

  const putUser = async (id, user, token) => {
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };

    return await fetchData(
      import.meta.env.VITE_API_URL + "/users/" + id,
      fetchOptions,
    );
  };

  const putPassword = async (currentPassword, newPassword, token) => {
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    };

    return await fetchData(
      import.meta.env.VITE_API_URL + "/users/password",
      fetchOptions,
    );
  };

  const putProfilePicture = async (id, file, token) => {
    const formData = new FormData();
    formData.append("profile", file);

    const fetchOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    return await fetchData(
      import.meta.env.VITE_API_URL + "/users/" + id + "/profile-picture",
      fetchOptions,
    );
  };

  return { getUserByToken, putUser, putPassword, putProfilePicture };
};

const useTransport = () => {
  const getNearbyStops = async () => {
    const query = {
      query: `
    {
      stopsByBbox(
        minLat: 60.170
        maxLat: 60.173
        minLon: 24.939
        maxLon: 24.944
      ) {
        gtfsId
        name
        lat
        lon
        stoptimesForPatterns(numberOfDepartures: 5) {
          stoptimes {
            trip {
              route {
                shortName
                mode
                type
              }
            }
          }
        }
      }
    }
  `,
    };

    const response = await fetch(
      "https://api.digitransit.fi/routing/v2/hsl/gtfs/v1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "digitransit-subscription-key": import.meta.env
            .VITE_DIGITRANSIT_API_KEY,
        },
        body: JSON.stringify(query),
      },
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch nearby stops");
    }

    return json.data.stopsByBbox;
  };

  return { getNearbyStops };
};

const useOrder = () => {
  const postOrder = async (order) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };

    return await fetchData(
      import.meta.env.VITE_API_URL + "/orders",
      fetchOptions,
    );
  };

  const postOrderItem = async (orderItem) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderItem),
    };

    return await fetchData(
      import.meta.env.VITE_API_URL + "/order-items",
      fetchOptions,
    );
  };

  const getOrders = async () => {
    return await fetchData(import.meta.env.VITE_API_URL + "/orders");
  };

  const putOrder = async (id, order, token) => {
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(order),
    };

    return await fetchData(
      import.meta.env.VITE_API_URL + "/orders/" + id,
      fetchOptions,
    );
  };

  return { postOrder, postOrderItem, getOrders, putOrder };
};

export { useAuthentication, useMenu, useUser, useTransport, useOrder };
