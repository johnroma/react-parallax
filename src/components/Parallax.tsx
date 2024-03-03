import { useEffect, useRef, useState } from 'react'
import { useScroll, motion, useTransform, useAnimation } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import styles from './Parallax.module.css'

export function Parallax({ bg, cloud, foreground }: Readonly<{ bg: string; cloud: string; foreground: string }>) {
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

  const imgRef = useRef<HTMLImageElement>(null)
  const [dimensions, setDimensions] = useState({
    originalWidth: 0,
    originalHeight: 0,
    renderedWidth: 0,
    renderedHeight: 0,
  })

  const handleImageLoad = () => {
    if (imgRef.current) {
      setDimensions({
        originalWidth: imgRef.current.naturalWidth,
        originalHeight: imgRef.current.naturalHeight,
        renderedWidth: imgRef.current.offsetWidth,
        renderedHeight: imgRef.current.offsetHeight,
      })
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (!imgRef.current) return
      setDimensions({
        ...dimensions,
        renderedWidth: imgRef.current.offsetWidth,
        renderedHeight: imgRef.current.offsetHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dimensions])

  const scaling = dimensions.renderedWidth / dimensions.originalWidth

  useEffect(() => {
    let isCancelled = false

    async function sequence() {
      if (!isCancelled) {
        await controls.start({ x: '0vw' }, { duration: 10, ease: 'linear' })
        await controls.start({ x: '-50vw' }, { duration: 10, ease: 'linear' })
        await controls.start({ x: '50vw' }, { duration: 0, delay: 4 })
        await controls.start({ x: '0vw' }, { duration: 10, ease: 'linear' })
        // sequence() // Loop animation
      }
    }

    sequence()

    return () => {
      isCancelled = true // Set flag to cancel the animation sequence
    }
  }, [controls])

  useEffect(() => {
    let isCancelled = false

    async function sequence() {
      if (!isCancelled) {
        await controls.start({ x: '0vw' }, { duration: 30, ease: 'linear' })
        await controls.start({ x: '-100vw' }, { duration: 30, ease: 'linear' })
        await controls.start({ x: '100vw' }, { duration: 0, delay: 2 })
        await controls.start({ x: '0vw' }, { duration: 30, ease: 'linear' })
        sequence() // Loop animation
      }
    }

    sequence()

    return () => {
      isCancelled = true // Set flag to cancel the animation sequence
    }
  }, [controls])

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.progressBar}>{scaling}</div>
      <motion.div
        className={styles.progressBar}
        style={{ backgroundColor: 'green', opacity: 0, scaleX: scrollYgreen }}
      />
      <img alt="city" width="128" height="407" className={styles.closest} src={foreground} />
      <div className={styles.sticky}>
        <motion.div className={styles.bgel} style={{ y: far }}>
          <img
            width="128"
            height="407"
            className={styles.farbg}
            alt="bg"
            src={bg}
            onLoad={handleImageLoad}
            ref={imgRef}
          />
        </motion.div>
        <motion.div className={styles.el} style={{ y: closer }}>
          <motion.img
            alt="cloud"
            className={styles.closer}
            src={cloud}
            animate={controls}
            style={{ width: `${scaling * 5}rem` }}
          />
        </motion.div>
      </div>
    </div>
  )
}
