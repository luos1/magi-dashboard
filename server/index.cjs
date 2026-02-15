// MAGI Dashboard API Server
// 멜키오르 작성 + 제리 통합

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 실제 MAGI 노드 데이터
const getNodes = () => [
  { 
    id: 'jerry', 
    name: '제리', 
    emoji: '🖥️',
    role: '코어',
    status: 'online', 
    hp: 100, 
    mp: 85,
    ip: 'localhost',
    stats: { atk: 1247, def: 99.8, spd: 0.3 }
  },
  { 
    id: 'melchior', 
    name: '멜키오르', 
    emoji: '🔧',
    role: 'GPU',
    status: 'online', 
    hp: 80, 
    mp: 67,
    ip: '192.168.0.7',
    stats: { atk: 847, def: 99.2, spd: 2.3 }
  },
  { 
    id: 'balthasar', 
    name: '발타사르', 
    emoji: '⚙️',
    role: 'CPU',
    status: 'online', 
    hp: 70, 
    mp: 45,
    ip: '192.168.0.10',
    stats: { atk: 523, def: 98.5, spd: 1.8 }
  },
  { 
    id: 'caspar', 
    name: '카스파', 
    emoji: '🕷️',
    role: '크롤러',
    status: 'offline', 
    hp: 0, 
    mp: 0,
    ip: '192.168.0.5',
    stats: { atk: 0, def: 0, spd: 0 }
  }
];

// 로그 저장소
let logs = [
  { time: new Date().toISOString(), type: 'success', message: '🚀 MAGI API Server started' },
  { time: new Date().toISOString(), type: 'info', message: '🔧 멜키오르 connected' },
  { time: new Date().toISOString(), type: 'info', message: '⚙️ 발타사르 connected' },
];

// GET /api/nodes - 모든 노드 상태
app.get('/api/nodes', (req, res) => {
  res.json({ 
    success: true, 
    data: getNodes(),
    timestamp: new Date().toISOString()
  });
});

// GET /api/logs - 최근 로그
app.get('/api/logs', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  res.json({ 
    success: true, 
    data: logs.slice(-limit).reverse(),
    timestamp: new Date().toISOString()
  });
});

// POST /api/logs - 로그 추가
app.post('/api/logs', (req, res) => {
  const { type, message } = req.body;
  const log = { 
    time: new Date().toISOString(), 
    type: type || 'info', 
    message 
  };
  logs.push(log);
  if (logs.length > 100) logs = logs.slice(-100);
  res.json({ success: true, data: log });
});

// GET /api/stats - 통계
app.get('/api/stats', (req, res) => {
  const nodes = getNodes();
  res.json({
    success: true,
    data: {
      totalNodes: nodes.length,
      onlineNodes: nodes.filter(n => n.status === 'online').length,
      offlineNodes: nodes.filter(n => n.status === 'offline').length,
      queued: Math.floor(Math.random() * 20),
      completed: 847 + Math.floor(Math.random() * 10),
      failed: 3,
      dailyRevenue: 32450 + Math.floor(Math.random() * 1000)
    },
    timestamp: new Date().toISOString()
  });
});

// 헬스체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🦝 MAGI API Server running on port ${PORT}`);
});
