import { CreditCard, TrendingUp, DollarSign, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function Finance() {
  return (
    <div className="space-y-6 pb-20 md:pb-0 h-full flex flex-col">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">المالية</h1>
          <p className="text-sm text-muted mt-1">متابعة أتعاب القضايا والمصروفات.</p>
        </div>
        <Button className="w-full sm:w-auto bg-primary text-primary-foreground gap-2">
          <CreditCard className="w-4 h-4" /> تسجيل دفعة
        </Button>
      </header>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-paper border border-border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-muted">إجمالي الأتعاب المحصلة</h3>
            <div className="p-2 bg-status-success/10 text-status-success rounded">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-foreground mb-1 dir-ltr text-right">EGP 145,000</div>
          <div className="text-xs text-status-success font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +12% عن الشهر الماضي
          </div>
        </div>
        
        <div className="bg-paper border border-border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-muted">أتعاب مستحقة (قيد الانتظار)</h3>
            <div className="p-2 bg-accent/10 text-accent rounded">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-foreground mb-1 dir-ltr text-right">EGP 32,500</div>
          <div className="text-xs text-muted font-medium">موزعة على 4 قضايا</div>
        </div>

        <div className="bg-paper border border-border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-muted">مصروفات القضايا (هذا الشهر)</h3>
            <div className="p-2 bg-status-critical/10 text-status-critical rounded">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-foreground mb-1 dir-ltr text-right">EGP 8,400</div>
          <div className="text-xs text-status-critical font-medium flex items-center gap-1">
            <ArrowDownRight className="w-3 h-3" /> تم سدادها للرسوم
          </div>
        </div>
      </div>

      <div className="bg-paper border border-border rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-background/50">
          <h3 className="font-bold">سجل المعاملات الأخير</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" /> كشف حساب
          </Button>
        </div>
        <div className="p-12 text-center text-muted flex-1 flex flex-col items-center justify-center">
          <CreditCard className="w-12 h-12 text-border mb-3" />
          <p className="font-medium">جدول المعاملات متاح في النسخة الكاملة</p>
          <p className="text-sm mt-2 max-w-sm mx-auto">تتيح لك شاشة المالية الكاملة تتبع كل دفعة وإيصال وربطها بقضية معينة ومحامي لتسهيل المحاسبة.</p>
        </div>
      </div>
    </div>
  );
}