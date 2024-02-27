import { useRef } from 'react'
import { useScroll, useMotionValueEvent, motion } from 'framer-motion'
import styles from './ReactParallax.module.scss'

const bg = 'https://placehold.co/100x500'
const dog = 'https://placedog.net/500/280'
const cat = 'https://placekitten.com/420/320?image=2'

export function ReactParallax() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log('Page scroll: ', latest)
  })

  return (
    <>
      <motion.div className={styles.progressBar} style={{ backgroundColor: 'green', scaleX: scrollYProgress }} />
      <h1>ReactParallax</h1>
      <div ref={container} className={styles.container}>
        <div className={styles.sticky}>
          <figure className={styles.el}>
            <img alt="bg" src={bg} height={500} />
          </figure>
        </div>
      </div>
    </>
  )
}
