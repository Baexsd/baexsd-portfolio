import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Code2, Cpu, EyeOff, Gamepad2, Layers3, Mail, MapPin, Pause, Phone, Play, Sparkles, Volume2, VolumeX } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleText from './ParticleText'
import Grainient from './Grainient'

const projects = [
  {
    no: '01', title: '丧尸围城', en: 'ZOMBIE SIEGE', period: '2025.06 — 2025.09', role: 'UNITY 开发工程师',
    image: '/assets/project-zombie.png', video: '/assets/project-zombie.mp4', status: '已完成',
    desc: '第三人称僵尸生存游戏。围绕角色操控、敌人 AI、武器反馈与防御塔系统，建立从战斗到基地防守的完整核心循环。',
    tags: ['NavMesh AI', '有限状态机', '对象池', 'Input System', 'JSON 数据配置'],
    contributions: [
      {
        title: '战斗系统设计与实现',
        text: '负责玩家完整战斗流程，通过攻击反馈与敌人压力的持续调整，建立具有挑战感的战斗节奏。',
        points: ['武器攻击机制', '伤害反馈', '攻击反馈', '战斗节奏'],
      },
      {
        title: '敌人与 AI 行为系统',
        text: '设计追击、寻路与攻击状态切换，并使用有限状态机管理行为转换，提升逻辑清晰度与扩展能力。',
        points: ['追击逻辑', 'NavMesh 寻路', '攻击切换', '有限状态机'],
      },
      {
        title: '防御塔成长体系',
        text: '围绕基地防守设计建造、自动索敌和升级链路，让防御设施成长形成长期目标与策略选择。',
        points: ['防御塔建造', '自动索敌', '防御塔升级', '策略成长'],
      },
      {
        title: '局外成长体系',
        text: '每局游戏结束后，根据局内表现获取金币，用于购买和解锁新英雄，为持续游玩提供明确目标与正向反馈。',
        points: ['局内结算', '金币奖励', '英雄购买', '长期成长'],
      },
    ],
  },
  {
    no: '02', title: '我的 2D 肉鸽游戏', en: 'ROGUELIKE PROTOCOL', period: '2026.04 — 至今', role: 'UNITY 开发工程师 / 总策划',
    image: '/assets/project-roguelike.png', video: '/assets/project-roguelike.mp4', status: '开发中',
    desc: '2D 俯视角肉鸽游戏。以技能构筑、程序化探索和局外成长为支点，让每一轮升级选择都形成可感知的战斗路线。',
    tags: ['Fisher–Yates', '事件中心', '技能构筑', '存档系统', '模块解耦'],
    contributions: [
      {
        title: '技能构筑系统设计',
        text: '以技能池、随机选择与技能组合构成成长体系，让玩家每局形成不同战斗路线，提高重复游玩价值。',
        points: ['技能池', '随机选择', '技能组合', '流派构筑'],
      },
      {
        title: '随机机制设计',
        text: '采用 Fisher–Yates 算法生成升级技能选项，在保持随机性的同时避免重复，保障公平体验。',
        points: ['Fisher–Yates', '无重复抽取', '升级选项', '公平随机'],
      },
      {
        title: '玩家成长系统',
        text: '设计金币、解锁内容与角色成长数据，并通过数据持久化建立长期局外成长目标。',
        points: ['金币系统', '内容解锁', '角色成长', '数据持久化'],
      },
      {
        title: '系统模块设计',
        text: '使用事件中心优化模块之间的通信关系，降低系统耦合，为后续玩法扩展保留空间。',
        points: ['事件中心', '模块通信', '系统解耦', '玩法扩展'],
      },
    ],
  },
]

