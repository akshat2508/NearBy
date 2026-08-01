import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "@clerk/clerk-react";

const SocketContext = createContext(null);

// Owns exactly one socket.io connection for the whole app, alive only
// while signed in. Re-authenticates with a fresh Clerk token whenever
// sign-in state changes, and always cleans up the previous socket first.
export function SocketProvider({ children }) {
  const { isSignedIn, getToken } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!isSignedIn) {
      setSocket(null);
      return undefined;
    }

    let socketInstance;
    let cancelled = false;

    (async () => {
      const token = await getToken();
      if (cancelled) return;

      socketInstance = io(import.meta.env.VITE_SOCKET_URL, {
        auth: { token },
      });
      setSocket(socketInstance);
    })();

    return () => {
      cancelled = true;
      socketInstance?.disconnect();
    };
  }, [isSignedIn, getToken]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  return useContext(SocketContext);
}
