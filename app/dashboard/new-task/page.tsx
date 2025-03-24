"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Brain,
  ChevronLeft,
  Clock,
  FileText,
  Loader2,
  Send,
  Edit,
  Plus,
  Trash2,
  Calendar,
  Users,
  UserPlus,
  Mail,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/date-picker"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample users for collaborator search
const sampleUsers = [
  { id: 2, name: "Sarah Johnson", email: "sarah.j@example.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Michael Chen", email: "m.chen@example.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Priya Patel", email: "priya.p@example.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 5, name: "James Wilson", email: "j.wilson@example.com", avatar: "/placeholder.svg?height=40&width=40" },
]

export default function NewTaskPage() {
  const router = useRouter()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    subject: "",
    dueDate: new Date(),
    priority: "",
    file: null,
    collaborators: [
      {
        id: 1,
        name: "Agung Fathul",
        email: "agungfathul14@upi.edu",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "owner",
      },
    ],
  })
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [editingSubtask, setEditingSubtask] = useState(null)
  const [newSubtask, setNewSubtask] = useState({ title: "", estimatedTime: "" })
  const [activeTab, setActiveTab] = useState("details")

  // Collaboration state
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [inviteEmail, setInviteEmail] = useState("")
  const [showInviteDialog, setShowInviteDialog] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTaskData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setTaskData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date) => {
    setTaskData((prev) => ({ ...prev, dueDate: date }))
  }

  // Search for users when query changes
  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 1) {
      // Filter sample users based on search query
      const filteredUsers = sampleUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(filteredUsers)
    } else {
      setSearchResults([])
    }
  }

  // Add collaborator
  const addCollaborator = (user) => {
    // Check if user is already a collaborator
    if (taskData.collaborators.some((collab) => collab.id === user.id)) {
      return
    }

    setTaskData((prev) => ({
      ...prev,
      collaborators: [...prev.collaborators, { ...user, role: "collaborator" }],
    }))

    // Clear search
    setSearchQuery("")
    setSearchResults([])
  }

  // Invite collaborator by email
  const inviteCollaborator = () => {
    if (inviteEmail.trim() !== "" && inviteEmail.includes("@")) {
      const newCollaborator = {
        id: Date.now(),
        name: inviteEmail.split("@")[0],
        email: inviteEmail,
        avatar: "/placeholder.svg?height=40&width=40",
        role: "pending",
      }

      setTaskData((prev) => ({
        ...prev,
        collaborators: [...prev.collaborators, newCollaborator],
      }))

      setInviteEmail("")
      setShowInviteDialog(false)
    }
  }

  // Remove collaborator
  const removeCollaborator = (collaboratorId) => {
    setTaskData((prev) => ({
      ...prev,
      collaborators: prev.collaborators.filter((collab) => collab.id !== collaboratorId),
    }))
  }

  const analyzeTask = () => {
    setIsAnalyzing(true)

    // Simulate AI analysis (including file analysis if provided)
    setTimeout(() => {
      setAiAnalysis({
        estimatedTime: "5 hours",
        difficulty: "Medium",
        subtasks: [
          { id: 1, title: "Research relevant sources", estimatedTime: "1 hour", assignedTo: null },
          { id: 2, title: "Create outline", estimatedTime: "30 minutes", assignedTo: null },
          { id: 3, title: "Write first draft", estimatedTime: "2 hours", assignedTo: null },
          { id: 4, title: "Review and edit", estimatedTime: "1 hour", assignedTo: null },
          { id: 5, title: "Format and finalize", estimatedTime: "30 minutes", assignedTo: null },
        ],
        suggestedSchedule: [
          { day: "Day 1", tasks: ["Research relevant sources", "Create outline"] },
          { day: "Day 2", tasks: ["Write first draft"] },
          { day: "Day 3", tasks: ["Review and edit", "Format and finalize"] },
        ],
        fileInsights: taskData.file
          ? [
              "The assignment requires APA citation format",
              "Focus on the environmental impact section",
              "Include at least 5 peer-reviewed sources",
            ]
          : null,
      })
      setIsAnalyzing(false)
      setActiveTab("analysis")
    }, 2000)
  }

  const createTask = () => {
    // In a real app, you would save the task to your database here
    router.push("/dashboard/task/5?new=true")
  }

  // Edit subtask
  const startEditingSubtask = (subtask) => {
    setEditingSubtask({ ...subtask })
  }

  const saveEditedSubtask = () => {
    if (!editingSubtask) return

    setAiAnalysis((prev) => ({
      ...prev,
      subtasks: prev.subtasks.map((subtask) => (subtask.id === editingSubtask.id ? { ...editingSubtask } : subtask)),
    }))
    setEditingSubtask(null)
  }

  const cancelEditingSubtask = () => {
    setEditingSubtask(null)
  }

  // Add new subtask
  const addNewSubtask = () => {
    if (!newSubtask.title || !newSubtask.estimatedTime) return

    const newId = aiAnalysis.subtasks.length > 0 ? Math.max(...aiAnalysis.subtasks.map((s) => s.id)) + 1 : 1

    setAiAnalysis((prev) => ({
      ...prev,
      subtasks: [
        ...prev.subtasks,
        {
          id: newId,
          title: newSubtask.title,
          estimatedTime: newSubtask.estimatedTime,
          assignedTo: null,
        },
      ],
    }))
    setNewSubtask({ title: "", estimatedTime: "" })
  }

  // Delete subtask
  const deleteSubtask = (id) => {
    setAiAnalysis((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((subtask) => subtask.id !== id),
    }))
  }

  // Calculate total estimated time
  const calculateTotalTime = (subtasks) => {
    if (!subtasks || subtasks.length === 0) return "0 hours"

    let totalMinutes = 0
    subtasks.forEach((subtask) => {
      const timeStr = subtask.estimatedTime
      if (timeStr.includes("hour")) {
        const hours = Number.parseFloat(timeStr.split(" ")[0])
        totalMinutes += hours * 60
      } else if (timeStr.includes("minute")) {
        const minutes = Number.parseFloat(timeStr.split(" ")[0])
        totalMinutes += minutes
      }
    })

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    if (hours === 0) {
      return `${minutes} minutes`
    } else if (minutes === 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`
    } else {
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`
    }
  }

  // Sample templates for quick start
  const templates = [
    {
      title: "Research Paper",
      description: "Academic research paper with citations and analysis",
      subject: "english",
      icon: "📝",
    },
    {
      title: "Problem Set",
      description: "Mathematical or scientific problem set with calculations",
      subject: "mathematics",
      icon: "🧮",
    },
    {
      title: "Essay",
      description: "Argumentative or analytical essay on a specific topic",
      subject: "history",
      icon: "📚",
    },
    {
      title: "Lab Report",
      description: "Scientific lab report with methodology and results",
      subject: "science",
      icon: "🧪",
    },
    {
      title: "Coding Project",
      description: "Programming assignment with specific requirements",
      subject: "computer-science",
      icon: "💻",
    },
  ]

  // Apply template
  const applyTemplate = (template) => {
    setTaskData((prev) => ({
      ...prev,
      title: template.title,
      description: template.description,
      subject: template.subject,
    }))
  }

  return (
    <div className="w-full p-8 max-w-[1600px] mx-auto">
      <div className="mb-8 flex items-center">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Create New Task</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Task Details</TabsTrigger>
          <TabsTrigger value="analysis" disabled={!aiAnalysis}>
            AI Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Task Details
                  </CardTitle>
                  <CardDescription>Enter the details of your task and our AI will help analyze it.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., Research Paper on Climate Change"
                      value={taskData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Task Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your task in detail. The more information you provide, the better our AI can analyze it."
                      rows={4}
                      value={taskData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={taskData.subject} onValueChange={(value) => handleSelectChange("subject", value)}>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={taskData.priority}
                        onValueChange={(value) => handleSelectChange("priority", value)}
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <DatePicker date={taskData.dueDate} setDate={handleDateChange} />
                  </div>

                  {/* Collaborators section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="collaborators">Collaborators</Label>
                      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="gap-1">
                            <UserPlus className="h-4 w-4" />
                            <span>Add People</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Invite Collaborators</DialogTitle>
                            <DialogDescription>Add team members to collaborate on this task.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium">Search by name or email</h3>
                              <Input placeholder="Search users..." value={searchQuery} onChange={handleSearchChange} />
                              {searchResults.length > 0 && (
                                <div className="mt-2 max-h-40 overflow-y-auto rounded-md border">
                                  {searchResults.map((user) => (
                                    <div
                                      key={user.id}
                                      className="flex items-center justify-between p-2 hover:bg-muted/50 cursor-pointer"
                                      onClick={() => addCollaborator(user)}
                                    >
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                          <AvatarImage src={user.avatar} alt={user.name} />
                                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <p className="text-sm font-medium">{user.name}</p>
                                          <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                      </div>
                                      <Button variant="ghost" size="sm">
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <Separator />
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium">Invite by email</h3>
                              <div className="flex gap-2">
                                <Input
                                  placeholder="email@example.com"
                                  type="email"
                                  value={inviteEmail}
                                  onChange={(e) => setInviteEmail(e.target.value)}
                                />
                                <Button onClick={inviteCollaborator} disabled={!inviteEmail.includes("@")}>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Invite
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="rounded-md border">
                      {taskData.collaborators.map((collaborator) => (
                        <div
                          key={collaborator.id}
                          className="flex items-center justify-between p-2 border-b last:border-b-0"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                              <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{collaborator.name}</p>
                              <p className="text-xs text-muted-foreground">{collaborator.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                collaborator.role === "owner"
                                  ? "default"
                                  : collaborator.role === "pending"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {collaborator.role === "owner"
                                ? "Owner"
                                : collaborator.role === "pending"
                                  ? "Pending"
                                  : "Collaborator"}
                            </Badge>
                            {collaborator.role !== "owner" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => removeCollaborator(collaborator.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add file upload section */}
                  <div className="space-y-2">
                    <Label htmlFor="fileUpload">Upload Assignment File (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="fileUpload"
                        type="file"
                        className="cursor-pointer"
                        onChange={(e) => {
                          // Handle file upload logic here
                          console.log("File selected:", e.target.files?.[0])
                        }}
                      />
                      <Button variant="outline" size="sm" type="button">
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
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upload your assignment file for AI to analyze. Supported formats: PDF, DOCX, TXT (Max 10MB)
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full gap-2"
                    onClick={analyzeTask}
                    disabled={
                      isAnalyzing || !taskData.title || !taskData.description || !taskData.subject || !taskData.priority
                    }
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing Task...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4" />
                        Analyze with AI
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Start Templates</CardTitle>
                  <CardDescription>Choose a template to get started quickly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {templates.map((template, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => applyTemplate(template)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{template.icon}</div>
                        <div>
                          <h3 className="font-medium">{template.title}</h3>
                          <p className="text-xs text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Use
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">AI Assistant Tips</CardTitle>
                  <CardDescription>Get the most out of TaskGenie's AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <h3 className="mb-1 font-medium flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      Be Specific
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Include details like page count, format requirements, and specific topics for better analysis.
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3">
                    <h3 className="mb-1 font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Set Realistic Deadlines
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Our AI will help you break down tasks based on your deadline to create a manageable schedule.
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3">
                    <h3 className="mb-1 font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Collaborate Effectively
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Add team members and assign specific subtasks to distribute the workload efficiently.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          {aiAnalysis && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      AI Analysis Results
                    </CardTitle>
                    <CardDescription>
                      Our AI has analyzed your task and provided the following insights. You can edit these
                      recommendations before creating your task.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="flex flex-col items-center rounded-lg border p-4">
                        <Clock className="mb-2 h-8 w-8 text-primary" />
                        <h3 className="text-sm font-medium text-muted-foreground">Estimated Time</h3>
                        <p className="text-xl font-bold">
                          {aiAnalysis.subtasks ? calculateTotalTime(aiAnalysis.subtasks) : aiAnalysis.estimatedTime}
                        </p>
                      </div>
                      <div className="flex flex-col items-center rounded-lg border p-4">
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
                          className="mb-2 h-8 w-8 text-primary"
                        >
                          <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7Z"></path>
                          <path d="m5 16 3 4"></path>
                          <path d="m19 16-3 4"></path>
                        </svg>
                        <h3 className="text-sm font-medium text-muted-foreground">Difficulty</h3>
                        <p className="text-xl font-bold">{aiAnalysis.difficulty}</p>
                      </div>
                      <div className="flex flex-col items-center rounded-lg border p-4">
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
                          className="mb-2 h-8 w-8 text-primary"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="3" y1="9" x2="21" y2="9"></line>
                          <line x1="9" y1="21" x2="9" y2="9"></line>
                        </svg>
                        <h3 className="text-sm font-medium text-muted-foreground">Subtasks</h3>
                        <p className="text-xl font-bold">{aiAnalysis.subtasks.length}</p>
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-lg font-medium">Recommended Subtasks</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNewSubtask({ title: "", estimatedTime: "" })}
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Add Subtask
                        </Button>
                      </div>

                      {/* Add new subtask form */}
                      {newSubtask.title !== undefined && (
                        <div className="mb-4 rounded-lg border p-3 bg-muted/30">
                          <div className="grid gap-3 sm:grid-cols-5">
                            <div className="sm:col-span-3">
                              <Label htmlFor="new-subtask-title" className="text-xs">
                                Subtask Title
                              </Label>
                              <Input
                                id="new-subtask-title"
                                value={newSubtask.title}
                                onChange={(e) => setNewSubtask((prev) => ({ ...prev, title: e.target.value }))}
                                placeholder="Enter subtask title"
                                className="mt-1"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <Label htmlFor="new-subtask-time" className="text-xs">
                                Estimated Time
                              </Label>
                              <Input
                                id="new-subtask-time"
                                value={newSubtask.estimatedTime}
                                onChange={(e) => setNewSubtask((prev) => ({ ...prev, estimatedTime: e.target.value }))}
                                placeholder="e.g., 1 hour"
                                className="mt-1"
                              />
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setNewSubtask({ title: undefined, estimatedTime: undefined })}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={addNewSubtask}
                              disabled={!newSubtask.title || !newSubtask.estimatedTime}
                            >
                              Add Subtask
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        {aiAnalysis.subtasks.map((subtask) => (
                          <div key={subtask.id} className="rounded-lg border p-3">
                            {editingSubtask && editingSubtask.id === subtask.id ? (
                              <div className="grid gap-3 sm:grid-cols-5">
                                <div className="sm:col-span-3">
                                  <Label htmlFor={`edit-title-${subtask.id}`} className="text-xs">
                                    Subtask Title
                                  </Label>
                                  <Input
                                    id={`edit-title-${subtask.id}`}
                                    value={editingSubtask.title}
                                    onChange={(e) => setEditingSubtask((prev) => ({ ...prev, title: e.target.value }))}
                                    className="mt-1"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <Label htmlFor={`edit-time-${subtask.id}`} className="text-xs">
                                    Estimated Time
                                  </Label>
                                  <Input
                                    id={`edit-time-${subtask.id}`}
                                    value={editingSubtask.estimatedTime}
                                    onChange={(e) =>
                                      setEditingSubtask((prev) => ({ ...prev, estimatedTime: e.target.value }))
                                    }
                                    className="mt-1"
                                  />
                                </div>
                                <div className="sm:col-span-5 mt-3 flex justify-end gap-2">
                                  <Button variant="ghost" size="sm" onClick={cancelEditingSubtask}>
                                    Cancel
                                  </Button>
                                  <Button size="sm" onClick={saveEditedSubtask}>
                                    Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full border text-xs">
                                    {subtask.id}
                                  </div>
                                  <span>{subtask.title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{subtask.estimatedTime}</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => startEditingSubtask(subtask)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive"
                                    onClick={() => deleteSubtask(subtask.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-medium">Suggested Schedule</h3>
                      <div className="space-y-4">
                        {aiAnalysis.suggestedSchedule.map((day, index) => (
                          <div key={index} className="rounded-lg border">
                            <div className="border-b bg-muted/50 px-4 py-2 font-medium">{day.day}</div>
                            <div className="p-4">
                              <ul className="space-y-2">
                                {day.tasks.map((task, taskIndex) => (
                                  <li key={taskIndex} className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    <span>{task}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {aiAnalysis.fileInsights && (
                      <div>
                        <h3 className="mb-3 text-lg font-medium">File Analysis Insights</h3>
                        <div className="space-y-2">
                          {aiAnalysis.fileInsights.map((insight, index) => (
                            <div key={index} className="flex items-center rounded-lg border p-3">
                              <span>{insight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Separator />
                    <div className="flex w-full flex-col gap-4 sm:flex-row">
                      <Button variant="outline" className="flex-1" onClick={() => setActiveTab("details")}>
                        Back to Details
                      </Button>
                      <Button className="flex-1 gap-2" onClick={createTask}>
                        <Send className="h-4 w-4" />
                        Create Task
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Task Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-xs font-medium text-muted-foreground">Title</h3>
                      <p className="font-medium">{taskData.title}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-medium text-muted-foreground">Subject</h3>
                      <p>{taskData.subject.charAt(0).toUpperCase() + taskData.subject.slice(1).replace("-", " ")}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-medium text-muted-foreground">Priority</h3>
                      <Badge
                        variant={
                          taskData.priority === "high"
                            ? "destructive"
                            : taskData.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {taskData.priority.charAt(0).toUpperCase() + taskData.priority.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-xs font-medium text-muted-foreground">Due Date</h3>
                      <p>
                        {taskData.dueDate.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-xs font-medium text-muted-foreground">Description</h3>
                      <p className="text-sm">{taskData.description}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-xs font-medium text-muted-foreground">Collaborators</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {taskData.collaborators.map((collaborator) => (
                          <div key={collaborator.id} className="flex items-center gap-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                              <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{collaborator.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-sm">Completion Checklist</CardTitle>
                    <CardDescription>Track your progress with this checklist</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {aiAnalysis.subtasks.map((subtask, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Checkbox id={`checklist-${index}`} />
                          <label htmlFor={`checklist-${index}`} className="text-sm">
                            {subtask.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

