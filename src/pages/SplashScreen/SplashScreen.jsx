import React from "react";
import "./SplashScreen.css";
import AppLogo from "../../resources/logo.svg"; // Assuming .svg is the correct file extension

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="Logo-container">
        <img src={AppLogo} alt="App Logo" className="AppLogo" />
        <div className="text-container">
          <h3 className="firsttext">Clean Waste,Safeguarding Health</h3>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
