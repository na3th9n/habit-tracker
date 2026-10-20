import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WorkoutTracker from './WorkoutTracker.tsx';
// import HabitTracker from './HabitTracker.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkoutTracker />
  </StrictMode>,
)
