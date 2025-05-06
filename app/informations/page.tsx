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
            <h1 className="text-lg font-medium">Informations</h1>
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
