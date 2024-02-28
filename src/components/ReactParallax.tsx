import { useRef } from 'react'
import { useScroll, useMotionValueEvent, motion, useTransform /* cubicBezier */ } from 'framer-motion'
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
  // const easing = cubicBezier(1, 0.26, 0.96, 0.68)
  // const easing = linear(1, 0.26, 0.96, 0.68)
  const sm = useTransform(scrollYProgress, [0, 1], [0, -100] /* { ease: easing } */)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log('Page scroll: ', latest)
  })
  return (
    <>
      <motion.div className={styles.progressBar} style={{ backgroundColor: 'green', scaleX: scrollYProgress }} />
      <h1>ReactParallax</h1>

      <div ref={container} className={styles.container}>
        <div className={styles.sticky}>
          <motion.figure className={styles.el} style={{ y: sm }}>
            <img alt="bg" src={bg} />
          </motion.figure>
        </div>
      </div>
    </>
  )
}
