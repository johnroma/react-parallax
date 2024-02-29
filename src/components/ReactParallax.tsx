import { useRef } from 'react'
import { useScroll, useMotionValueEvent, motion, useTransform } from 'framer-motion'
import styles from './ReactParallax.module.scss'

const bg = 'city-16bit-bg.png'
const cloud = 'cloud1.png'

export function ReactParallax() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const far = useTransform(scrollYProgress, [0, 1], [0, -180])
  const closer = useTransform(scrollYProgress, [0, 1], [0, -100])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log('Page scroll: ', latest)
  })
  return (
    <>
      <motion.div className={styles.progressBar} style={{ backgroundColor: 'green', scaleX: scrollYProgress }} />
      <h1>ReactParallax</h1>

      <div ref={container} className={styles.container}>
        <img alt="city" width="128" height="407" className={styles.closest} src="city-16bit-sm.png" />

        <div className={styles.sticky}>
          <motion.div className={styles.el} style={{ y: far }}>
            <img width="128" height="407" className={styles.farbg} alt="bg" src={bg} />
          </motion.div>
          <motion.div className={styles.el} style={{ y: closer }}>
            <img
              alt="cloud"
              style={{ paddingTop: '10%' }}
              height="34"
              width="70"
              className={styles.closer}
              src={cloud}
            />
          </motion.div>
        </div>
      </div>
    </>
  )
}
