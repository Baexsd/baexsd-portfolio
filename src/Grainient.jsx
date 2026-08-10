import React, { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'
import './Grainient.css'

const vertex = `#version 300 es
in vec2 position;
void main(){gl_Position=vec4(position,0.,1.);}`

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;uniform float iTime;uniform vec3 uColor1;uniform vec3 uColor2;uniform vec3 uColor3;out vec4 fragColor;
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
void main(){vec2 uv=gl_FragCoord.xy/iResolution.xy;vec2 p=uv-.5;p.x*=iResolution.x/iResolution.y;float t=iTime*.13;float n=noise(p*2.6+vec2(t,-t*.7));float wave=sin((p.x+n*.45)*5.2+t*2.)*.5+.5;vec3 col=mix(uColor3,uColor2,smoothstep(.12,.88,wave));col=mix(col,uColor1,smoothstep(.38,1.,n+p.y*.35));float grain=(hash(gl_FragCoord.xy+iTime)-.5)*.075;col=(col-.5)*1.18+.5+grain;fragColor=vec4(col,1.);}`

const rgb = hex => [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255)

export default function Grainient({ color1 = '#253c69', color2 = '#162843', color3 = '#090b10', className = '' }) {
  const containerRef = useRef(null)
  useEffect(() => {
    const container = containerRef.current
    const renderer = new Renderer({ webgl: 2, alpha: true, antialias: false, dpr: Math.min(devicePixelRatio, 2) })
    const gl = renderer.gl
    container.appendChild(gl.canvas)
    const program = new Program(gl, { vertex, fragment, uniforms: { iTime: { value: 0 }, iResolution: { value: [1, 1] }, uColor1: { value: rgb(color1) }, uColor2: { value: rgb(color2) }, uColor3: { value: rgb(color3) } } })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
    const resize = () => { const rect = container.getBoundingClientRect(); renderer.setSize(rect.width, rect.height); program.uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight] }
    const observer = new ResizeObserver(resize)
    observer.observe(container); resize()
    let frame
    const start = performance.now()
    const draw = time => { program.uniforms.iTime.value = (time - start) / 1000; renderer.render({ scene: mesh }); frame = requestAnimationFrame(draw) }
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); gl.canvas.remove() }
  }, [color1, color2, color3])
  return <div ref={containerRef} className={`grainient-container ${className}`}/>
}
