// src/app/(spa)/linker/(dashboard)/projects/[id]/anchor-manager/page.tsx

"use client";

import { AlertCircle, Download, ExternalLink, Filter, Link2, Search, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { mockAnchorData } from "@/app/expandable-table/anchor-mananer/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import { useAnchorManager, useProjects } from "@/hooks/linker/use-projects";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function AnchorManagerPage() {
  /*   const params = useParams();
  const projectId = params.id as string;
 */
  /*   const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: anchorData, isLoading: anchorLoading } = useAnchorManager(projectId);
 */

  const anchorData = mockAnchorData;
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // const project = projects?.find((p) => p.id === projectId);

  /* if (projectsLoading || anchorLoading) {
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

  if (!anchorData) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-600">No anchor data available</p>
      </div>
    );
  } */

  const getAnchorTypeColor = (type: string) => {
    switch (type) {
      case "exact":
        return "bg-blue-600";
      case "partial":
        return "bg-green-600";
      case "branded":
        return "bg-purple-600";
      case "generic":
        return "bg-yellow-600";
      case "naked":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  const getAnchorTypeVariant = (type: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case "exact":
        return "default";
      case "partial":
        return "secondary";
      case "branded":
        return "outline";
      default:
        return "secondary";
    }
  };

  const filteredAnchors = mockAnchorData.anchors.filter((anchor) => {
    const matchesSearch =
      anchor.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anchor.targetUrl.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || anchor.type === filterType;
    const matchesStatus = filterStatus === "all" || anchor.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Anchor Manager</h1>
        {/* <p className="text-gray-600 mt-1">Manage and optimize anchor text distribution for {project.name}</p> */}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              Total Anchors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{anchorData.totalAnchors.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Across all pages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              Unique Anchors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{anchorData.uniqueAnchors.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Different anchor texts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              External Anchors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{anchorData.externalAnchors.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {((anchorData.externalAnchors / anchorData.totalAnchors) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Optimization Score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{anchorData.optimizationScore}</div>
            <Badge variant="default" className="mt-2">
              {anchorData.optimizationScore >= 80
                ? "Excellent"
                : anchorData.optimizationScore >= 60
                  ? "Good"
                  : "Needs Work"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Anchor Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Anchor Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Anchor Type Distribution</CardTitle>
            <CardDescription>Breakdown by anchor text type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={anchorData.typeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="count"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {anchorData.typeDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Keywords Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Keywords in Anchors</CardTitle>
            <CardDescription>Most frequently used keywords</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={anchorData.topKeywords}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="keyword" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Anchor Quality Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Anchor Quality Metrics</CardTitle>
          <CardDescription>Analysis of anchor text health and SEO impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Natural Anchors</span>
                <Badge variant="default">{anchorData.qualityMetrics.naturalAnchors}%</Badge>
              </div>
              <Progress value={anchorData.qualityMetrics.naturalAnchors} className="h-2" />
              <p className="text-xs text-gray-500">Good anchor text diversity</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Over-Optimization</span>
                <Badge variant={anchorData.qualityMetrics.overOptimization > 30 ? "destructive" : "secondary"}>
                  {anchorData.qualityMetrics.overOptimization}%
                </Badge>
              </div>
              <Progress value={anchorData.qualityMetrics.overOptimization} className="h-2" />
              <p className="text-xs text-gray-500">
                {anchorData.qualityMetrics.overOptimization > 30
                  ? "Reduce exact match anchors"
                  : "Healthy distribution"}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Branded Ratio</span>
                <Badge variant="outline">{anchorData.qualityMetrics.brandedRatio}%</Badge>
              </div>
              <Progress value={anchorData.qualityMetrics.brandedRatio} className="h-2" />
              <p className="text-xs text-gray-500">Good brand presence</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {anchorData.recommendations && anchorData.recommendations.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Optimization Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {anchorData.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Anchor Table with Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Anchor Text Details</CardTitle>
              <CardDescription>Complete list of all anchor texts and their properties</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search anchor text or URL..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-45">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Anchor Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="exact">Exact Match</SelectItem>
                <SelectItem value="partial">Partial Match</SelectItem>
                <SelectItem value="branded">Branded</SelectItem>
                <SelectItem value="generic">Generic</SelectItem>
                <SelectItem value="naked">Naked URL</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-45">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="broken">Broken</SelectItem>
                <SelectItem value="redirect">Redirect</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Anchor Text</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Target URL</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>DoFollow</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAnchors.map((anchor, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{anchor.text}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getAnchorTypeVariant(anchor.type)} className={getAnchorTypeColor(anchor.type)}>
                        {anchor.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <a
                        href={anchor.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate block"
                      >
                        {anchor.targetUrl}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{anchor.usage}x</Badge>
                    </TableCell>
                    <TableCell>
                      {anchor.doFollow ? (
                        <Badge variant="default" className="bg-green-600">
                          Yes
                        </Badge>
                      ) : (
                        <Badge variant="secondary">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          anchor.status === "active"
                            ? "default"
                            : anchor.status === "broken"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {anchor.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredAnchors.length} of {anchorData.anchors.length} anchors
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="diversity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="diversity">Diversity Analysis</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Comparison</TabsTrigger>
          <TabsTrigger value="patterns">Link Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="diversity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Anchor Text Diversity</CardTitle>
              <CardDescription>Analysis of anchor text variation and natural distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {anchorData.diversityAnalysis.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{item.current}%</span>
                        <Badge
                          variant={
                            item.status === "good" ? "default" : item.status === "warning" ? "secondary" : "destructive"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.current} className="h-2 flex-1" />
                      <span className="text-xs text-gray-500 w-20 text-right">Target: {item.target}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Anchor Analysis</CardTitle>
              <CardDescription>Compare your anchor profile with competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Your Site</TableHead>
                    <TableHead>Competitor Avg</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {anchorData.competitorComparison.map((comp, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{comp.metric}</TableCell>
                      <TableCell>{comp.yourValue}</TableCell>
                      <TableCell>{comp.competitorAvg}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            comp.status === "better"
                              ? "default"
                              : comp.status === "similar"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {comp.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Link Building Patterns</CardTitle>
              <CardDescription>Identify patterns in your anchor text usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {anchorData.linkPatterns.map((pattern, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{pattern.pattern}</h4>
                      <Badge variant="outline">{pattern.frequency}x</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{pattern.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Impact:</span>
                      <Badge
                        variant={
                          pattern.impact === "positive"
                            ? "default"
                            : pattern.impact === "neutral"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {pattern.impact}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
