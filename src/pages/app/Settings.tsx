import { useAppStore } from '../../store/useAppStore';
import { Button } from '../../components/ui/button';
import { Download, RefreshCcw, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { resetDemo } = useAppStore();
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة ضبط النسخة التجريبية؟ سيتم مسح جميع التعديلات التي قمت بها.')) {
      resetDemo();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-0">
      <header className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">الإعدادات</h1>
        <p className="text-sm text-muted mt-1">إعدادات المكتب والتحكم بالنسخة التجريبية.</p>
      </header>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <section className="bg-paper border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 border-b border-border pb-2">بيانات المكتب</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">اسم المكتب</label>
              <input type="text" defaultValue="مكتب النيل للمحاماة والاستشارات" disabled className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm text-muted cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">البريد الإلكتروني</label>
              <input type="text" defaultValue="info@nile-law.example.com" disabled className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm text-muted cursor-not-allowed dir-ltr text-right" />
            </div>
          </div>
        </section>

        {/* Demo Settings */}
        <section className="bg-paper border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 border-b border-border pb-2 text-accent">إعدادات النسخة التجريبية</h2>
          <div className="bg-accent/5 border border-accent/20 rounded-md p-4 mb-6 text-sm text-foreground">
            تُحفظ جميع التغييرات التي تقوم بها (إضافة قضايا، تغيير الحالات، إضافة مهام) محلياً في متصفحك الحالي باستخدام <span className="font-mono text-xs">localStorage</span>. لا تتم مشاركتها مع أي شخص آخر.
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-background border border-border rounded-lg gap-4">
              <div>
                <h4 className="font-bold text-sm mb-1">تصدير البيانات</h4>
                <p className="text-xs text-muted">حفظ نسخة احتياطية من التعديلات التي قمت بها في هذه التجربة بصيغة JSON.</p>
              </div>
              <Button variant="outline" className="shrink-0 gap-2">
                <Download className="w-4 h-4" /> تصدير
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-status-critical/5 border border-status-critical/20 rounded-lg gap-4">
              <div>
                <h4 className="font-bold text-sm text-status-critical mb-1">إعادة ضبط النسخة التجريبية</h4>
                <p className="text-xs text-status-critical/80">حذف جميع التعديلات والعودة إلى حالة العرض الافتراضية.</p>
              </div>
              <Button onClick={handleReset} className="shrink-0 bg-status-critical text-primary-foreground hover:bg-status-critical/90 gap-2">
                <RefreshCcw className="w-4 h-4" /> إعادة ضبط
              </Button>
            </div>
          </div>
        </section>
        
        {/* Account Actions */}
        <div className="flex justify-start">
          <Button onClick={handleLogout} variant="outline" className="gap-2 text-muted hover:text-foreground">
            <LogOut className="w-4 h-4" /> تسجيل الخروج من مسار
          </Button>
        </div>
      </div>
    </div>
  );
}