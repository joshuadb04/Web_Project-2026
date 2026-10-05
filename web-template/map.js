const shop = {
  name: "Mochi & Milk - Helsinki",
  address: "Kaivokatu 1, 00100 Helsinki",
  location: {
    coordinates: [24.9414, 60.1719],
  },
};

const coordinates = shop.location.coordinates;
const longitude = coordinates[0];
const latitude = coordinates[1];


navigator.geolocation.getCurrentPosition(
  (position) => {
    const x1 = position.coords.longitude;
    const y1 = position.coords.latitude;
    
    const x2 = longitude;
    const y2 = latitude;

    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const distanceInKilometres = distance * 111;

    const result = document.querySelector("#distance");
    result.innerHTML = `You are about ${distanceInKilometres.toFixed(1)} km from the shop.`;
  },
);


const map = L.map("map").setView([latitude, longitude], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const marker = L.marker([latitude, longitude]).addTo(map);

marker.bindPopup(`
  <h3>${shop.name}</h3>
  <p>${shop.address}</p>
`);