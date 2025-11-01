import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import TaskInput from "@/components/TaskInput";
import TaskItem, { Task, Priority } from "@/components/TaskItem";
import TaskFilters from "@/components/TaskFilters";
import { toast } from "sonner";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("taskflow-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
    }
  }, []);

  const addTask = (text: string, priority: Priority, category: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      category,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
    toast.success("Task added successfully!");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updated = { ...task, completed: !task.completed };
        if (updated.completed) {
          toast.success("Task completed! 🎉", {
            description: task.text,
          });
        }
        return updated;
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.info("Task deleted");
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 font-['Inter']">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-4 shadow-glow">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            BinTasks
          </h1>
          <p className="text-muted-foreground">
            My personal task manager to stay organized
          </p>
        </div>

        {/* Task Input */}
        <div className="mb-6 animate-scale-in">
          <TaskInput onAddTask={addTask} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TaskFilters
            activeFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground animate-fade-in">
              <p className="text-lg">
                {filter === "completed"
                  ? "No completed tasks yet"
                  : filter === "active"
                  ? "No active tasks. Add one above!"
                  : "No tasks yet. Start by adding one above!"}
              </p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>

        {/* Stats Footer */}
        {tasks.length > 0 && (
          <div className="mt-8 p-4 bg-card/50 rounded-lg text-center text-sm text-muted-foreground animate-fade-in">
            {counts.active} active • {counts.completed} completed • {counts.all} total
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
