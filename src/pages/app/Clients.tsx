import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Search, Plus, Mail, Phone, Clock, FileText, Send } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function Clients() {
  const { clients, cases } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const filteredClients = clients.filter(c => c.name.includes(searchTerm) || c.email.includes(searchTerm));

  const openUpdateModal = () => {
    setShowUpdateModal(true);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">العملاء</h1>
          <p className="text-sm text-muted mt-1">إدارة بيانات موكليك والتواصل معهم.</p>
        </div>
        <Button className="w-full sm:w-auto bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> إضافة عميل
        </Button>
      </header>

      <div className="bg-paper p-4 rounded-lg border border-border flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input 
            type="text" 
            placeholder="بحث عن عميل..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-4 pr-10 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map(client => {
          const clientCases = cases.filter(c => c.clientId === client.id);
          const activeClientCases = clientCases.filter(c => c.status === 'نشطة' || c.status === 'تحتاج إجراء');
          
          return (
            <div key={client.id} className="bg-paper border border-border rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-border">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {client.name.substring(0, 1)}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{client.name}</h3>
                      <div className="text-xs text-muted px-2 py-0.5 bg-background border border-border rounded inline-block mt-1">
                        {client.type}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> <span className="dir-ltr">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> <span>{client.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-background flex-1">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm font-medium flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-muted" /> القضايا
                  </div>
                  <div className="text-xs font-bold bg-paper border border-border px-2 py-0.5 rounded">
                    {clientCases.length} قضايا ({activeClientCases.length} نشطة)
                  </div>
                </div>
                
                {client.lastUpdate && (
                  <div className="text-xs text-muted flex items-center gap-1.5 bg-paper p-2 rounded border border-border">
                    <Clock className="w-3.5 h-3.5" /> 
                    آخر تحديث للعميل: {format(new Date(client.lastUpdate), 'dd MMM yyyy', { locale: ar })}
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-border bg-paper mt-auto">
                <Button 
                  onClick={() => openUpdateModal()}
                  variant="outline" 
                  className="w-full text-primary border-primary/20 hover:bg-primary/5 hover:border-primary gap-2"
                >
                  <Send className="w-4 h-4" /> إنشاء تحديث للعميل
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Draft Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-paper border border-border rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border bg-background flex justify-between items-center">
              <h3 className="font-bold text-lg">رسالة تحديث للعميل</h3>
              <button onClick={() => setShowUpdateModal(false)} className="text-muted hover:text-foreground">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-status-info/10 text-status-info border border-status-info/20 p-3 rounded text-sm mb-4">
                تلميح: يقوم مسار بصياغة مسودة مبدئية بناءً على آخر التطورات في القضية. (للنسخة التجريبية: الرسائل لا تُرسل حقيقة)
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">القضية المتعلقة</label>
                <select className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>مطالبة مالية (2024-045)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">نص الرسالة</label>
                <textarea 
                  rows={6}
                  className="w-full p-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  defaultValue={`السيد المحترم/ ممثل شركة الأفق،\n\nنحيطكم علماً بأنه تم الانتهاء من مراجعة المستندات الخاصة بقضية المطالبة المالية، وتجري حالياً صياغة صحيفة الدعوى.\n\nيرجى العلم بوجود جلسة قادمة بتاريخ 17 يوليو، ونحن بحاجة إلى نسخة من عقد التوريد الأصلي في أقرب وقت.\n\nمع التحية،\nمكتب النيل للمحاماة`}
                ></textarea>
              </div>
            </div>
            <div className="p-4 border-t border-border bg-background flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowUpdateModal(false)}>إلغاء</Button>
              <Button onClick={() => setShowUpdateModal(false)} className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                إرسال التحديث <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}