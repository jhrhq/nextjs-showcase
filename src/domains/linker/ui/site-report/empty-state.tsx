type EmptyStateProps = {
  message?: string;
};

export function EmptyState({ message = "Nothing to show" }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center h-96">
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
