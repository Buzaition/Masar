export type CaseStatus = 'نشطة' | 'تحتاج إجراء' | 'في انتظار العميل' | 'مؤجلة' | 'تحت المراجعة' | 'مغلقة';
export type CasePriority = 'عالية' | 'متوسطة' | 'عادية';
export type StageStatus = 'مكتمل' | 'جارٍ' | 'يحتاج مراجعة' | 'لم يبدأ';

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'فرد' | 'شركة';
  lastUpdate?: string;
}

export interface CaseStage {
  id: string;
  title: string;
  status: StageStatus;
  date?: string;
  notes?: string;
}

export interface Case {
  id: string;
  code: string; // e.g. 2024-001
  title: string;
  clientId: string;
  court: string;
  circuit: string;
  year: string;
  status: CaseStatus;
  priority: CasePriority;
  assignedLawyerId: string;
  nextHearingDate?: string;
  currentStageId?: string;
  completionPercentage: number;
  stages: CaseStage[];
  missingDocuments: string[];
}

export interface Hearing {
  id: string;
  caseId: string;
  date: string; // ISO datetime
  court: string;
  circuit: string;
  decision?: string;
  notes?: string;
  attendingLawyerId: string;
}

export interface Task {
  id: string;
  title: string;
  caseId?: string;
  assignedToId: string;
  dueDate: string; // ISO date
  status: 'جديدة' | 'قيد التنفيذ' | 'في انتظار' | 'مكتملة';
  priority: CasePriority;
}

export interface Payment {
  id: string;
  caseId: string;
  amount: number;
  date: string;
  type: 'أتعاب' | 'مصروفات' | 'أخرى';
  status: 'مكتمل' | 'معلق';
}

export interface Activity {
  id: string;
  caseId?: string;
  userId: string;
  action: string;
  timestamp: string; // ISO datetime
}
