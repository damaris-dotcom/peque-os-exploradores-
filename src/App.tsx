import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Header from './components/Header'

import Dashboard from './pages/Dashboard'
import Families from './pages/Families'
import FamilyProfile from './pages/FamilyProfile'
import NewFamily from './pages/NewFamily'
import Memberships from './pages/Memberships'
import Visits from './pages/Visits'
import NewVisit from './pages/NewVisit'

import { FamiliesProvider } from './context/FamiliesProvider'

function App() {
  return (
    <FamiliesProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#f8f7fb]">
          <Sidebar />

          <div className="ml-64">
            <Header />

            <Routes>
              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/familias"
                element={<Families />}
              />

              <Route
                path="/familias/nueva"
                element={<NewFamily />}
              />

              <Route
                path="/familias/:id"
                element={<FamilyProfile />}
              />

              <Route
                path="/membresias"
                element={<Memberships />}
              />

              <Route
                path="/visitas"
                element={<Visits />}
              />

              <Route
                path="/nuevo-ingreso"
                element={<NewVisit />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </FamiliesProvider>
  )
}

export default App