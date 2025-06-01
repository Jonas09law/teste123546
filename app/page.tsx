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
  Music,
} from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function Home() {
  // Lanyard Discord Activities
  const [lanyard, setLanyard] = useState<any>(null)
  const [isLoadingLanyard, setIsLoadingLanyard] = useState(false)

  useEffect(() => {
    setIsLoadingLanyard(true)
    const ws = new WebSocket("wss://api.lanyard.rest/socket")

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log("Dados recebidos do Lanyard WebSocket:", data)
      if (data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") {
        setLanyard(data.d)
        setIsLoadingLanyard(false)
      }
    }

    ws.onopen = () => {
      console.log("WebSocket do Lanyard conectado")
      ws.send(JSON.stringify({
        op: 2,
        d: { subscribe_to_id: "1113945518071107705" },
      }))
      const heartbeatInterval = setInterval(() => {
        ws.send(JSON.stringify({ op: 3 }))
      }, 30000)
      ws.heartbeatInterval = heartbeatInterval
    }

    ws.onerror = (error) => {
      console.error("Erro no WebSocket do Lanyard:", error)
      setIsLoadingLanyard(false)
    }

    ws.onclose = () => {
      console.log("WebSocket do Lanyard fechado, tentando reconectar...")
      setIsLoadingLanyard(false)
      setTimeout(() => {
        const newWs = new WebSocket("wss://api.lanyard.rest/socket")
        newWs.onmessage = ws.onmessage
        newWs.onopen = ws.onopen
        newWs.onerror = ws.onerror
        newWs.onclose = ws.onclose
      }, 5000)
    }

    return () => {
      console.log("Limpando WebSocket do Lanyard")
      clearInterval(ws.heartbeatInterval)
      ws.close()
    }
  }, [])

  const avatarUrl = lanyard && lanyard.discord_user && lanyard.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${lanyard.discord_user.id}/${lanyard.discord_user.avatar}.${lanyard.discord_user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256`
    : '/placeholder.svg'

  // Map Discord status to Portuguese and set status color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "online":
        return { text: "Online", color: "bg-green-500" }
      case "idle":
        return { text: "Ausente", color: "bg-yellow-500" }
      case "dnd":
        return { text: "Não Perturbe", color: "bg-red-500" }
      case "offline":
      default:
        return { text: "Offline", color: "bg-gray-500" }
    }
  }

  const discordStatus = lanyard?.discord_status || "offline"
  const { text: statusText, color: statusColor } = getStatusInfo(discordStatus)

  // GitHub Activity
  const [githubEvents, setGithubEvents] = useState<any[]>([])
  const [isLoadingGithubEvents, setIsLoadingGithubEvents] = useState(false)

  useEffect(() => {
    const fetchGithubEvents = () => {
      setIsLoadingGithubEvents(true)
      fetch("https://api.github.com/users/zayzinha/events/public")
        .then(res => res.json())
        .then(data => Array.isArray(data) ? setGithubEvents(data.slice(0, 5)) : setGithubEvents([]))
        .catch(err => console.error("Erro ao carregar eventos do GitHub:", err))
        .finally(() => setIsLoadingGithubEvents(false))
    }

    fetchGithubEvents()
    const interval = setInterval(fetchGithubEvents, 60000)

    return () => clearInterval(interval)
  }, [])

  // GitHub stats
  const [githubStats, setGithubStats] = useState({ stars: 0, forks: 0, repos: 0 })
  const [isLoadingGithubStats, setIsLoadingGithubStats] = useState(false)

  useEffect(() => {
    const fetchGithubStats = () => {
      setIsLoadingGithubStats(true)
      fetch('https://api.github.com/users/zayzinha/repos?per_page=100')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const stars = data.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
            const forks = data.reduce((acc, repo) => acc + (repo.forks_count || 0), 0)
            setGithubStats({ stars, forks, repos: data.length })
          }
        })
        .catch(err => console.error("Erro ao carregar estatísticas do GitHub:", err))
        .finally(() => setIsLoadingGithubStats(false))
    }

    fetchGithubStats()
    const interval = setInterval(fetchGithubStats, 60000)

    return () => clearInterval(interval)
  }, [])

  // Local Time
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Audio control
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => console.error("Erro ao tocar áudio:", err))
      }
      setIsPlaying(!isPlaying)
    }
  }

  const gridColors = [
    "#3a3a36", "#444441", "#4a4a46", "#353532", "#393936",
    "#2d2d2a", "#232321", "#363632", "#41413d", "#2a2a28"
  ]

  return (
    <div className={`min-h-screen bg-[#262624] text-[#4a4a46] relative ${isPlaying ? 'bg-gradient-to-r from-[#1e1e1c] to-[#1db954] animate-pulse' : ''}`}>
      <style>
        {`
          .animate-pulse {
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }

          .scale-105 {
            transform: scale(1.05);
            transition: transform 0.3s ease-in-out;
          }

          .bg-gradient-to-r {
            background: linear-gradient(to right, #1e1e1c, #1db954);
            transition: background 0.5s ease;
          }
        `}
      </style>
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
                <h1 className={`text-xl font-medium tracking-tight flex items-center gap-1.5 ${isPlaying ? 'text-[#1db954]' : 'text-[#4a4a46]'}`}>
                  Marcelo Souza <span className={`text-xs ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'} flex items-center gap-1`}>
                    {statusText}
                    <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
                  </span>
                </h1>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`}>Developer</span>
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
            {/* Spotify widget (mostra atividades do Lanyard) */}
            <div className="sm:col-span-2 row-span-1">
              <div className={`flex flex-col h-full bg-gradient-to-br from-[#1e1e1c] to-[#232321] rounded-md border border-[#3a3a36] p-3 transition-colors shadow-sm ${isPlaying ? 'scale-105 shadow-lg' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-5 h-5 text-[#4a4a46] animate-pulse">
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" />
                    </svg>
                  </div>
                  <span className={`text-xs ${isPlaying ? 'text-[#1db954]/80' : 'text-[#4a4a46]/80'}`}>Discord Atividades</span>
                  {isLoadingLanyard && (
                    <span className={`text-xs ${isPlaying ? 'text-[#1db954]/60' : 'text-[#4a4a46]/60'} ml-2`}>Atualizando...</span>
                  )}
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
                          <div className={`font-medium text-sm ${isPlaying ? 'text-[#1db954]' : 'text-[#4a4a46]'}`}>{activity.name}</div>
                          <div className={`text-xs ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`}>{activity.details || activity.state || 'Ativo'}</div>
                          {activity.type === 2 && activity.name === 'Spotify' && lanyard.listening_to_spotify && lanyard.spotify ? (
                            <div className="mt-1 flex items-center gap-2">
                              <img src={lanyard.spotify.album_art_url} alt="Spotify Album" className="w-8 h-8 rounded" />
                              <div>
                                <div className={`text-xs font-semibold ${isPlaying ? 'text-[#1db954]' : 'text-[#1db954]'}`}>{lanyard.spotify.song}</div>
                                <div className={`text-xs ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`}>{lanyard.spotify.artist}</div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 w-full text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`w-10 h-10 mb-2 ${isPlaying ? 'text-[#1db954]/60' : 'text-[#4a4a46]/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                      </svg>
                      <span className={`text-sm font-medium ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`}>
                        Provavelmente dormindo,<br/>nenhuma atividade encontrada.
                      </span>
                    </div>
                  )
                ) : (
                  <div className={`text-xs ${isPlaying ? 'text-[#1db954]/60' : 'text-[#4a4a46]/60'}`}>Carregando atividades...</div>
                )}
              </div>
            </div>

            {/* Audio widget */}
            <div className="sm:col-span-1 row-span-1">
              <div className={`bg-[#1e1e1c] rounded-md border border-[#3a3a36] p-3 hover:border-[#4a4a46]/50 transition-colors h-full flex flex-col group ${isPlaying ? 'scale-105 shadow-lg' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Music className={`w-3.5 h-3.5 ${isPlaying ? 'text-[#1db954] animate-pulse' : 'text-[#4a4a46]/80'}`} />
                    <span className={`text-xs group-hover:text-[#4a4a46] transition-colors ${isPlaying ? 'text-[#1db954]' : 'text-[#4a4a46]/80'}`}>
                      Música
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <button
                    onClick={toggleAudio}
                    aria-label={isPlaying ? "Pausar música" : "Tocar música"}
                    className={`flex items-center gap-2 px-3 py-1.5 bg-[#232321] rounded-md border border-[#3a3a36] text-[#4a4a46] hover:bg-[#4a4a46] hover:text-[#262624] transition-colors ${isPlaying ? 'bg-[#1db954] text-white' : ''}`}
                  >
                    {isPlaying ? (
                      <span>Pausar</span>
                    ) : (
                      <span>Tocar</span>
                    )}
                    <Music className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <audio ref={audioRef} src="/musicasite.mp3" preload="auto" />
            </div>

            {/* Skills widget */}
            <div className="sm:col-span-1 row-span-1">
              <div className={`bg-[#1e1e1c] rounded-md border border-[#3a3a36] px-3 py-2 hover:border-[#4a4a46]/50 transition-colors group h-auto flex flex-col ${isPlaying ? 'scale-105 shadow-lg' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CodeXml className={`w-3.5 h-3.5 ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'} group-hover:text-[#4a4a46] transition-colors`} />
                    <span className={`text-xs ${isPlaying ? 'text-[#1db954]/80' : 'text-[#4a4a46]/80'} group-hover:text-[#4a4a46]/90 transition-colors`}>
                      Habilidades
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${isPlaying ? 'text-[#1db954]/60' : 'text-[#4a4a46]/60'}`}>
                    <Star className="w-3 h-3" />
                    <span>Tecnologias</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {/* JavaScript */}
                  <div className="flex flex-col items-center justify-center gap-1 hover:bg-[#2a2a28]/20 p-1 rounded-md transition-colors">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className={`w-full h-full opacity-70 filter ${isPlaying ? '' : 'grayscale'} invert flex items-center justify-center`}>
                        JS
                      </div>
                    </div>
                    <span className={`text-[10px] ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`}>JavaScript</span>
                    <div className="w-full bg-[#2a2a28] h-[3px] rounded-full">
                      <div className={`h-[3px] rounded-full ${isPlaying ? 'bg-[#1db954]/60' : 'bg-[#4a4a46]/60'}`} style={{ width: "90%" }}></div>
                    </div>
                  </div>

                  {/* Python */}
                  <div className="flex flex-col items-center justify-center gap-1 hover:bg-[#2a2a28]/20 p-1 rounded-md transition-colors">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className={`w-full h-full opacity-70 filter ${isPlaying ? '' : 'grayscale'} invert flex items-center justify-center`}>
                        PY
                      </div>
                    </div>
                    <span className={`text-[10px] ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`}>Python</span>
                    <div className="w-full bg-[#2a2a28] h-[3px] rounded-full">
                      <div className={`h-[3px] rounded-full ${isPlaying ? 'bg-[#1db954]/60' : 'bg-[#4a4a46]/60'}`} style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  {/* TypeScript */}
                  <div className="flex flex-col items-center justify-center gap-1 hover:bg-[#2a2a28]/20 p-1 rounded-md transition-colors">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className={`w-full h-full opacity-70 filter ${isPlaying ? '' : 'grayscale'} invert flex items-center justify-center`}>
                        TS
                      </div>
                    </div>
                    <span className={`text-[10px] ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`}>TypeScript</span>
                    <div className="w-full bg-[#2a2a28] h-[3px] rounded-full">
                      <div className={`h-[3px] rounded-full ${isPlaying ? 'bg-[#1db954]/60' : 'bg-[#4a4a46]/60'}`} style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  {/* CSS */}
                  <div className="flex flex-col items-center justify-center gap-1 hover:bg-[#2a2a28]/20 p-1 rounded-md transition-colors">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className={`w-full h-full opacity-70 filter ${isPlaying ? '' : 'grayscale'} invert flex items-center justify-center`}>
                        CSS
                      </div>
                    </div>
                    <span className={`text-[10px] ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`}>CSS</span>
                    <div className="w-full bg-[#2a2a28] h-[3px] rounded-full">
                      <div className={`h-[3px] rounded-full ${isPlaying ? 'bg-[#1db954]/60' : 'bg-[#4a4a46]/60'}`} style={{ width: "80%" }}></div>
                    </div>
                  </div>

                  {/* HTML */}
                  <div className="flex flex-col items-center justify-center gap-1 hover:bg-[#2a2a28]/20 p-1 rounded-md transition-colors">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className={`w-full h-full opacity-70 filter ${isPlaying ? '' : 'grayscale'} invert flex items-center justify-center`}>
                        HTML
                      </div>
                    </div>
                    <span className={`text-[10px] ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`}>HTML</span>
                    <div className="w-full bg-[#2a2a28] h-[3px] rounded-full">
                      <div className={`h-[3px] rounded-full ${isPlaying ? 'bg-[#1db954]/60' : 'bg-[#4a4a46]/60'}`} style={{ width: "95%" }}></div>
                    </div>
                  </div>

                  {/* React */}
                  <div className="flex flex-col items-center justify-center gap-1 hover:bg-[#2a2a28]/20 p-1 rounded-md transition-colors">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className={`w-full h-full opacity-70 filter ${isPlaying ? '' : 'grayscale'} invert flex items-center justify-center`}>
                        ⚛️
                      </div>
                    </div>
                    <span className={`text-[10px] ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`}>React</span>
                    <div className="w-full bg-[#2a2a28] h-[3px] rounded-full">
                      <div className={`h-[3px] rounded-full ${isPlaying ? 'bg-[#1db954]/60' : 'bg-[#4a4a46]/60'}`} style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub activity */}
            <div className="sm:col-span-2 row-span-1">
              <div className={`bg-[#1e1e1c] rounded-md border border-[#3a3a36] p-3 h-full ${isPlaying ? 'scale-105 shadow-lg' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className={`w-4 h-4 ${isPlaying ? 'text-[#1db954]' : 'text-[#4a4a46]'}`} />
                    <span className={`text-xs ${isPlaying ? 'text-[#1db954]/80' : 'text-[#4a4a46]/80'}`}>GitHub Activity</span>
                    {isLoadingGithubEvents && (
                      <span className={`text-xs ${isPlaying ? 'text-[#1db954]/60' : 'text-[#4a4a46]/60'} ml-2`}>Atualizando...</span>
                    )}
                  </div>
                  <a
                    href="https://github.com/darkzinn2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs px-2 py-1 rounded bg-[#232321] border border-[#3a3a36] ml-auto ${isPlaying ? 'text-[#1db954]/60 hover:text-[#1db954]' : 'text-[#4a4a46]/60 hover:text-[#4a4a46]'}`}
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
                        className={`rounded-md transition-colors duration-200 ${isPlaying ? 'hover:bg-[#1db954]' : 'hover:bg-[#4a4a46]'}`}
                        style={{
                          width: '24px',
                          height: '24px',
                          background: isPlaying ? '#1db954' : gridColors[i % gridColors.length]
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className={`flex justify-between items-center text-xs mt-2 ${isPlaying ? 'text-[#1db954]/60' : 'text-[#4a4a46]/60'}`}>
                  <span>
                    <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a1.724 1.724 0 002.573.982c.797-.545 1.8.253 1.257 1.05a1.724 1.724 0 00.982 2.573c.921.3.921 1.603 0 1.902a1.724 1.724 0 00-.982 2.573c.545.797-.253 1.8-1.05 1.257a1.724 1.724 0 00-2.573.982c-.3.921-1.603.921-1.902 0a1.724 1.724 0 00-2.573-.982c-.797.545-1.8-.253-1.257-1.05a1.724 1.724 0 00-.982-2.573c-.921-.3-.921-1.603 0-1.902a1.724 1.724 0 00.982-2.573c-.545-.797.253-1.8 1.05-1.257.73.5 1.7.5 2.43 0z" />
                    </svg> 
                    {isLoadingGithubStats ? "..." : githubStats.stars} stars
                  </span>
                  <span>
                    <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7v10M17 7v10M7 7h10M7 17h10M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                    </svg> 
                    {isLoadingGithubStats ? "..." : githubStats.forks} forks
                  </span>
                  <span>
                    <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4M4 7h16" />
                    </svg> 
                    {isLoadingGithubStats ? "..." : githubStats.repos} repos
                  </span>
                </div>
              </div>
            </div>

            {/* Local time widget */}
            <div className="sm:col-span-1 row-span-1">
              <div className={`bg-[#1e1e1c] rounded-md border border-[#3a3a36] p-3 hover:border-[#4a4a46]/50 transition-colors h-full flex flex-col group ${isPlaying ? 'scale-105 shadow-lg' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className={`w-3.5 h-3.5 ${isPlaying ? 'text-[#1db954]/80' : 'text-[#4a4a46]/80'}`} />
                    <span className={`text-xs group-hover:text-[#4a4a46] transition-colors ${isPlaying ? 'text-[#1db954]' : 'text-[#4a4a46]/80'}`}>
                      Hora local
                    </span>
                  </div>
                  <Moon className={`w-3.5 h-3.5 ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`} />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="flex items-baseline">
                    <span className={`text-2xl font-medium ${isPlaying ? 'text-[#1db954]' : 'text-[#4a4a46]'}`}>
                      {currentTime.getHours()}:{String(currentTime.getMinutes()).padStart(2, "0")}
                    </span>
                    <span className={`text-xs ml-1 ${isPlaying ? 'text-[#1db954]/50' : 'text-[#4a4a46]/50'}`}>
                      {String(currentTime.getSeconds()).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 mt-2 text-xs ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`}>
                    <Calendar className="w-3 h-3" />
                    <span>
                      {currentTime.toLocaleDateString("pt-BR", { weekday: "short" })}, {currentTime.getDate()}{" "}
                      {currentTime.toLocaleDateString("pt-BR", { month: "short" })}
                    </span>
                  </div>
                </div>
                <div className={`flex items-center justify-center pt-2 mt-2 border-t border-[#3a3a36] ${isPlaying ? 'border-[#1db954]/50' : ''}`}>
                  <div className={`flex items-center gap-1 text-[10px] ${isPlaying ? 'text-[#1db954]/60' : 'text-[#4a4a46]/60'}`}>
                    <span>
                      Semana {Math.ceil(currentTime.getDate() / 7)} • {currentTime.getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Information link */}
            <div className="sm:col-span-3">
              <Link
                className={`flex items-center justify-between bg-[#1e1e1c] rounded-md border border-[#3a3a36] p-3 hover:border-[#4a4a46]/50 transition-colors group ${isPlaying ? 'scale-105 shadow-lg' : ''}`}
                href="/informations"
              >
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isPlaying ? 'text-[#1db954]' : 'text-[#4a4a46]'}`} />
                  <span className={`text-sm font-medium ${isPlaying ? 'text-[#1db954]' : 'text-[#4a4a46]'}`}>Informações</span>
                </div>
                <span className={`text-xs transition-colors ${isPlaying ? 'text-[#1db954]/60 group-hover:text-[#1db954]' : 'text-[#4a4a46]/60 group-hover:text-[#4a4a46]'}`}>
                  Skills 
                </span>
              </Link>
            </div>

            {/* Terminal */}
            <div className="sm:col-span-3">
              <div className={`bg-[#1e1e1c] rounded-md border border-[#3a3a36] overflow-hidden ${isPlaying ? 'scale-105 shadow-lg' : ''}`}>
                <div className={`flex items-center justify-between px-3 py-2 bg-[#262624] border-b ${isPlaying ? 'border-[#1db954]/50' : 'border-[#3a3a36]'}`}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28ca41]"></div>
                  </div>
                  <div className={`text-xs ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`}>Terminal</div>
                  <div className="w-8"></div>
                </div>
                <div className="p-3 font-mono text-xs">
                  <div className="flex">
                    <span className={`text-[#4a4a46]/70 ${isPlaying ? 'text-[#1db954]/70' : ''}`}>$ </span>
                    <span className={`${isPlaying ? 'text-[#1db954]' : 'text-[#4a4a46]'}`}>cd portfolio</span>
                  </div>
                  <div className="flex">
                    <span className={`text-[#4a4a46]/70 ${isPlaying ? 'text-[#1db954]/70' : ''}`}>$ </span>
                    <span className={`${isPlaying ? 'text-[#1db954]' : 'text-[#4a4a46]'}`}>ls -la</span>
                  </div>
                  <div className={`pl-4 mt-1 ${isPlaying ? 'text-[#1db954]/80' : 'text-[#4a4a46]/80'}`}>
                    <div>
                      <span className={`${isPlaying ? 'text-[#1db954]/60' : 'text-[#4a4a46]/60'}`}>drwxr-xr-x</span> frontend/
                    </div>
                    <div>
                      <span className={`${isPlaying ? 'text-[#1db954]/60' : 'text-[#4a4a46]/60'}`}>drwxr-xr-x</span> backend/
                    </div>
                    <div>
                      <span className={`${isPlaying ? 'text-[#1db954]/60' : 'text-[#4a4a46]/60'}`}>-rw-r--r--</span> README.md
                    </div>
                    <div>
                      <span className={`${isPlaying ? 'text-[#1db954]/60' : 'text-[#4a4a46]/60'}`}>-rw-r--r--</span> package.json
                    </div>
                  </div>
                  <div className="flex mt-1 items-center">
                    <span className={`text-[#4a4a46]/70 ${isPlaying ? 'text-[#1db954]/70' : ''}`}>$ </span>
                    <span className={`relative ${isPlaying ? 'text-[#1db954]' : 'text-[#4a4a46]'}`}>
                      npm start
                      <span className={`absolute top-1 right-[-12px] w-2 h-4 animate-pulse-subtle ${isPlaying ? 'bg-[#1db954]/80' : 'bg-[#4a4a46]/80'}`}></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`flex justify-between items-center border-t pt-4 mt-4 text-xs ${isPlaying ? 'border-[#1db954]/50' : 'border-[#3a3a36]'}`}>
            <div className="flex items-center h-6 overflow-hidden gap-1">
              <Sparkles className={`w-3.5 h-3.5 ${isPlaying ? 'text-[#1db954]/60' : 'text-[#4a4a46]/60'}`} />
              <p className={`text-xs transition-all duration-300 opacity-100 translate-y-0 ${isPlaying ? 'text-[#1db954]/70' : 'text-[#4a4a46]/70'}`}>
                Sempre aprendendo, sempre crescendo
              </p>
            </div>
            <a
              href="mailto:marceloexpress9@gmail.com"
              className={`px-3 py-1.5 border rounded-sm hover:bg-[#4a4a46] hover:text-[#262624] transition-all flex items-center gap-1.5 ${isPlaying ? 'border-[#1db954]/50 text-[#1db954]/80 hover:border-[#1db954] hover:bg-[#1db954] hover:text-white' : 'border-[#4a4a46]/50 text-[#4a4a46]/80 hover:border-[#4a4a46]'}`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contato</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}s
