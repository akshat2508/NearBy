import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPinned } from "lucide-react";
import L from "leaflet";

function dotIcon(color) {
  return L.divIcon({
    className: "",
    html: `
      <span
        style="
          display:flex;
          align-items:center;
          justify-content:center;
          width:18px;
          height:18px;
          border-radius:9999px;
          background:${color};
          border:3px solid white;
          box-shadow:0 4px 12px rgba(0,0,0,.18);
        "
      ></span>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

const SELF_ICON = dotIcon("#0F766E");
const OTHER_ICON = dotIcon("#10B981");

export default function NearbyMap({ center, users }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-100 px-6 py-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink-950">
            Nearby Map
          </h2>

          <p className="mt-1 text-sm text-ink-600">
            Explore people around your current location.
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <MapPinned size={20} />
        </div>
      </div>

      {/* Map */}
      <div className="h-[430px]">
        <MapContainer
          center={[center.latitude, center.longitude]}
          zoom={13}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={[center.latitude, center.longitude]}
            icon={SELF_ICON}
          >
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">You</p>
                <p className="text-sm text-gray-500">
                  Current location
                </p>
              </div>
            </Popup>
          </Marker>

          {users.map((user) => (
            <Marker
              key={user.id}
              position={[user.latitude, user.longitude]}
              icon={OTHER_ICON}
            >
              <Popup>
                <div className="space-y-1">
                  <p className="font-semibold">
                    {user.fullName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {user.distanceKm} km away
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}