"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Brain,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  MessageSquare,
  ListTodo,
  BarChart,
  Users,
  User,
  Send,
  Plus,
  Trash2,
  Edit,
  Lightbulb,
  Timer,
  CheckSquare,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for the subtask
const subtaskData = {
  id: 2,
  title: "Create outline",
  description:
    "Create a detailed outline for the research paper including main sections, subsections, and key points to cover in each section.",
  estimatedTime: "1 hour",
  actualTime: "45 minutes",
  status: "in-progress", // completed, in-progress, not-started
  dueDate: "2025-03-22",
  assignedTo: {
    id: 1,
    name: "Agung Fathul",
    email: "agungfathul14@upi.edu",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "owner",
  },
  parentTask: {
    id: 5,
    title: "Research Paper on Climate Change",
  },
  todoItems: [
    { id: 1, title: "Define main sections", completed: true },
    { id: 2, title: "Create subsections", completed: true },
    { id: 3, title: "Add key points for each section", completed: false },
    { id: 4, title: "Review and finalize outline structure", completed: false },
  ],
  comments: [
    {
      id: 1,
      user: {
        id: 1,
        name: "Agung Fathul",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "I've started working on the outline. I'm thinking we should have 5 main sections.",
      timestamp: "2025-03-20T10:30:00",
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "That sounds good. Make sure to include a section on policy implications as mentioned in the AI suggestions.",
      timestamp: "2025-03-20T11:15:00",
    },
    {
      id: 3,
      user: {
        id: 1,
        name: "Agung Fathul",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Good point. I'll add that as the fifth section.",
      timestamp: "2025-03-20T11:30:00",
    },
  ],
  history: [
    { action: "created", timestamp: "2025-03-19T09:00:00", user: "Agung Fathul" },
    { action: "assigned", timestamp: "2025-03-19T09:05:00", user: "Agung Fathul", assignee: "Agung Fathul" },
    { action: "started", timestamp: "2025-03-20T10:15:00", user: "Agung Fathul" },
    { action: "todo_added", timestamp: "2025-03-20T10:20:00", user: "Agung Fathul", item: "Define main sections" },
    { action: "todo_added", timestamp: "2025-03-20T10:21:00", user: "Agung Fathul", item: "Create subsections" },
    {
      action: "todo_added",
      timestamp: "2025-03-20T10:22:00",
      user: "Agung Fathul",
      item: "Add key points for each section",
    },
    {
      action: "todo_added",
      timestamp: "2025-03-20T10:23:00",
      user: "Agung Fathul",
      item: "Review and finalize outline structure",
    },
    { action: "todo_completed", timestamp: "2025-03-20T11:00:00", user: "Agung Fathul", item: "Define main sections" },
    { action: "todo_completed", timestamp: "2025-03-20T11:45:00", user: "Agung Fathul", item: "Create subsections" },
  ],
  analytics: {
    progress: 50,
    timeSpent: 45, // minutes
    contributors: [
      { id: 1, name: "Agung Fathul", avatar: "/placeholder.svg?height=40&width=40", contribution: 80 }, // percentage
      { id: 2, name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40", contribution: 20 },
    ],
    todoCompletion: {
      total: 4,
      completed: 2,
    },
    aiInsights: [
      "The outline is progressing well with 50% completion.",
      "Consider adding more specific details to each subsection.",
      "Based on similar tasks, this subtask should be completed within the next 30 minutes.",
    ],
  },
}

export default function SubtaskDetailPage({ params }) {
  const router = useRouter()
  const { id, subtaskId } = params
  const [subtask, setSubtask] = useState(subtaskData)
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const [newComment, setNewComment] = useState("")
  const [editingTodoId, setEditingTodoId] = useState(null)
  const [editingTodoTitle, setEditingTodoTitle] = useState("")

  // Add a new todo item
  const addTodoItem = () => {
    if (newTodoTitle.trim() === "") return

    const newTodo = {
      id: subtask.todoItems.length + 1,
      title: newTodoTitle,
      completed: false,
    }

    setSubtask((prev) => ({
      ...prev,
      todoItems: [...prev.todoItems, newTodo],
      history: [
        ...prev.history,
        {
          action: "todo_added",
          timestamp: new Date().toISOString(),
          user: "Agung Fathul",
          item: newTodoTitle,
        },
      ],
    }))

    setNewTodoTitle("")
  }

  // Toggle todo item completion
  const toggleTodoItem = (todoId) => {
    setSubtask((prev) => {
      const updatedTodos = prev.todoItems.map((todo) => {
        if (todo.id === todoId) {
          const completed = !todo.completed

          // Add to history if completed
          if (completed && !prev.history.some((h) => h.action === "todo_completed" && h.item === todo.title)) {
            prev.history.push({
              action: "todo_completed",
              timestamp: new Date().toISOString(),
              user: "Agung Fathul",
              item: todo.title,
            })
          }

          return { ...todo, completed }
        }
        return todo
      })

      // Update analytics
      const completedCount = updatedTodos.filter((todo) => todo.completed).length
      const progress = Math.round((completedCount / updatedTodos.length) * 100)

      return {
        ...prev,
        todoItems: updatedTodos,
        analytics: {
          ...prev.analytics,
          progress,
          todoCompletion: {
            total: updatedTodos.length,
            completed: completedCount,
          },
        },
      }
    })
  }

  // Delete todo item
  const deleteTodoItem = (todoId) => {
    setSubtask((prev) => {
      const todoToDelete = prev.todoItems.find((todo) => todo.id === todoId)
      const updatedTodos = prev.todoItems.filter((todo) => todo.id !== todoId)

      // Update analytics
      const completedCount = updatedTodos.filter((todo) => todo.completed).length
      const progress = updatedTodos.length > 0 ? Math.round((completedCount / updatedTodos.length) * 100) : 0

      return {
        ...prev,
        todoItems: updatedTodos,
        history: [
          ...prev.history,
          {
            action: "todo_deleted",
            timestamp: new Date().toISOString(),
            user: "Agung Fathul",
            item: todoToDelete.title,
          },
        ],
        analytics: {
          ...prev.analytics,
          progress,
          todoCompletion: {
            total: updatedTodos.length,
            completed: completedCount,
          },
        },
      }
    })
  }

  // Start editing todo item
  const startEditingTodo = (todoId, currentTitle) => {
    setEditingTodoId(todoId)
    setEditingTodoTitle(currentTitle)
  }

  // Save edited todo item
  const saveEditedTodo = () => {
    if (editingTodoTitle.trim() === "") return

    setSubtask((prev) => {
      const updatedTodos = prev.todoItems.map((todo) => {
        if (todo.id === editingTodoId) {
          return { ...todo, title: editingTodoTitle }
        }
        return todo
      })

      return {
        ...prev,
        todoItems: updatedTodos,
        history: [
          ...prev.history,
          {
            action: "todo_edited",
            timestamp: new Date().toISOString(),
            user: "Agung Fathul",
            item: editingTodoTitle,
          },
        ],
      }
    })

    setEditingTodoId(null)
    setEditingTodoTitle("")
  }

  // Cancel editing todo item
  const cancelEditingTodo = () => {
    setEditingTodoId(null)
    setEditingTodoTitle("")
  }

  // Add a new comment
  const addComment = () => {
    if (newComment.trim() === "") return

    const newCommentObj = {
      id: subtask.comments.length + 1,
      user: {
        id: 1,
        name: "Agung Fathul",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: newComment,
      timestamp: new Date().toISOString(),
    }

    setSubtask((prev) => ({
      ...prev,
      comments: [...prev.comments, newCommentObj],
    }))

    setNewComment("")
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Format time
  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleTimeString(undefined, options)
  }

  // Format timestamp for comments and history
  const formatTimestamp = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hr ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} day ago`

    return formatDate(dateString)
  }

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
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">{subtask.title}</h1>
              <Badge
                variant={
                  subtask.status === "completed"
                    ? "success"
                    : subtask.status === "in-progress"
                      ? "default"
                      : "secondary"
                }
              >
                {subtask.status === "completed"
                  ? "Completed"
                  : subtask.status === "in-progress"
                    ? "In Progress"
                    : "Not Started"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Subtask of{" "}
              <Link href={`/dashboard/task/${id}`} className="hover:underline text-primary">
                {subtask.parentTask.title}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            className="gap-2 border-green-200 bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
            onClick={() => {
              // Mark subtask as complete
              setSubtask((prev) => ({
                ...prev,
                status: "completed",
                history: [
                  ...prev.history,
                  {
                    action: "completed",
                    timestamp: new Date().toISOString(),
                    user: "Agung Fathul",
                  },
                ],
              }))
            }}
            disabled={subtask.status === "completed"}
          >
            <Check className="h-4 w-4" />
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
                <span>Edit Subtask</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Reassign</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Subtask</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Subtask Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListTodo className="h-5 w-5 text-primary" />
                Subtask Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Description</h3>
                <p className="text-muted-foreground">{subtask.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Estimated: {subtask.estimatedTime}</span>
                </div>
                {subtask.actualTime && (
                  <div className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span>Actual: {subtask.actualTime}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Due: {formatDate(subtask.dueDate)}</span>
                </div>
                <div className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Assigned to: {subtask.assignedTo.name}</span>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">Progress</h3>
                  <span className="text-sm">{subtask.analytics.progress}%</span>
                </div>
                <Progress value={subtask.analytics.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* To-Do List Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  To-Do List
                </CardTitle>
                <CardDescription>Track progress with smaller tasks</CardDescription>
              </div>
              <Badge variant="outline">
                {subtask.analytics.todoCompletion.completed}/{subtask.analytics.todoCompletion.total} completed
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {subtask.todoItems.map((todo) => (
                  <div key={todo.id} className="flex items-center justify-between rounded-lg border p-3">
                    {editingTodoId === todo.id ? (
                      <div className="flex flex-1 items-center gap-2">
                        <Input
                          value={editingTodoTitle}
                          onChange={(e) => setEditingTodoTitle(e.target.value)}
                          className="flex-1"
                          autoFocus
                        />
                        <div className="flex gap-1">
                          <Button size="sm" onClick={saveEditedTodo}>
                            Save
                          </Button>
                          <Button size="sm" variant="ghost" onClick={cancelEditingTodo}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={`todo-${todo.id}`}
                            checked={todo.completed}
                            onCheckedChange={() => toggleTodoItem(todo.id)}
                          />
                          <label
                            htmlFor={`todo-${todo.id}`}
                            className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {todo.title}
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => startEditingTodo(todo.id, todo.title)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => deleteTodoItem(todo.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add a new to-do item..."
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTodoItem()
                    }
                  }}
                />
                <Button onClick={addTodoItem} disabled={!newTodoTitle.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Comments Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Comments
              </CardTitle>
              <CardDescription>Discuss this subtask with collaborators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {subtask.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground">{formatTimestamp(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Agung Fathul" />
                  <AvatarFallback>AF</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex justify-end">
                    <Button onClick={addComment} disabled={!newComment.trim()}>
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Analytics Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Analytics
              </CardTitle>
              <CardDescription>Performance metrics for this subtask</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Contributors</h3>
                <div className="space-y-3">
                  {subtask.analytics.contributors.map((contributor) => (
                    <div key={contributor.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contributor.avatar} alt={contributor.name} />
                        <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{contributor.name}</span>
                          <span className="text-sm">{contributor.contribution}%</span>
                        </div>
                        <Progress value={contributor.contribution} className="h-1.5 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Time Metrics</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border p-3 text-center">
                    <div className="text-2xl font-bold">{subtask.analytics.timeSpent} min</div>
                    <div className="text-xs text-muted-foreground">Time Spent</div>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <div className="text-2xl font-bold">{subtask.estimatedTime.split(" ")[0] * 60} min</div>
                    <div className="text-xs text-muted-foreground">Estimated Time</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">AI Insights</h3>
                <div className="space-y-2">
                  {subtask.analytics.aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2 rounded-lg border p-3">
                      <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity History Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subtask.history
                  .slice()
                  .reverse()
                  .map((event, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="relative">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                          {event.action === "created" && <Plus className="h-4 w-4 text-primary" />}
                          {event.action === "assigned" && <User className="h-4 w-4 text-primary" />}
                          {event.action === "started" && <Play className="h-4 w-4 text-primary" />}
                          {event.action === "todo_added" && <ListTodo className="h-4 w-4 text-primary" />}
                          {event.action === "todo_completed" && <CheckSquare className="h-4 w-4 text-primary" />}
                          {event.action === "todo_edited" && <Edit className="h-4 w-4 text-primary" />}
                          {event.action === "todo_deleted" && <Trash2 className="h-4 w-4 text-primary" />}
                          {event.action === "completed" && <CheckCircle2 className="h-4 w-4 text-primary" />}
                        </div>
                        {index !== subtask.history.length - 1 && (
                          <div className="absolute left-1/2 top-8 bottom-0 w-px -translate-x-1/2 bg-border"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{event.user}</span>
                          <span className="text-xs text-muted-foreground">{formatTimestamp(event.timestamp)}</span>
                        </div>
                        <p className="text-sm">
                          {event.action === "created" && "Created this subtask"}
                          {event.action === "assigned" && `Assigned to ${event.assignee}`}
                          {event.action === "started" && "Started working on this subtask"}
                          {event.action === "todo_added" && `Added todo item: "${event.item}"`}
                          {event.action === "todo_completed" && `Completed todo item: "${event.item}"`}
                          {event.action === "todo_edited" && `Edited todo item: "${event.item}"`}
                          {event.action === "todo_deleted" && `Deleted todo item: "${event.item}"`}
                          {event.action === "completed" && "Marked subtask as complete"}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Efficiency Tips</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p>Based on your progress, consider these tips:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Focus on completing the key points for each section next</li>
                        <li>Use bullet points for initial key points before expanding</li>
                        <li>Consider using a mind-mapping tool for better visualization</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Resource Suggestions</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p>These resources might help with your outline:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>IPCC Climate Change Report (2023) - for latest data</li>
                        <li>Marine Ecosystems Journal - for specific examples</li>
                        <li>Climate Policy Database - for policy implications section</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Time Management</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p>To complete this subtask efficiently:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Allocate 15 minutes to complete key points</li>
                        <li>Take a 5-minute break</li>
                        <li>Spend 10 minutes reviewing and finalizing</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

