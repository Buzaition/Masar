import { FileText, Search, Filter, Folder, Download, MoreVertical } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useAppStore } from '../../store/useAppStore';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function DocumentsCenter() {
  const { cases } = useAppStore();

  const documents = [
    { id: '1', name: 'عقد التوريد الأصلي.pdf', size: '2.4 MB', type: 'مستند موكل', caseId: 'case-1', date: '2024-05-10T10:00:00Z', status: 'معتمد' },
    { id: '2', name: 'صحيفة دعوى - مسودة 1.docx', size: '1.1 MB', type: 'صحيفة دعوى', caseId: 'case-1', date: '2024-06-15T14:30:00Z', status: 'تحت المراجعة' },
    { id: '3', name: 'توكيل عام قضايا.jpg', size: '3.5 MB', type: 'مستند موكل', caseId: 'case-2', date: '2024-04-20T09:15:00Z', status: 'معتمد' },
    { id: '4', name: 'محضر جلسة 12-5.pdf', size: '1.8 MB', type: 'محضر جلسة', caseId: 'case-4', date: '2024-05-12T13:00:00Z', status: 'مؤرشف' },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-0 h-full flex flex-col">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">مركز المستندات</h1>
          <p className="text-sm text-muted mt-1">المكتبة المركزية لمستندات المكتب والقضايا.</p>
        </div>
        <Button className="w-full sm:w-auto bg-primary text-primary-foreground">
          رفع مستند جديد
        </Button>
      </header>

      <div className="grid md:grid-cols-4 gap-6 flex-1">
        {/* Sidebar / Folders */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-paper p-4 rounded-lg border border-border shadow-sm">
            <h3 className="font-bold text-sm text-muted mb-3 uppercase">التصنيفات</h3>
            <ul className="space-y-1">
              {['كل المستندات', 'مستندات العملاء', 'صحف ومذكرات', 'محاضر وجلسات', 'نماذج المكتب'].map((folder, i) => (
                <li key={i}>
                  <button className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors ${i === 0 ? 'bg-primary/10 text-primary font-medium' : 'text-muted hover:bg-black/5 hover:text-foreground'}`}>
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4" /> {folder}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
            <h3 className="font-bold text-sm text-accent mb-2">استوديو المستندات</h3>
            <p className="text-xs text-muted mb-3">أنشئ مستندات جديدة بسرعة باستخدام نماذج المكتب المعتمدة.</p>
            <Button size="sm" variant="outline" className="w-full bg-background border-accent/20 text-accent">استكشف النماذج</Button>
          </div>
        </div>

        {/* Main List */}
        <div className="md:col-span-3 bg-paper border border-border rounded-lg shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-background/50 flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input 
                type="text" 
                placeholder="ابحث باسم المستند، القضية..." 
                className="w-full h-9 pl-4 pr-10 rounded border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2 shrink-0">
              <Filter className="w-4 h-4" /> تصفية
            </Button>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-background border-b border-border text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">اسم المستند</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">القضية</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">النوع</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">التاريخ</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {documents.map(doc => {
                  const caseInfo = cases.find(c => c.id === doc.caseId);
                  return (
                    <tr key={doc.id} className="hover:bg-background/50 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-background border border-border rounded text-muted">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{doc.name}</div>
                            <div className="text-[10px] text-muted">{doc.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted">{caseInfo?.title || '-'}</td>
                      <td className="px-4 py-3"><span className="bg-background border border-border px-2 py-0.5 rounded text-xs text-muted">{doc.type}</span></td>
                      <td className="px-4 py-3 text-muted text-xs">{format(new Date(doc.date), 'dd MMM yyyy', { locale: ar })}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-muted hover:text-primary rounded hover:bg-primary/10 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-muted hover:text-foreground rounded hover:bg-black/5 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}