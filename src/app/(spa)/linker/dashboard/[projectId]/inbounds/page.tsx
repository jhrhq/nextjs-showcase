// import InternalLinkBuilderPage from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form";
import SentenceEditor from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/SentenceEditorTiptap";
import { InternalLinkBuilderPageOne } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/test";
/* import { InternalLinkBuilderPageOne } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/test";
 */
export default function InboundsPage() {
  return (
    <div className="text-5xl text-slate-900">
      <SentenceEditor />
      <InternalLinkBuilderPageOne />
      {/* <InternalLinkBuilderPage /> */}
    </div>
  );
}
