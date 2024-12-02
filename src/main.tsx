import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MemoryRouter, Routes, Route } from 'react-router'
import { Layout } from './components'
import { Provider } from './components/ui/provider.tsx'
import { Landing } from './pages'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Landing />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  </StrictMode>,
)
