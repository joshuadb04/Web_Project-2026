import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTransport } from "../hooks/apiHooks.js";

const Location = () => {
  const shop = {
    name: "Mochi & Milk - Helsinki",
    address: "Kaivokatu 1, 00100 Helsinki",
    location: {
      coordinates: [24.9414, 60.171],
    },
  };

  const mapRef = useRef(null);
  const { getNearbyStops } = useTransport();
  const [nearbyStops, setNearbyStops] = useState([]);

  useEffect(() => {
    const coordinates = shop.location.coordinates;
    const longitude = coordinates[0];
    const latitude = coordinates[1];

    const map = L.map(mapRef.current).setView([latitude, longitude], 13);

    // const fetchStops = async () => {
    //   try {
    //     const stops = await getNearbyStops();
    //     console.log(stops);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };

    // fetchStops();

    const fetchStops = async () => {
      try {
        const stops = await getNearbyStops();
        setNearbyStops(stops.slice(0, 5));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchStops();

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    // Café pin
    const marker = L.marker([latitude, longitude]).addTo(map);

    marker.bindPopup(`
    <h3>${shop.name}</h3>
    <p>${shop.address}</p>
  `);

    let mapActive = true;

    navigator.geolocation.getCurrentPosition((position) => {
      if (!mapActive) {
        return;
      }

      const x1 = position.coords.longitude;
      const y1 = position.coords.latitude;

      const x2 = longitude;
      const y2 = latitude;

      const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const distanceInKilometres = distance * 111;

      const result = document.querySelector("#distance");
      result.innerHTML =
        "You are about " +
        distanceInKilometres.toFixed(1) +
        " km from the shop.";

      // User location pin
      L.circleMarker([y1, x1], {
        color: "#c94f70",
        radius: 8,
      }).addTo(map);
    });

    return () => {
      mapActive = false;
      map.remove();
    };
  }, []);

  return (
    <section id="locations" className="bg-[#fff8fb] px-10 py-17.5 text-center">
      {/* Map */}
      <p className="text-sm font-semibold tracking-[2px] text-[#d982a8]">
        FIND US
      </p>

      <h2 className="my-2.5 mb-4 text-[38px] font-semibold">
        Your Nearest Boba ♡
      </h2>

      <p className="mb-7.5">
        Looking for a little boba break? Here's our nearest café.
      </p>

      <div className="mx-auto flex max-w-250 overflow-hidden rounded-3xl border-2 border-[#f3dce6] bg-white shadow-[0_8px_25px_rgba(100,70,80,0.08)] max-[800px]:flex-col">
        <div
          ref={mapRef}
          id="map"
          aria-label="Map showing the café location"
          className="h-87.5 w-2/3 bg-[#dff1e8] max-[800px]:w-full"
        />

        <div className="flex-1 px-7.5 py-11.25 text-left max-[800px]:text-center">
          <h3 className="mb-5 text-[25px] text-[#d982a8]">Nearest Café</h3>

          <p className="mb-3.75 leading-relaxed">
            <strong>Mochi & Milk - City Center</strong>
          </p>

          <p className="mb-3.75 leading-relaxed">Kaivokatu 1, 00100 Helsinki</p>

          <p
            id="distance"
            role="status"
            className="min-h-12.5 text-[#66506f]"
          />
        </div>
      </div>

      {/* Nearby stops */}
      <div className="mx-auto mt-6 w-2/3 rounded-3xl border-2 border-[#f3dce6] bg-white p-7.5 shadow-[0_8px_25px_rgba(100,70,80,0.08)]">
        <h4 className="mb-4 text-xl font-semibold text-[#66506f]">
          Public transport near the café
        </h4>

        <div className="flex flex-col gap-2">
          {nearbyStops.map((stop) => {
            const route =
              stop.stoptimesForPatterns?.[0]?.stoptimes?.[0]?.trip?.route;

            return (
              <p
                key={stop.gtfsId}
                className="rounded border border-[#dddddd] bg-[#f5f5f5] p-2"
              >
                {`${stop.name}${route ? " - " + route.mode + " " + route.shortName : ""}`}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Location;
