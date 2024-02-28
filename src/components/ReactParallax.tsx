import { useRef } from 'react'
import { useScroll, useMotionValueEvent, motion, useTransform } from 'framer-motion'
import styles from './ReactParallax.module.scss'

const bg = 'https://placehold.co/200x1000'
const dog = 'https://placedog.net/140/280'
const cat = 'https://placekitten.com/420/320?image=2'

export function ReactParallax() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const far = useTransform(scrollYProgress, [0, 1], [0, -200])
  const closer = useTransform(scrollYProgress, [0, 1], [0, -250])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log('Page scroll: ', latest)
  })
  return (
    <>
      <motion.div className={styles.progressBar} style={{ backgroundColor: 'green', scaleX: scrollYProgress }} />
      <h1>ReactParallax</h1>

      <div ref={container} className={styles.container}>
        <img alt="city" className={styles.closest} src="city-16bit-foreground.gif" />

        <div className={styles.sticky}>
          <motion.div className={styles.el} style={{ y: far }}>
            <img className={styles.farbg} alt="bg" src={bg} />
          </motion.div>
          <motion.div className={styles.el} style={{ y: closer }}>
            <img alt="dog" className={styles.closer} src={dog} />
          </motion.div>
        </div>
      </div>
    </>
  )
}
