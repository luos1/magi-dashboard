import { useState, useEffect } from 'react'

const SAMPLE_KEYWORDS = [
  { keyword: '자동차 보험료 비교', volume: 12000, cpc: 2500, difficulty: 65, intent: '구매' },
  { keyword: '헬스장 PT 가격', volume: 8500, cpc: 1800, difficulty: 55, intent: '구매' },
  { keyword: '블로그 수익 방법', volume: 15000, cpc: 1200, difficulty: 70, intent: '정보' },
  { keyword: '애드센스 승인 팁', volume: 6000, cpc: 900, difficulty: 45, intent: '정보' },
  { keyword: '전세 대출 금리', volume: 22000, cpc: 3500, difficulty: 75, intent: '구매' },
  { keyword: '신용카드 추천 2026', volume: 18000, cpc: 4200, difficulty: 80, intent: '구매' },
  { keyword: '다이어트 식단표', volume: 35000, cpc: 800, difficulty: 60, intent: '정보' },
  { keyword: '부업 추천', volume: 28000, cpc: 1500, difficulty: 68, intent: '구매' },
]

function KeywordResearch() {
  const [keywords, setKeywords] = useState(SAMPLE_KEYWORDS)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredKeywords = keywords.filter(k => {
    const matchSearch = k.keyword.includes(searchTerm)
    const matchFilter = filter === 'all' || k.intent === filter
    return matchSearch && matchFilter
  })

  const getIntentColor = (intent) => {
    switch(intent) {
      case '구매': return 'text-green-400 bg-green-400/20'
      case '정보': return 'text-blue-400 bg-blue-400/20'
      case '행동': return 'text-yellow-400 bg-yellow-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getDifficultyColor = (diff) => {
    if (diff < 40) return 'text-green-400'
    if (diff < 60) return 'text-yellow-400'
    if (diff < 80) return 'text-orange-400'
    return 'text-red-400'
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-gray-400'
  }

  // 점수 계산: (검색량 * CPC) / 난이도
  const calcScore = (k) => {
    const raw = (k.volume * k.cpc / 1000) / k.difficulty
    return Math.min(100, Math.round(raw))
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          🔍 키워드 리서치
        </h2>
        <span className="text-sm text-gray-400">
          {filteredKeywords.length}개 키워드
        </span>
      </div>

      {/* 검색 & 필터 */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="키워드 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">전체 인텐트</option>
          <option value="구매">구매형</option>
          <option value="정보">정보형</option>
          <option value="행동">행동형</option>
        </select>
      </div>

      {/* 키워드 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
              <th className="pb-3">키워드</th>
              <th className="pb-3 text-right">검색량</th>
              <th className="pb-3 text-right">CPC</th>
              <th className="pb-3 text-right">난이도</th>
              <th className="pb-3 text-center">인텐트</th>
              <th className="pb-3 text-right">점수</th>
            </tr>
          </thead>
          <tbody>
            {filteredKeywords.sort((a, b) => calcScore(b) - calcScore(a)).map((k, i) => (
              <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="py-3 text-white font-medium">{k.keyword}</td>
                <td className="py-3 text-right text-gray-300">
                  {k.volume.toLocaleString()}
                </td>
                <td className="py-3 text-right text-gray-300">
                  ₩{k.cpc.toLocaleString()}
                </td>
                <td className={`py-3 text-right font-medium ${getDifficultyColor(k.difficulty)}`}>
                  {k.difficulty}%
                </td>
                <td className="py-3 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIntentColor(k.intent)}`}>
                    {k.intent}
                  </span>
                </td>
                <td className={`py-3 text-right font-bold ${getScoreColor(calcScore(k))}`}>
                  {calcScore(k)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 범례 */}
      <div className="mt-4 pt-4 border-t border-gray-700 flex flex-wrap gap-4 text-xs text-gray-400">
        <span>점수 = (검색량 × CPC) ÷ 난이도</span>
        <span className="text-green-400">● 구매형 = CPC 높음</span>
        <span className="text-blue-400">● 정보형 = 트래픽용</span>
      </div>
    </div>
  )
}

export default KeywordResearch
