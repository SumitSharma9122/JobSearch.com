import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/public/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import JobWeb from './pages/job-seeker/JobWeb'
import BrowseJobs from './pages/public/BrowseJobs'
import Profile from './pages/job-seeker/Profile'
import JobDetails from './pages/public/JobDetails'
import Companies from './pages/employer/Companies'
import CreateCompany from './pages/employer/CreateCompany'
import CompanySetup from './pages/employer/CompanySetup'
import AdminJobs from './pages/employer/AdminJobs'
import PostJob from './pages/employer/PostJob'
import Applicants from './pages/employer/Applicants'
import AdminStatistics from './pages/admin/AdminStatistics'
import Dashboard from './pages/Dashboard'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <JobWeb />
  },
  {
    path: "/description/:id",
    element: <JobDetails />
  },
  {
    path: "/browse",
    element: <BrowseJobs />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  // Employer Routes
  {
    path: "/admin/companies",
    element: <Companies />
  },
  {
    path: "/admin/companies/create",
    element: <CreateCompany />
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup />
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />
  },
  {
    path: "/admin/jobs/create",
    element: <PostJob />
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicants />
  },
  // Platform Admin
  {
    path: "/superadmin/stats",
    element: <AdminStatistics />
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
