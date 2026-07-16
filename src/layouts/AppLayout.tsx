import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  LayoutDashboard, 
  Briefcase, 
  Calendar, 
  Users, 
  FileText, 
  CheckSquare, 
  CreditCard, 
  PieChart, 
  Settings,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function AppLayout() {
  const location = useLocation();
  const user = useAppStore(state => state.user);

  const navItems = [
    { icon: LayoutDashboard, label: 'الرئيسية', path: '/app' },
    { icon: Briefcase, label: 'القضايا', path: '/app/cases' },
    { icon: Calendar, label: 'الجلسات', path: '/app/hearings' },
    { icon: Users, label: 'العملاء', path: '/app/clients' },
    { icon: FileText, label: 'المستندات', path: '/app/documents' },
    { icon: CheckSquare, label: 'المهام', path: '/app/tasks' },
    { icon: CreditCard, label: 'المالية', path: '/app/finance' },
    { icon: Users, label: 'الفريق', path: '/app/team' },
    { icon: PieChart, label: 'التقارير', path: '/app/reports' },
    { icon: Settings, label: 'الإعدادات', path: '/app/settings' },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-l border-border bg-paper h-full transition-all duration-300">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="font-display font-bold text-lg text-primary flex items-center gap-2">
            مَسار
          </div>
          <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-sm">تجريبي</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link to="/app/cases/new" className="block mb-6">
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 justify-start gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              إجراء جديد
            </Button>
          </Link>
          
          <div className="text-xs font-semibold text-muted mb-2 px-2 mt-4">القائمة الرئيسية</div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-muted hover:bg-black/5 hover:text-foreground'
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? 'text-primary' : ''}`} />
                {item.label}
              </Link>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              {user.name.substring(0, 1)}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-xs text-muted truncate">{user.role}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-border bg-paper/50 backdrop-blur-sm flex items-center justify-between px-4 lg:px-8 z-10 shrink-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input 
                type="text" 
                placeholder="ابحث في القضايا، المستندات، العملاء..." 
                className="w-full h-10 pl-4 pr-10 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted hover:text-foreground rounded-full hover:bg-black/5 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-status-critical border border-paper"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-paper pb-safe z-50">
        <div className="flex justify-around items-center h-16">
          <Link to="/app" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/app' ? 'text-primary' : 'text-muted'}`}>
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-[10px] font-medium">الرئيسية</span>
          </Link>
          <Link to="/app/cases" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname.startsWith('/app/cases') && location.pathname !== '/app/cases/new' ? 'text-primary' : 'text-muted'}`}>
            <Briefcase className="h-5 w-5" />
            <span className="text-[10px] font-medium">القضايا</span>
          </Link>
          <Link to="/app/cases/new" className="flex flex-col items-center justify-center w-full h-full relative -top-4">
            <div className="h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg border-4 border-background">
              <Plus className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-medium text-accent mt-1">إجراء جديد</span>
          </Link>
          <Link to="/app/hearings" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname.startsWith('/app/hearings') ? 'text-primary' : 'text-muted'}`}>
            <Calendar className="h-5 w-5" />
            <span className="text-[10px] font-medium">الجلسات</span>
          </Link>
          <Link to="/app/settings" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname.startsWith('/app/settings') ? 'text-primary' : 'text-muted'}`}>
            <Settings className="h-5 w-5" />
            <span className="text-[10px] font-medium">المزيد</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
