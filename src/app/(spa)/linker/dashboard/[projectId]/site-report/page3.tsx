"use client";

import { AlertCircle, CheckCircle2, Loader2, Minus, TrendingDown, TrendingUp, XCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjects, useSiteReport } from "@/domains/linker/hooks/use-projects";

export default function SiteReportPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: report, isLoading: reportLoading } = useSiteReport(projectId);

  const project = projects?.find((p) => p.id === projectId);
  if (projectsLoading || reportLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-600">Project not found</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-600">No site report available</p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreVariant = (score: number): "default" | "secondary" | "destructive" => {
    if (score >= 90) return "default";
    if (score >= 70) return "secondary";
    return "destructive";
  };

  const getStatusIcon = (status: "pass" | "warning" | "fail") => {
    if (status === "pass") return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    if (status === "warning") return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Site Report</h1>
        <p className="text-gray-600 mt-1">Comprehensive analysis for {project.name}</p>
        <p className="text-sm text-gray-500 mt-1">Generated {new Date(report.generatedAt).toLocaleString()}</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{report.totalPages.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Indexed Pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{report.indexedPages.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {((report.indexedPages / report.totalPages) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg Load Time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{report.avgLoadTime}s</div>
            <div className="flex items-center mt-1">
              {report.avgLoadTime <= 2 ? (
                <TrendingDown className="h-4 w-4 text-green-600" />
              ) : report.avgLoadTime <= 3 ? (
                <Minus className="h-4 w-4 text-yellow-600" />
              ) : (
                <TrendingUp className="h-4 w-4 text-red-600" />
              )}
              <span className="text-xs text-gray-500 ml-1">
                {report.avgLoadTime <= 2 ? "Excellent" : report.avgLoadTime <= 3 ? "Good" : "Needs improvement"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>SEO Score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(report.seoScore)}`}>{report.seoScore}</div>
            <Badge variant={getScoreVariant(report.seoScore)} className="mt-2">
              {report.seoScore >= 90 ? "Excellent" : report.seoScore >= 70 ? "Good" : "Poor"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Performance Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Scores</CardTitle>
          <CardDescription>Device-specific performance metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Mobile Score</span>
                <Badge variant={getScoreVariant(report.mobileScore)}>{report.mobileScore}</Badge>
              </div>
              <span className={`text-sm font-semibold ${getScoreColor(report.mobileScore)}`}>
                {report.mobileScore}%
              </span>
            </div>
            <Progress value={report.mobileScore} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Desktop Score</span>
                <Badge variant={getScoreVariant(report.desktopScore)}>{report.desktopScore}</Badge>
              </div>
              <span className={`text-sm font-semibold ${getScoreColor(report.desktopScore)}`}>
                {report.desktopScore}%
              </span>
            </div>
            <Progress value={report.desktopScore} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">SEO Score</span>
                <Badge variant={getScoreVariant(report.seoScore)}>{report.seoScore}</Badge>
              </div>
              <span className={`text-sm font-semibold ${getScoreColor(report.seoScore)}`}>{report.seoScore}%</span>
            </div>
            <Progress value={report.seoScore} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics Tabs */}
      <Tabs defaultValue="technical" className="space-y-4">
        <TabsList>
          <TabsTrigger value="technical">Technical SEO</TabsTrigger>
          <TabsTrigger value="content">Content Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Technical SEO Tab */}
        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical SEO Audit</CardTitle>
              <CardDescription>Core web vitals and technical requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.technicalSeo.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.metric}</TableCell>
                      <TableCell>{getStatusIcon(item.status)}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell className="text-sm text-gray-600">{item.recommendation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Largest Contentful Paint</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">1.2s</div>
                <Badge variant="default" className="mt-2">
                  Good
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>First Input Delay</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">85ms</div>
                <Badge variant="default" className="mt-2">
                  Good
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Cumulative Layout Shift</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">0.15</div>
                <Badge variant="secondary" className="mt-2">
                  Needs Improvement
                </Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Analysis Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Quality Metrics</CardTitle>
              <CardDescription>Analysis of on-page content and optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {report.contentMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <Badge
                          variant={metric.score >= 80 ? "default" : metric.score >= 60 ? "secondary" : "destructive"}
                        >
                          {metric.score}%
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-600">{metric.count} pages</span>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Missing Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {report.missingElements.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-red-900">{item.element}</span>
                      <Badge variant="destructive">{item.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Duplicate Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {report.duplicateContent.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium text-yellow-900">{item.type}</span>
                      <Badge variant="secondary">{item.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Page Size</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{report.performance.avgPageSize}</div>
                <p className="text-xs text-gray-500 mt-1">Average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{report.performance.avgRequests}</div>
                <p className="text-xs text-gray-500 mt-1">Per page</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Time to Interactive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{report.performance.timeToInteractive}s</div>
                <Badge variant="default" className="mt-2">
                  Good
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Speed Index</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{report.performance.speedIndex}s</div>
                <Badge variant="default" className="mt-2">
                  Excellent
                </Badge>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resource Breakdown</CardTitle>
              <CardDescription>Analysis of page resources</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource Type</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Total Size</TableHead>
                    <TableHead>% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.performance.resources.map((resource, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{resource.type}</TableCell>
                      <TableCell>{resource.count}</TableCell>
                      <TableCell>{resource.size}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={resource.percentage} className="h-2 w-20" />
                          <span className="text-sm">{resource.percentage}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Audit</CardTitle>
              <CardDescription>Security headers and SSL configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Security Feature</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.security.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.feature}</TableCell>
                      <TableCell>{getStatusIcon(item.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{item.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {report.security.some((s) => s.status === "fail") && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Security Issues Detected</AlertTitle>
              <AlertDescription>
                Your site has critical security vulnerabilities that should be addressed immediately.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-green-200">
              <CardHeader className="pb-3">
                <CardDescription>SSL Certificate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <span className="font-semibold">Valid</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Expires in 89 days</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader className="pb-3">
                <CardDescription>HTTPS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <span className="font-semibold">Enabled</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">All pages secured</p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardHeader className="pb-3">
                <CardDescription>Mixed Content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                  <span className="font-semibold">3 Issues</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Needs attention</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Indexing Status */}
      <Card>
        <CardHeader>
          <CardTitle>Indexing Status</CardTitle>
          <CardDescription>Search engine indexing overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">Indexed Pages</p>
                <p className="text-2xl font-bold text-blue-600">{report.indexedPages.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">of {report.totalPages.toLocaleString()}</p>
                <p className="text-lg font-semibold text-blue-600">
                  {((report.indexedPages / report.totalPages) * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <Progress value={(report.indexedPages / report.totalPages) * 100} className="h-3" />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 border rounded-lg">
                <p className="text-xs text-gray-600">Not Indexed</p>
                <p className="text-xl font-bold text-gray-900">
                  {(report.totalPages - report.indexedPages).toLocaleString()}
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-xs text-gray-600">Coverage</p>
                <p className="text-xl font-bold text-gray-900">
                  {((report.indexedPages / report.totalPages) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
