"use client";

import React from "react";
import Toggle from "@/components/animation/toggle";

function ToggleRender() {
  const [isEnabled, setIsEnabled] = React.useState(false);

  return <Toggle value={isEnabled} onChange={setIsEnabled} />;
}

export default ToggleRender;
