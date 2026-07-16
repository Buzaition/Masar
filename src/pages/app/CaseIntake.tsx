import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../../components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2, Loader2, FileText, Upload } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function CaseIntake() {
  const navigate = useNavigate();
  const { addCase, clients } = useAppStore();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form State
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [title, setTitle] = useState('');
  const [court, setCourt] = useState('');
  const [type, setType] = useState('مدني');
  
  const steps = [
    { num: 1, title: 'الأطراف' },
    { num: 2, title: 'التصنيف والمحكمة' },
    { num: 3, title: 'الوقائع والمستندات' },
    { num: 4, title: 'المسار' },
  ];

  const handleGeneratePath = () => {
    setIsGenerating(true);
    setStep(4);
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
    }, 2500);
  };

  const handleSave = () => {
    addCase({
      title: title || 'قضية جديدة',
      code: `2024-${Math.floor(Math.random() * 900) + 100}`,
      clientId,
      court: court || 'محكمة غير محددة',
      circuit: 'دائرة مبدئية',
      year: '2024',
      status: 'نشطة',
      priority: 'عادية',
      assignedLawyerId: 'u-1',
      missingDocuments: ['توكيل', 'مستندات إثبات الشخصية'],
      stages: [
        { id: `st-${Date.now()}-1`, title: 'استلام مستندات العميل', status: 'مكتمل' },
        { id: `st-${Date.now()}-2`, title: 'صياغة العريضة', status: 'جارٍ' },
        { id: `st-${Date.now()}-3`, title: 'قيد الدعوى', status: 'لم يبدأ' },
        { id: `st-${Date.now()}-4`, title: 'حضور الجلسة الأولى', status: 'لم يبدأ' },
      ]
    });
    navigate('/app/cases');
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 md:pb-0">
      <header className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">إجراء جديد</h1>
        <p className="text-sm text-muted mt-1">أدخل البيانات الأولية وسيقوم مسار بإنشاء خارطة الطريق.</p>
      </header>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border -z-10"></div>
        {steps.map(s => (
          <div key={s.num} className="flex flex-col items-center gap-2 bg-background px-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors",
              step > s.num ? "bg-primary border-primary text-primary-foreground" : 
              step === s.num ? "bg-accent border-accent text-accent-foreground" : "bg-paper border-border text-muted"
            )}>
              {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
            </div>
            <span className={cn("text-xs font-medium hidden sm:block", step >= s.num ? "text-foreground" : "text-muted")}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-paper border border-border rounded-xl shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        {/* Step 1: Parties */}
        {step === 1 && (
          <div className="p-6 md:p-8 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-lg font-bold mb-6 border-b border-border pb-2">بيانات الأطراف</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">العميل (الموكل)</label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                >
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.type})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">صفة العميل</label>
                <select className="w-full h-10 px-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                  <option>مدعي / شاكي</option>
                  <option>مدعى عليه / مشكو في حقه</option>
                  <option>طالب</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">الخصم</label>
                <input 
                  type="text" 
                  placeholder="اسم الخصم..." 
                  className="w-full h-10 px-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Classification */}
        {step === 2 && (
          <div className="p-6 md:p-8 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-lg font-bold mb-6 border-b border-border pb-2">التصنيف والمحكمة</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">موضوع الدعوى / عنوان القضية</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: دعوى تعويض عن أضرار..." 
                  className="w-full h-10 px-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">نوع القضية</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  >
                    <option>مدني</option>
                    <option>تجاري</option>
                    <option>أسرة</option>
                    <option>عمالي</option>
                    <option>إداري</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">سنة الدعوى</label>
                  <input type="text" defaultValue="2024" className="w-full h-10 px-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">المحكمة أو الجهة</label>
                <input 
                  type="text"
                  value={court}
                  onChange={(e) => setCourt(e.target.value)} 
                  placeholder="مثال: محكمة جنوب القاهرة الابتدائية" 
                  className="w-full h-10 px-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Facts & Docs */}
        {step === 3 && (
          <div className="p-6 md:p-8 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-lg font-bold mb-6 border-b border-border pb-2">الوقائع والمستندات المتوفرة</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">ملخص مختصر للوقائع</label>
                <textarea 
                  rows={4} 
                  placeholder="اكتب ملخصاً يعين موجه القضية على بناء المسار..." 
                  className="w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">المستندات المرفقة مبدئياً</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center bg-background/50 cursor-pointer hover:bg-background transition-colors">
                  <Upload className="w-8 h-8 text-muted mb-2" />
                  <p className="text-sm font-medium">اسحب وأفلت المستندات هنا أو انقر للرفع</p>
                  <p className="text-xs text-muted mt-1">للمحاكاة فقط - لا يتم رفع ملفات حقيقية</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Generated Path */}
        {step === 4 && (
          <div className="p-6 md:p-8 flex-1 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-300">
            {isGenerating ? (
              <div className="text-center space-y-6">
                <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto" />
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">يتم إنشاء مسار القضية...</h3>
                  <p className="text-sm text-muted animate-pulse">تحليل البيانات... ترتيب المراحل... تحديد النواقص...</p>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-status-success/20 text-status-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">تم بناء مسار القضية بنجاح</h2>
                  <p className="text-sm text-muted">تم استنتاج 4 خطوات أساسية واكتشاف مستندين ناقصين.</p>
                </div>
                
                <div className="bg-background border border-border rounded-lg p-5">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
                    <div className="font-bold">المسار المقترح</div>
                    <Button variant="ghost" size="sm" className="text-accent h-8 text-xs">تعديل المسار</Button>
                  </div>
                  <div className="relative space-y-6 pt-2">
                    <div className="absolute right-3.5 top-0 bottom-0 w-0.5 bg-border/50"></div>
                    
                    <div className="relative flex items-center gap-4">
                      <div className="w-7 h-7 flex items-center justify-center bg-background z-10 shrink-0">
                        <div className="w-3 h-3 rounded-full bg-status-success"></div>
                      </div>
                      <span className="text-sm">استلام مستندات العميل</span>
                    </div>
                    
                    <div className="relative flex items-center gap-4">
                      <div className="w-7 h-7 flex items-center justify-center bg-background z-10 shrink-0">
                        <div className="w-3 h-3 rounded-full border-2 border-accent"></div>
                      </div>
                      <span className="text-sm font-bold text-foreground">صياغة العريضة (المرحلة الحالية)</span>
                    </div>
                    
                    <div className="relative flex items-center gap-4 opacity-60">
                      <div className="w-7 h-7 flex items-center justify-center bg-background z-10 shrink-0">
                        <div className="w-3 h-3 rounded-full border-2 border-border"></div>
                      </div>
                      <span className="text-sm">قيد الدعوى</span>
                    </div>
                    
                    <div className="relative flex items-center gap-4 opacity-60">
                      <div className="w-7 h-7 flex items-center justify-center bg-background z-10 shrink-0">
                        <div className="w-3 h-3 rounded-full border-2 border-border"></div>
                      </div>
                      <span className="text-sm">حضور الجلسة الأولى</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="text-sm font-medium text-status-critical mb-2">نواقص متوقعة لنجاح المسار:</div>
                    <ul className="list-disc list-inside text-sm text-muted space-y-1">
                      <li>توكيل رسمي عام في القضايا</li>
                      <li>مستندات إثبات الشخصية للمدعي</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-background flex justify-between mt-auto">
          {step > 1 && step < 4 ? (
            <Button variant="outline" onClick={() => setStep(s => s - 1)} className="gap-2">
              <ChevronRight className="w-4 h-4" />
              السابق
            </Button>
          ) : <div></div>}
          
          {step < 3 ? (
            <Button onClick={() => setStep(s => s + 1)} className="bg-primary text-primary-foreground gap-2">
              التالي
              <ChevronLeft className="w-4 h-4" />
            </Button>
          ) : step === 3 ? (
            <Button onClick={handleGeneratePath} className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 shadow-md">
              بناء المسار
              <FileText className="w-4 h-4" />
            </Button>
          ) : step === 4 && !isGenerating ? (
            <Button onClick={handleSave} className="bg-primary text-primary-foreground gap-2 w-full sm:w-auto">
              حفظ القضية والانتقال للملف
              <CheckCircle2 className="w-4 h-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}