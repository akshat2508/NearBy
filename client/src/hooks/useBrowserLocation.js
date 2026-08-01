import { useCallback, useState } from "react";

// Thin wrapper around the browser Geolocation API — the discovery
// feature never touches navigator.geolocation directly, this hook is
// the one place that does.
export function useBrowserLocation() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const requestLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = new Error("Geolocation isn't supported on this device");
        setStatus("error");
        setError(err);
        reject(err);
        return;
      }

      setStatus("loading");
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("success");
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (geoError) => {
          setStatus("error");
          setError(geoError);
          reject(geoError);
        },
        { enableHighAccuracy: true, timeout: 10_000 }
      );
    });
  }, []);

  return { status, error, requestLocation };
}
