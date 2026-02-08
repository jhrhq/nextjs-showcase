import AnchorManagerPage from "@/app/expandable-table/anchor-mananer/experiment-claude";
import AnchorManagerPageOne from "@/app/expandable-table/anchor-mananer/experiment-one";
import AnchorManagerPageThree from "@/app/expandable-table/anchor-mananer/experiment-three";
import ChatGptDataTableDemoPage from "@/app/expandable-table/chatgpt-expd.table";
import ChatGptCustomFeaturesDataTableDemoPage from "@/app/expandable-table/chatgpt-expd-custom-feature.table";
import Claude3DataTableDemo from "@/app/expandable-table/claude/cutom-feature/claudeDataTableDemo3WithCustomFeature";
import ClaudesDataTableDemo from "@/app/expandable-table/claude-expd.table";
import ClaudeDataTableDemo2 from "@/app/expandable-table/claude-expd2.table";

export default function ExpandableTablePage() {
  return (
    <div className="container mx-auto px-4 pt-4">
      <AnchorManagerPage />
      <AnchorManagerPageThree />
      <AnchorManagerPageOne />
      <Claude3DataTableDemo />
      <ClaudeDataTableDemo2 />
      <ChatGptCustomFeaturesDataTableDemoPage />
      <ChatGptDataTableDemoPage />
      <ClaudesDataTableDemo />
    </div>
  );
}
