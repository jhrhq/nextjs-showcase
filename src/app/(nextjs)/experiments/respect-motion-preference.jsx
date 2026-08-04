"use client";
import { MotionConfig } from "motion/react";

function RespectMotionPreference({ childrend }) {
  return <MotionConfig reducedMotion="user">{childrend}</MotionConfig>;
}

export default RespectMotionPreference;