const strengths = [
  { icon: Code2, num: '01', title: '工程落地', text: '熟悉 C#、Unity 与常用设计模式，能独立完成状态机、事件中心、对象池和数据持久化模块。', tags: ['C#', 'Unity', 'FSM', '对象池'] },
  { icon: Cpu, num: '02', title: '系统思维', text: '从玩法目标反推技术结构，让 AI、战斗、成长与资源循环在可维护的框架中协同工作。', tags: ['战斗系统', 'AI 行为', '成长循环', '资源设计'] },
  { icon: Layers3, num: '03', title: '策划 × 开发', text: '不仅实现功能，也拆解玩家路径、反馈节奏与构筑空间，让设计意图准确落到手感与体验。', tags: ['玩家路径', '反馈节奏', '技能构筑', '体验验证'] },
  { icon: Gamepad2, num: '04', title: '玩家洞察', text: '1900+ 小时 Steam 游戏体验，深耕模拟经营、养成叙事，并广泛涉猎 4X、JRPG 等品类。', tags: ['模拟经营', '养成叙事', '4X 战略', 'JRPG'] },
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

function ProjectVideo({ src, poster, title }) {
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const autoPausedRef = useRef(false)
  const manuallyPausedRef = useRef(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const formatTime = value => {
    if (!Number.isFinite(value)) return '00:00'
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      manuallyPausedRef.current = false
      autoPausedRef.current = false
      video.play().catch(() => {})
    } else {
      manuallyPausedRef.current = true
      video.pause()
    }
  }

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const seekVideo = event => {
    const video = videoRef.current
    if (!video || !duration) return
    const nextTime = Number(event.target.value)
    video.currentTime = nextTime
    setProgress(nextTime)
  }

  useEffect(() => {
    const wrap = wrapRef.current
    const video = videoRef.current
    if (!wrap || !video) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        if (!video.paused) {
          autoPausedRef.current = true
          video.pause()
        }
        return
      }

      if (autoPausedRef.current && !manuallyPausedRef.current) {
        autoPausedRef.current = false
        video.play().catch(() => {})
      }
    }, { threshold: 0 })

    observer.observe(wrap)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="project-video" ref={wrapRef} onMouseMove={() => !controlsVisible && setControlsVisible(true)}>
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        poster={poster}
        aria-label={`${title}项目演示视频`}
        onLoadedMetadata={event => setDuration(event.currentTarget.duration)}
        onTimeUpdate={event => setProgress(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      ><source src={src} type="video/mp4" /></video>
      <div className="hero-video-tint"/>
      {!isPlaying && <button className="video-start-button" type="button" onClick={togglePlayback}><Play size={20}/> 点击播放</button>}
      <div className={`hero-video-controls project-video-controls${controlsVisible ? '' : ' is-hidden'}`}>
        <button type="button" onClick={togglePlayback} aria-label={isPlaying ? '暂停视频' : '播放视频'}>{isPlaying ? <Pause size={16}/> : <Play size={16}/>}</button>
        <span>{formatTime(progress)}</span>
        <input type="range" min="0" max={duration || 0} step="0.1" value={progress} onChange={seekVideo} aria-label="视频播放进度"/>
        <span>{formatTime(duration)}</span>
        <button type="button" onClick={toggleSound} aria-label={isMuted ? '打开声音' : '关闭声音'}>{isMuted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button>
        <button type="button" onClick={() => setControlsVisible(false)} aria-label="隐藏视频进度条" title="隐藏进度条"><EyeOff size={17}/></button>
      </div>
    </div>
  )
}

function App() {
  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const heroVideoRef = useRef(null)
  const autoPausedRef = useRef(false)
  const manuallyPausedRef = useRef(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(false)
  const [controlsReady, setControlsReady] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)

  const togglePlayback = () => {
    const video = heroVideoRef.current
    if (!video) return
    if (video.paused) {
      manuallyPausedRef.current = false
      autoPausedRef.current = false
      video.play().catch(() => setIsPlaying(false))
    } else {
      manuallyPausedRef.current = true
      video.pause()
    }
  }

  const toggleSound = () => {
    const video = heroVideoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const seekVideo = event => {
    const video = heroVideoRef.current
    if (!video || !videoDuration) return
    const nextTime = Number(event.target.value)
    video.currentTime = nextTime
    setVideoProgress(nextTime)
  }

  const formatTime = value => {
    if (!Number.isFinite(value)) return '00:00'
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setControlsReady(true)
      setControlsVisible(true)
    }, 2000)

    return () => window.clearTimeout(introTimer)
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    const video = heroVideoRef.current
    if (!hero || !video) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        if (!video.paused) {
          autoPausedRef.current = true
          video.pause()
        }
        return
      }

      if (autoPausedRef.current && !manuallyPausedRef.current) {
        autoPausedRef.current = false
        video.play().catch(() => {})
      }
    }, { threshold: 0 })

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

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
        const contributionItems = project.querySelectorAll('.contribution-card')
        const imageWrap = project.querySelector('.project-image')
        const image = project.querySelector('.project-image img')
        gsap.from(infoItems, { scrollTrigger: { trigger: project, start: 'top 76%' }, y: 64, opacity: 0, duration: 1.1, stagger: 0.13, ease: 'power4.out' })
        gsap.from(contributionItems, { scrollTrigger: { trigger: project, start: 'top 64%' }, y: 52, opacity: 0, duration: 1, stagger: 0.11, ease: 'power4.out', immediateRender: false })
        gsap.from(imageWrap, { scrollTrigger: { trigger: imageWrap, start: 'top 82%' }, clipPath: 'inset(0 0 100% 0)', duration: 1.55, ease: 'expo.inOut' })
        if (image) gsap.fromTo(image, { scale: 1.12, yPercent: -4 }, { scale: 1.03, yPercent: 5, ease: 'none', scrollTrigger: { trigger: imageWrap, start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
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

      <section className="hero" id="top" ref={heroRef} onMouseMove={() => controlsReady && !controlsVisible && setControlsVisible(true)}>
        <div className="hero-media" aria-hidden="true">
          <video
            ref={heroVideoRef}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="auto"
            poster="/assets/hero-video-poster.jpg"
            onLoadedMetadata={event => setVideoDuration(event.currentTarget.duration)}
            onTimeUpdate={event => setVideoProgress(event.currentTarget.currentTime)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          ><source src="/assets/portfolio-hero.mp4" type="video/mp4" /></video>
          <div className="hero-video-tint"/>
          <div className="particle p1"/><div className="particle p2"/><div className="particle p3"/>
        </div>
        <div className="hero-shade" />
        {!isPlaying && <button className="video-start-button hero-start-button" type="button" onClick={togglePlayback}><Play size={20}/> 点击播放</button>}
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
        <div className={`hero-video-controls${controlsVisible ? '' : ' is-hidden'}`}>
          <button type="button" onClick={togglePlayback} aria-label={isPlaying ? '暂停视频' : '播放视频'}>{isPlaying ? <Pause size={16}/> : <Play size={16}/>}</button>
          <span>{formatTime(videoProgress)}</span>
          <input type="range" min="0" max={videoDuration || 0} step="0.1" value={videoProgress} onChange={seekVideo} aria-label="视频播放进度"/>
          <span>{formatTime(videoDuration)}</span>
          <button type="button" onClick={toggleSound} aria-label={isMuted ? '打开声音' : '关闭声音'}>{isMuted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button>
          <button type="button" onClick={() => setControlsVisible(false)} aria-label="隐藏视频进度条" title="隐藏进度条"><EyeOff size={17}/></button>
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
              <div className="project-contributions">
                <div className="contributions-heading"><span>KEY CONTRIBUTIONS</span><h4>主要工作</h4></div>
                <div className="contributions-grid">{p.contributions.map((item, index) => <section className="contribution-card" key={item.title}>
                  <div className="contribution-top"><span>{String(index + 1).padStart(2, '0')}</span><h5>{item.title}</h5></div>
                  <p>{item.text}</p>
                  <div className="contribution-points">{item.points.map(point => <span key={point}>{point}</span>)}</div>
                </section>)}</div>
              </div>
              <div className="project-image"><ProjectVideo src={p.video} poster={p.image} title={p.title}/><div className="project-state"><span/>{p.status}</div><span className="project-no">/{p.no}</span></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="strength section shell" id="strength">
        <Grainient className="strength-grainient" color1="#294f87" color2="#172d50" color3="#080b11" />
        <div className="section-heading split"><div className="section-kicker"><span>03</span> CAPABILITIES / 个人优势</div><h2>我的<br/><i>核心优势</i></h2></div>
        <div className="strength-grid">{strengths.map(({icon:Icon, ...s}) => <article key={s.num} data-no={s.num}>
          <div className="cap-top"><span>/{s.num}</span><Icon size={30}/></div><div className="strength-copy"><h3>{s.title}</h3><p>{s.text}</p><div className="strength-tags">{s.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
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
