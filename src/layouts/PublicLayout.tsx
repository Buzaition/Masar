import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Scale } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ICCBranding from '../components/ICCBranding';

const navLinks = [
  { id: 'features', label: 'المزايا' },
  { id: 'how-it-works', label: 'كيف يعمل' },
  { id: 'solutions', label: 'للمكاتب' },
  { id: 'pricing', label: 'الأسعار' },
  { id: 'contact', label: 'تواصل معنا' }
];

export default function PublicLayout() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      // Offset for navbar height + some buffer padding
      const scrollPosition = window.scrollY + 120; 
      
      let currentIndex = -1;
      let nextIndex = -1;
      let progress = 0;

      // Find which section we are currently scrolling through
      for (let i = 0; i < navLinks.length; i++) {
        const element = document.getElementById(navLinks[i].id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentIndex = i;
            // The next section to transition to (if we are at the last section, cap it)
            nextIndex = i + 1 < navLinks.length ? i + 1 : i;
            progress = (scrollPosition - top) / height;
            break;
          }
        }
      }
      
      if (currentIndex === -1) {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
        setActiveSection('');
        return;
      }

      setActiveSection(navLinks[currentIndex].id);

      const currentLink = document.getElementById(`nav-link-${navLinks[currentIndex].id}`);
      const nextLink = document.getElementById(`nav-link-${navLinks[nextIndex].id}`);
      
      if (currentLink && nextLink && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        
        const currRect = currentLink.getBoundingClientRect();
        const currLeft = currRect.left - navRect.left;
        const currWidth = currRect.width;

        const nextRect = nextLink.getBoundingClientRect();
        const nextLeft = nextRect.left - navRect.left;
        const nextWidth = nextRect.width;

        // Interpolate exactly based on scroll progress through the section
        const interpolatedLeft = currLeft + (nextLeft - currLeft) * progress;
        const interpolatedWidth = currWidth + (nextWidth - currWidth) * progress;

        setIndicatorStyle({
          left: interpolatedLeft,
          width: interpolatedWidth,
          opacity: 1
        });
      }
    };

    // We use a high refresh rate listener without passive true to ensure it tracks smoothly
    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl w-full mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-accent" />
            <span className="font-display font-bold text-xl tracking-tight text-foreground">مَسار</span>
            <span className="bg-paper text-xs text-muted border border-border px-2 py-0.5 rounded-full mr-2 hidden sm:inline-block">نسخة تجريبية</span>
          </div>
          
          <nav ref={navRef} className="hidden md:flex items-center gap-6 text-sm font-medium text-muted relative h-full">
            {/* Sliding Indicator */}
            <div 
              className="absolute bottom-0 h-0.5 bg-accent rounded-t-full"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity
              }}
            />
            
            {navLinks.map((link) => (
              <a 
                key={link.id}
                id={`nav-link-${link.id}`}
                href={`#${link.id}`} 
                className={`h-full flex items-center transition-colors relative z-10 ${activeSection === link.id ? 'text-foreground font-bold' : 'hover:text-foreground'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="hidden sm:inline-flex text-muted hover:text-foreground">
                تسجيل الدخول
              </Button>
            </Link>
            <Link to="/app">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                جرّب النسخة التجريبية
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-paper py-12">
        <div className="max-w-7xl w-full mx-auto px-4 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2 text-foreground font-display font-bold text-lg">
            <Scale className="h-5 w-5 text-accent" />
            مَسار
          </div>
          <p className="text-muted text-sm max-w-md mb-4">
            مساحة العمل الذكية للمحامي المصري. نظّم القضايا، تابع الجلسات، واعرف الخطوة التالية من مكان واحد.
          </p>
          <p className="text-xs text-muted/60">هذه نسخة تجريبية لعرض تجربة النظام ولا تمثل استشارة قانونية.</p>
          <div className="text-xs text-muted/40 mt-8 flex flex-col items-center gap-2">
            <span>&copy; {new Date().getFullYear()} جميع الحقوق محفوظة</span>
          </div>
          <div className="mt-8 border-t border-border/50 pt-8 w-full flex justify-center">
            <ICCBranding />
          </div>
        </div>
      </footer>
    </div>
  );
}
