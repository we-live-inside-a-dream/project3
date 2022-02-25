import React from "react";
import { ManagerSettingsProvider } from "../context/ManagerSettingsProvider";
import { SocketProvider } from "../context/SocketProvider";
import AuthenticationProvider from "../../login/AuthenticationProvider";
const Providers = ({ children }) => {
  return (
    <AuthenticationProvider>
      <SocketProvider>
        <ManagerSettingsProvider>{children}</ManagerSettingsProvider>
      </SocketProvider>
    </AuthenticationProvider>
  );
};

export default Providers;
