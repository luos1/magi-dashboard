import { useState } from 'react'

const ProjectsPanel = ({ projects }) => {
  const [filter, setFilter] = useState('all')
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status === filter)

  const statusColors = {
    '심사중': 'text-yellow-400',
    '개발중': 'text-blue-400',
    '기획완료': 'text-purple-400',
    '완료': 'text-green-400',
  }

  const statusEmoji = {
    '심사중': '⏳',
    '개발중': '🔄',
    '기획완료': '📋',
    '완료': '✅',
  }

  return (
    <div className="bg-[var(--magi-panel)] border border-[var(--magi-border)] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span>📱</span> 앱 팩토리
          <span className="text-sm text-gray-500">({projects.length}/8 이번달)</span>
        </h3>
        <div className="flex gap-2">
          {['all', '개발중', '심사중', '기획완료'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-2 py-1 text-xs rounded ${
                filter === s 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {s === 'all' ? '전체' : s}
            </button>
          ))}
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>월간 목표</span>
          <span>{projects.length}/8 앱</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all"
            style={{ width: `${(projects.length / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* 프로젝트 리스트 */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredProjects.map((project, idx) => (
          <div 
            key={idx}
            className="flex items-center justify-between p-2 bg-gray-800/50 rounded hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span>{project.emoji || '📱'}</span>
              <div>
                <div className="font-medium text-sm">{project.name}</div>
                <div className="text-xs text-gray-500">{project.platform}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${statusColors[project.status]}`}>
                {statusEmoji[project.status]} {project.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 빠른 액션 */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex gap-2">
          <button className="flex-1 bg-green-600/20 text-green-400 hover:bg-green-600/30 px-3 py-2 rounded text-sm transition-colors">
            ➕ 새 앱 아이디어
          </button>
          <button className="flex-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-3 py-2 rounded text-sm transition-colors">
            📊 통계 보기
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectsPanel
