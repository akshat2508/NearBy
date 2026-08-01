import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom dot markers instead of Leaflet's default pin — sidesteps the
// classic "marker icon missing" problem you get bundling Leaflet's
// image assets through Vite, and reads cleaner next to the neutral UI.
function dotIcon(color) {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:14px;height:14px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.15);"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

const SELF_ICON = dotIcon("#3454d1");
const OTHER_ICON = dotIcon("#22262e");

export default function NearbyMap({ center, users }) {
  return (
    <div className="h-72 overflow-hidden rounded-2xl border border-surface-200">
      <MapContainer center={[center.latitude, center.longitude]} zoom={13} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[center.latitude, center.longitude]} icon={SELF_ICON}>
          <Popup>You</Popup>
        </Marker>
        {users.map((user) => (
          <Marker key={user.id} position={[user.latitude, user.longitude]} icon={OTHER_ICON}>
            <Popup>
              {user.fullName} · {user.distanceKm} km
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
