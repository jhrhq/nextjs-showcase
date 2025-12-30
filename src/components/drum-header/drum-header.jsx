"use client";
import { Volume2, VolumeX } from "lucide-react";
import React from "react";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useSoundEnabled } from "@/components/sound-enabled-provider/sound-enabled-provider";
import VisuallyHidden from "@/components/visually-hidden";
import styles from "./DrumHeader.module.css";

function DrumHeader() {
  const _id = React.useId();

  const { soundEnabled, setSoundEnabled } = useSoundEnabled();
  return (
    <header className={styles.wrapper}>
      <MaxWidthWrapper className={styles.innerWrapper}>
        <a href="/">Kool Website</a>

        <button
          type="button"
          onClick={() => {
            setSoundEnabled(!soundEnabled);
          }}
        >
          {soundEnabled ? <Volume2 /> : <VolumeX />}
          <VisuallyHidden>
            {soundEnabled ? "Disable sound effects" : "Enable sound effects"}
          </VisuallyHidden>
        </button>
      </MaxWidthWrapper>
    </header>
  );
}

export default DrumHeader;
