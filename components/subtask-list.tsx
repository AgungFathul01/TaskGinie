"use client"

import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Clock, Play } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SubtaskList({ subtasks, taskId, onToggleSubtask, onStartTimer }) {
  // Get collaborator by ID
  const getCollaborator = (collaboratorId, collaborators) => {
    return collaborators?.find((collab) => collab.id === collaboratorId) || null
  }

  return (
    <div className="space-y-2">
      {subtasks.map((subtask) => (
        <div key={subtask.id} className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-3">
            <Checkbox
              id={`subtask-${subtask.id}`}
              checked={subtask.completed}
              onCheckedChange={() => onToggleSubtask(subtask.id)}
            />
            <div>
              <Link
                href={`/dashboard/task/${taskId}/subtask/${subtask.id}`}
                className={`hover:underline ${subtask.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {subtask.title}
              </Link>
              {subtask.assignedTo && (
                <div className="flex items-center gap-1 mt-1">
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={subtask.assignedTo.avatar} />
                    <AvatarFallback className="text-[8px]">{subtask.assignedTo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{subtask.assignedTo.name}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{subtask.estimatedTime}</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => onStartTimer(subtask.id)}
                    disabled={subtask.completed}
                  >
                    <Play className="h-3.5 w-3.5 mr-1" />
                    Start
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Start timer for this subtask</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      ))}
    </div>
  )
}

