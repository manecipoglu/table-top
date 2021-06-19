import "./App.css";
import { Routes, Route } from "react-router-dom";

import TopSlider from "./components/TopSlider/TopSlider";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Navigation from "./components/Navigation/Navigation";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import AgeGate from "./components/AgeGate/AgeGate";
import { useUser } from "./state/userContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function App() {
  const { userAge } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userAge === "legal") navigate("/home");
  }, [userAge, navigate]);

  return (
    <div>
      <TopSlider
        text="28 gram bags"
        darkened={userAge !== "legal" ? "darkened" : ""}
      />
      <main>
        {userAge === "legal" ? (
          <>
            <Navigation />
            <SocialMedia />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </>
        ) : (
          <AgeGate />
        )}
      </main>
    </div>
  );
}
