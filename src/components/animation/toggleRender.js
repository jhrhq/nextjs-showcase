'use client';

import Toggle from '@/components/animation/toggle';
import React from 'react';

function ToggleRender() {
  const [isEnabled, setIsEnabled] = React.useState(false);

  return (
    <Toggle
      value={isEnabled}
      onChange={setIsEnabled}
    />

  )
}

export default ToggleRender