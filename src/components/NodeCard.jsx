function NodeCard({ node }) {
  const statusClass = node.status === 'online' ? 'online' : 
                      node.status === 'warning' ? 'warning' : 'offline'
  
  const getHpColor = (hp) => {
    if (hp >= 70) return 'hp'
    if (hp >= 30) return 'warning'
    return 'danger'
  }

  return (
    <div className={`node-card ${statusClass} p-4 rounded-lg`}>
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{node.emoji}</span>
          <div>
            <h3 className="font-bold text-lg">{node.name}</h3>
            <span className="text-xs text-gray-500">[{node.role}]</span>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-sm font-bold status-${statusClass}`}>
            {node.status === 'online' ? '🟢 ONLINE' : 
             node.status === 'warning' ? '🟡 WARNING' : '🔴 OFFLINE'}
          </div>
          <div className="text-xs text-gray-500">LV.{node.level}</div>
        </div>
      </div>

      {/* HP/MP 바 */}
      <div className="space-y-2 mb-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>HP (Memory)</span>
            <span>{node.hp}%</span>
          </div>
          <div className="progress-bar rounded">
            <div 
              className={`progress-fill ${getHpColor(node.hp)} rounded`}
              style={{ width: `${node.hp}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>MP (CPU/GPU)</span>
            <span>{node.mp}%</span>
          </div>
          <div className="progress-bar rounded">
            <div 
              className="progress-fill mp rounded"
              style={{ width: `${node.mp}%` }}
            />
          </div>
        </div>
      </div>

      {/* 스탯 */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3 bg-black/20 rounded p-2">
        <div>
          <div className="text-gray-500">ATK</div>
          <div className="font-bold text-[var(--magi-green)]">{node.stats.atk}</div>
        </div>
        <div>
          <div className="text-gray-500">DEF</div>
          <div className="font-bold text-[var(--magi-blue)]">{node.stats.def}%</div>
        </div>
        <div>
          <div className="text-gray-500">SPD</div>
          <div className="font-bold text-[var(--magi-yellow)]">{node.stats.spd}s</div>
        </div>
      </div>

      {/* 현재 작업 */}
      <div className="text-xs">
        <span className="text-gray-500">🎯 </span>
        <span className={node.status === 'offline' ? 'text-gray-600' : 'text-gray-300'}>
          {node.currentTask}
        </span>
      </div>

      {/* 스킬 */}
      <div className="mt-2 flex flex-wrap gap-1">
        {node.skills.map((skill, i) => (
          <span 
            key={i}
            className="text-xs bg-[var(--magi-border)] px-2 py-0.5 rounded"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* IP */}
      {node.ip && (
        <div className="mt-2 text-xs text-gray-600">
          📍 {node.ip}
        </div>
      )}
    </div>
  )
}

export default NodeCard
