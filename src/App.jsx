import React, { useLayoutEffect, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight, Code2, Cpu, Gamepad2, Layers3, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleText from './ParticleText'
import Grainient from './Grainient'

const projects = [
  {
    no: '01', title: '丧尸围城', en: 'ZOMBIE SIEGE', period: '2025.06 — 2025.09', role: 'UNITY 开发工程师',
    image: '/assets/project-zombie.png', status: '已完成',
    desc: '第三人称僵尸生存游戏。围绕角色操控、敌人 AI、武器反馈与防御塔系统，建立从战斗到基地防守的完整核心循环。',
    tags: ['NavMesh AI', '有限状态机', '对象池', 'Input System', 'JSON 数据配置'],
  },
  {
    no: '02', title: '我的 2D 肉鸽游戏', en: 'ROGUELIKE PROTOCOL', period: '2026.04 — 至今', role: 'UNITY 开发工程师 / 总策划',
    image: '/assets/project-roguelike.png', status: '开发中',
    desc: '2D 俯视角肉鸽游戏。以技能构筑、程序化探索和局外成长为支点，让每一轮升级选择都形成可感知的战斗路线。',
    tags: ['Fisher–Yates', '事件中心', '技能构筑', '存档系统', '模块解耦'],
  },
]

const strengths = [
  { icon: Code2, num: '01', title: '工程落地', text: '熟悉 C#、Unity 与常用设计模式，能独立完成状态机、事件中心、对象池和数据持久化模块。' },
  { icon: Cpu, num: '02', title: '系统思维', text: '从玩法目标反推技术结构，让 AI、战斗、成长与资源循环在可维护的框架中协同工作。' },
  { icon: Layers3, num: '03', title: '策划 × 开发', text: '不仅实现功能，也拆解玩家路径、反馈节奏与构筑空间，让设计意图准确落到手感与体验。' },
  { icon: Gamepad2, num: '04', title: '玩家洞察', text: '1900+ 小时 Steam 游戏体验，深耕模拟经营、养成叙事，并广泛涉猎 4X、JRPG 等品类。' },
]

function Brand() {
  return <a className="brand" href="#top" aria-label="回到首页"><span>G</span><b>GZW / PORTFOLIO</b></a>
}

function AnimatedText({ children, offset = 0 }) {
  return [...children].map((character, index) => (
    <span
      className={`color-char ${index % 2 === 0 ? 'blue-char' : 'pink-char'}`}
      style={{ animationDelay: `${(index + offset) * 0.11}s` }}
      key={`${character}-${index}`}
    >
      {character}
    </span>
  ))
}

function App() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    gsap.globalTimeline.timeScale(1.4)

    const animationContext = gsap.context(() => {
      gsap.set('.nav', { yPercent: -120, opacity: 0 })
      gsap.set('.hero-media', { scale: 1.14, filter: 'brightness(0.45)' })
      gsap.set('.hero .eyebrow', { y: 34, opacity: 0 })
      gsap.set('.hero-particle-title', { clipPath: 'inset(0 100% 0 0)', xPercent: -6 })
      gsap.set('.hero-bottom > *', { y: 54, opacity: 0 })
      gsap.set('.hero-index', { x: 30, opacity: 0 })

      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to('.hero-media', { scale: 1, filter: 'brightness(1)', duration: 2.2 })
        .to('.nav', { yPercent: 0, opacity: 1, duration: 1.15 }, 0.35)
        .to('.hero .eyebrow', { y: 0, opacity: 1, duration: 1.15 }, 0.72)
        .to('.hero-particle-title', { clipPath: 'inset(0 0% 0 0)', xPercent: 0, duration: 1.7 }, 0.9)
        .to('.hero-bottom > *', { y: 0, opacity: 1, duration: 1.1, stagger: 0.18 }, 1.42)
        .to('.hero-index', { x: 0, opacity: 1, duration: 1 }, 1.65)

      const revealHeading = section => {
        const heading = section.querySelector('.section-heading h2')
        const kicker = section.querySelector('.section-kicker')
        if (kicker) gsap.from(kicker, { scrollTrigger: { trigger: section, start: 'top 78%' }, x: -80, opacity: 0, duration: 1.25, ease: 'power4.out' })
        if (heading) gsap.from(heading, { scrollTrigger: { trigger: section, start: 'top 80%' }, yPercent: 85, scaleX: 0.82, opacity: 0, transformOrigin: 'left bottom', duration: 1.55, ease: 'expo.out' })
      }

      document.querySelectorAll('.section').forEach(revealHeading)

      gsap.from('.about-grid .portrait-wrap', { scrollTrigger: { trigger: '#about', start: 'top 68%' }, clipPath: 'inset(0 0 100% 0)', y: 80, duration: 1.55, ease: 'expo.inOut' })
      gsap.from('.about-copy > *', { scrollTrigger: { trigger: '.about-grid', start: 'top 72%' }, y: 65, opacity: 0, duration: 1.15, stagger: 0.14, ease: 'power4.out' })
      gsap.from('.stats > div', { scrollTrigger: { trigger: '.stats', start: 'top 78%' }, x: 55, opacity: 0, duration: 1.05, stagger: 0.12, ease: 'power3.out' })

      document.querySelectorAll('.project').forEach(project => {
        const infoItems = project.querySelectorAll('.project-info > *')
        const imageWrap = project.querySelector('.project-image')
        const image = project.querySelector('.project-image img')
        gsap.from(infoItems, { scrollTrigger: { trigger: project, start: 'top 76%' }, y: 64, opacity: 0, duration: 1.1, stagger: 0.13, ease: 'power4.out' })
        gsap.from(imageWrap, { scrollTrigger: { trigger: imageWrap, start: 'top 82%' }, clipPath: 'inset(0 0 100% 0)', duration: 1.55, ease: 'expo.inOut' })
        gsap.fromTo(image, { scale: 1.12, yPercent: -4 }, { scale: 1.03, yPercent: 5, ease: 'none', scrollTrigger: { trigger: imageWrap, start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
      })

      gsap.from('.strength-grid article', { scrollTrigger: { trigger: '.strength-grid', start: 'top 88%', once: true }, y: 90, scale: 0.94, duration: 1.25, stagger: 0.16, ease: 'power4.out', immediateRender: false })
      gsap.from('.toolbelt span', { scrollTrigger: { trigger: '.toolbelt', start: 'top 94%', once: true }, y: 24, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out', immediateRender: false })
      gsap.from('.contact-title .color-char', { scrollTrigger: { trigger: '.contact', start: 'top 58%' }, yPercent: 120, opacity: 0, rotateX: -70, duration: 1.25, stagger: 0.055, ease: 'expo.out' })
      gsap.from('.contact-bottom > *', { scrollTrigger: { trigger: '.contact-bottom', start: 'top 88%' }, y: 44, opacity: 0, duration: 1, stagger: 0.12, ease: 'power4.out' })
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }, pageRef)

    return () => {
      animationContext.revert()
      gsap.globalTimeline.timeScale(1)
    }
  }, [])

  return (
    <main ref={pageRef}>
      <header className="nav shell">
        <Brand />
        <nav><a href="#about">关于</a><a href="#work">项目</a><a href="#strength">能力</a></nav>
        <a className="nav-contact" href="#contact">联系我 <ArrowUpRight size={16}/></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <video autoPlay muted loop playsInline poster="/assets/hero-world.png"><source src="/assets/hero-loop.mp4" type="video/mp4" /></video>
          <div className="particle p1"/><div className="particle p2"/><div className="particle p3"/>
        </div>
        <div className="hero-shade" />
        <div className="hero-content shell">
          <div className="eyebrow"><span className="live-dot"/> AVAILABLE FOR OPPORTUNITIES · 2026</div>
          <div className="hero-particle-title">
            <ParticleText text="构建世界，" particleSize={2.2} density={4} color="#5b9cff" highlightColor="#5b9cff" scatter={110} fontSize={52}/>
            <ParticleText text="也定义玩法。" particleSize={2.2} density={4} color="#5b9cff" highlightColor="#5b9cff" scatter={110} fontSize={52}/>
          </div>
          <div className="hero-bottom">
            <p>郭志伟<br/><strong>UNITY DEVELOPER<br/>& GAME DESIGNER</strong></p>
            <a className="circle-link" href="#work" aria-label="查看项目"><ArrowDownRight size={28}/></a>
          </div>
        </div>
        <div className="hero-index">GZW<span>/ 01—05</span></div>
      </section>

      <section className="about section shell" id="about">
        <Grainient className="about-grainient" color1="#294f87" color2="#172d50" color3="#080b11" />
        <div className="section-kicker"><span>01</span> PROFILE / 个人经历</div>
        <div className="about-grid">
          <div className="portrait-wrap"><img src="/assets/portrait.png" alt="郭志伟个人照片"/><div className="portrait-label">BASED IN<br/>QUANZHOU, CHINA</div></div>
          <div className="about-copy">
            <p className="lead intro-lead">我是一名在读<span>虚拟现实技术</span>专业学生，<br/>专注于 <span>Unity 游戏开发与系统策划</span>。</p>
            <p className="intro">我喜欢把模糊的创意拆解成可运行的系统：从角色状态、AI 寻路和战斗反馈，到技能构筑、资源循环和玩家成长。工程是表达设计的语言，体验则是每个技术选择的最终答案。</p>
            <div className="education"><span>2023 — 2027</span><div><b>江西财经大学</b><small>虚拟现实技术 · 本科</small></div></div>
            <div className="contact-lines">
              <a href="tel:15259767521"><Phone size={15}/> 152 5976 7521</a>
              <a href="mailto:1909942822@qq.com"><Mail size={15}/> 1909942822@qq.com</a>
              <span><MapPin size={15}/> 福建 · 泉州</span>
            </div>
          </div>
          <div className="stats">
            <div><strong>02</strong><span>完整游戏项目</span></div>
            <div><strong>1900<span>+</span></strong><span>STEAM 游戏时长</span></div>
            <div><strong>03<span>+</span></strong><span>核心系统独立实现</span></div>
            <div><strong>462</strong><span>CET-4</span></div>
          </div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="shell">
          <div className="section-heading"><div className="section-kicker"><span>02</span> SELECTED WORK / 精选项目</div><h2>我的<br/><i>精选项目</i></h2></div>
          <div className="projects">
            {projects.map((p) => <article className="project" key={p.no}>
              <div className="project-info">
                <div><small>{p.en}</small><h3>{p.title}</h3></div>
                <p>{p.desc}</p>
                <div className="meta"><span>{p.role}</span><span>{p.period}</span></div>
                <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              </div>
              <div className="project-image"><img src={p.image} alt={`${p.title}项目概念图`}/><div className="project-state"><span/>{p.status}</div><span className="project-no">/{p.no}</span></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="strength section shell" id="strength">
        <Grainient className="strength-grainient" color1="#294f87" color2="#172d50" color3="#080b11" />
        <div className="section-heading split"><div className="section-kicker"><span>03</span> CAPABILITIES / 个人优势</div><h2>我的<br/><i>核心优势</i></h2></div>
        <div className="strength-grid">{strengths.map((s) => <article key={s.num}>
          <h3>{s.title}</h3><p>{s.text}</p>
        </article>)}</div>
        <div className="toolbelt"><span>UNITY</span><span>C#</span><span>C++</span><span>UGUI</span><span>SHADER GRAPH</span><span>NAVMESH</span><span>GIT</span></div>
      </section>

      <footer className="contact" id="contact">
        <div className="contact-glow"><Sparkles /></div>
        <div className="shell contact-inner">
          <div className="section-kicker"><span>04</span> START A CONVERSATION</div>
          <div className="contact-title"><h2><AnimatedText>感谢您观看</AnimatedText><br/><AnimatedText offset={5}>我的简历兼作品集</AnimatedText></h2></div>
          <div className="contact-bottom">
            <a href="mailto:1909942822@qq.com">1909942822@qq.com <ArrowUpRight size={22}/></a>
            <div><span>PHONE</span><b>+86 152 5976 7521</b></div>
            <div><span>LOCATION / 所在地</span><b>福建省 · 泉州市</b></div>
          </div>
          <div className="copyright"><Brand/><span>© 2026 GUO ZHIWEI. BUILT WITH INTENT.</span></div>
        </div>
      </footer>
    </main>
  )
}

export default App
