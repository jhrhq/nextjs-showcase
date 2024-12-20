const ErrorAlert = ({ message }) => {
  if (!message) return;

  return (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default ErrorAlert;
