// Main page (default export)

export { default } from "./InternalLinkBuilderPage";
// Individual components (for unit testing or reuse elsewhere)
export { LinkResultsAccordion } from "./LinkResultsAccordion";
export { LinkResultsTabs } from "./LinkResultsTabs";
export { OrphanPostSidebar } from "./OrphanPostSidebar";
export { SuggestedSentenceList } from "./SuggestedSentenceList";
export type { TargetUrlFormHandle } from "./TargetUrlForm";
export { TargetUrlForm } from "./TargetUrlForm";

// Domain types
export type { LinkResult, SidebarPage, SidebarPost, TargetUrlFormValues } from "./types";
