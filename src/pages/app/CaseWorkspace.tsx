import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { 
  FileText, Calendar, CheckSquare, Users, CreditCard, Activity, 
  Map, Edit, Plus, AlertCircle, Upload
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import type { StageStatus } from '../../types';

export default function CaseWorkspace() {
  const { id } = useParams();
  const { cases, clients, team, updateCaseStage } = useAppStore();
  
  const caseInfo = cases.find(c => c.id === id);
  const [activeTab, setActiveTab] = useState<'overview' | 'path' | 'hearings' | 'tasks' | 'docs' | 'parties' | 'finance' | 'activity'>('overview');

  if (!caseInfo) {
    return <div className="text-center py-20 text-muted">لم يتم العثور على القضية</div>;
  }

  const client = clients.find(c => c.id === caseInfo.clientId);
  const lawyer = team.find(t => t.id === caseInfo.assignedLawyerId);

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: FileText },
    { id: 'path', label: 'المسار', icon: Map },
    { id: 'hearings', label: 'الجلسات', icon: Calendar },
    { id: 'tasks', label: 'المهام', icon: CheckSquare },
    { id: 'docs', label: 'المستندات', icon: FileText },
    { id: 'parties', label: 'الأطراف', icon: Users },
    { id: 'finance', label: 'المصروفات', icon: CreditCard },
    { id: 'activity', label: 'سجل النشاط', icon: Activity },
  ] as const;

  const currentStage = caseInfo.stages.find(s => s.status === 'جارٍ' || s.status === 'يحتاج مراجعة') || caseInfo.stages[caseInfo.stages.length - 1];

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto pb-20 md:pb-0 h-full">
      
      {/* Case Spine / Context Panel (Visible on Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-[calc(100vh-8rem)] sticky top-4">
        {/* The physical spine look */}
        <div className="flex-1 bg-paper border-2 border-border rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="h-4 case-spine w-full border-b border-border"></div>
          
          <div className="p-5 flex-1 flex flex-col">
            <div className="text-xs font-mono bg-background border border-border px-2 py-1 rounded text-center mb-6">
              ملف رقم {caseInfo.code}
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="text-[10px] text-muted uppercase tracking-wider mb-1">الموكل</div>
                <div className="font-bold">{client?.name}</div>
              </div>
              <div>
                <div className="text-[10px] text-muted uppercase tracking-wider mb-1">المحكمة</div>
                <div className="text-sm font-medium">{caseInfo.court}</div>
              </div>
              <div>
                <div className="text-[10px] text-muted uppercase tracking-wider mb-1">المرحلة الحالية</div>
                <div className="text-sm font-medium text-accent bg-accent/10 px-2 py-1 rounded inline-block">
                  {currentStage?.title}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-border">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted">نسبة الإنجاز</span>
                <span className="font-bold">{caseInfo.completionPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border">
                <div className="h-full bg-primary" style={{ width: `${caseInfo.completionPercentage}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="h-4 case-spine w-full border-t border-border"></div>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-h-[calc(100vh-8rem)]">
        {/* Header */}
        <header className="bg-paper border border-border rounded-lg p-4 sm:p-6 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono bg-background border border-border px-2 py-0.5 rounded text-muted lg:hidden">
                  {caseInfo.code}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full border bg-status-success/10 border-status-success/20 text-status-success font-bold">
                  {caseInfo.status}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full border bg-background border-border text-muted font-bold">
                  أهمية {caseInfo.priority}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">{caseInfo.title}</h1>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> {lawyer?.name}
                </span>
                {caseInfo.nextHearingDate && (
                  <span className="flex items-center gap-1.5 text-accent font-medium">
                    <Calendar className="w-4 h-4" /> 
                    الجلسة القادمة: {format(new Date(caseInfo.nextHearingDate), 'dd MMM yyyy', { locale: ar })}
                  </span>
                )}
              </div>
            </div>
            
            <Button variant="outline" className="shrink-0 gap-2">
              <Edit className="w-4 h-4" />
              تعديل بيانات القضية
            </Button>
          </div>
          
          {/* Missing items alert */}
          {caseInfo.missingDocuments.length > 0 && (
            <div className="mt-6 bg-status-critical/5 border border-status-critical/20 rounded-md p-3 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-status-critical shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-status-critical mb-1">مستندات ناقصة تعيق المسار</h4>
                <ul className="text-xs text-status-critical/80 list-disc list-inside">
                  {caseInfo.missingDocuments.map((doc, i) => <li key={i}>{doc}</li>)}
                </ul>
              </div>
            </div>
          )}
        </header>

        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar border-b border-border mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors",
                activeTab === tab.id 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted hover:text-foreground hover:border-border"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 bg-paper border border-border rounded-lg p-6 shadow-sm">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in">
              <section>
                <h3 className="text-sm font-bold text-muted mb-4 border-b border-border pb-2">الخطوة التالية المقترحة</h3>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-primary">تجهيز حافظة مستندات للمحكمة</span>
                    <span className="text-xs bg-background px-2 py-1 rounded text-muted">مهمة تلقائية</span>
                  </div>
                  <p className="text-sm text-foreground mb-4">
                    نظراً لاقتراب موعد الجلسة، يجب طباعة المستندات الناقصة وإعداد حافظة المستندات.
                  </p>
                  <div className="flex gap-3">
                    <Button size="sm" className="bg-primary text-primary-foreground">إنشاء كمهمة لـ {lawyer?.name}</Button>
                    <Button size="sm" variant="outline">تجاهل</Button>
                  </div>
                </div>
              </section>

              <div className="grid md:grid-cols-2 gap-6">
                <section>
                  <h3 className="text-sm font-bold text-muted mb-4 border-b border-border pb-2">ملخص الوقائع</h3>
                  <p className="text-sm leading-relaxed text-foreground bg-background p-4 rounded border border-border">
                    القضية تتعلق بمطالبة مالية بناءً على عقد توريد مبرم بين الموكل والخصم. الخصم تخلف عن السداد في الموعد المتفق عليه رغم تسليم البضاعة كاملة ومطابقة للمواصفات.
                  </p>
                </section>
                <section>
                  <h3 className="text-sm font-bold text-muted mb-4 border-b border-border pb-2">أطراف القضية</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-background p-3 rounded border border-border">
                      <div>
                        <div className="text-xs text-muted mb-0.5">المدعي (الموكل)</div>
                        <div className="font-medium text-sm">{client?.name}</div>
                      </div>
                      <Link to="/app/clients" className="text-xs text-accent hover:underline">عرض الملف</Link>
                    </div>
                    <div className="flex items-center justify-between bg-background p-3 rounded border border-border">
                      <div>
                        <div className="text-xs text-muted mb-0.5">المدعى عليه (الخصم)</div>
                        <div className="font-medium text-sm">شركة المقاولات المتحدة</div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* Path Tab */}
          {activeTab === 'path' && (
            <div className="animate-in fade-in max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">مسار القضية</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" /> إضافة مرحلة
                </Button>
              </div>
              
              <div className="space-y-0 pl-6 border-r-2 border-border ml-2 py-4">
                {caseInfo.stages.map((stage) => {
                  const isCompleted = stage.status === 'مكتمل';
                  const isActive = stage.status === 'جارٍ' || stage.status === 'يحتاج مراجعة';
                  
                  return (
                    <div key={stage.id} className="relative pb-8 last:pb-0 pr-8">
                      {/* Node circle */}
                      <div className={cn(
                        "absolute right-[-9px] top-1 w-4 h-4 rounded-full ring-4 ring-paper z-10 transition-colors",
                        isCompleted ? "bg-status-success" :
                        isActive ? "bg-accent border-2 border-paper" :
                        "bg-background border-2 border-border"
                      )}></div>
                      
                      <div className={cn(
                        "bg-background border rounded-lg p-4 transition-all",
                        isActive ? "border-accent shadow-md" : "border-border",
                        !isCompleted && !isActive ? "opacity-60" : ""
                      )}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className={cn(
                              "text-xs font-bold px-2 py-0.5 rounded mb-2 inline-block",
                              isCompleted ? "bg-status-success/10 text-status-success" :
                              stage.status === 'يحتاج مراجعة' ? "bg-status-critical/10 text-status-critical" :
                              isActive ? "bg-accent/10 text-accent" :
                              "bg-paper text-muted"
                            )}>
                              {stage.status}
                            </span>
                            <h4 className="font-bold text-foreground text-base">{stage.title}</h4>
                          </div>
                          
                          <select 
                            className="text-xs bg-paper border border-border rounded px-2 py-1 focus:outline-none"
                            value={stage.status}
                            onChange={(e) => updateCaseStage(caseInfo.id, stage.id, e.target.value as StageStatus)}
                          >
                            <option value="مكتمل">مكتمل</option>
                            <option value="جارٍ">جارٍ</option>
                            <option value="يحتاج مراجعة">يحتاج مراجعة</option>
                            <option value="لم يبدأ">لم يبدأ</option>
                          </select>
                        </div>
                        
                        {stage.notes && (
                          <p className="text-sm text-status-critical mt-2 bg-status-critical/5 p-2 rounded">
                            ملاحظة: {stage.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Docs Tab (Simulated) */}
          {activeTab === 'docs' && (
            <div className="animate-in fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">مستندات القضية</h3>
                <Button className="bg-primary text-primary-foreground gap-2">
                  <Upload className="w-4 h-4" /> رفع مستند
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Folder cards */}
                {['مستندات العميل', 'صحف ومذكرات', 'إعلانات', 'محاضر وجلسات'].map(folder => (
                  <div key={folder} className="bg-background border border-border rounded-lg p-4 flex items-start gap-4 hover:border-primary/50 cursor-pointer transition-colors">
                    <div className="p-3 bg-paper rounded-lg shrink-0">
                      <FileText className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-sm">{folder}</div>
                      <div className="text-xs text-muted mt-1">{Math.floor(Math.random() * 5) + 1} ملفات</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs placeholders for demo */}
          {['hearings', 'tasks', 'parties', 'finance', 'activity'].includes(activeTab) && (
            <div className="animate-in fade-in flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center mb-4 text-muted">
                {tabs.find(t => t.id === activeTab)?.icon({ className: "w-8 h-8" })}
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">
                علامة التبويب: {tabs.find(t => t.id === activeTab)?.label}
              </h3>
              <p className="text-muted text-sm max-w-md">
                هذه المساحة مخصصة لعرض وإدارة التفاصيل المتعلقة بـ {tabs.find(t => t.id === activeTab)?.label} لهذه القضية. يتم تفعيلها بالكامل في النسخة النهائية.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}