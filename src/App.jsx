import { useState, useEffect } from 'react'
import NodeCard from './components/NodeCard'
import ActivityLog from './components/ActivityLog'
import StatsPanel from './components/StatsPanel'
import KeywordResearch from './components/KeywordResearch'

// 데모 데이터 (나중에 실제 API 연결)
const initialNodes = [
  {
    id: 'jerry',
    name: '제리',
    emoji: '🖥️',
    role: '코어',
    status: 'online',
    level: 5,
    hp: 84,  // 컨텍스트 127k/150k = 84%
    mp: 16,  // 여유 공간
    stats: { atk: 1247, def: 99.8, spd: 0.3 },
    currentTask: '작업 분배 중...',
    skills: ['OpenClaw', 'SSH Control', 'Memory'],
  },
  {
    id: 'melchior',
    name: '멜키오르',
    emoji: '🔧',
    role: 'GPU',
    ip: '192.168.0.7',
    status: 'online',
    level: 3,
    hp: 80,
    mp: 67,
    stats: { atk: 847, def: 99.2, spd: 2.3 },
    currentTask: '이미지 생성 3/10',
    skills: ['ComfyUI', 'Ollama', 'qwen2.5:7b'],
  },
  {
    id: 'balthasar',
    name: '발타사르',
    emoji: '⚙️',
    role: 'CPU',
    ip: '192.168.0.10',
    status: 'online',
    level: 2,
    hp: 70,
    mp: 45,
    stats: { atk: 523, def: 98.5, spd: 1.8 },
    currentTask: '대기 중',
    skills: ['Ollama', 'Automation', 'qwen2.5:3b'],
  },
  {
    id: 'caspar',
    name: '카스파',
    emoji: '🕷️',
    role: '크롤러',
    ip: '192.168.0.5',
    status: 'offline',
    level: 1,
    hp: 0,
    mp: 0,
    stats: { atk: 0, def: 0, spd: 0 },
    currentTask: 'OFFLINE',
    skills: ['Crawler', 'Data Collection'],
  },
]

const initialLogs = [
  { time: '15:21', type: 'success', message: '발타사르 joined the party!' },
  { time: '15:20', type: 'info', message: '멜키오르 used [Ollama] → qwen2.5:7b loaded' },
  { time: '15:18', type: 'success', message: '📝 제리 recorded to Obsidian' },
  { time: '15:15', type: 'warning', message: '카스파 is offline...' },
  { time: '15:10', type: 'success', message: '💰 +₩12,340 from AdSense' },
  { time: '15:05', type: 'success', message: '✅ Blog post #847 published' },
  { time: '15:00', type: 'info', message: '🎬 YouTube video processing started' },
]

function App() {
  const [nodes, setNodes] = useState(initialNodes)
  const [logs, setLogs] = useState(initialLogs)
  const [dailyRevenue] = useState(32450)
  const [totalTasks] = useState({ queued: 12, completed: 847, failed: 3 })

  // 시뮬레이션: 랜덤 로그 추가
  useEffect(() => {
    const interval = setInterval(() => {
      const events = [
        { type: 'success', message: '✅ Task completed' },
        { type: 'info', message: '🔧 Processing...' },
        { type: 'success', message: '💰 +₩' + Math.floor(Math.random() * 1000) + ' earned' },
      ]
      const event = events[Math.floor(Math.random() * events.length)]
      const now = new Date()
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      
      setLogs(prev => [{ time, ...event }, ...prev.slice(0, 19)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* 헤더 */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <span className="text-4xl">🏢</span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              너구리상회 AI 스튜디오
            </span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">MAGI System Control Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[var(--magi-panel)] border border-[var(--magi-border)] px-4 py-2 rounded">
            <span className="text-gray-400 text-sm">Daily Revenue</span>
            <div className="text-xl font-bold text-[var(--magi-green)]">
              💰 ₩{dailyRevenue.toLocaleString()}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 노드 카드들 */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>⚔️</span> Active Units
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nodes.map(node => (
              <NodeCard key={node.id} node={node} />
            ))}
          </div>
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 통계 */}
          <StatsPanel stats={totalTasks} />
          
          {/* 활동 로그 */}
          <ActivityLog logs={logs} />
        </div>
      </div>

      {/* 키워드 리서치 */}
      <div className="mt-6">
        <KeywordResearch />
      </div>

      {/* 푸터 */}
      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p>🦝 Powered by MAGI System • OpenClaw</p>
      </footer>
    </div>
  )
}

export default App
