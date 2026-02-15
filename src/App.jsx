import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import HomeDetailsPage from "./pages/HomeDetailsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FavouritesPage from "./pages/FavouritesPage";
import BookingsPage from "./pages/BookingsPage";
import HostHomesPage from "./pages/HostHomesPage";
import HostHomeFormPage from "./pages/HostHomeFormPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomesListPage from "./pages/HomesListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="homes" element={<HomesListPage />} />
          <Route path="homes/:homeId" element={<HomeDetailsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route
            path="favourites"
            element={
              <ProtectedRoute>
                <FavouritesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="bookings"
            element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="host/host-home-list"
            element={
              <ProtectedRoute>
                <HostHomesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="host/host-add-home"
            element={
              <ProtectedRoute>
                <HostHomeFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="host/edit/:homeId"
            element={
              <ProtectedRoute>
                <HostHomeFormPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
