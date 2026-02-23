// import InternalLinkBuilderPage from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form";
// biome-ignore-all lint: <explanation of why you are ignoring this file>
// @ts-nocheck
// biome-ignore-all lint: ignoring for testing purposes
"use client";

import { useMutation } from "@tanstack/react-query";
import React, { useCallback } from "react";
import SentenceEditorV3 from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/editor-setup";
import SentenceEditor from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/SentenceEditorTiptap";
import { TargetUrlFormHandle } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form";
import SentenceEditorV4 from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/test-v4";
import SentenceEditorv2 from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/testv2";
import InboundTarget from "@/domains/linker/ui/inbound/inbound-target";
import { InboundTargetForm } from "@/domains/linker/ui/inbound/inbound-target/inbound-target-form";

export default function InboundsPage() {
  return (
    <div className="text-5xl text-slate-900">
      {/* <SentenceEditorV4 /> */}
      <InboundTarget />
    </div>
  );
}
