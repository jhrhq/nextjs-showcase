"use client";

import range from "lodash.range";
import React from "react";
import WidgetProcessor from "@/components/animation/widget-processor";

function WidgetProcessorRender() {
  const [widgets, setWidgets] = React.useState(() => {
    return range(8).map(() => {
      return {
        id: crypto.randomUUID(),
        status: "unprocessed",
      };
    });
  });

  function processWidget(id, status) {
    const nextWidgets = widgets.map((widget) => {
      if (widget.id !== id) {
        return widget;
      }
      return {
        id,
        status,
      };
    });

    setWidgets(nextWidgets);
  }

  return <WidgetProcessor widgets={widgets} processWidget={processWidget} />;
}

export default WidgetProcessorRender;
