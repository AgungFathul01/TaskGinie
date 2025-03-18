"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample task data
const tasks = [
  {
    id: 1,
    title: "Research Paper on Climate Change",
    date: "2025-03-25",
    difficulty: "High",
    subject: "Environmental Science",
  },
  {
    id: 2,
    title: "Calculus Problem Set",
    date: "2025-03-22",
    difficulty: "Medium",
    subject: "Mathematics",
  },
  {
    id: 3,
    title: "Literature Review",
    date: "2025-03-30",
    difficulty: "Low",
    subject: "English",
  },
  {
    id: 4,
    title: "Physics Lab Report",
    date: "2025-03-21",
    difficulty: "High",
    subject: "Physics",
  },
  {
    id: 5,
    title: "History Essay",
    date: "2025-04-05",
    difficulty: "Medium",
    subject: "History",
  },
  {
    id: 6,
    title: "Programming Assignment",
    date: "2025-04-10",
    difficulty: "High",
    subject: "Computer Science",
  },
]

export default function CalendarPage() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("month")

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

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
    setSelectedDate(new Date())
  }

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, isCurrentMonth: false })
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = new Date().toDateString() === date.toDateString()
      const isSelected = selectedDate.toDateString() === date.toDateString()

      // Find tasks for this day
      const dayTasks = tasks.filter((task) => {
        const taskDate = new Date(task.date)
        return taskDate.getDate() === day && taskDate.getMonth() === month && taskDate.getFullYear() === year
      })

      days.push({
        day,
        isCurrentMonth: true,
        isToday,
        isSelected,
        tasks: dayTasks,
      })
    }

    // Add empty cells for days after the last day of the month to complete the grid
    const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7
    for (let i = days.length; i < totalCells; i++) {
      days.push({ day: null, isCurrentMonth: false })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  // Get tasks for selected date
  const tasksForSelectedDate = tasks.filter((task) => {
    const taskDate = new Date(task.date)
    return taskDate.toDateString() === selectedDate.toDateString()
  })

  return (
    <div className="w-full p-8 max-w-[1600px] mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Calendar</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={goToToday}>
            Today
          </Button>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="mx-2 font-medium">
              {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Link href="/dashboard/new-task">
            <Button size="sm" className="gap-1">
              <Plus className="h-3.5 w-3.5" />
              <span>New Task</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1 text-xs sm:text-sm">
                {/* Weekday headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                  <div key={index} className="p-2 text-center font-medium">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`
    min-h-[60px] sm:min-h-[100px] border p-1 relative
    ${!day.isCurrentMonth ? "bg-muted/30 text-muted-foreground" : ""}
    ${day.isToday ? "border-primary" : "border-border"}
    ${day.isSelected ? "bg-primary/5" : ""}
    ${day.day ? "cursor-pointer hover:bg-muted/50" : ""}
  `}
                    onClick={() =>
                      day.day && setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.day))
                    }
                  >
                    {day.day && (
                      <>
                        <div className="flex justify-between">
                          <span
                            className={`
                            inline-flex h-6 w-6 items-center justify-center rounded-full text-sm
                            ${day.isToday ? "bg-primary text-primary-foreground" : ""}
                          `}
                          >
                            {day.day}
                          </span>
                          {day.tasks && day.tasks.length > 0 && (
                            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1 text-xs font-medium text-primary">
                              {day.tasks.length}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 space-y-1 overflow-hidden">
                          {day.tasks &&
                            day.tasks.slice(0, 2).map((task) => (
                              <div
                                key={task.id}
                                className="truncate rounded-sm bg-primary/10 px-1 py-0.5 text-xs"
                                title={task.title}
                              >
                                {task.title}
                              </div>
                            ))}
                          {day.tasks && day.tasks.length > 2 && (
                            <div className="text-xs text-muted-foreground">+{day.tasks.length - 2} more</div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{formatDate(selectedDate)}</CardTitle>
            </CardHeader>
            <CardContent>
              {tasksForSelectedDate.length > 0 ? (
                <div className="space-y-3">
                  {tasksForSelectedDate.map((task) => (
                    <Link href={`/dashboard/task/${task.id}`} key={task.id}>
                      <div className="rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium">{task.title}</h3>
                          <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{task.subject}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-3 mb-3">
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
                      className="h-6 w-6 text-muted-foreground"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <h3 className="font-medium mb-1">No tasks scheduled</h3>
                  <p className="text-sm text-muted-foreground mb-4">There are no tasks scheduled for this day.</p>
                  <Link href="/dashboard/new-task">
                    <Button size="sm" className="gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Task</span>
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

