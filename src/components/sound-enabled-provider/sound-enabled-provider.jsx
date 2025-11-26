"use client";
import React from "react";

const SoundEnabledContext = React.createContext();

function SoundEnabledProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  return (
    <SoundEnabledContext.Provider value={{ soundEnabled, setSoundEnabled }}>
      {children}
    </SoundEnabledContext.Provider>
  );
}

export function useSoundEnabled() {
  const context = React.useContext(SoundEnabledContext);

  if (!context) {
    throw new Error(
      "Cannot consume SoundEnabled context without a SoundEnabledProvider"
    );
  }

  return context;
}

export default SoundEnabledProvider;
