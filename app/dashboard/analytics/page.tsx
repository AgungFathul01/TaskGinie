"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"


// Sample data for charts
const weeklyData = [
  { day: "Mon", hours: 2.5, tasks: 3 },
  { day: "Tue", hours: 3.2, tasks: 4 },
  { day: "Wed", hours: 4.5, tasks: 5 },
  { day: "Thu", hours: 2.8, tasks: 2 },
  { day: "Fri", hours: 5.1, tasks: 6 },
  { day: "Sat", hours: 1.5, tasks: 1 },
  { day: "Sun", hours: 0.5, tasks: 1 },
]

const subjectData = [
  { name: "Mathematics", hours: 8.5, color: "#4f46e5" },
  { name: "Science", hours: 12.3, color: "#06b6d4" },
  { name: "English", hours: 6.7, color: "#10b981" },
  { name: "History", hours: 4.2, color: "#f59e0b" },
  { name: "Computer Science", hours: 9.8, color: "#ef4444" },
]

const timeOfDayData = [
  { time: "6-9 AM", productivity: 65 },
  { time: "9-12 PM", productivity: 85 },
  { time: "12-3 PM", productivity: 60 },
  { time: "3-6 PM", productivity: 75 },
  { time: "6-9 PM", productivity: 90 },
  { time: "9-12 AM", productivity: 50 },
]

const completionRateData = [
  { name: "Completed", value: 68, color: "#10b981" },
  { name: "In Progress", value: 22, color: "#f59e0b" },
  { name: "Overdue", value: 10, color: "#ef4444" },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week")
  return (
    <div className="w-full p-4 sm:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Productivity Analytics</h1>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="semester">This Semester</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">20.1</div>
              <div className="text-sm text-muted-foreground">hours this week</div>
            </div>
            <div className="mt-1 text-xs text-green-500">+12% from last week</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">22</div>
              <div className="text-sm text-muted-foreground">tasks this week</div>
            </div>
            <div className="mt-1 text-xs text-green-500">+8% from last week</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Focus Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">42</div>
              <div className="text-sm text-muted-foreground">minutes per session</div>
            </div>
            <div className="mt-1 text-xs text-amber-500">-5% from last week</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Your study hours and completed tasks by day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
                  <YAxis yAxisId="right" orientation="right" stroke="#4f46e5" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="hours" name="Study Hours" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="tasks" name="Tasks Completed" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time by Subject</CardTitle>
            <CardDescription>Distribution of study time across subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="hours"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} hours`, "Time Spent"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productivity by Time of Day</CardTitle>
            <CardDescription>When you're most productive</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeOfDayData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, "Productivity Score"]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="productivity"
                    name="Productivity Score"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Rate</CardTitle>
            <CardDescription>Overall task completion statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={completionRateData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {completionRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Insights & Recommendations</CardTitle>
            <CardDescription>AI-generated insights based on your productivity data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Peak Productivity Times</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your data shows you're most productive between 9-12 PM and 6-9 PM. Consider scheduling challenging
                  tasks during these times.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Weekly Patterns</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  You tend to be most productive on Wednesdays and Fridays. Monday shows lower productivity - consider
                  lighter workloads or more breaks.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  <h3 className="font-medium">Subject Focus</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  You're spending the most time on Science and Computer Science. Consider allocating more time to
                  History, which has the lowest study hours.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

