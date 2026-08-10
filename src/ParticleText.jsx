import React, { useEffect, useRef } from 'react'
import './ParticleText.css'

const ParticleText = ({ text, color = '#ff72b6', highlightColor = '#ff72b6', particleSize = 3, density = 4, scatter = 180, fontSize: requestedFontSize = 72 }) => {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { willReadFrequently: true })
    let particles = []
    let frame
    let width = 0
    let height = 0
    const pointer = { x: 0, y: 0, active: false }

    const build = () => {
      const rect = wrap.getBoundingClientRect()
      width = Math.floor(rect.width)
      height = Math.floor(rect.height)
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const mask = document.createElement('canvas')
      mask.width = width
      mask.height = height
      const maskContext = mask.getContext('2d', { willReadFrequently: true })
      let fontSize = Math.min(requestedFontSize, width / 4.8)
      maskContext.font = `800 ${fontSize}px "Microsoft YaHei", sans-serif`
      while (maskContext.measureText(text).width > width * 0.94 && fontSize > 30) {
        fontSize -= 2
        maskContext.font = `800 ${fontSize}px "Microsoft YaHei", sans-serif`
      }
      maskContext.textAlign = 'center'
      maskContext.textBaseline = 'middle'
      maskContext.fillStyle = '#fff'
      maskContext.fillText(text, width / 2, height / 2)
      const pixels = maskContext.getImageData(0, 0, width, height).data
      const next = []
      for (let y = 0; y < height; y += density) {
        for (let x = 0; x < width; x += density) {
          if (pixels[(y * width + x) * 4 + 3] > 80) {
            const seed = Math.random()
            const angle = seed * Math.PI * 2
            next.push({
              x: x + Math.cos(angle) * scatter,
              y: y + Math.sin(angle) * scatter,
              tx: x, ty: y, seed,
              color: seed > .62 ? highlightColor : color
            })
          }
        }
      }
      particles = next.slice(0, 5200)
    }

    const render = time => {
      context.clearRect(0, 0, width, height)
      particles.forEach(particle => {
        let targetX = particle.tx + Math.sin(time * .001 + particle.seed * 12) * .55
        let targetY = particle.ty + Math.cos(time * .0008 + particle.seed * 10) * .55
        if (pointer.active) {
          const dx = targetX - pointer.x
          const dy = targetY - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance < 120 && distance > 0) {
            const force = (1 - distance / 120) * 42
            targetX += dx / distance * force
            targetY += dy / distance * force
          }
        }
        particle.x += (targetX - particle.x) * .09
        particle.y += (targetY - particle.y) * .09
        context.fillStyle = particle.color
        context.beginPath()
        context.arc(particle.x, particle.y, particleSize / 2, 0, Math.PI * 2)
        context.fill()
      })
      frame = requestAnimationFrame(render)
    }

    const move = event => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }
    const leave = () => { pointer.active = false }
    const observer = new ResizeObserver(build)
    observer.observe(wrap)
    build()
    frame = requestAnimationFrame(render)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [text, color, highlightColor, particleSize, density, scatter, requestedFontSize])

  return <div className="particle-text" ref={wrapRef} aria-label={text}><canvas ref={canvasRef}/><span>{text}</span></div>
}

export default ParticleText
