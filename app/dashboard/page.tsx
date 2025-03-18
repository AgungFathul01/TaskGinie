"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter, Plus, Search, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

// Sample data
const tasks = [
  {
    id: 1,
    title: "Research Paper on Climate Change",
    description: "Write a 10-page research paper on the effects of climate change on marine ecosystems",
    difficulty: "High",
    subtasks: 5,
    dueDate: "2025-03-25",
  },
  {
    id: 2,
    title: "Calculus Problem Set",
    description: "Complete 20 calculus problems covering derivatives and integrals",
    difficulty: "Medium",
    subtasks: 10,
    dueDate: "2025-03-22",
  },
  {
    id: 3,
    title: "Literature Review",
    description: "Read and analyze three short stories for comparative literature class",
    difficulty: "Low",
    subtasks: 4,
    dueDate: "2025-03-30",
  },
  {
    id: 4,
    title: "Physics Lab Report",
    description: "Write a lab report on the pendulum experiment including data analysis",
    difficulty: "High",
    subtasks: 6,
    dueDate: "2025-03-21",
  },
  {
    id: 5,
    title: "History Essay",
    description: "Write a 5-page essay on the causes and effects of the Industrial Revolution",
    difficulty: "Medium",
    subtasks: 3,
    dueDate: "2025-04-05",
  },
  {
    id: 6,
    title: "Programming Assignment",
    description: "Create a web application with user authentication and database integration",
    difficulty: "High",
    subtasks: 8,
    dueDate: "2025-04-10",
  },
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [layoutView, setLayoutView] = useState("grid") // "grid" or "list"

  // Filter tasks based on search query and active tab
  const filteredTasks = tasks.filter((task) => {
    const searchTerm = searchQuery.toLowerCase()
    const taskTitle = task.title.toLowerCase()
    const taskDescription = task.description.toLowerCase()

    const matchesSearch = taskTitle.includes(searchTerm) || taskDescription.includes(searchTerm)

    let matchesTab = true
    if (activeTab === "upcoming") {
      const today = new Date()
      const taskDueDate = new Date(task.dueDate)
      const diffInDays = Math.ceil((taskDueDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
      matchesTab = diffInDays <= 7 && diffInDays >= 0
    } else if (activeTab === "high-priority") {
      matchesTab = task.difficulty.toLowerCase() === "high"
    } else if (activeTab === "completed") {
      // For demo purposes, we don't have completed tasks
      matchesTab = false
    }

    return matchesSearch && matchesTab
  })

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400"
      case "medium":
        return "bg-amber-100 text-amber-500 dark:bg-amber-900/30 dark:text-amber-400"
      case "low":
        return "bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get days remaining
  const getDaysRemaining = (dueDate) => {
    const today = new Date()
    const taskDueDate = new Date(dueDate)
    const diffInDays = Math.ceil((taskDueDate.getTime() - today.getTime()) / (1000 * 3600 * 24))

    if (diffInDays < 0) {
      return "Overdue"
    } else if (diffInDays === 0) {
      return "Due today"
    } else if (diffInDays === 1) {
      return "Due tomorrow"
    } else {
      return `${diffInDays} days left`
    }
  }

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/dashboard/new-task">
              <Button size="sm" className="h-9 gap-1">
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">New Task</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="border-b bg-background/60 backdrop-blur-sm">
        <div className="w-full px-4 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span className="flex h-4 w-4 items-center justify-center mr-2">
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
                      className="h-4 w-4"
                    >
                      <path d="M22 12H2" />
                      <path d="M5 12V6.2C5 5.08 5 4.52 5.22 4.09c.22-.43.6-.78 1.35-1.47l.5-.46c.52-.48.78-.71 1.06-.9a3.5 3.5 0 0 1 .7-.31c.3-.1.64-.15 1.3-.15h3.74c.66 0 .99.05 1.3.15.3.1.53.19.7.31.28.19.54.42 1.06.9l.5.46c.75.7 1.13 1.04 1.35 1.47.22.43.22.99.22 2.11V12" />
                    </svg>
                  </span>
                  All Tasks
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="flex h-4 w-4 items-center justify-center mr-2 text-red-500">
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
                      className="h-4 w-4"
                    >
                      <path d="m8.5 14.5 2-2m5-5-2 2" />
                      <path d="m8.5 9.5 2 2m5 5-2-2" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </span>
                  High Priority
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="flex h-4 w-4 items-center justify-center mr-2 text-yellow-500">
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
                      className="h-4 w-4"
                    >
                      <path d="M12 8v4l3 3" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </span>
                  Due This Week
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="flex h-4 w-4 items-center justify-center mr-2 text-green-500">
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
                      className="h-4 w-4"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  Completed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1"
              onClick={() => setLayoutView(layoutView === "grid" ? "list" : "grid")}
            >
              {layoutView === "grid" ? (
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
                  className="h-3.5 w-3.5"
                >
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="18" x2="3" y2="18"></line>
                </svg>
              ) : (
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
                  className="h-3.5 w-3.5"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              )}
              <span className="hidden sm:inline">{layoutView === "grid" ? "List View" : "Grid View"}</span>
            </Button>
          </div>
        </div>
      </div>

      <main className="p-6 w-full">
        <div className="w-full max-w-[1600px] mx-auto">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="high-priority">High Priority</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div
                className={`grid gap-4 ${layoutView === "grid" ? "sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2" : "grid-cols-1"}`}
              >
                {filteredTasks.map((task) => (
                  <Card key={task.id} className="flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg line-clamp-1">{task.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty} Difficulty</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
                              className="h-4 w-4"
                            >
                              <path d="M8 4H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1"></path>
                              <path d="M12 14v4"></path>
                              <path d="M12 11v.01"></path>
                              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                            </svg>
                            <span>{task.subtasks} subtasks</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(task.dueDate)}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{getDaysRemaining(task.dueDate)}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Link href={`/dashboard/task/${task.id}`} className="w-full">
                        <Button variant="secondary" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
                <Link href="/dashboard/new-task">
                  <Card className="flex h-full min-h-[180px] flex-col items-center justify-center border-dashed transition-all hover:border-primary hover:shadow-sm">
                    <div className="flex flex-col items-center justify-center text-center p-6">
                      <div className="mb-4 rounded-full bg-primary/10 p-3">
                        <Plus className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">Add New Task</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Create a new task with AI assistance</p>
                    </div>
                  </Card>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="upcoming" className="mt-6">
              <div
                className={`grid gap-4 ${layoutView === "grid" ? "sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2" : "grid-cols-1"}`}
              >
                {filteredTasks.map((task) => (
                  <Card key={task.id} className="flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg line-clamp-1">{task.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty} Difficulty</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
                              className="h-4 w-4"
                            >
                              <path d="M8 4H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1"></path>
                              <path d="M12 14v4"></path>
                              <path d="M12 11v.01"></path>
                              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                            </svg>
                            <span>{task.subtasks} subtasks</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(task.dueDate)}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{getDaysRemaining(task.dueDate)}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Link href={`/dashboard/task/${task.id}`} className="w-full">
                        <Button variant="secondary" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="high-priority" className="mt-6">
              <div
                className={`grid gap-4 ${layoutView === "grid" ? "sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2" : "grid-cols-1"}`}
              >
                {filteredTasks.map((task) => (
                  <Card key={task.id} className="flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg line-clamp-1">{task.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty} Difficulty</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
                              className="h-4 w-4"
                            >
                              <path d="M8 4H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1"></path>
                              <path d="M12 14v4"></path>
                              <path d="M12 11v.01"></path>
                              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                            </svg>
                            <span>{task.subtasks} subtasks</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(task.dueDate)}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{getDaysRemaining(task.dueDate)}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Link href={`/dashboard/task/${task.id}`} className="w-full">
                        <Button variant="secondary" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
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
                    className="h-8 w-8 text-muted-foreground"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">No completed tasks</h3>
                <p className="text-muted-foreground">
                  You haven't completed any tasks yet. Start working on your tasks to see them here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}

