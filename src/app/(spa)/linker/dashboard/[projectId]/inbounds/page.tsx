// import InternalLinkBuilderPage from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form";
// biome-ignore-all lint: <explanation of why you are ignoring this file>
// @ts-nocheck
// biome-ignore-all lint: ignoring for testing purposes
import SentenceEditorV3 from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/editor-setup";
import SentenceEditor from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/SentenceEditorTiptap";
import { InternalLinkBuilderPageOne } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/test";
import SentenceEditorv2 from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/testv2";
/* import { InternalLinkBuilderPageOne } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/test";
 */
export default function InboundsPage() {
  return (
    <div className="text-5xl text-slate-900">
      <SentenceEditorV3 />
      <SentenceEditorv2 />
      <SentenceEditor />
      <InternalLinkBuilderPageOne />
      {/* <InternalLinkBuilderPage /> */}
    </div>
  );
}
