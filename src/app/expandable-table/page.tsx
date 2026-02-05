import ChatGptDataTableDemoPage from "@/app/expandable-table/chatgpt-expd.table";
import ChatGptCustomFeaturesDataTableDemoPage from "@/app/expandable-table/chatgpt-expd-custom-feature.table";
import ClaudesDataTableDemo from "@/app/expandable-table/claude-expd.table";
import ClaudeDataTableDemo2 from "@/app/expandable-table/claude-expd2.table";
import Claude3DataTableDemo from "@/app/expandable-table/claudeDataTableDemo3WithCustomFeature";

export default function ExpandableTablePage() {
  return (
    <div className="container mx-auto px-4 pt-4">
      <Claude3DataTableDemo />
      <ClaudeDataTableDemo2 />
      <ChatGptCustomFeaturesDataTableDemoPage />
      <ChatGptDataTableDemoPage />
      <ClaudesDataTableDemo />
    </div>
  );
}
