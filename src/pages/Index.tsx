import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import SignalGenerator from "@/components/SignalGenerator";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <SignalGenerator />;
};

export default Index;
