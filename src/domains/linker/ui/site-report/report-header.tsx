"use client";
export default function ReportHeader({ projectName, generatedDate }: { projectName: string; generatedDate: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-200">Site Report</h1>
      <p className="text-zinc-600 dark:text-zinc-100 mt-1">Comprehensive SEO analysis for {projectName}</p>
      <p className="text-sm text-gray-500 dark:text-zinc-200 mt-1">
        Generated {new Date(generatedDate).toLocaleString()}
      </p>
    </div>
  );
}
