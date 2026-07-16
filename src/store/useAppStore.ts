import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Case, Client, User, Hearing, Task, Activity } from '../types';
import { currentUser, mockTeam, mockClients, mockCases, mockHearings, mockTasks, mockActivities } from './demoData';

interface AppState {
  user: User;
  team: User[];
  clients: Client[];
  cases: Case[];
  hearings: Hearing[];
  tasks: Task[];
  activities: Activity[];
  
  // Actions
  addCase: (newCase: Omit<Case, 'id' | 'stages' | 'completionPercentage'> & { stages: any[] }) => void;
  updateCaseStage: (caseId: string, stageId: string, status: any) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  completeTask: (taskId: string) => void;
  addHearing: (hearing: Omit<Hearing, 'id'>) => void;
  addClient: (client: Omit<Client, 'id'>) => void;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  resetDemo: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: currentUser,
      team: mockTeam,
      clients: mockClients,
      cases: mockCases,
      hearings: mockHearings,
      tasks: mockTasks,
      activities: mockActivities,

      addCase: (newCase) => set((state) => {
        const id = `case-${Date.now()}`;
        const newCaseFull: Case = {
          ...newCase,
          id,
          completionPercentage: 0,
        };
        return { 
          cases: [...state.cases, newCaseFull],
          activities: [{ id: `a-${Date.now()}`, userId: state.user.id, action: `أضاف قضية جديدة: ${newCase.title}`, timestamp: new Date().toISOString(), caseId: id }, ...state.activities]
        };
      }),
      
      updateCaseStage: (caseId, stageId, status) => set((state) => {
        const updatedCases = state.cases.map(c => {
          if (c.id === caseId) {
            const updatedStages = c.stages.map(s => s.id === stageId ? { ...s, status } : s);
            const completed = updatedStages.filter(s => s.status === 'مكتمل').length;
            const percentage = Math.round((completed / updatedStages.length) * 100);
            return { ...c, stages: updatedStages, completionPercentage: percentage };
          }
          return c;
        });
        return { cases: updatedCases };
      }),

      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: `t-${Date.now()}` }]
      })),

      completeTask: (taskId) => set((state) => ({
        tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: 'مكتملة' } : t)
      })),

      addHearing: (hearing) => set((state) => ({
        hearings: [...state.hearings, { ...hearing, id: `h-${Date.now()}` }]
      })),
      
      addClient: (client) => set((state) => ({
        clients: [...state.clients, { ...client, id: `c-${Date.now()}` }]
      })),

      addActivity: (activity) => set((state) => ({
        activities: [{ ...activity, id: `a-${Date.now()}` }, ...state.activities]
      })),

      resetDemo: () => set({
        user: currentUser,
        team: mockTeam,
        clients: mockClients,
        cases: mockCases,
        hearings: mockHearings,
        tasks: mockTasks,
        activities: mockActivities,
      })
    }),
    {
      name: 'masar-demo-storage',
    }
  )
);
