import React from 'react'
import { ArrowDownRight, ArrowUpRight, Code2, Cpu, Gamepad2, Layers3, Mail, MapPin, Phone, Sparkles } from 'lucide-react'

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

function App() {
  return (
    <main>
      <header className="nav shell">
        <Brand />
        <nav><a href="#about">关于</a><a href="#work">项目</a><a href="#strength">能力</a></nav>
        <a className="nav-contact" href="mailto:1909942822@qq.com">联系我 <ArrowUpRight size={16}/></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <video autoPlay muted loop playsInline poster="/assets/hero-world.png"><source src="/assets/hero-loop.mp4" type="video/mp4" /></video>
          <div className="particle p1"/><div className="particle p2"/><div className="particle p3"/>
        </div>
        <div className="hero-shade" />
        <div className="hero-content shell">
          <div className="eyebrow"><span className="live-dot"/> AVAILABLE FOR OPPORTUNITIES · 2026</div>
          <h1>构建世界，<br/>也定义<span>玩法。</span></h1>
          <div className="hero-bottom">
            <p>郭志伟<br/><strong>UNITY DEVELOPER<br/>& GAME DESIGNER</strong></p>
            <a className="circle-link" href="#work" aria-label="查看项目"><ArrowDownRight size={28}/></a>
          </div>
        </div>
        <div className="hero-index">GZW<span>/ 01—05</span></div>
      </section>

      <section className="about section shell" id="about">
        <div className="section-kicker"><span>01</span> PROFILE / 个人经历</div>
        <div className="about-grid">
          <div className="portrait-wrap"><img src="/assets/portrait.png" alt="郭志伟个人照片"/><div className="portrait-label">BASED IN<br/>QUANZHOU, CHINA</div></div>
          <div className="about-copy">
            <p className="lead">我是一名在读虚拟现实技术专业学生，<em>专注于 Unity 游戏开发与系统策划。</em></p>
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
          <div className="section-heading"><div className="section-kicker"><span>02</span> SELECTED WORK / 精选项目</div><h2>把想法做成<br/><i>可玩的系统。</i></h2></div>
          <div className="projects">
            {projects.map((p) => <article className="project" key={p.no}>
              <div className="project-image"><img src={p.image} alt={`${p.title}项目概念图`}/><div className="project-state"><span/>{p.status}</div><span className="project-no">/{p.no}</span></div>
              <div className="project-info">
                <div><small>{p.en}</small><h3>{p.title}</h3></div>
                <p>{p.desc}</p>
                <div className="meta"><span>{p.role}</span><span>{p.period}</span></div>
                <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              </div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="strength section shell" id="strength">
        <div className="section-heading split"><div className="section-kicker"><span>03</span> CAPABILITIES / 个人优势</div><h2>技术是骨架，<br/><i>体验是方向。</i></h2></div>
        <div className="strength-grid">{strengths.map(({icon:Icon, ...s}) => <article key={s.num}>
          <div className="cap-top"><span>/{s.num}</span><Icon size={25}/></div><h3>{s.title}</h3><p>{s.text}</p>
        </article>)}</div>
        <div className="toolbelt"><span>UNITY</span><span>C#</span><span>C++</span><span>UGUI</span><span>SHADER GRAPH</span><span>NAVMESH</span><span>GIT</span></div>
      </section>

      <footer className="contact" id="contact">
        <div className="contact-glow"><Sparkles /></div>
        <div className="shell contact-inner">
          <div className="section-kicker"><span>04</span> START A CONVERSATION</div>
          <div className="contact-title"><p>有新的世界要构建吗？</p><h2>LET’S MAKE<br/><i>IT PLAYABLE.</i></h2></div>
          <div className="contact-bottom">
            <a href="mailto:1909942822@qq.com">1909942822@qq.com <ArrowUpRight size={22}/></a>
            <div><span>PHONE</span><b>+86 152 5976 7521</b></div>
            <div><span>LOCATION</span><b>QUANZHOU · CHINA</b></div>
          </div>
          <div className="copyright"><Brand/><span>© 2026 GUO ZHIWEI. BUILT WITH INTENT.</span></div>
        </div>
      </footer>
    </main>
  )
}

export default App
