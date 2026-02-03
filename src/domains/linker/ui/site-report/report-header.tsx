export default function ReportHeader({ projectName, generatedDate }: { projectName: string; generatedDate: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Site Report</h1>
      <p className="text-slate-600 mt-1">Comprehensive SEO analysis for {projectName}</p>
      <p className="text-sm text-gray-500 mt-1">Generated {new Date(generatedDate).toLocaleString()}</p>
    </div>
  );
}
