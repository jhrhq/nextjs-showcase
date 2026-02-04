import ChatGptDataTableDemoPage from "@/app/expandable-table/chatgpt-expd.table";
import ChatGptCustomFeaturesDataTableDemoPage from "@/app/expandable-table/chatgpt-expd-custom-feature.table";
import ClaudesDataTableDemo from "@/app/expandable-table/claude-expd.table";

export default function ExpandableTablePage() {
  return (
    <div className="container mx-auto px-4 pt-4">
      <ChatGptCustomFeaturesDataTableDemoPage />
      <ChatGptDataTableDemoPage />
      <ClaudesDataTableDemo />
    </div>
  );
}
