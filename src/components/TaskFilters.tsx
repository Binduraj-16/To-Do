import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface TaskFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

const TaskFilters = ({ activeFilter, onFilterChange, counts }: TaskFiltersProps) => {
  return (
    <Tabs value={activeFilter} onValueChange={onFilterChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-secondary">
        <TabsTrigger value="all" className="relative">
          All
          <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
            {counts.all}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="active" className="relative">
          Active
          <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
            {counts.active}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="completed" className="relative">
          Completed
          <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
            {counts.completed}
          </Badge>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TaskFilters;
