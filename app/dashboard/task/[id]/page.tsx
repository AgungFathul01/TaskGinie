"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Brain,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Edit,
  FileText,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Share2,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"

// Sample task data
const taskData = {
  id: 5,
  title: "Research Paper on Climate Change",
  description:
    "Write a 10-page research paper on the effects of climate change on marine ecosystems. Include at least 8 academic sources and follow APA formatting guidelines.",
  subject: "Environmental Science",
  dueDate: "2025-03-25",
  priority: "high",
  progress: 0,
  estimatedTime: "8 hours",
  subtasks: [
    { id: 1, title: "Research academic sources", completed: false, estimatedTime: "2 hours" },
    { id: 2, title: "Create outline", completed: false, estimatedTime: "1 hour" },
    { id: 3, title: "Write introduction", completed: false, estimatedTime: "1 hour" },
    { id: 4, title: "Write main body sections", completed: false, estimatedTime: "3 hours" },
    { id: 5, title: "Write conclusion", completed: false, estimatedTime: "30 minutes" },
    { id: 6, title: "Format references", completed: false, estimatedTime: "30 minutes" },
  ],
  notes: [
    { id: 1, content: "Focus on coral reef degradation as a key example", timestamp: "2025-03-19T10:30:00" },
    { id: 2, content: "Include data visualization for temperature changes", timestamp: "2025-03-19T14:45:00" },
  ],
  aiSuggestions: [
    "Consider including a section on policy implications",
    "The IPCC's latest report would be a valuable source",
    "Compare different regions for a more comprehensive analysis",
  ],
  aiResources: [
    {
      type: "article",
      title: "Climate Change Effects on Marine Ecosystems: A Review",
      source: "Journal of Environmental Science, 2024",
      format: "PDF",
      icon: "document",
    },
    {
      type: "video",
      title: "Understanding Coral Reef Degradation",
      source: "MIT OpenCourseWare",
      duration: "15:42",
      icon: "video",
    },
    {
      type: "dataset",
      title: "Global Sea Temperature Changes (2000-2023)",
      source: "NOAA Open Data",
      format: "CSV",
      icon: "file",
    },
  ],
}

