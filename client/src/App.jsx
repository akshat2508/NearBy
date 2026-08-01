import AppRoutes from "@/routes/AppRoutes";
import { SocketProvider } from "@/context/SocketContext";
import { useSyncAuthToken } from "@/auth/useSyncAuthToken";

export default function App() {
  useSyncAuthToken();

  return (
    <SocketProvider>
      <AppRoutes />
    </SocketProvider>
  );
}
