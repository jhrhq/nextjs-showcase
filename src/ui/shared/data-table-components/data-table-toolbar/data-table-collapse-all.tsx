import { Button } from "@/components/ui/button";

interface DataTableExpansionProps {
  canCollapse?: boolean;
  onCollapse: () => void;
}

export function DataTableCollapseAll({ canCollapse, onCollapse }: DataTableExpansionProps) {
  if (!canCollapse) return null;

  return (
    <Button variant="outline" size="sm" onClick={onCollapse}>
      Collapse All
    </Button>
  );
}
