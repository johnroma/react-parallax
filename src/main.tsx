import { createRoot } from 'react-dom/client'
import { Parallax } from './components/Parallax'

const container = document.getElementById('root')
const root = createRoot(container!)
const bg = 'city-16bit-bg.png'
const cloud = 'cloud1.png'
const foreground = 'city-16bit-sm.png'
const bg2 = 'city-16bit-bg-water.gif'

root.render(<Parallax bg={bg} bg2={bg2} cloud={cloud} foreground={foreground} />)
