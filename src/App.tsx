import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CreateFoodPage from "./pages/CreateFoodPage";
import ForbiddenPage from "./pages/ForbiddenPage";
import FoodListPage from "./pages/FoodListPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header>
          <Navbar />
        </header>

        <main className="flex-1 flex justify-center items-center z-20 overflow-clip">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/homepage"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createfood"
              element={
                <ProtectedRoute>
                  <CreateFoodPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/foodlist"
              element={
                <ProtectedRoute>
                  <FoodListPage />
                </ProtectedRoute>
              }
            />

            <Route path="/forbidden" element={<ForbiddenPage />} />
          </Routes>
        </main>

        <footer className="z-10">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
