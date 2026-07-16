import { useAppStore } from '../../store/useAppStore';
import { Briefcase, CheckSquare, Plus, Mail } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function Team() {
  const { team, cases, tasks } = useAppStore();

  return (
    <div className="space-y-6 pb-20 md:pb-0 h-full flex flex-col">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">فريق المكتب</h1>
          <p className="text-sm text-muted mt-1">إدارة المحامين والمساعدين والصلاحيات.</p>
        </div>
        <Button className="w-full sm:w-auto bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> إضافة عضو
        </Button>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(member => {
          const memberCases = cases.filter(c => c.assignedLawyerId === member.id && c.status !== 'مغلقة');
          const memberTasks = tasks.filter(t => t.assignedToId === member.id && t.status !== 'مكتملة');
          
          return (
            <div key={member.id} className="bg-paper border border-border rounded-lg p-5 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                  {member.name.substring(0, 1)}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">{member.name}</h3>
                  <div className="text-sm text-muted">{member.role}</div>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Mail className="w-4 h-4" /> {member.email}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                <div className="bg-background rounded p-3 text-center border border-border">
                  <div className="text-xs text-muted mb-1 flex justify-center items-center gap-1"><Briefcase className="w-3 h-3" /> القضايا</div>
                  <div className="font-bold text-foreground text-lg">{memberCases.length}</div>
                </div>
                <div className="bg-background rounded p-3 text-center border border-border">
                  <div className="text-xs text-muted mb-1 flex justify-center items-center gap-1"><CheckSquare className="w-3 h-3" /> المهام</div>
                  <div className="font-bold text-foreground text-lg">{memberTasks.length}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}