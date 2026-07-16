import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AppLayout from './layouts/AppLayout';

// Public Pages
import Home from './pages/public/Home';

// App Pages
import CommandCenter from './pages/app/CommandCenter';
import Cases from './pages/app/Cases';
import CaseIntake from './pages/app/CaseIntake';
import CaseWorkspace from './pages/app/CaseWorkspace';
import Hearings from './pages/app/Hearings';
import Clients from './pages/app/Clients';
import DocumentsCenter from './pages/app/DocumentsCenter';
import Tasks from './pages/app/Tasks';
import Finance from './pages/app/Finance';
import Team from './pages/app/Team';
import Reports from './pages/app/Reports';
import Settings from './pages/app/Settings';
import Login from './pages/public/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* App Routes */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<CommandCenter />} />
          <Route path="cases" element={<Cases />} />
          <Route path="cases/new" element={<CaseIntake />} />
          <Route path="cases/:id" element={<CaseWorkspace />} />
          <Route path="hearings" element={<Hearings />} />
          <Route path="clients" element={<Clients />} />
          <Route path="documents" element={<DocumentsCenter />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="finance" element={<Finance />} />
          <Route path="team" element={<Team />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
