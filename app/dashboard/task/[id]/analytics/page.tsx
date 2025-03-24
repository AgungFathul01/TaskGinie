"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  BarChart3,
  Brain,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  HelpCircle,
  Lightbulb,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"

// Sample task data
const taskData = {
  id: 5,
  title: "Research Paper on Climate Change",
  description:
    "Write a 10-page research paper on the effects of climate change on marine ecosystems. Include at least 8 academic sources and follow APA formatting guidelines.",
  subject: "Environmental Science",
  dueDate: "2025-03-25",
  priority: "high",
  progress: 50,
  estimatedTime: "8 hours",
  subtasks: [
    { id: 1, title: "Research academic sources", completed: true, estimatedTime: "2 hours", assignedTo: 1 },
    { id: 2, title: "Create outline", completed: true, estimatedTime: "1 hour", assignedTo: 2 },
    { id: 3, title: "Write introduction", completed: true, estimatedTime: "1 hour", assignedTo: 1 },
    { id: 4, title: "Write main body sections", completed: false, estimatedTime: "3 hours", assignedTo: 3 },
    { id: 5, title: "Write conclusion", completed: false, estimatedTime: "30 minutes", assignedTo: 1 },
    { id: 6, title: "Format references", completed: false, estimatedTime: "30 minutes", assignedTo: null },
  ],
  collaborators: [
    {
      id: 1,
      name: "Agung Fathul",
      email: "agungfathul14@upi.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "owner",
      progress: 75,
      timeSpent: 3.5,
      lastActive: "2025-03-23T14:30:00",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "collaborator",
      progress: 100,
      timeSpent: 1.2,
      lastActive: "2025-03-22T09:15:00",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "m.chen@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "collaborator",
      progress: 20,
      timeSpent: 0.8,
      lastActive: "2025-03-23T11:45:00",
    },
  ],
  analytics: {
    overallProgress: 50,
    totalSubtasks: 6,
    completedSubtasks: 3,
    totalTimeSpent: 5.5,
    estimatedCompletion: "Mar 24",
    timeDistribution: [
      { name: "Research", value: 35 },
      { name: "Writing", value: 45 },
      { name: "Editing", value: 15 },
      { name: "Formatting", value: 5 },
    ],
    dailyProgress: [
      { date: "Mar 19", progress: 10 },
      { date: "Mar 20", progress: 25 },
      { date: "Mar 21", progress: 30 },
      { date: "Mar 22", progress: 40 },
      { date: "Mar 23", progress: 50 },
    ],
    aiInsights: {
      progressOverview:
        "The project is progressing at a moderate pace. You've completed 50% of subtasks, which is slightly behind the expected timeline.",
      alert: "The 'Format references' subtask is approaching its deadline and hasn't been assigned yet.",
      teamPerformance:
        "Team collaboration is good, with active participation from most members. Sarah has completed all her assigned tasks.",
      teamInsights: [
        "Agung has completed the most subtasks and spent the most time on the project.",
        "Sarah is making excellent progress on her assigned subtask.",
        "Michael has recently joined and is still getting up to speed with his assigned section.",
      ],
      recommendations: [
        "Consider assigning the 'Format references' subtask to ensure it's completed on time.",
        "Schedule a quick team sync to align on the remaining work.",
        "Focus on completing the 'Write main body sections' subtask next as it has the highest time estimate.",
      ],
      bottlenecks: [
        "The 'Write main body sections' subtask is taking longer than expected.",
        "There may be a need for additional research on specific topics.",
      ],
    },
  },
}

