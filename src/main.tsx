import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EventsProvider } from './contexts/EventsContext.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Events } from './pages/Events.tsx'
import { Login } from './pages/Login.tsx'
import { Header } from './features/Header.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { Admin } from './pages/Admin.tsx'
import { Create } from './pages/Create.tsx'
import { Edit } from './pages/Edit.tsx'
import { ProtectedRoute } from './security/ProtectedRoute.tsx'
import { Toaster } from 'react-hot-toast'
import { APP_NAME } from './utils/env.ts'

document.title = APP_NAME;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <EventsProvider>
        <Toaster position="bottom-center" containerClassName='font-[Public_Sans]'/>
        <BrowserRouter>
          <div className='flex flex-col w-full h-screen text-slate-700 font-[Public_Sans]'>
            <Header />
            <main className='w-full h-full'>
              <Routes>
                <Route path='/' element={<Navigate to="/eventos" replace />} />
                <Route path='/eventos' element={<Events />} />
                <Route path='/entrar' element={<Login />} />
                <Route path='/admin' element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>} />
                <Route path='/eventos/novo' element={
                  <ProtectedRoute>
                    <Create />
                  </ProtectedRoute>} />
                <Route path='/eventos/:eventId/editar' element={
                  // <ProtectedRoute>
                    <Edit />}/>
                  {/* </ProtectedRoute>} /> */}
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </EventsProvider>
    </AuthProvider>
  </StrictMode>,
)