export default function TaskDetailPage({ params, searchParams }) {
  const router = useRouter()
  const { id } = params
  const isNewTask = searchParams?.new === "true"

  const [task, setTask] = useState(taskData)
  const [timerActive, setTimerActive] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timerMinutes, setTimerMinutes] = useState(25)
  const [isBreak, setIsBreak] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [activeSubtaskId, setActiveSubtaskId] = useState(null)
  const [newNote, setNewNote] = useState("")
  const [sessionTime, setSessionTime] = useState(0)
  const [sessionSubtasksCompleted, setSessionSubtasksCompleted] = useState(0)

  // UseEffect to update the timer every second
  useEffect(() => {
    let interval

    if (timerActive) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds((prevSeconds) => prevSeconds - 1)
        } else {
          if (timerMinutes > 0) {
            setTimerMinutes((prevMinutes) => prevMinutes - 1)
            setTimerSeconds(59)
          } else {
            // Timer has reached zero
            clearInterval(interval)
            setTimerActive(false)

            // Check if it was a break or focus session
            if (!isBreak) {
              setCompletedPomodoros((prevPomodoros) => prevPomodoros + 1)
              setIsBreak(true)
              setTimerMinutes(5) // Start break timer
            } else {
              setIsBreak(false)
              setTimerMinutes(25) // Start focus timer
            }
            setTimerSeconds(0)

            // Reset active subtask if on break
            if (isBreak) {
              setActiveSubtaskId(null)
            }
          }
        }

        // Update session time
        setSessionTime((prevSessionTime) => prevSessionTime + 1)
      }, 1000)
    } else {
      clearInterval(interval) // Clear interval if timer is not active
    }

    return () => clearInterval(interval) // Cleanup interval on unmount
  }, [timerActive, timerMinutes, timerSeconds, isBreak])

  // Calculate progress
  const calculateProgress = () => {
    if (task.subtasks.length === 0) return 0
    const completed = task.subtasks.filter((subtask) => subtask.completed).length
    return Math.round((completed / task.subtasks.length) * 100)
  }

  // Toggle subtask completion
  const toggleSubtask = (subtaskId) => {
    setTask((prevTask) => {
      const updatedSubtasks = prevTask.subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask,
      )

      // Update session subtasks completed
      if (!prevTask.subtasks.find((sub) => sub.id === subtaskId).completed) {
        setSessionSubtasksCompleted((prevCompleted) => prevCompleted + 1)
      } else {
        setSessionSubtasksCompleted((prevCompleted) => prevCompleted - 1)
      }

      return {
        ...prevTask,
        subtasks: updatedSubtasks,
        progress: calculateProgress(),
      }
    })
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Toggle timer
  const toggleTimer = () => {
    setTimerActive(!timerActive)
  }

  // Reset timer
  const resetTimer = () => {
    setTimerActive(false)
    setTimerSeconds(0)
    setTimerMinutes(isBreak ? 5 : 25)
  }

  // Start timer for a specific subtask
  const startSubtaskTimer = (subtaskId) => {
    setActiveSubtaskId(subtaskId)
    setTimerActive(true)
    setTimerSeconds(0)
    setTimerMinutes(25)
    setIsBreak(false)

    // Scroll to timer section
    document.getElementById("pomodoro-timer")?.scrollIntoView({ behavior: "smooth" })
  }

  // Delete task
  const deleteTask = () => {
    // In a real app, you would delete the task from your database here
    router.push("/dashboard")
  }

  // Add note
  const addNote = () => {
    if (newNote.trim() !== "") {
      const note = {
        id: Date.now(),
        content: newNote,
        timestamp: new Date().toISOString(),
      }

      setTask((prevTask) => ({
        ...prevTask,
        notes: [...prevTask.notes, note],
      }))

      setNewNote("")
    }
  }

  return (
    <div className="w-full p-4 sm:p-8 max-w-[1600px] mx-auto">
      {isNewTask && (
        <Alert className="mb-6">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Task Created Successfully!</AlertTitle>
          <AlertDescription>
            Your task has been created and is ready to work on. You can start by breaking it down into subtasks or using
            the Pomodoro timer to focus.
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">{task.title}</h1>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            className="gap-2 border-green-200 bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
            onClick={() => {
              // In a real app, you would update the task status in your database here
              router.push("/dashboard?completed=true")
            }}
          >
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
            Mark as Complete
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
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
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="12" cy="5" r="1"></circle>
                  <circle cx="12" cy="19" r="1"></circle>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit Task</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={deleteTask}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Task</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Task Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant={
                    task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                  }
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Due {formatDate(task.dueDate)}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Est. {task.estimatedTime}
                </Badge>
                <Badge variant="outline">{task.subject}</Badge>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Description</h3>
                <p className="text-muted-foreground">{task.description}</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">Progress</h3>
                  <span className="text-sm">{calculateProgress()}%</span>
                </div>
                <Progress value={calculateProgress()} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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
                  <path d="M8 4H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1"></path>
                  <path d="M12 14v4"></path>
                  <path d="M12 11v.01"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                Subtasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {task.subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`subtask-${subtask.id}`}
                        checked={subtask.completed}
                        onCheckedChange={() => toggleSubtask(subtask.id)}
                      />
                      <label
                        htmlFor={`subtask-${subtask.id}`}
                        className={`${subtask.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {subtask.title}
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{subtask.estimatedTime}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => startSubtaskTimer(subtask.id)}
                        disabled={subtask.completed}
                      >
                        <Play className="h-3.5 w-3.5 mr-1" />
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Subtask
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Suggestions & Resources
              </CardTitle>
              <CardDescription>
                TaskGenie's AI has analyzed your task and provided these suggestions and relevant resources.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="suggestions">
                <TabsList className="grid w-full grid-cols-2 gap-1">
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                <TabsContent value="suggestions" className="space-y-2 pt-4">
                  {task.aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                      <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                        <Brain className="h-4 w-4 text-primary" />
                      </div>
                      <p>{suggestion}</p>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="resources" className="space-y-4 pt-4">
                  {task.aiResources.map((resource, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {resource.icon === "document" && (
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
                              className="h-4 w-4 text-blue-500"
                            >
                              <path d="M18 6h-5c-1 0-2 1-2 2v9c0 1 1 2 2 2h9c1 0 2-1 2-2v-5"></path>
                              <path d="M12 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"></path>
                              <path d="M3 13v-2a2 2 0 0 1 2-2h5"></path>
                              <path d="m9 16 1-1-1-1"></path>
                              <path d="M14 16h.01"></path>
                            </svg>
                          )}
                          {resource.icon === "video" && (
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
                              className="h-4 w-4 text-red-500"
                            >
                              <path d="m22 8-6 4 6 4V8Z"></path>
                              <rect x="2" y="6" width="14" height="12" rx="2" ry="2"></rect>
                            </svg>
                          )}
                          {resource.icon === "file" && (
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
                              className="h-4 w-4 text-green-500"
                            >
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                          )}
                          <h4 className="font-medium">
                            {resource.type === "article"
                              ? "Journal Article"
                              : resource.type === "video"
                                ? "Video Lecture"
                                : "Dataset"}
                          </h4>
                        </div>
                        <Badge variant="outline">{resource.format || resource.duration}</Badge>
                      </div>
                      <p className="mb-1 text-sm">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">{resource.source}</p>
                      <div className="mt-2 flex justify-end">
                        <Button variant="ghost" size="sm" className="h-7 gap-1">
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
                            <path d="M12 5v14"></path>
                            <path d="m19 12-7 7-7-7"></path>
                          </svg>
                          {resource.type === "video" ? "Watch" : "Download"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Get More Resources
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card id="pomodoro-timer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Pomodoro Timer
              </CardTitle>
              <CardDescription>
                {activeSubtaskId ? (
                  <>
                    Working on:{" "}
                    <span className="font-medium">{task.subtasks.find((s) => s.id === activeSubtaskId)?.title}</span>
                  </>
                ) : (
                  "Use the Pomodoro technique to stay focused."
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="mb-4 text-5xl font-bold">
                  {timerMinutes.toString().padStart(2, "0")}:{timerSeconds.toString().padStart(2, "0")}
                </div>
                <div className="mb-2 text-sm text-muted-foreground">
                  {isBreak ? "Break Time" : "Focus Time"} • {completedPomodoros} pomodoros completed
                </div>
                <div className="flex gap-2">
                  <Button variant={timerActive ? "destructive" : "default"} size="sm" onClick={toggleTimer}>
                    {timerActive ? (
                      <>
                        <Pause className="mr-1 h-4 w-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="mr-1 h-4 w-4" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetTimer}>
                    <RefreshCw className="mr-1 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="mb-2 text-sm font-medium">Current Session</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border p-3 text-center">
                    <div className="text-2xl font-bold">{formatTime(sessionTime)}</div>
                    <div className="text-xs text-muted-foreground">Time Spent</div>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <div className="text-2xl font-bold">{sessionSubtasksCompleted}</div>
                    <div className="text-xs text-muted-foreground">Subtasks Completed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="notes">
                <TabsList className="grid w-full grid-cols-2 gap-1">
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="add">Add Note</TabsTrigger>
                </TabsList>
                <TabsContent value="notes" className="space-y-4 pt-4">
                  {task.notes.length > 0 ? (
                    task.notes.map((note) => (
                      <div key={note.id} className="rounded-lg border p-3">
                        <p className="mb-2">{note.content}</p>
                        <p className="text-xs text-muted-foreground">{new Date(note.timestamp).toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground">
                      No notes yet. Add one to keep track of your thoughts.
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="add" className="pt-4">
                  <div className="space-y-4">
                    <Textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Add a note about this task..."
                    />
                    <Button className="w-full" onClick={addNote}>
                      <Check className="mr-2 h-4 w-4" />
                      Save Note
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

