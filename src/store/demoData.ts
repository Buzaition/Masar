import type { Case, Client, User, Hearing, Task, Activity } from '../types';

export const currentUser: User = {
  id: 'u-1',
  name: 'أحمد منصور',
  role: 'مدير المكتب',
  email: 'demo@masar.local',
};

export const mockTeam: User[] = [
  currentUser,
  { id: 'u-2', name: 'خالد مصطفى', role: 'شريك', email: 'khaled@masar.local' },
  { id: 'u-3', name: 'سارة إبراهيم', role: 'محامي', email: 'sara@masar.local' },
  { id: 'u-4', name: 'عمر طارق', role: 'محامي متدرب', email: 'omar@masar.local' },
];

export const mockClients: Client[] = [
  { id: 'c-1', name: 'شركة الأفق', type: 'شركة', email: 'contact@alofoq.com', phone: '01012345678', lastUpdate: '2026-07-10T10:00:00Z' },
  { id: 'c-2', name: 'مجموعة المدار', type: 'شركة', email: 'info@almadar.com', phone: '01123456789', lastUpdate: '2026-07-12T14:30:00Z' },
  { id: 'c-3', name: 'كريم محمود', type: 'فرد', email: 'karim.m@example.com', phone: '01234567890', lastUpdate: '2026-07-15T09:15:00Z' },
  { id: 'c-4', name: 'سارة عادل', type: 'فرد', email: 'sara.adel@example.com', phone: '01512345678', lastUpdate: '2026-07-14T11:00:00Z' },
];

export const mockCases: Case[] = [
  {
    id: 'case-1',
    code: '2024-045',
    title: 'مطالبة مالية',
    clientId: 'c-1',
    court: 'المحكمة الاقتصادية',
    circuit: 'الدائرة الثالثة تجاري',
    year: '2024',
    status: 'تحتاج إجراء',
    priority: 'عالية',
    assignedLawyerId: 'u-1',
    nextHearingDate: '2026-07-17T09:00:00Z',
    completionPercentage: 40,
    missingDocuments: ['عقد التوريد الأصلي', 'كشف حساب معتمد'],
    stages: [
      { id: 'st-1', title: 'بيانات القضية', status: 'مكتمل', date: '2024-05-10T00:00:00Z' },
      { id: 'st-2', title: 'مراجعة المستندات', status: 'يحتاج مراجعة', notes: 'ناقص عقد التوريد' },
      { id: 'st-3', title: 'تجهيز صحيفة الدعوى', status: 'لم يبدأ' },
      { id: 'st-4', title: 'رفع الدعوى', status: 'لم يبدأ' },
    ]
  },
  {
    id: 'case-2',
    code: '2024-089',
    title: 'نزاع عقد توريد',
    clientId: 'c-2',
    court: 'محكمة شمال القاهرة',
    circuit: 'الدائرة 15 مدني',
    year: '2024',
    status: 'نشطة',
    priority: 'متوسطة',
    assignedLawyerId: 'u-3',
    nextHearingDate: '2026-07-20T10:30:00Z',
    completionPercentage: 70,
    missingDocuments: [],
    stages: [
      { id: 'st-1', title: 'بيانات القضية', status: 'مكتمل' },
      { id: 'st-2', title: 'مراجعة المستندات', status: 'مكتمل' },
      { id: 'st-3', title: 'رفع الدعوى', status: 'مكتمل' },
      { id: 'st-4', title: 'الجلسة القادمة', status: 'جارٍ' },
    ]
  },
  {
    id: 'case-3',
    code: '2024-112',
    title: 'دعوى عمالية',
    clientId: 'c-3',
    court: 'المحكمة العمالية',
    circuit: 'الدائرة 5 عمال',
    year: '2024',
    status: 'في انتظار العميل',
    priority: 'عادية',
    assignedLawyerId: 'u-4',
    completionPercentage: 20,
    missingDocuments: ['مفردات مرتب'],
    stages: [
      { id: 'st-1', title: 'بيانات القضية', status: 'مكتمل' },
      { id: 'st-2', title: 'استيفاء المستندات', status: 'جارٍ' },
    ]
  },
  {
    id: 'case-4',
    code: '2024-033',
    title: 'قضية أسرة',
    clientId: 'c-4',
    court: 'محكمة الأسرة',
    circuit: 'الدائرة 2 أسرة',
    year: '2024',
    status: 'نشطة',
    priority: 'عالية',
    assignedLawyerId: 'u-3',
    nextHearingDate: '2026-07-25T09:00:00Z',
    completionPercentage: 60,
    missingDocuments: [],
    stages: [
      { id: 'st-1', title: 'تسوية المنازعات', status: 'مكتمل' },
      { id: 'st-2', title: 'رفع الدعوى', status: 'مكتمل' },
      { id: 'st-3', title: 'حضور الجلسات', status: 'جارٍ' },
    ]
  }
];

export const mockHearings: Hearing[] = [
  { id: 'h-1', caseId: 'case-1', date: '2026-07-17T09:00:00Z', court: 'المحكمة الاقتصادية', circuit: 'الدائرة الثالثة تجاري', attendingLawyerId: 'u-1', notes: 'تجهيز حافظة مستندات بالمدفوعات' },
  { id: 'h-2', caseId: 'case-2', date: '2026-07-20T10:30:00Z', court: 'محكمة شمال القاهرة', circuit: 'الدائرة 15 مدني', attendingLawyerId: 'u-3' },
  { id: 'h-3', caseId: 'case-4', date: '2026-07-25T09:00:00Z', court: 'محكمة الأسرة', circuit: 'الدائرة 2 أسرة', attendingLawyerId: 'u-3' },
];

export const mockTasks: Task[] = [
  { id: 't-1', title: 'مراجعة عقد التوريد', caseId: 'case-1', assignedToId: 'u-1', dueDate: '2026-07-16T17:00:00Z', status: 'جديدة', priority: 'عالية' },
  { id: 't-2', title: 'إرسال تحديث للعميل', caseId: 'case-2', assignedToId: 'u-3', dueDate: '2026-07-16T15:00:00Z', status: 'جديدة', priority: 'عادية' },
  { id: 't-3', title: 'استخراج صورة رسمية', caseId: 'case-4', assignedToId: 'u-4', dueDate: '2026-07-18T12:00:00Z', status: 'قيد التنفيذ', priority: 'عادية' },
];

export const mockActivities: Activity[] = [
  { id: 'a-1', userId: 'u-1', action: 'قام بتحديث حالة الجلسة', timestamp: '2026-07-16T08:00:00Z', caseId: 'case-1' },
  { id: 'a-2', userId: 'u-3', action: 'أضاف مستند جديد: صحيفة الدعوى', timestamp: '2026-07-15T14:30:00Z', caseId: 'case-2' },
];
