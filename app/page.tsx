"use client"
import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  ChevronDown,
  Clock,
  CodeXml,
  Command,
  Github,
  Info,
  Linkedin,
  Mail,
  Moon,
  Sparkles,
  Star,
  Twitter,
} from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  // Lanyard Discord Activities
  const [lanyard, setLanyard] = useState<any>(null)
  useEffect(() => {
    fetch("https://api.lanyard.rest/v1/users/1113945518071107705")
      .then(res => res.json())
      .then(data => setLanyard(data.data))
  }, [])

  const avatarUrl = lanyard && lanyard.discord_user && lanyard.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${lanyard.discord_user.id}/${lanyard.discord_user.avatar}.${lanyard.discord_user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256`
    : '/placeholder.svg';

  // GitHub Activity
  const [githubEvents, setGithubEvents] = useState<any[]>([])
  useEffect(() => {
    fetch("https://api.github.com/users/zayzinha/events/public")
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setGithubEvents(data.slice(0, 5)) : setGithubEvents([]))
  }, [])

  // GitHub stats
  const [githubStats, setGithubStats] = useState({ stars: 0, forks: 0, repos: 0 })
  useEffect(() => {
    fetch('https://api.github.com/users/zayzinha/repos?per_page=100')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const stars = data.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
          const forks = data.reduce((acc, repo) => acc + (repo.forks_count || 0), 0)
          setGithubStats({ stars, forks, repos: data.length })
        }
      })
  }, [])

  const gridColors = [
    "#3a3a36", "#444441", "#4a4a46", "#353532", "#393936",
    "#2d2d2a", "#232321", "#363632", "#41413d", "#2a2a28"
  ];

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
          {/* Header with profile */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-sm overflow-hidden border border-[#3a3a36]">
                <img src={avatarUrl} alt="Avatar" className="object-cover w-10 h-10" />
              </div>
              <div>
                <h1 className="text-xl font-medium tracking-tight flex items-center gap-1.5">
                Marcelo Souza
                  <Command className="w-3.5 h-3.5 text-[#4a4a46]/50" />
                </h1>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-[#4a4a46]/70">Developer</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <a
                href="https://github.com/darkzinn2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center rounded-sm bg-[#1e1e1c] text-[#4a4a46]/70 hover:text-[#4a4a46] hover:bg-[#262624] transition-colors border border-[#3a3a36]"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center rounded-sm bg-[#1e1e1c] text-[#4a4a46]/70 hover:text-[#4a4a46] hover:bg-[#262624] transition-colors border border-[#3a3a36]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center rounded-sm bg-[#1e1e1c] text-[#4a4a46]/70 hover:text-[#4a4a46] hover:bg-[#262624] transition-colors border border-[#3a3a36]"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:example@example.com"
                className="w-6 h-6 flex items-center justify-center rounded-sm bg-[#1e1e1c] text-[#4a4a46]/70 hover:text-[#4a4a46] hover:bg-[#262624] transition-colors border border-[#3a3a36]"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center opacity-60 hover:opacity-100 transition-opacity">
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Grid layout for widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Spotify widget (agora mostra atividades do Lanyard) */}
            <div className="sm:col-span-2 row-span-1">
              <div className="flex flex-col h-full bg-gradient-to-br from-[#1e1e1c] to-[#232321] rounded-md border border-[#3a3a36] p-3 transition-colors shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-5 h-5 text-[#4a4a46] animate-pulse">
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" />
                    </svg>
                  </div>
                  <span className="text-xs text-[#4a4a46]/80">Discord Atividades</span>
                </div>
                {lanyard ? (
                  lanyard.activities && lanyard.activities.length > 0 ? (
                    lanyard.activities.map((activity: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-[#232321] rounded p-2 mb-1">
                        {activity.name === "Custom Status"
                          ? activity.emoji
                            ? (typeof activity.emoji === "string"
                                ? <span className="text-4xl w-16 h-16 flex items-center justify-center">{activity.emoji}</span>
                                : <img
                                    src={`https://cdn.discordapp.com/emojis/${activity.emoji.id}.${activity.emoji.animated ? 'gif' : 'png'}`}
                                    alt={activity.emoji.name}
                                    className="w-10 h-10"
                                  />
                              )
                            : null
                          : activity.name === "Spotify" && lanyard.spotify
                            ? (
                              <img
                                src={lanyard.spotify.album_art_url}
                                alt="Spotify Album"
                                className="w-16 h-16 rounded"
                              />
                            )
                            : activity.assets && activity.assets.large_image
                              ? (
                                <img
                                  src={
                                    activity.assets.large_image.startsWith('mp:')
                                      ? `https://media.discordapp.net/${activity.assets.large_image.replace('mp:', '')}`
                                      : activity.application_id
                                        ? `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
                                        : '/placeholder.svg'
                                  }
                                  alt="activity"
                                  className="w-16 h-16 rounded"
                                  onError={e => (e.currentTarget.src = '/placeholder.svg')}
                                />
                              )
                              : (
                                <img src="/placeholder.svg" alt="activity" className="w-16 h-16 rounded" />
                              )
                        }
                        <div>
                          <div className="font-medium text-[#4a4a46] text-sm">{activity.name}</div>
                          <div className="text-xs text-[#4a4a46]/70">{activity.details || activity.state || 'Ativo'}</div>
                          {activity.type === 2 && activity.name === 'Spotify' && lanyard.listening_to_spotify && lanyard.spotify ? (
                            <div className="mt-1 flex items-center gap-2">
                              <img src={lanyard.spotify.album_art_url} alt="Spotify Album" className="w-8 h-8 rounded" />
                              <div>
                                <div className="text-xs text-[#1db954] font-semibold">{lanyard.spotify.song}</div>
                                <div className="text-xs text-[#4a4a46]/70">{lanyard.spotify.artist}</div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 w-full text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#4a4a46]/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                      </svg>
                      <span className="text-sm text-[#4a4a46]/70 font-medium">Provavelmente dormindo,<br/>nenhuma atividade encontrada.</span>
                    </div>
                  )
                ) : (
                  <div className="text-xs text-[#4a4a46]/60">Carregando atividades...</div>
                )}
              </div>
            </div>

            {/* Skills widget */}
            <div className="sm:col-span-1 row-span-1">
              <div className="bg-[#1e1e1c] rounded-md border border-[#3a3a36] px-3 py-2 hover:border-[#4a4a46]/50 transition-colors group h-auto flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CodeXml className="w-3.5 h-3.5 text-[#4a4a46]/70 group-hover:text-[#4a4a46] transition-colors" />
                    <span className="text-xs text-[#4a4a46]/80 group-hover:text-[#4a4a46]/90 transition-colors">
                      Habilidades
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#4a4a46]/60">
                    <Star className="w-3 h-3" />
                    <span>Tecnologias</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {/* JavaScript */}
                  <div className="flex flex-col items-center justify-center gap-1 hover:bg-[#2a2a28]/20 p-1 rounded-md transition-colors">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className="w-full h-full opacity-70 filter grayscale invert flex items-center justify-center">
                        JS
                      </div>
                    </div>
                    <span className="text-[10px] text-[#4a4a46]/70">JavaScript</span>
                    <div className="w-full bg-[#2a2a28] h-[3px] rounded-full">
                      <div className="bg-[#4a4a46]/60 h-[3px] rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>

                  {/* Python */}
                  <div className="flex flex-col items-center justify-center gap-1 hover:bg-[#2a2a28]/20 p-1 rounded-md transition-colors">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className="w-full h-full opacity-70 filter grayscale invert flex items-center justify-center">
                        PY
                      </div>
                    </div>
                    <span className="text-[10px] text-[#4a4a46]/70">Python</span>
                    <div className="w-full bg-[#2a2a28] h-[3px] rounded-full">
                      <div className="bg-[#4a4a46]/60 h-[3px] rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  {/* TypeScript */}
                  <div className="flex flex-col items-center justify-center gap-1 hover:bg-[#2a2a28]/20 p-1 rounded-md transition-colors">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className="w-full h-full opacity-70 filter grayscale invert flex items-center justify-center">
                        TS
                      </div>
                    </div>
                    <span className="text-[10px] text-[#4a4a46]/70">TypeScript</span>
                    <div className="w-full bg-[#2a2a28] h-[3px] rounded-full">
                      <div className="bg-[#4a4a46]/60 h-[3px] rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  {/* CSS */}
                  <div className="flex flex-col items-center justify-center gap-1 hover:bg-[#2a2a28]/20 p-1 rounded-md transition-colors">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className="w-full h-full opacity-70 filter grayscale invert flex items-center justify-center">
                        CSS
                      </div>
                    </div>
                    <span className="text-[10px] text-[#4a4a46]/70">CSS</span>
                    <div className="w-full bg-[#2a2a28] h-[3px] rounded-full">
                      <div className="bg-[#4a4a46]/60 h-[3px] rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>

                  {/* HTML */}
                  <div className="flex flex-col items-center justify-center gap-1 hover:bg-[#2a2a28]/20 p-1 rounded-md transition-colors">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className="w-full h-full opacity-70 filter grayscale invert flex items-center justify-center">
                        HTML
                      </div>
                    </div>
                    <span className="text-[10px] text-[#4a4a46]/70">HTML</span>
                    <div className="w-full bg-[#2a2a28] h-[3px] rounded-full">
                      <div className="bg-[#4a4a46]/60 h-[3px] rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>

                  {/* React */}
                  <div className="flex flex-col items-center justify-center gap-1 hover:bg-[#2a2a28]/20 p-1 rounded-md transition-colors">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className="w-full h-full opacity-70 filter grayscale invert flex items-center justify-center">
                        ⚛️
                      </div>
                    </div>
                    <span className="text-[10px] text-[#4a4a46]/70">React</span>
                    <div className="w-full bg-[#2a2a28] h-[3px] rounded-full">
                      <div className="bg-[#4a4a46]/60 h-[3px] rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub activity */}
            <div className="sm:col-span-2 row-span-1">
              <div className="bg-[#1e1e1c] rounded-md border border-[#3a3a36] p-3 h-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#4a4a46]" />
                    <span className="text-xs text-[#4a4a46]/80">GitHub Activity</span>
                  </div>
                  <a
                    href="https://github.com/darkzinn2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#4a4a46]/60 hover:text-[#4a4a46] px-2 py-1 rounded bg-[#232321] border border-[#3a3a36] ml-auto"
                  >
                    @darkzinn2
                  </a>
                </div>
                <div className="flex justify-center items-center w-full">
                  <div
                    className="grid"
                    style={{
                      gridTemplateRows: 'repeat(2, 24px)',
                      gridTemplateColumns: 'repeat(20, 24px)',
                      gap: '2px'
                    }}
                  >
                    {Array.from({ length: 2 * 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-md transition-colors duration-200 hover:bg-[#4a4a46]"
                        style={{
                          width: '24px',
                          height: '24px',
                          background: gridColors[i % gridColors.length]
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs text-[#4a4a46]/60 mt-2">
                  <span><svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a1.724 1.724 0 002.573.982c.797-.545 1.8.253 1.257 1.05a1.724 1.724 0 00.982 2.573c.921.3.921 1.603 0 1.902a1.724 1.724 0 00-.982 2.573c.545.797-.253 1.8-1.05 1.257a1.724 1.724 0 00-2.573.982c-.3.921-1.603.921-1.902 0a1.724 1.724 0 00-2.573-.982c-.797.545-1.8-.253-1.257-1.05a1.724 1.724 0 00-.982-2.573c-.921-.3-.921-1.603 0-1.902a1.724 1.724 0 00.982-2.573c-.545-.797.253-1.8 1.05-1.257.73.5 1.7.5 2.43 0z" /></svg> {githubStats.stars} stars</span>
                  <span><svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7v10M17 7v10M7 7h10M7 17h10M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" /></svg> {githubStats.forks} forks</span>
                  <span><svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4M4 7h16" /></svg> {githubStats.repos} repos</span>
                </div>
              </div>
            </div>

            {/* Local time widget */}
            <div className="sm:col-span-1 row-span-1">
              <div className="bg-[#1e1e1c] rounded-md border border-[#3a3a36] p-3 hover:border-[#4a4a46]/50 transition-colors h-full flex flex-col group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#4a4a46]/80" />
                    <span className="text-xs text-[#4a4a46]/80 group-hover:text-[#4a4a46] transition-colors">
                      Hora local
                    </span>
                  </div>
                  <Moon className="w-3.5 h-3.5 text-[#4a4a46]/70" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-medium text-[#4a4a46]">
                      {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-[#4a4a46]/50 ml-1">
                      {String(new Date().getSeconds()).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-[#4a4a46]/70">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date().toLocaleDateString("pt-BR", { weekday: "short" })}, {new Date().getDate()}{" "}
                      {new Date().toLocaleDateString("pt-BR", { month: "short" })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center pt-2 mt-2 border-t border-[#3a3a36]">
                  <div className="flex items-center gap-1 text-[10px] text-[#4a4a46]/60">
                    <span>
                      Semana {Math.ceil(new Date().getDate() / 7)} • {new Date().getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Information link */}
            <div className="sm:col-span-3">
              <Link
                className="flex items-center justify-between bg-[#1e1e1c] rounded-md border border-[#3a3a36] p-3 hover:border-[#4a4a46]/50 transition-colors group"
                href="/informations"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#4a4a46]" />
                  <span className="text-sm font-medium text-[#4a4a46]">Informações</span>
                </div>
                <span className="text-xs text-[#4a4a46]/60 group-hover:text-[#4a4a46] transition-colors">
                  Skills 
                </span>
              </Link>
            </div>

            {/* Terminal */}
            <div className="sm:col-span-3">
              <div className="bg-[#1e1e1c] rounded-md border border-[#3a3a36] overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 bg-[#262624] border-b border-[#3a3a36]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28ca41]"></div>
                  </div>
                  <div className="text-xs text-[#4a4a46]/70">Terminal</div>
                  <div className="w-8"></div>
                </div>
                <div className="p-3 font-mono text-xs">
                  <div className="flex">
                    <span className="text-[#4a4a46]/70">$ </span>
                    <span className="text-[#4a4a46]">cd portfolio</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#4a4a46]/70">$ </span>
                    <span className="text-[#4a4a46]">ls -la</span>
                  </div>
                  <div className="text-[#4a4a46]/80 pl-4 mt-1">
                    <div>
                      <span className="text-[#4a4a46]/60">drwxr-xr-x</span> frontend/
                    </div>
                    <div>
                      <span className="text-[#4a4a46]/60">drwxr-xr-x</span> backend/
                    </div>
                    <div>
                      <span className="text-[#4a4a46]/60">-rw-r--r--</span> README.md
                    </div>
                    <div>
                      <span className="text-[#4a4a46]/60">-rw-r--r--</span> package.json
                    </div>
                  </div>
                  <div className="flex mt-1 items-center">
                    <span className="text-[#4a4a46]/70">$ </span>
                    <span className="text-[#4a4a46] relative">
                      npm start
                      <span className="absolute top-1 right-[-12px] w-2 h-4 bg-[#4a4a46]/80 animate-pulse-subtle"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center border-t border-[#3a3a36] pt-4 mt-4 text-xs">
            <div className="flex items-center h-6 overflow-hidden gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#4a4a46]/60" />
              <p className="text-xs text-[#4a4a46]/70 transition-all duration-300 opacity-100 translate-y-0">
                Sempre aprendendo, sempre crescendo
              </p>
            </div>
            <a
              href="mailto:marceloexpress9@gmail.com"
              className="px-3 py-1.5 border border-[#4a4a46]/50 rounded-sm hover:bg-[#4a4a46] hover:text-[#262624] transition-all text-[#4a4a46]/80 hover:border-[#4a4a46] flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contato</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
