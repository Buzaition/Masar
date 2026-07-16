import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Scale, Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleDemoLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    navigate('/app');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md bg-paper border border-border rounded-xl shadow-xl overflow-hidden">
        <div className="p-8 text-center border-b border-border bg-background/50">
          <Link to="/" className="inline-flex items-center justify-center mb-6 text-primary">
            <Scale className="h-10 w-10 text-accent" />
          </Link>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">تسجيل الدخول إلى مَسار</h1>
          <p className="text-muted text-sm">أدخل بياناتك للوصول إلى مساحة العمل</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleDemoLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground block">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@masar.local"
                  className="w-full h-10 pl-3 pr-10 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left dir-ltr"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground block">كلمة المرور</label>
                <Link to="#" className="text-xs text-accent hover:underline">نسيت كلمة المرور؟</Link>
              </div>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Demo1234"
                  className="w-full h-10 pl-3 pr-10 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left dir-ltr"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base h-11">
              تسجيل الدخول
            </Button>
          </form>

          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative bg-paper px-4 text-xs text-muted font-medium">أو</div>
          </div>

          <div className="mt-8">
            <Button 
              onClick={() => handleDemoLogin()} 
              variant="outline" 
              className="w-full h-11 flex items-center gap-2 border-accent/30 hover:border-accent text-accent hover:bg-accent/5"
            >
              الدخول مباشرة إلى النسخة التجريبية
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}