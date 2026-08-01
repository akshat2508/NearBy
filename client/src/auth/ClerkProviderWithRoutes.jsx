import { ClerkProvider } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  // eslint-disable-next-line no-console
  console.warn("Missing VITE_CLERK_PUBLISHABLE_KEY — Clerk will not initialize correctly.");
}

export default function ClerkProviderWithRoutes({ children }) {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      navigate={(to) => navigate(to)}
    >
      {children}
    </ClerkProvider>
  );
}
