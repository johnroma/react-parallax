import { createRoot } from 'react-dom/client'
import { ReactParallax } from './components/ReactParallax'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(<ReactParallax />)
