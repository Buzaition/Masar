import { useAppStore } from '../../store/useAppStore';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { 
  Briefcase, 
  AlertCircle, 
  Calendar, 
  FileWarning,
  CheckSquare, 
  Clock, 
  MessageSquare 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommandCenter() {
  const { user, cases, tasks, hearings } = useAppStore();

  const today = new Date();
  
  // Computations
  const activeCases = cases.filter(c => c.status === 'نشطة' || c.status === 'تحتاج إجراء');
  const upcomingHearings = hearings
    .filter(h => new Date(h.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  const pendingTasks = tasks.filter(t => t.status !== 'مكتملة');
  
  // Calculate attention items (fictional logic for demo)
  const attentionItems = [
    { type: 'document', title: 'مستند ناقص قبل جلسة قضية مطالبة مالية.', date: 'غداً', icon: FileWarning, caseId: 'case-1' },
    { type: 'task', title: 'مهمة تجاوزت موعدها: مراجعة عقد التوريد.', date: 'منذ يومين', icon: AlertCircle, caseId: 'case-1' },
    { type: 'client', title: 'عميل لم يتلق تحديثاً منذ سبعة أيام (مجموعة المدار).', date: 'تنبيه اتصال', icon: MessageSquare, caseId: 'case-2' },
    { type: 'hearing', title: 'جلسة بعد غد بدون ملاحظات تحضير.', date: 'الأربعاء القادم', icon: Calendar, caseId: 'case-4' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 md:pb-0">
      <header className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">صباح الخير، {user.name.split(' ')[0]}</h1>
        <p className="text-muted mt-1">هنا ملخص لما يحتاج تدخلك اليوم.</p>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Urgent Attention Column */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-status-critical"></span>
              ما يحتاج تدخلك الآن
            </h2>
            <div className="grid gap-3">
              {attentionItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg border border-status-critical/20 bg-status-critical/5 items-start">
                  <div className="bg-paper p-2 rounded-full shadow-sm text-status-critical shrink-0 border border-status-critical/10">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted mt-1">{item.date}</p>
                  </div>
                  <Link to={`/app/cases/${item.caseId}`} className="text-xs font-medium text-accent hover:underline shrink-0 whitespace-nowrap">
                    عرض القضية
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Quick Stats */}
            <section className="bg-paper border border-border rounded-lg p-5">
              <h3 className="text-sm font-bold text-muted mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                ملخص القضايا النشطة
              </h3>
              <div className="text-4xl font-mono font-bold text-foreground mb-2">{activeCases.length}</div>
              <div className="flex items-center gap-2 text-xs text-status-warning font-medium">
                <AlertCircle className="w-3 h-3" />
                {cases.filter(c => c.status === 'تحتاج إجراء').length} تحتاج إجراء
              </div>
            </section>

            <section className="bg-paper border border-border rounded-lg p-5">
              <h3 className="text-sm font-bold text-muted mb-4 flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                المهام المفتوحة
              </h3>
              <div className="text-4xl font-mono font-bold text-foreground mb-2">{pendingTasks.length}</div>
              <div className="text-xs text-muted">
                موزعة على {cases.length} قضايا
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Calendar / Hearings */}
          <section className="bg-paper border border-border rounded-lg overflow-hidden flex flex-col h-full max-h-[400px]">
            <div className="p-4 border-b border-border bg-background/50 flex justify-between items-center">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                الجلسات القادمة
              </h3>
              <Link to="/app/hearings" className="text-xs text-accent hover:underline">الكل</Link>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              {upcomingHearings.length > 0 ? (
                upcomingHearings.map(hearing => {
                  const caseInfo = cases.find(c => c.id === hearing.caseId);
                  return (
                    <div key={hearing.id} className="relative pl-4 border-r-2 border-accent">
                      <div className="text-xs font-mono text-muted bg-background w-fit px-1.5 rounded mb-1 border border-border">
                        {format(new Date(hearing.date), 'dd MMM yyyy', { locale: ar })}
                      </div>
                      <div className="font-medium text-sm text-foreground mb-1">{caseInfo?.title}</div>
                      <div className="text-xs text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {hearing.court}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-sm text-muted text-center py-4">لا توجد جلسات قادمة</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}