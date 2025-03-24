import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Brain, BarChart, Award, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function TaskAnalytics({ analytics }) {
  return (
    <div className="space-y-6">
      {/* Overall Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-primary" />
            Task Progress
          </CardTitle>
          <CardDescription>Overall completion status and metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium">Overall Progress</h3>
              <span className="text-sm">{analytics.overallProgress}%</span>
            </div>
            <Progress value={analytics.overallProgress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg border p-3 text-center">
              <div className="text-2xl font-bold">{analytics.totalSubtasks}</div>
              <div className="text-xs text-muted-foreground">Total Subtasks</div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-2xl font-bold">{analytics.completedSubtasks}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-2xl font-bold">{analytics.totalTimeSpent}</div>
              <div className="text-xs text-muted-foreground">Hours Spent</div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-2xl font-bold">{analytics.estimatedCompletion}</div>
              <div className="text-xs text-muted-foreground">Est. Completion</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contributors Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Contributors
          </CardTitle>
          <CardDescription>Team member contributions and activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {analytics.contributors.map((contributor) => (
              <div key={contributor.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={contributor.avatar} alt={contributor.name} />
                  <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">{contributor.name}</span>
                      {contributor.isTopContributor && (
                        <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500">
                          Top Contributor
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm">{contributor.contribution}%</span>
                  </div>
                  <Progress value={contributor.contribution} className="h-1.5 mt-1" />
                  <div className="flex gap-4 mt-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle className="h-3 w-3" />
                      <span>{contributor.tasksCompleted} tasks</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{contributor.hoursSpent} hours</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Insights
          </CardTitle>
          <CardDescription>AI-generated analysis and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Progress Overview</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>{analytics.aiInsights.progressOverview}</p>
                  <div className="flex items-start gap-2 mt-2">
                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <p className="text-amber-700 dark:text-amber-400">{analytics.aiInsights.alert}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Team Performance</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>{analytics.aiInsights.teamPerformance}</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    {analytics.aiInsights.teamInsights.map((insight, index) => (
                      <li key={index}>{insight}</li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Recommendations</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>Based on your team's progress, here are some recommendations:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    {analytics.aiInsights.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

