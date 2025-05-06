"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Briefcase, Calendar, Check, Code, Coffee, MapPin, User } from "lucide-react"

export default function Informations() {
  const [activeTab, setActiveTab] = useState("All")
  const [visibleSections, setVisibleSections] = useState({
    aboutMe: false,
    experience: false,
    skills: false,
  })

  useEffect(() => {
    // Animate sections appearing with a delay
    const timer1 = setTimeout(() => {
      setVisibleSections((prev) => ({ ...prev, aboutMe: true }))
    }, 100)

    const timer2 = setTimeout(() => {
      setVisibleSections((prev) => ({ ...prev, experience: true }))
    }, 300)

    const timer3 = setTimeout(() => {
      setVisibleSections((prev) => ({ ...prev, skills: true }))
    }, 500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const skills = [
    { name: "JavaScript", category: "Languages", proficiency: 80 },
    { name: "TypeScript", category: "Languages", proficiency: 70 },
    { name: "Python", category: "Languages", proficiency: 65 },
    { name: "React", category: "Frontend", proficiency: 75 },
    { name: "Tailwind CSS", category: "Frontend", proficiency: 60 },
    { name: "CSS", category: "Frontend", proficiency: 85 },
    { name: "HTML", category: "Frontend", proficiency: 90 },
    { name: "Node.js", category: "Backend", proficiency: 68 },
    { name: "Express", category: "Backend", proficiency: 62 },
    { name: "MongoDB", category: "Backend", proficiency: 58 },
  ]

  const filteredSkills = activeTab === "All" ? skills : skills.filter((skill) => skill.category === activeTab)

  return (
    <div className="min-h-screen bg-[#262624] text-[#4a4a46] relative">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #4a4a46 1px, transparent 1px), 
                          linear-gradient(to bottom, #4a4a46 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          opacity: 0.05,
        }}
      />
      <main className="relative z-10 flex flex-col items-center justify-center p-3 max-w-4xl mx-auto">
        <div className="w-full py-4 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link
              className="flex items-center gap-1 text-xs text-[#4a4a46]/70 hover:text-[#4a4a46] transition-colors group"
              href="/"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Voltar</span>
            </Link>
            <h1 className="text-lg font-medium">Informações</h1>
          </div>

          {/* About Me Section */}
          <div
            className={`transition-all duration-500 ${visibleSections.aboutMe ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-[#4a4a46]/80" />
                <h2 className="text-lg font-medium">About Me</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-[#1e1e1c] rounded-sm border border-[#3a3a36] p-3">
                  <p className="text-xs leading-relaxed text-[#4a4a46]/80">
                    I'm a passionate Full Stack Developer with expertise in modern web technologies. My journey in
                    coding started with a curiosity about how websites work, and it has evolved into a professional
                    career building robust and scalable applications.
                  </p>
                  <p className="text-xs leading-relaxed text-[#4a4a46]/80 mt-2">
                    I specialize in JavaScript/TypeScript ecosystems, with a focus on React for frontend and Node.js for
                    backend development. I'm constantly learning and adapting to new technologies to deliver the best
                    solutions.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="border border-[#3a3a36] bg-[#1e1e1c] rounded-sm p-2.5 hover:border-[#4a4a46]/50 transition-all group">
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#4a4a46]/70" />
                      <span className="text-xs font-medium">Location</span>
                    </div>
                    <span className="text-xs text-[#4a4a46]/80">estados unidos, Brazil</span>
                  </div>
                  <div className="border border-[#3a3a36] bg-[#1e1e1c] rounded-sm p-2.5 hover:border-[#4a4a46]/50 transition-all group">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-[#4a4a46]/70" />
                      <span className="text-xs font-medium">Experience</span>
                    </div>
                    <span className="text-xs text-[#4a4a46]/80">5+ Years</span>
                  </div>
                  <div className="border border-[#3a3a36] bg-[#1e1e1c] rounded-sm p-2.5 hover:border-[#4a4a46]/50 transition-all group">
                    <div className="flex items-center space-x-2 mb-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#4a4a46]/70" />
                      <span className="text-xs font-medium">Projects</span>
                    </div>
                    <span className="text-xs text-[#4a4a46]/80">30+ Completed</span>
                  </div>
                  <div className="border border-[#3a3a36] bg-[#1e1e1c] rounded-sm p-2.5 hover:border-[#4a4a46]/50 transition-all group">
                    <div className="flex items-center space-x-2 mb-1">
                      <Coffee className="w-3.5 h-3.5 text-[#4a4a46]/70" />
                      <span className="text-xs font-medium">Coffee</span>
                    </div>
                    <span className="text-xs text-[#4a4a46]/80">∞ Cups</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Experience Section */}
          <div
            className={`transition-all duration-500 ${visibleSections.experience ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-[#4a4a46]/80" />
                <h2 className="text-lg font-medium">Experience</h2>
              </div>
              <div className="space-y-3">
                <div className="border-l border-[#3a3a36] pl-3 relative group hover:border-[#4a4a46] transition-all bg-[#1e1e1c]/50 py-2 rounded-r-sm pr-2">
                  <div className="absolute w-2 h-2 bg-[#3a3a36] group-hover:bg-[#4a4a46] rounded-full -left-1 top-3 transition-colors"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
                    <h3 className="text-sm font-medium"> Developer @ Tech Company</h3>
                    <span className="text-xs px-2 py-0.5 bg-[#262624] rounded-sm text-[#4a4a46]/70 inline-block w-fit">
                      2025 - Present
                    </span>
                  </div>
                  <p className="text-xs text-[#4a4a46]/80 mb-1.5">
                    Led development of multiple web applications, mentored  developers, and implemented best
                    practices.
                  </p>
                  <div className="grid grid-cols-1 gap-1 mt-1.5">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#4a4a46]/60 flex-shrink-0" />
                      <span className="text-xs text-[#4a4a46]/70">Reduced application load time by 40%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#4a4a46]/60 flex-shrink-0" />
                      <span className="text-xs text-[#4a4a46]/70">Implemented CI/CD pipeline</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#4a4a46]/60 flex-shrink-0" />
                      <span className="text-xs text-[#4a4a46]/70">Led team of 5 developers</span>
                    </div>
                  </div>
                </div>
                <div className="border-l border-[#3a3a36] pl-3 relative group hover:border-[#4a4a46] transition-all bg-[#1e1e1c]/50 py-2 rounded-r-sm pr-2">
                  <div className="absolute w-2 h-2 bg-[#3a3a36] group-hover:bg-[#4a4a46] rounded-full -left-1 top-3 transition-colors"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
                    <h3 className="text-sm font-medium">Full Stack Developer @ Digital Agency</h3>
                    <span className="text-xs px-2 py-0.5 bg-[#262624] rounded-sm text-[#4a4a46]/70 inline-block w-fit">
                      2023 - 2024
                    </span>
                  </div>
                  <p className="text-xs text-[#4a4a46]/80 mb-1.5">
                    Developed and maintained client websites, created custom CMS solutions, and collaborated with design
                    team.
                  </p>
                  <div className="grid grid-cols-1 gap-1 mt-1.5">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#4a4a46]/60 flex-shrink-0" />
                      <span className="text-xs text-[#4a4a46]/70">Built 15+ client websites</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#4a4a46]/60 flex-shrink-0" />
                      <span className="text-xs text-[#4a4a46]/70">Developed custom e-commerce solution</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#4a4a46]/60 flex-shrink-0" />
                      <span className="text-xs text-[#4a4a46]/70">Integrated third-party APIs</span>
                    </div>
                  </div>
                </div>
                <div className="border-l border-[#3a3a36] pl-3 relative group hover:border-[#4a4a46] transition-all bg-[#1e1e1c]/50 py-2 rounded-r-sm pr-2">
                  <div className="absolute w-2 h-2 bg-[#3a3a36] group-hover:bg-[#4a4a46] rounded-full -left-1 top-3 transition-colors"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
                    <h3 className="text-sm font-medium">liox Developer @ Flay Solutions.</h3>
                    <span className="text-xs px-2 py-0.5 bg-[#262624] rounded-sm text-[#4a4a46]/70 inline-block w-fit">
                      2020 - 2022
                    </span>
                  </div>
                  <p className="text-xs text-[#4a4a46]/80 mb-1.5">
                    Assisted in building MVPs, fixed bugs, and contributed to frontend development using React.
                  </p>
                  <div className="grid grid-cols-1 gap-1 mt-1.5">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#4a4a46]/60 flex-shrink-0" />
                      <span className="text-xs text-[#4a4a46]/70">Contributed to 3 successful product launches</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#4a4a46]/60 flex-shrink-0" />
                      <span className="text-xs text-[#4a4a46]/70">Reduced bug count by 30%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#4a4a46]/60 flex-shrink-0" />
                      <span className="text-xs text-[#4a4a46]/70">Improved UI/UX of main product</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Skills Section */}
          <div
            className={`transition-all duration-500 ${visibleSections.skills ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-[#4a4a46]/80" />
                <h2 className="text-lg font-medium">Skills</h2>
              </div>
              <div className="flex gap-1.5 mb-4 flex-wrap">
                <button
                  className={`px-2 py-1 rounded-sm text-xs transition-colors ${activeTab === "All" ? "bg-[#4a4a46] text-[#262624]" : "border border-[#3a3a36] hover:bg-[#2d2d2a] text-[#4a4a46]/80"}`}
                  onClick={() => setActiveTab("All")}
                >
                  All
                </button>
                <button
                  className={`px-2 py-1 rounded-sm text-xs transition-colors ${activeTab === "Languages" ? "bg-[#4a4a46] text-[#262624]" : "border border-[#3a3a36] hover:bg-[#2d2d2a] text-[#4a4a46]/80"}`}
                  onClick={() => setActiveTab("Languages")}
                >
                  Languages
                </button>
                <button
                  className={`px-2 py-1 rounded-sm text-xs transition-colors ${activeTab === "Frontend" ? "bg-[#4a4a46] text-[#262624]" : "border border-[#3a3a36] hover:bg-[#2d2d2a] text-[#4a4a46]/80"}`}
                  onClick={() => setActiveTab("Frontend")}
                >
                  Frontend
                </button>
                <button
                  className={`px-2 py-1 rounded-sm text-xs transition-colors ${activeTab === "Backend" ? "bg-[#4a4a46] text-[#262624]" : "border border-[#3a3a36] hover:bg-[#2d2d2a] text-[#4a4a46]/80"}`}
                  onClick={() => setActiveTab("Backend")}
                >
                  Backend
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="border border-[#3a3a36] bg-[#1e1e1c] rounded-sm p-2.5 hover:border-[#4a4a46]/50 transition-all group"
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs px-1.5 py-0.5 bg-[#262624] rounded-sm text-[#4a4a46]/70">
                        {skill.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-[#262624] rounded-sm h-1.5 overflow-hidden">
                        <div
                          className="bg-[#4a4a46]/80 h-1.5 group-hover:bg-[#4a4a46] transition-all"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-[#4a4a46]/70 w-12 text-right">{skill.proficiency}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
