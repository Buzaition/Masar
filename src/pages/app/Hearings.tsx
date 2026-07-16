import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Clock, MapPin, CheckSquare, ChevronRight, ChevronLeft, Briefcase, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

export default function Hearings() {
  const { hearings, cases, team } = useAppStore();
  const [view, setView] = useState<'week' | 'agenda'>('agenda');
  const [currentDate, setCurrentDate] = useState(new Date('2026-07-16T09:00:00Z')); // Anchor to demo date

  const startDate = startOfWeek(currentDate, { weekStartsOn: 6 }); // Saturday start in Egypt
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const sortedHearings = [...hearings].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6 pb-20 md:pb-0 h-full flex flex-col">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">جدول الجلسات</h1>
          <p className="text-sm text-muted mt-1">متابعة الجلسات والمواعيد القادمة.</p>
        </div>
        <div className="flex bg-paper border border-border rounded-md p-1">
          <button 
            onClick={() => setView('agenda')}
            className={cn("px-4 py-1.5 text-sm rounded transition-colors", view === 'agenda' ? "bg-primary text-primary-foreground font-medium" : "text-muted hover:text-foreground")}
          >
            أجندة
          </button>
          <button 
            onClick={() => setView('week')}
            className={cn("px-4 py-1.5 text-sm rounded transition-colors", view === 'week' ? "bg-primary text-primary-foreground font-medium" : "text-muted hover:text-foreground")}
          >
            أسبوعي
          </button>
        </div>
      </header>

      {/* Week View Calendar Header */}
      {view === 'week' && (
        <div className="bg-paper border border-border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg">{format(currentDate, 'MMMM yyyy', { locale: ar })}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setCurrentDate(d => addDays(d, -7))}>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date('2026-07-16T09:00:00Z'))}>
                اليوم
              </Button>
              <Button variant="outline" size="icon" onClick={() => setCurrentDate(d => addDays(d, 7))}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
            {weekDays.map((day, i) => {
              const dayHearings = sortedHearings.filter(h => isSameDay(new Date(h.date), day));
              const isToday = isSameDay(day, new Date('2026-07-16T09:00:00Z'));
              
              return (
                <div key={i} className={cn("min-h-[120px] bg-background p-2", isToday && "bg-primary/5")}>
                  <div className="text-center mb-2">
                    <div className="text-[10px] text-muted mb-0.5">{format(day, 'EEEE', { locale: ar })}</div>
                    <div className={cn("w-7 h-7 mx-auto rounded-full flex items-center justify-center text-sm font-bold", isToday ? "bg-primary text-primary-foreground" : "text-foreground")}>
                      {format(day, 'd')}
                    </div>
                  </div>
                  <div className="space-y-1">
                    {dayHearings.map(h => {
                      const c = cases.find(caseItem => caseItem.id === h.caseId);
                      return (
                        <div key={h.id} className="text-[10px] p-1.5 bg-paper border border-border rounded truncate hover:border-primary/50 cursor-pointer">
                          <span className="font-bold text-accent mr-1">{format(new Date(h.date), 'HH:mm')}</span>
                          {c?.title}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Agenda View */}
      {view === 'agenda' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {sortedHearings.map(hearing => {
            const caseInfo = cases.find(c => c.id === hearing.caseId);
            const lawyer = team.find(t => t.id === hearing.attendingLawyerId);
            const date = new Date(hearing.date);
            
            return (
              <div key={hearing.id} className="bg-paper border border-border rounded-lg shadow-sm flex flex-col hover:border-primary/50 transition-colors">
                <div className="p-4 border-b border-border flex justify-between items-start bg-background/50 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-background border border-border rounded-md p-2 text-center min-w-[50px]">
                      <div className="text-[10px] text-muted">{format(date, 'MMM', { locale: ar })}</div>
                      <div className="text-xl font-bold font-mono text-foreground">{format(date, 'dd')}</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-accent flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {format(date, 'HH:mm')} ص
                      </div>
                      <Link to={`/app/cases/${caseInfo?.id}`} className="font-bold text-foreground hover:text-primary transition-colors line-clamp-1">
                        {caseInfo?.title}
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 space-y-3 flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{hearing.court} - {hearing.circuit}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Briefcase className="w-4 h-4 shrink-0" />
                    <span className="truncate">المحامي: {lawyer?.name}</span>
                  </div>
                  
                  {hearing.notes && (
                    <div className="text-sm bg-accent/5 text-accent-foreground border border-accent/20 p-2 rounded flex items-start gap-2 mt-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                      <span className="text-foreground">{hearing.notes}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-border bg-background mt-auto rounded-b-lg">
                  <div className="text-xs font-bold text-muted mb-3 flex items-center gap-1">
                    <CheckSquare className="w-3.5 h-3.5" /> قائمة التحضير للجلسة
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/20" defaultChecked />
                      <span className="text-muted line-through">مراجعة ملف القضية</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/20" />
                      <span className="text-foreground">تجهيز حافظة المستندات</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/20" />
                      <span className="text-foreground">تأكيد حضور الموكل (إذا لزم)</span>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}