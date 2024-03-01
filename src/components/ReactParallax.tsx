import { useEffect, useRef } from 'react'
import { useScroll, motion, useTransform, useAnimation } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import styles from './ReactParallax.module.scss'

const bg = 'city-16bit-bg.png'
const cloud = 'cloud1.png'

export function ReactParallax() {
  const container = useRef(null)
  const controls = useAnimation()

  const { scrollYProgress: scrollYgreen } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const far = useTransform(scrollYgreen, [0, 1], ['0%', '-16%'])
  const closer = useTransform(scrollYgreen, [0, 1], ['0%', '-300%'])

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy() // Cleanup Lenis instance on unmount
    }
  }, [])

  useEffect(() => {
    let isCancelled = false

    async function sequence() {
      if (!isCancelled) {
        await controls.start({ x: '0vw' }, { duration: 10, ease: 'linear' })
        await controls.start({ x: '-50vw' }, { duration: 10, ease: 'linear' })
        await controls.start({ x: '50vw' }, { duration: 0, delay: 4 })
        await controls.start({ x: '0vw' }, { duration: 10, ease: 'linear' })
        sequence() // Loop animation
      }
    }

    sequence()

    return () => {
      isCancelled = true // Set flag to cancel the animation sequence
    }
  }, [controls])

  return (
    <>
      <motion.div
        className={styles.progressBar}
        style={{ backgroundColor: 'green', opacity: 0, scaleX: scrollYgreen }}
      />

      <div ref={container} className={styles.container}>
        <img alt="city" width="128" height="407" className={styles.closest} src="city-16bit-sm.png" />

        <div className={styles.sticky}>
          <motion.div className={styles.bgel} style={{ y: far }}>
            <img width="128" height="407" className={styles.farbg} alt="bg" src={bg} />
          </motion.div>
          <motion.div className={styles.el} style={{ y: closer }}>
            <motion.img
              initial={{ scale: 2.5 }}
              alt="cloud"
              height="34"
              width="70"
              className={styles.closer}
              src={cloud}
              animate={controls}
            />
          </motion.div>
        </div>
      </div>
    </>
  )
}
