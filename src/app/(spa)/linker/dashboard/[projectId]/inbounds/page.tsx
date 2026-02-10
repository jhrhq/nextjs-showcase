// import InternalLinkBuilderPage from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form";
import SentenceEditor from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/SentenceEditorTiptap";
import { InternalLinkBuilderPageOne } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/test";
import { NotesManager } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/tiptap-editor-gpt-test";
/* import { InternalLinkBuilderPageOne } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/test";
 */
export default function InboundsPage() {
  return (
    <div className="text-5xl text-slate-900">
      <NotesManager />
      <SentenceEditor />
      <InternalLinkBuilderPageOne />
      {/* <InternalLinkBuilderPage /> */}
    </div>
  );
}