export default function TaskAnalyticsPage({ params }) {
  const router = useRouter()
  const { id } = params
  const { user } = useAuth()
  const [task, setTask] = useState(taskData)
  const [activeTab, setActiveTab] = useState("overview")

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hours ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} days ago`

    return formatDate(dateString)
  }

  // Check if user is owner
  const isOwner = task.collaborators.some((collab) => collab.id === user?.id && collab.role === "owner")

  return (
    <div className="w-full p-4 sm:p-8 max-w-[1600px] mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <Link href={`/dashboard/task/${id}`}>
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{task.title}</h1>
            <p className="text-sm text-muted-foreground">Task Analytics & Insights</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {!isOwner && (
        <Alert className="mb-6">
          <HelpCircle className="h-4 w-4" />
          <AlertTitle>Limited Analytics View</AlertTitle>
          <AlertDescription>
            You're viewing analytics as a collaborator. Some detailed analytics are only available to the task owner.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contributors">Contributors</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Task Progress
                  </CardTitle>
                  <CardDescription>Overall completion status and metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">Overall Progress</h3>
                      <span className="text-sm">{task.analytics.overallProgress}%</span>
                    </div>
                    <Progress value={task.analytics.overallProgress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">{task.analytics.totalSubtasks}</div>
                      <div className="text-xs text-muted-foreground">Total Subtasks</div>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">{task.analytics.completedSubtasks}</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">{task.analytics.totalTimeSpent}</div>
                      <div className="text-xs text-muted-foreground">Hours Spent</div>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">{task.analytics.estimatedCompletion}</div>
                      <div className="text-xs text-muted-foreground">Est. Completion</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Daily Progress</h3>
                    <div className="h-[200px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                      <div className="text-sm text-muted-foreground">Progress chart visualization</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Subtasks Status
                  </CardTitle>
                  <CardDescription>Progress of individual subtasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {task.subtasks.map((subtask) => {
                      const assignee = task.collaborators.find((c) => c.id === subtask.assignedTo)
                      return (
                        <div key={subtask.id} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {subtask.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                              )}
                              <span className={subtask.completed ? "line-through text-muted-foreground" : ""}>
                                {subtask.title}
                              </span>
                            </div>
                            <Badge variant="outline">{subtask.estimatedTime}</Badge>
                          </div>
                          {assignee ? (
                            <div className="flex items-center gap-2 mt-2">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={assignee.avatar} alt={assignee.name} />
                                <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">Assigned to {assignee.name}</span>
                              {assignee.lastActive && (
                                <span className="text-xs text-muted-foreground">
                                  • Last active {formatTimeAgo(assignee.lastActive)}
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="text-xs text-amber-500 mt-2">Not assigned</div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Start Date</span>
                      <span className="text-sm font-medium">Mar 19, 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Due Date</span>
                      <span className="text-sm font-medium">{formatDate(task.dueDate)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Days Remaining</span>
                      <span className="text-sm font-medium">2 days</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Estimated Completion</span>
                      <span className="text-sm font-medium">{task.analytics.estimatedCompletion}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Time Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-muted/30 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-sm text-muted-foreground">Time distribution chart</div>
                  </div>
                  <div className="space-y-2">
                    {task.analytics.timeDistribution.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full bg-primary opacity-${(index + 5) * 20}`}></div>
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Quick Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <p className="text-sm">{task.analytics.aiInsights.progressOverview}</p>
                    </div>
                    <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 p-3">
                      <p className="text-sm text-amber-800 dark:text-amber-400">{task.analytics.aiInsights.alert}</p>
                    </div>
                    <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-3">
                      <p className="text-sm text-green-800 dark:text-green-400">
                        Sarah has completed all her assigned tasks ahead of schedule.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Contributors Tab */}
        <TabsContent value="contributors" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              {task.collaborators.map((collaborator) => (
                <Card key={collaborator.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                          <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{collaborator.name}</CardTitle>
                          <CardDescription>{collaborator.email}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={collaborator.role === "owner" ? "default" : "secondary"}>
                        {collaborator.role.charAt(0).toUpperCase() + collaborator.role.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Progress on Assigned Tasks</h3>
                        <span className="text-sm">{collaborator.progress}%</span>
                      </div>
                      <Progress value={collaborator.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border p-3 text-center">
                        <div className="text-2xl font-bold">{collaborator.timeSpent}</div>
                        <div className="text-xs text-muted-foreground">Hours Spent</div>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <div className="text-2xl font-bold">
                          {task.subtasks.filter((s) => s.assignedTo === collaborator.id).length}
                        </div>
                        <div className="text-xs text-muted-foreground">Assigned Subtasks</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Assigned Subtasks</h3>
                      <div className="space-y-2">
                        {task.subtasks
                          .filter((subtask) => subtask.assignedTo === collaborator.id)
                          .map((subtask) => (
                            <div key={subtask.id} className="flex items-center justify-between rounded-lg border p-2">
                              <div className="flex items-center gap-2">
                                {subtask.completed ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                                )}
                                <span className={subtask.completed ? "line-through text-muted-foreground" : ""}>
                                  {subtask.title}
                                </span>
                              </div>
                              <Badge variant="outline">{subtask.estimatedTime}</Badge>
                            </div>
                          ))}
                      </div>
                    </div>

                    {collaborator.lastActive && (
                      <div className="text-sm text-muted-foreground">
                        Last active: {formatTimeAgo(collaborator.lastActive)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Team Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Contribution Distribution</h3>
                      <div className="h-[200px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                        <div className="text-sm text-muted-foreground">Contribution chart</div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">Team Performance</h3>
                      <p className="text-sm text-muted-foreground mb-4">{task.analytics.aiInsights.teamPerformance}</p>

                      <div className="space-y-2">
                        {task.analytics.aiInsights.teamInsights.map((insight, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                            </div>
                            <p className="text-sm">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {task.analytics.aiInsights.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-2 rounded-lg border p-3">
                        <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
                        <p className="text-sm">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Comprehensive Analysis
                  </CardTitle>
                  <CardDescription>AI-generated insights based on task progress and team performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Progress Analysis</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>{task.analytics.aiInsights.progressOverview}</p>
                          <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 p-3">
                            <p className="text-amber-800 dark:text-amber-400">{task.analytics.aiInsights.alert}</p>
                          </div>
                          <p>
                            Based on the current progress rate and team velocity, the task is expected to be completed
                            by {task.analytics.estimatedCompletion}. This is 1 day before the due date, providing a
                            small buffer for final reviews.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Team Performance</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>{task.analytics.aiInsights.teamPerformance}</p>
                          <ul className="space-y-2 list-disc pl-5">
                            {task.analytics.aiInsights.teamInsights.map((insight, index) => (
                              <li key={index}>{insight}</li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Bottlenecks & Challenges</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>The AI has identified the following potential bottlenecks in your task progress:</p>
                          <ul className="space-y-2 list-disc pl-5">
                            {task.analytics.aiInsights.bottlenecks.map((bottleneck, index) => (
                              <li key={index}>{bottleneck}</li>
                            ))}
                          </ul>
                          <p>
                            Addressing these bottlenecks promptly could help accelerate progress and ensure on-time
                            completion of the task.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Recommendations</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>
                            Based on the analysis, here are personalized recommendations to improve task completion:
                          </p>
                          <div className="space-y-3">
                            {task.analytics.aiInsights.recommendations.map((recommendation, index) => (
                              <div key={index} className="flex items-start gap-2 rounded-lg border p-3">
                                <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
                                <p>{recommendation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Predictive Analytics
                  </CardTitle>
                  <CardDescription>AI predictions based on current progress and historical data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Completion Probability</h3>
                      <div className="h-[200px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                        <div className="text-sm text-muted-foreground">Completion probability chart</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border p-4">
                        <h4 className="text-sm font-medium mb-2">Estimated Completion</h4>
                        <div className="text-2xl font-bold">{task.analytics.estimatedCompletion}</div>
                        <p className="text-xs text-muted-foreground mt-1">1 day before deadline</p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h4 className="text-sm font-medium mb-2">Completion Probability</h4>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground mt-1">Based on current progress</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Risk Factors</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                            <span>Unassigned subtask</span>
                          </div>
                          <Badge variant="outline">High Risk</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                            <span>Main body section progress</span>
                          </div>
                          <Badge variant="outline">Medium Risk</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span>Team collaboration</span>
                          </div>
                          <Badge variant="outline">Low Risk</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-primary/10 p-4">
                      <h3 className="font-medium mb-2">Progress Summary</h3>
                      <p className="text-sm">
                        Task is 50% complete with 3 of 6 subtasks finished. Current pace suggests completion 1 day
                        before the deadline.
                      </p>
                    </div>

                    <div className="rounded-lg bg-primary/10 p-4">
                      <h3 className="font-medium mb-2">Team Dynamics</h3>
                      <p className="text-sm">
                        Sarah has completed her assigned task ahead of schedule. Michael may need additional support
                        with his section.
                      </p>
                    </div>

                    <div className="rounded-lg bg-primary/10 p-4">
                      <h3 className="font-medium mb-2">Critical Path</h3>
                      <p className="text-sm">
                        The "Write main body sections" subtask is on the critical path and requires immediate attention
                        to maintain schedule.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm mb-4">Ask the AI assistant for specific insights about this task:</p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start text-left h-auto py-2">
                        How can we improve the current progress rate?
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-left h-auto py-2">
                        What are the main risks for this task?
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-left h-auto py-2">
                        How should we redistribute the workload?
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

