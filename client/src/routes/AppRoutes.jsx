import { Routes, Route } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import PrivateLayout from "@/components/layout/PrivateLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import LandingPage from "@/pages/LandingPage";
import DashboardPage from "@/pages/DashboardPage";
import DiscoverPage from "@/pages/DiscoverPage";
import FriendsPage from "@/pages/FriendsPage";
import ChatPage from "@/pages/ChatPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { ROUTES } from "@/constants/routes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.HOME} element={<LandingPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.DISCOVER} element={<DiscoverPage />} />
          <Route path={ROUTES.FRIENDS} element={<FriendsPage />} />
          <Route path={ROUTES.CHAT} element={<ChatPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
