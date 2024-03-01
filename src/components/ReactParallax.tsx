import { useEffect, useRef } from 'react'
import { useScroll, motion, useTransform } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import styles from './ReactParallax.module.scss'

const bg = 'city-16bit-bg.png'
const cloud = 'cloud1.png'

export function ReactParallax() {
  const container = useRef(null)
  const { scrollYProgress: scrollYgreen } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  // const { scrollYProgress: scrollYpink } = useScroll({
  //   target: container,
  //   // FROM target/window TO target/window
  //   offset: ['start end', 'end end'],
  // })
  const far = useTransform(scrollYgreen, [0, 1], ['0%', '-16%'])
  const closer = useTransform(scrollYgreen, [0, 1], ['0%', '-300%'])

  // useMotionValueEvent(scrollYgreen, 'change', (latest) => {
  //   console.log('Page scroll: ', latest)
  // })
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])
  return (
    <>
      <motion.div
        className={styles.progressBar}
        style={{ backgroundColor: 'green', opacity: 0, scaleX: scrollYgreen }}
      />
      {/* <motion.div
        className={styles.progressBar}
        style={{ backgroundColor: 'pink', opacity: 1, top: 10, scaleX: scrollYpink }}
      /> */}

      <div ref={container} className={styles.container}>
        <img alt="city" width="128" height="407" className={styles.closest} src="city-16bit-sm.png" />

        <div className={styles.sticky}>
          <motion.div className={styles.bgel} style={{ y: far }}>
            <img width="128" height="407" className={styles.farbg} alt="bg" src={bg} />
          </motion.div>
          <motion.div className={styles.el} style={{ y: closer }}>
            <img
              alt="cloud"
              style={{ paddingBottom: '-20%', transform: 'scale(2.5)' }}
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
