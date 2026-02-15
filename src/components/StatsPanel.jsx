function StatsPanel({ stats }) {
  return (
    <div className="bg-[var(--magi-panel)] border border-[var(--magi-border)] rounded-lg p-4">
      <h3 className="font-bold mb-3 flex items-center gap-2">
        <span>📊</span> Mission Status
      </h3>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-black/20 rounded p-3">
          <div className="text-2xl font-bold text-[var(--magi-yellow)]">{stats.queued}</div>
          <div className="text-xs text-gray-500">Queued</div>
        </div>
        <div className="bg-black/20 rounded p-3">
          <div className="text-2xl font-bold text-[var(--magi-green)]">{stats.completed}</div>
          <div className="text-xs text-gray-500">Completed</div>
        </div>
        <div className="bg-black/20 rounded p-3">
          <div className="text-2xl font-bold text-[var(--magi-red)]">{stats.failed}</div>
          <div className="text-xs text-gray-500">Failed</div>
        </div>
      </div>
      
      {/* 성공률 바 */}
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Success Rate</span>
          <span className="text-[var(--magi-green)]">
            {((stats.completed / (stats.completed + stats.failed)) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="progress-bar rounded">
          <div 
            className="progress-fill hp rounded"
            style={{ width: `${(stats.completed / (stats.completed + stats.failed)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default StatsPanel
