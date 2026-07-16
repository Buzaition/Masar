import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { 
  ArrowLeft, CheckCircle2, CheckSquare, FileText, 
  CalendarDays, Users, Shield, Clock, BarChart3, Building2 
} from 'lucide-react';
import ICCBranding from '../../components/ICCBranding';

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl w-full mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Right Side (Content) */}
            <div className="flex-1 text-center lg:text-right z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                مساحة العمل الذكية للمحامي المصري
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] mb-8">
                اعرف الخطوة التالية <br className="hidden lg:block" /> في كل قضية
              </h1>
              <p className="text-xl md:text-2xl text-muted mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                مسار يجمع ملفات القضايا، الجلسات، المستندات، المهام والتواصل مع العملاء داخل مساحة عمل واحدة صُممت لطريقة عمل المحامي المصري.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <Link to="/app">
                  <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg text-lg h-14 px-8">
                    ابدأ جولة داخل مسار
                    <ArrowLeft className="mr-3 h-6 w-6" />
                  </Button>
                </Link>
                <a href="#how-it-works" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full text-lg h-14 px-8">
                    شاهد كيف يعمل
                  </Button>
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-muted">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-status-success" />
                  لا يتطلب بطاقة دفع
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-status-success" />
                  بيانات تجريبية بالكامل
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-status-success" />
                  يعمل على الهاتف والكمبيوتر
                </div>
              </div>
            </div>

            {/* Left Side (Visuals) */}
            <div className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-border/50 bg-paper">
                {/* Window Bar */}
                <div className="h-10 border-b border-border/50 bg-background/80 flex items-center px-4 gap-2 backdrop-blur-md">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50"></div>
                </div>
                {/* Image */}
                <img 
                  src="/hero-artwork.png" 
                  alt="MASAR Workspace" 
                  className="w-full h-auto object-cover transform transition-transform hover:scale-[1.02] duration-700 ease-out"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -right-6 -bottom-6 -z-10 w-full h-full bg-accent/10 border border-accent/20 rounded-2xl"></div>
              <div className="absolute -left-6 -top-6 -z-10 w-full h-full bg-primary/5 border border-primary/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <section className="border-y border-border bg-paper py-8">
        <div className="max-w-7xl w-full mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-primary font-bold text-lg">ملف موحّد</span>
              <span className="text-muted text-sm">لكل قضية</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-primary font-bold text-lg">تذكيرات تلقائية</span>
              <span className="text-muted text-sm">للجلسات والمهام</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-primary font-bold text-lg">مستندات مرتبة</span>
              <span className="text-muted text-sm">وقابلة للبحث</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-primary font-bold text-lg">تجربة عربية</span>
              <span className="text-muted text-sm">مُصممة خصيصاً للمحامي</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-7xl w-full mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">كل ما يحتاجه المحامي في مكان واحد</h2>
            <p className="text-lg text-muted">
              صُمم مسار ليغطي كافة جوانب العمل القانوني اليومي، من إدارة الملفات إلى متابعة الجلسات والتواصل مع العملاء.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-paper p-8 rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-3">إدارة مركزية للمستندات</h3>
              <p className="text-muted leading-relaxed">
                حفظ، تنظيم، وبحث فوري في كافة مذكرات ومستندات القضايا والنماذج القانونية الخاصة بالمكتب.
              </p>
            </div>
            
            <div className="bg-paper p-8 rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-6">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-3">متابعة دقيقة للجلسات</h3>
              <p className="text-muted leading-relaxed">
                أجندة ذكية تنبهك بمواعيد الجلسات القادمة، وتواريخ التأجيل، والقرارات الصادرة بشكل آلي.
              </p>
            </div>

            <div className="bg-paper p-8 rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-status-success/10 rounded-lg flex items-center justify-center text-status-success mb-6">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-3">أتمتة المهام اليومية</h3>
              <p className="text-muted leading-relaxed">
                تحويل قرارات الجلسات إلى مهام عمل قابلة للتوزيع على أعضاء الفريق مع متابعة الإنجاز.
              </p>
            </div>

            <div className="bg-paper p-8 rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-status-warning/10 rounded-lg flex items-center justify-center text-status-warning mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-3">بوابة العملاء</h3>
              <p className="text-muted leading-relaxed">
                إبقاء العملاء على إطلاع دائم بتطورات قضاياهم ومواعيد جلساتهم دون الحاجة لاتصالات متكررة.
              </p>
            </div>
            
            <div className="bg-paper p-8 rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-status-critical/10 rounded-lg flex items-center justify-center text-status-critical mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-3">أمان وسرية تامة</h3>
              <p className="text-muted leading-relaxed">
                تشفير كامل لبيانات القضايا مع نظام صلاحيات دقيق يضمن وصول كل فرد للمعلومات المصرح بها فقط.
              </p>
            </div>

            <div className="bg-paper p-8 rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-3">توفير الوقت والجهد</h3>
              <p className="text-muted leading-relaxed">
                تخلص من العمل الورقي الروتيني ووفر مئات الساعات شهرياً للتركيز على الجانب القانوني والفني للقضايا.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works (Flagship Feature Section) */}
      <section id="how-it-works" className="py-24 bg-paper border-t border-border">
        <div className="max-w-7xl w-full mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
              كيف يعمل
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">موجّه القضية يحوّل البيانات الأولية إلى مسار عمل واضح</h2>
            <p className="text-lg text-muted">
              بمجرد إدخال التفاصيل الأساسية، يقوم مسار ببناء خارطة طريق واضحة للقضية توضح لك ما تم إنجازه، وما هي الخطوة التالية.
            </p>
          </div>

          <div className="bg-background border border-border rounded-xl p-8 lg:p-12 shadow-sm">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Input */}
              <div className="space-y-6">
                <h3 className="font-bold text-2xl border-b border-border pb-4">1. إدخال البيانات</h3>
                <div className="space-y-4">
                  <div className="bg-paper p-4 border border-border rounded">
                    <div className="text-xs text-muted mb-1">نوع القضية</div>
                    <div className="font-medium">مدني - تعويض</div>
                  </div>
                  <div className="bg-paper p-4 border border-border rounded">
                    <div className="text-xs text-muted mb-1">المرحلة الحالية</div>
                    <div className="font-medium">قبل رفع الدعوى</div>
                  </div>
                  <div className="bg-paper p-4 border border-border rounded">
                    <div className="text-xs text-muted mb-1">المستندات المتوفرة</div>
                    <div className="font-medium">التوكيل، محضر الشرطة</div>
                  </div>
                </div>
              </div>

              {/* Generated Path */}
              <div className="space-y-6 relative">
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-8 border-t-2 border-dashed border-border -ml-10 z-0"></div>
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-8 border-t-2 border-dashed border-border -mr-10 z-0"></div>
                
                <h3 className="font-bold text-2xl border-b border-border pb-4 relative z-10">2. المسار المُنشأ</h3>
                <div className="relative z-10 pt-2 space-y-6">
                  <div className="absolute right-3.5 top-0 bottom-0 w-0.5 bg-border/50"></div>
                  
                  <div className="relative flex items-center gap-4">
                    <div className="w-7 h-7 flex items-center justify-center bg-background z-10 shrink-0">
                      <div className="w-4 h-4 rounded-full bg-status-success"></div>
                    </div>
                    <span className="text-base font-medium line-through text-muted">استلام بيانات العميل</span>
                  </div>
                  
                  <div className="relative flex items-center gap-4">
                    <div className="w-7 h-7 flex items-center justify-center bg-background z-10 shrink-0">
                      <div className="w-4 h-4 rounded-full bg-accent border-2 border-background ring-4 ring-accent/20"></div>
                    </div>
                    <span className="text-lg font-bold text-primary">تجهيز حافظة المستندات</span>
                  </div>
                  
                  <div className="relative flex items-center gap-4 opacity-70">
                    <div className="w-7 h-7 flex items-center justify-center bg-background z-10 shrink-0">
                      <div className="w-4 h-4 rounded-full border-2 border-border"></div>
                    </div>
                    <span className="text-base font-medium text-muted">صياغة صحيفة الدعوى</span>
                  </div>
                  
                  <div className="relative flex items-center gap-4 opacity-70">
                    <div className="w-7 h-7 flex items-center justify-center bg-background z-10 shrink-0">
                      <div className="w-4 h-4 rounded-full border-2 border-border"></div>
                    </div>
                    <span className="text-base font-medium text-muted">قيد الدعوى</span>
                  </div>
                </div>
              </div>

              {/* Next Action */}
              <div className="space-y-6">
                <h3 className="font-bold text-2xl border-b border-border pb-4">3. الخطوة التالية</h3>
                <div className="bg-primary text-primary-foreground p-8 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2 text-accent-foreground/80 text-base mb-4">
                    <CheckSquare className="w-5 h-5" />
                    مقترح النظام
                  </div>
                  <p className="text-lg font-medium mb-8 leading-relaxed">
                    يجب استخراج صورة رسمية من التقرير الطبي قبل البدء في صياغة صحيفة دعوى التعويض.
                  </p>
                  <Button className="w-full bg-paper text-primary hover:bg-paper/90 h-12 text-base">
                    إضافة كمهمة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-background border-t border-border">
        <div className="max-w-7xl w-full mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-4">
                <Building2 className="w-4 h-4" />
                للمكاتب والمؤسسات القانونية
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                مصمم ليتوسع مع نمو فريق عملك وحجم قضاياك
              </h2>
              <p className="text-lg text-muted">
                سواء كنت تدير فريقاً صغيراً أو مؤسسة قانونية بفروع متعددة، مسار يوفر البنية التحتية الرقمية لضمان سير العمل بانتظام.
              </p>
              
              <ul className="space-y-6 pt-4">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-paper border border-border flex items-center justify-center shrink-0 shadow-sm">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">تعاون سلس بين أعضاء الفريق</h4>
                    <p className="text-muted text-sm leading-relaxed">توزيع القضايا، إسناد المهام، ومشاركة الملاحظات بشكل فوري بين المحامين والمستشارين والإداريين.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-paper border border-border flex items-center justify-center shrink-0 shadow-sm">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">نظام صلاحيات متقدم</h4>
                    <p className="text-muted text-sm leading-relaxed">تحكم دقيق في من يمكنه عرض أو تعديل أو حذف البيانات المالية، والمستندات السرية، ومعلومات العملاء.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-paper border border-border flex items-center justify-center shrink-0 shadow-sm">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">تقارير وإحصائيات شاملة</h4>
                    <p className="text-muted text-sm leading-relaxed">رؤية واضحة لأداء المكتب، نسبة إنجاز القضايا، الجلسات القادمة، والموقف المالي لعملاء المكتب.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="flex-1 w-full">
              <div className="bg-paper rounded-2xl border border-border p-8 shadow-xl relative">
                <div className="absolute top-0 right-10 w-20 h-2 bg-primary rounded-b-lg"></div>
                <div className="space-y-6">
                  {/* Mock Team Activity */}
                  <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent shrink-0">م</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">محمد أحمد (محامي استئناف)</div>
                      <div className="text-xs text-muted mt-1">قام بإضافة مذكرة دفاع جديدة في قضية النزاع العقاري</div>
                    </div>
                    <div className="text-xs text-muted whitespace-nowrap">منذ ساعتين</div>
                  </div>
                  <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary shrink-0">س</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">سارة محمود (إدارية)</div>
                      <div className="text-xs text-muted mt-1">قامت بتحديث موعد الجلسة القادمة لشركة التقنية الحديثة</div>
                    </div>
                    <div className="text-xs text-muted whitespace-nowrap">منذ 3 ساعات</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-status-success/20 flex items-center justify-center font-bold text-status-success shrink-0">ع</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">علي حسن (محامي نقض)</div>
                      <div className="text-xs text-muted mt-1">أنجز مهمة صياغة صحيفة الطعن بالنقض</div>
                    </div>
                    <div className="text-xs text-muted whitespace-nowrap">أمس</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-paper border-t border-border">
        <div className="max-w-7xl w-full mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">باقات تناسب حجم عملك</h2>
            <p className="text-muted text-lg">اختر الباقة المناسبة لطبيعة مكتبك</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plan 1 */}
            <div className="bg-background border border-border p-8 rounded-lg flex flex-col">
              <h3 className="font-bold text-xl mb-2">محامي مستقل</h3>
              <div className="text-muted text-sm mb-6">للمحامين الذين يديرون عملهم بأنفسهم</div>
              <div className="text-3xl font-bold font-mono mb-8">تواصل معنا</div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-status-success" /> مستخدم واحد</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-status-success" /> إدارة القضايا والعملاء</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-status-success" /> الجلسات والمهام</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-status-success" /> مساحة مستندات</li>
              </ul>
              <Button variant="outline" className="w-full">طلب عرض سعر</Button>
            </div>

            {/* Plan 2 */}
            <div className="bg-primary text-primary-foreground border border-primary p-8 rounded-lg shadow-xl relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                الأكثر طلباً
              </div>
              <h3 className="font-bold text-xl mb-2">مكتب</h3>
              <div className="text-primary-foreground/70 text-sm mb-6">للمكاتب وفرق العمل الصغيرة</div>
              <div className="text-3xl font-bold font-mono mb-8">تواصل معنا</div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> حتى 10 مستخدمين</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> توزيع المهام</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> صلاحيات الفريق</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> متابعة المصروفات</li>
              </ul>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">دخول النسخة التجريبية</Button>
            </div>

            {/* Plan 3 */}
            <div className="bg-background border border-border p-8 rounded-lg flex flex-col">
              <h3 className="font-bold text-xl mb-2">مؤسسة قانونية</h3>
              <div className="text-muted text-sm mb-6">للكيانات ذات الفروع المتعددة</div>
              <div className="text-3xl font-bold font-mono mb-8">تواصل معنا</div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-status-success" /> فروع متعددة</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-status-success" /> أدوار مخصصة</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-status-success" /> تقارير متقدمة</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-status-success" /> إعدادات مخصصة</li>
              </ul>
              <Button variant="outline" className="w-full">التواصل مع المبيعات</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background border-t border-border">
        <div className="max-w-7xl w-full mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-display font-bold mb-4">تواصل معنا</h2>
              <p className="text-muted mb-8 text-lg">
                هل لديك استفسار أو ترغب في حجز عرض توضيحي مفصل للنظام؟ اترك رسالتك وسيتواصل معك فريقنا في أقرب وقت.
              </p>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الاسم الكامل</label>
                    <input type="text" className="w-full bg-paper border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="أدخل اسمك" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">رقم الهاتف</label>
                    <input type="tel" className="w-full bg-paper border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="رقم الموبايل" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">البريد الإلكتروني</label>
                  <input type="email" className="w-full bg-paper border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="أدخل بريدك الإلكتروني" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">الرسالة</label>
                  <textarea className="w-full bg-paper border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 h-32 resize-none" placeholder="كيف يمكننا مساعدتك؟"></textarea>
                </div>
                <Button type="submit" className="w-full h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90">
                  إرسال الرسالة
                </Button>
              </form>
            </div>
            
            {/* ICC Branding */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#010715] to-[#010715]/90 p-8 lg:p-10 h-full flex flex-col shadow-2xl border border-gray-800">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10 space-y-6 text-right mb-12 flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400">
                  الشركة المطورة
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl leading-snug text-white">
                  نبتكر تقنيات تعيد صياغة مستقبل العمل القانوني
                </h3>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                  مسار هو أحد الحلول الذكية المطورة بواسطة ICC لدعم التحول الرقمي للمحامين والمؤسسات القانونية بمعايير عالمية.
                </p>
              </div>

              <div className="relative z-10 w-full flex justify-center mt-auto p-4 rounded-xl backdrop-blur-sm border border-white/5 bg-white/5">
                <ICCBranding variant="transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-paper border-t border-border">
        <div className="max-w-7xl w-full mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">ابدأ من القضية، ودع مسار ينظّم ما بعدها</h2>
          <div className="flex justify-center gap-4 mt-8">
            <Link to="/app">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
                دخول النسخة التجريبية
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}