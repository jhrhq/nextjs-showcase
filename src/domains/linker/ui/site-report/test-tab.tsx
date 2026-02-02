"use cliet";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SiteReport } from "@/domains/linker/types/site-report.types";

interface LinkReportTabProps {
  report: SiteReport;
}

const getStatusIcon = (status: "pass" | "warning" | "fail") => {
  if (status === "pass") return <CheckCircle2 className="h-4 w-4 text-green-600" />;
  if (status === "warning") return <AlertCircle className="h-4 w-4 text-yellow-600" />;
  return <XCircle className="h-4 w-4 text-red-600" />;
};

export default function LinkReportTab({ report }: LinkReportTabProps) {
  return (
    <div className="w-full bg-white overflow-hidden">
      <Tabs
        defaultValue="technical"
        className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex-none bg-white"
      >
        <TabsList className="border-b p-0 w-full rounded-none inline-block bg-white group-data-[orientation=horizontal]/tabs:h-fit space-x-2.5 ">
          <TabsTrigger value={"technical"}>Technical SEO</TabsTrigger>
          <TabsTrigger value={"content"}>Content Analysis</TabsTrigger>
          <TabsTrigger value={"performance"}> Performance</TabsTrigger>
          <TabsTrigger value={"security"}> Security</TabsTrigger>
        </TabsList>
        <TabsContent value="technical" className="p-6 space-y-4">
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
        <TabsContent value="content" className="space-y-4 p-6">
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
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50">
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
                    <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 ">
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
        <TabsContent value="performance" className="space-y-4 p-6">
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
        <TabsContent value="security" className="space-y-4 p-6">
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
    </div>
  );
}
