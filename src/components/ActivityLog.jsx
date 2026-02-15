function ActivityLog({ logs }) {
  return (
    <div className="bg-[var(--magi-panel)] border border-[var(--magi-border)] rounded-lg p-4">
      <h3 className="font-bold mb-3 flex items-center gap-2">
        <span>📜</span> 실시간 활동 로그
      </h3>
      <div className="space-y-1 max-h-80 overflow-y-auto">
        {logs.map((log, i) => (
          <div key={i} className={`log-entry ${log.type} text-sm`}>
            <span className="text-gray-500 text-xs">{log.time}</span>
            <span className="ml-2">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityLog
