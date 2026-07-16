import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../../components/ui/button';
import type { CaseStatus, CasePriority } from '../../types';
import { Search, Filter, Plus, FileText, AlertCircle, Clock, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { cn } from '../../lib/utils';

export default function Cases() {
  const { cases, clients, team } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'الكل'>('الكل');

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.title.includes(searchTerm) || c.code.includes(searchTerm);
    const matchesStatus = statusFilter === 'الكل' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case 'تحتاج إجراء': return 'text-status-critical bg-status-critical/10 border-status-critical/20';
      case 'نشطة': return 'text-status-success bg-status-success/10 border-status-success/20';
      case 'في انتظار العميل': return 'text-status-warning bg-status-warning/10 border-status-warning/20';
      case 'مؤجلة': return 'text-muted bg-black/5 border-border';
      default: return 'text-foreground bg-paper border-border';
    }
  };

  const getPriorityColor = (priority: CasePriority) => {
    switch (priority) {
      case 'عالية': return 'text-status-critical';
      case 'متوسطة': return 'text-status-warning';
      case 'عادية': return 'text-status-success';
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">القضايا</h1>
          <p className="text-sm text-muted mt-1">إدارة جميع ملفات القضايا والنزاعات.</p>
        </div>
        <Link to="/app/cases/new">
          <Button className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            إجراء جديد (قضية)
          </Button>
        </Link>
      </header>

      {/* Filters */}
      <div className="bg-paper p-4 rounded-lg border border-border flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input 
            type="text" 
            placeholder="رقم القضية، اسم الموكل، موضوع الدعوى..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-4 pr-10 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar items-center shrink-0">
          <span className="text-sm font-medium text-muted mr-2 flex items-center gap-1">
            <Filter className="w-4 h-4" /> تصفية:
          </span>
          {(['الكل', 'نشطة', 'تحتاج إجراء', 'في انتظار العميل', 'مغلقة'] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-colors",
                statusFilter === status 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-background text-muted border-border hover:border-muted"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Cases List */}
      <div className="grid gap-4">
        {filteredCases.map(c => {
          const client = clients.find(cl => cl.id === c.clientId);
          const lawyer = team.find(t => t.id === c.assignedLawyerId);
          
          return (
            <Link key={c.id} to={`/app/cases/${c.id}`} className="block group">
              <div className="bg-paper border border-border rounded-lg p-5 hover:border-primary/50 transition-colors shadow-sm relative overflow-hidden">
                {/* Visual case spine element */}
                <div className="absolute right-0 top-0 bottom-0 w-2 case-spine opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex flex-col md:flex-row gap-4 justify-between pr-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono bg-background border border-border px-2 py-0.5 rounded text-muted">
                        {c.code}
                      </span>
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-bold", getStatusColor(c.status))}>
                        {c.status}
                      </span>
                      {c.missingDocuments.length > 0 && (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-status-critical/20 bg-status-critical/10 text-status-critical font-bold">
                          <AlertCircle className="w-3 h-3" />
                          نواقص
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {c.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center text-[8px] text-accent font-bold">م</span>
                        {client?.name}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4" />
                        {c.court}
                      </span>
                      {c.nextHearingDate && (
                        <span className="flex items-center gap-1.5 text-foreground font-medium bg-background px-2 py-0.5 rounded border border-border">
                          <Clock className="w-3 h-3 text-accent" />
                          الجلسة: {format(new Date(c.nextHearingDate), 'dd MMM', { locale: ar })}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-r border-border pt-4 md:pt-0 md:pr-6 shrink-0">
                    <div className="text-right">
                      <div className="text-xs text-muted mb-1">المحامي المسؤول</div>
                      <div className="font-medium text-sm text-foreground">{lawyer?.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted mb-1 flex items-center gap-1 justify-end">
                        <div className={cn("w-2 h-2 rounded-full", getPriorityColor(c.priority))}></div>
                        أهمية {c.priority}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-background rounded-full overflow-hidden border border-border/50">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${c.completionPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-mono font-medium">{c.completionPercentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        {filteredCases.length === 0 && (
          <div className="text-center py-12 bg-paper border border-dashed border-border rounded-lg">
            <Briefcase className="w-12 h-12 text-border mx-auto mb-3" />
            <p className="text-muted font-medium">لا توجد قضايا تطابق بحثك</p>
          </div>
        )}
      </div>
    </div>
  );
}