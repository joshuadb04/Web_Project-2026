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

export { useAuthentication, useMenu, useUser, useTransport };
