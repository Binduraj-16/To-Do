import { useState } from "react";
import { Trash2, GripVertical } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: string;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: "border-l-success",
  medium: "border-l-warning",
  high: "border-l-destructive",
};

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task.id), 300);
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-3 p-4 bg-card rounded-lg border-l-4 shadow-sm",
        "transition-all duration-300 hover:shadow-md animate-slide-in",
        priorityColors[task.priority],
        task.completed && "opacity-60",
        isDeleting && "animate-slide-out"
      )}
    >
      <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="data-[state=checked]:bg-success data-[state=checked]:border-success"
      />
      
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium transition-all duration-300",
            task.completed && "line-through text-muted-foreground"
          )}
        >
          {task.text}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">{task.category}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className={cn(
            "text-xs font-medium",
            task.priority === "high" && "text-destructive",
            task.priority === "medium" && "text-warning",
            task.priority === "low" && "text-success"
          )}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default TaskItem;
