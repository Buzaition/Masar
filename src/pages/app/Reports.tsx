import { PieChart, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function Reports() {
  return (
    <div className="space-y-6 pb-20 md:pb-0 h-full flex flex-col">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">التقارير</h1>
          <p className="text-sm text-muted mt-1">تحليل أداء المكتب، القضايا، والمستحقات.</p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto gap-2">
          <Download className="w-4 h-4" /> تصدير تقرير شامل
        </Button>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Placeholder for real charts */}
        <div className="bg-paper border border-border rounded-lg p-6 shadow-sm min-h-[300px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <PieChart className="w-5 h-5 text-accent" /> توزيع القضايا حسب النوع
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-center bg-background rounded-lg border border-border/50 text-muted">
            {/* We could use Recharts here, but keeping it simple for the portfolio layout requirement to avoid clutter */}
            <div className="text-center space-y-4 w-full px-8">
              <div className="flex justify-between items-center text-sm">
                <span>مدني</span>
                <div className="w-1/2 h-2 bg-primary rounded-full"></div>
                <span className="font-mono">45%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>تجاري</span>
                <div className="w-1/2 h-2 bg-accent rounded-full" style={{ width: '30%' }}></div>
                <span className="font-mono">30%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>أسرة</span>
                <div className="w-1/2 h-2 bg-status-warning rounded-full" style={{ width: '15%' }}></div>
                <span className="font-mono">15%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>عمالي</span>
                <div className="w-1/2 h-2 bg-muted rounded-full" style={{ width: '10%' }}></div>
                <span className="font-mono">10%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-paper border border-border rounded-lg p-6 shadow-sm min-h-[300px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-status-success" /> معدل إنجاز المهام
            </h3>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center bg-background rounded-lg border border-border/50 p-6">
            <div className="text-5xl font-mono font-bold text-foreground mb-2">82%</div>
            <p className="text-muted text-sm text-center">نسبة المهام المكتملة في موعدها خلال الـ 30 يوماً الماضية.</p>
            
            <div className="w-full bg-border h-3 rounded-full mt-6 overflow-hidden">
              <div className="bg-status-success h-full" style={{ width: '82%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}