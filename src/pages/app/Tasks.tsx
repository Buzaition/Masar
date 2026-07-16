import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../../components/ui/button';
import { CheckCircle2, Clock, AlertCircle, Plus } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { ar } from 'date-fns/locale';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

export default function Tasks() {
  const { tasks, cases, team, completeTask } = useAppStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('pending');

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return t.status !== 'مكتملة';
    if (filter === 'completed') return t.status === 'مكتملة';
    return true;
  }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="space-y-6 pb-20 md:pb-0 h-full flex flex-col">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">المهام</h1>
          <p className="text-sm text-muted mt-1">تتبع مهام المكتب وتوزيعها على الفريق.</p>
        </div>
        <Button className="w-full sm:w-auto bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> مهمة جديدة
        </Button>
      </header>

      <div className="bg-paper p-4 rounded-lg border border-border flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex bg-background border border-border rounded-md p-1 w-full sm:w-auto">
          <button 
            onClick={() => setFilter('pending')}
            className={cn("flex-1 px-4 py-1.5 text-sm rounded transition-colors", filter === 'pending' ? "bg-primary text-primary-foreground font-medium" : "text-muted hover:text-foreground")}
          >
            المهام المفتوحة
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={cn("flex-1 px-4 py-1.5 text-sm rounded transition-colors", filter === 'completed' ? "bg-primary text-primary-foreground font-medium" : "text-muted hover:text-foreground")}
          >
            المكتملة
          </button>
          <button 
            onClick={() => setFilter('all')}
            className={cn("flex-1 px-4 py-1.5 text-sm rounded transition-colors", filter === 'all' ? "bg-primary text-primary-foreground font-medium" : "text-muted hover:text-foreground")}
          >
            الكل
          </button>
        </div>
        <div className="flex-1"></div>
        <div className="text-sm text-muted font-medium bg-background px-3 py-1.5 rounded-md border border-border">
          إجمالي المهام المفتوحة: <span className="font-bold text-foreground">{tasks.filter(t => t.status !== 'مكتملة').length}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 content-start">
        {filteredTasks.map(task => {
          const caseInfo = cases.find(c => c.id === task.caseId);
          const assignee = team.find(t => t.id === task.assignedToId);
          const dueDate = new Date(task.dueDate);
          const overdue = isPast(dueDate) && !isToday(dueDate) && task.status !== 'مكتملة';
          
          return (
            <div key={task.id} className={cn(
              "bg-paper border rounded-lg p-5 shadow-sm transition-all",
              task.status === 'مكتملة' ? "opacity-70 border-border" :
              overdue ? "border-status-critical shadow-[0_0_10px_rgba(158,63,63,0.1)]" : "border-border hover:border-primary/50"
            )}>
              <div className="flex justify-between items-start mb-3">
                <div className={cn(
                  "text-xs px-2 py-0.5 rounded font-medium",
                  task.status === 'مكتملة' ? "bg-status-success/10 text-status-success" :
                  overdue ? "bg-status-critical/10 text-status-critical" :
                  "bg-background border border-border text-muted"
                )}>
                  {task.status}
                </div>
                {task.priority === 'عالية' && task.status !== 'مكتملة' && (
                  <div className="text-[10px] bg-status-critical text-primary-foreground px-1.5 py-0.5 rounded font-bold">عاجل</div>
                )}
              </div>
              
              <h3 className={cn("font-bold text-lg mb-2", task.status === 'مكتملة' && "line-through text-muted")}>
                {task.title}
              </h3>
              
              <div className="space-y-2 mb-4">
                {caseInfo && (
                  <Link to={`/app/cases/${caseInfo.id}`} className="text-sm text-accent hover:underline block truncate">
                    قضية: {caseInfo.title}
                  </Link>
                )}
                
                <div className="flex items-center gap-2 text-xs text-muted">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {assignee?.name.substring(0, 1)}
                  </div>
                  <span>{assignee?.name}</span>
                </div>
                
                <div className={cn(
                  "flex items-center gap-1.5 text-xs font-medium",
                  overdue ? "text-status-critical" : "text-muted"
                )}>
                  {overdue ? <AlertCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  الموعد: {format(dueDate, 'dd MMM (HH:mm)', { locale: ar })}
                </div>
              </div>
              
              {task.status !== 'مكتملة' && (
                <div className="pt-3 border-t border-border mt-auto">
                  <Button 
                    onClick={() => completeTask(task.id)}
                    variant="outline" 
                    className="w-full gap-2 border-status-success text-status-success hover:bg-status-success/10"
                  >
                    <CheckCircle2 className="w-4 h-4" /> تحديد كمكتملة
                  </Button>
                </div>
              )}
            </div>
          );
        })}
        {filteredTasks.length === 0 && (
          <div className="col-span-full text-center py-12 bg-paper border border-dashed border-border rounded-lg">
            <CheckCircle2 className="w-12 h-12 text-border mx-auto mb-3" />
            <p className="text-muted font-medium">لا توجد مهام مطابقة</p>
          </div>
        )}
      </div>
    </div>
  );
}