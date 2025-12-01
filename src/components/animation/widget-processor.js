'use client'

import VisuallyHidden from '@/components/visually-hidden';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { LayoutGroup, motion } from 'motion/react';

import './widgetProcess.css';

function WidgetProcessor({ widgets, processWidget }) {
  const unprocessedWidgets = widgets.filter(
    (widget) => widget.status === 'unprocessed'
  );
  const processedWidgets = widgets.filter(
    (widget) => widget.status === 'processed'
  );

  return (
    <LayoutGroup>
      <div className="wrapper">
        <div className="inbox">
          {unprocessedWidgets.map((widget) => {
            return (
              <motion.button
                layoutId={widget.id}
                key={widget.id}
                className="widget"
                onClick={() =>
                  processWidget(widget.id, 'processed')
                }
              />
            );
          })}
        </div>

        <div className="actions">
          <button
            onClick={() => {
              const widget = unprocessedWidgets.at(-1);
              if (widget) {
                processWidget(widget.id, 'processed');
              }
            }}
          >
            <VisuallyHidden>
              Process widget
            </VisuallyHidden>
            <ChevronDown />
          </button>
          <button
            onClick={() => {
              const widget = processedWidgets.at(0);
              if (widget) {
                processWidget(widget.id, 'unprocessed');
              }
            }}
          >
            <ChevronUp />
            <VisuallyHidden>
              Revert widget
            </VisuallyHidden>
          </button>
        </div>

        <div className="outbox">
          {processedWidgets.map((widget) => {
            return (
              <motion.button
                layoutId={widget.id}
                key={widget.id}
                className="widget"
                onClick={() =>
                  processWidget(widget.id, 'unprocessed')
                }
              />
            );
          })}
        </div>
      </div>
    </LayoutGroup>
  )
}

export default WidgetProcessor