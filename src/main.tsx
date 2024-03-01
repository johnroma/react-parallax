import { createRoot } from 'react-dom/client'
import { ReactParallax } from './components/ReactParallax'

const container = document.getElementById('root')
const root = createRoot(container!)
const bg = 'city-16bit-bg.png'
const cloud = 'cloud1.png'
const foreground = 'city-16bit-sm.png'

root.render(<ReactParallax bg={bg} cloud={cloud} foreground={foreground} />)
