export const COLORS = {
  green: '#3fb950', red: '#f85149', yellow: '#d29922',
  blue: '#58a6ff', orange: '#f0883e', purple: '#bc8cff',
  muted: '#8b949e', border: '#30363d', bg2: '#161b22', bg3: '#21262d',
}

export const revenueData = [
  { year: '2019', revenue: 15000, profit: 2800 },
  { year: '2020', revenue: 18200, profit: 3700 },
  { year: '2021', revenue: 19000, profit: 2500 },
  { year: '2022', revenue: 14000, profit: -3000 },
  { year: '2023', revenue: 22000, profit: -1000 },
  { year: 'Q2-Q3/24', revenue: 10664, profit: 270 },
]

export const loanData = [
  { year: '2019', loan: 55000, share: 50 },
  { year: '2020', loan: 66000, share: 55 },
  { year: '2021', loan: 68000, share: 55 },
  { year: '2022', loan: 52000, share: 48 },
  { year: '2023', loan: 48000, share: 45 },
  { year: '2024E', loan: 52000, share: 45 },
]

export const sentimentHistory = [
  { q: 'Q1/22', score: 0.10 }, { q: 'Q2/22', score: -0.10 },
  { q: 'Q3/22', score: -0.30 }, { q: 'Q4/22', score: -0.45 },
  { q: 'Q1/23', score: -0.40 }, { q: 'Q2/23', score: -0.45 },
  { q: 'Q3/23', score: -0.50 }, { q: 'Q4/23', score: -0.40 },
  { q: 'Q1/24', score: -0.20 }, { q: 'Q2/24', score: -0.05 },
  { q: 'Q3/24', score: 0.15 },  { q: 'Q4/24', score: 0.22 },
  { q: 'Q1/25', score: 0.28 },  { q: 'Q2/26', score: 0.32 },
]

export const sentimentSources = [
  { source: 'Báo chí tài chính VN', score: 0.40, color: COLORS.green },
  { source: 'Nhà đầu tư / Analyst', score: 0.35, color: COLORS.green },
  { source: 'Prediction market', score: 0.45, color: COLORS.blue },
  { source: 'Regulatory / NHNN', score: 0.20, color: COLORS.yellow },
  { source: 'Mạng xã hội (người vay)', score: -0.15, color: COLORS.red },
]

export const forecastData = [
  { year: '2024E', bull: 600, base: 300, bear: 100 },
  { year: '2025E', bull: 2500, base: 1200, bear: 400 },
  { year: '2026E', bull: 4500, base: 2800, bear: 1000 },
]

export const valuationData = [
  { label: '2021 Peak', value: 2.8, fill: COLORS.green },
  { label: '2023 Trough', value: 0.5, fill: COLORS.red },
  { label: '2025E', value: 1.0, fill: COLORS.yellow },
  { label: '2028E Bull', value: 2.0, fill: COLORS.blue },
]

export const dcfData = [
  { name: 'PV FCF Năm 1-5', value: 4200 },
  { name: 'PV FCF Năm 6-10', value: 5800 },
  { name: 'Terminal Value', value: 9500 },
]

export const peerData = [
  { name: 'FE Credit', share: 45 },
  { name: 'Home Credit VN', share: 20 },
  { name: 'MCredit (MB)', share: 8 },
  { name: 'Shinhan Finance', share: 5 },
  { name: 'F88', share: 2 },
]

export const irrData = [
  { scenario: '🐂 Bull ($2.8B)', moic: 3.5, irr: 52, color: COLORS.green },
  { scenario: '📊 Base ($2.0B)', moic: 2.5, irr: 26, color: COLORS.blue },
  { scenario: '🐻 Bear ($0.6B)', moic: 0.75, irr: -9, color: COLORS.red },
]

export const ratioData = [
  { metric: 'NIM', fec: 85, benchmark: 75 },
  { metric: 'ROA', fec: 25, benchmark: 60 },
  { metric: 'Loan Growth', fec: 40, benchmark: 80 },
  { metric: 'Cost-to-Income', fec: 35, benchmark: 70 },
  { metric: 'NPL (inv)', fec: 30, benchmark: 90 },
  { metric: 'Provision Cov', fec: 70, benchmark: 85 },
]

export const scorecardData = [
  { category: 'Chất lượng tài sản', score: 4, color: COLORS.red },
  { category: 'Khả năng sinh lợi', score: 5, color: COLORS.yellow },
  { category: 'Tăng trưởng', score: 5, color: COLORS.yellow },
  { category: 'Vị thế cạnh tranh', score: 7, color: COLORS.blue },
  { category: 'Chuyển đổi số', score: 8, color: COLORS.green },
  { category: 'Cổ đông / Quản trị', score: 7, color: COLORS.blue },
]

export const signals = [
  {
    id: 'recovery',
    title: 'RECOVERY thesis — "FE Credit lãi Q1/2026 — confirmed"',
    status: 'Strengthening' as const,
    score: 7,
    color: 'green' as const,
    pros: ['Q1/2026 lãi (xác nhận từ VPBank PDF chính thức)', 'LNTT 2025A: 611 tỷ (+93% KH 2026: 1.179 tỷ)', 'Finacle cloud live · PCI DSS 4.0'],
    cons: ['NPL ~12-15% vẫn cao', 'Brand sentiment người vay còn âm'],
    invalidate: 'NPL tăng lại >18%; kinh tế VN chậm lại 2026',
  },
  {
    id: 'competition',
    title: 'COMPETITION thesis — "Mất thị phần dài hạn"',
    status: 'Watch' as const,
    score: 5,
    color: 'yellow' as const,
    pros: ['Home Credit (SCBX) nguồn lực mới', 'BNPL CAGR 58% 2021–2024'],
    cons: ['18.000+ POS khó replicate', '10M khách hàng data moat'],
    invalidate: 'Thị phần FE Credit giảm dưới 35% trong 2 năm',
  },
  {
    id: 'digital',
    title: 'DIGITAL thesis — "Finacle + SMBC = best practice"',
    status: 'Emerging' as const,
    score: 6,
    color: 'green' as const,
    pros: ['First NBFI VN trên public cloud', 'SMBC đưa risk management Nhật Bản vào'],
    cons: ['COF tăng 5,2% — NIM bị nén Q1/2026', 'Provision tăng +28% YoY'],
    invalidate: 'OPEX ratio không giảm; COF tiếp tục tăng',
  },
]

export const risks = [
  { label: 'NPL tái bùng phát (kinh tế chậm)', prob: 25, level: 'HIGH' as const },
  { label: 'NHNN siết trần lãi suất tiêu dùng', prob: 30, level: 'HIGH' as const },
  { label: 'Cạnh tranh BNPL/digital erode margins', prob: 40, level: 'MEDIUM' as const },
  { label: 'Brand scandal tái diễn (debt collection)', prob: 20, level: 'MEDIUM' as const },
  { label: 'SMBC–VPBank xung đột chiến lược', prob: 15, level: 'LOW' as const },
]

export const catalysts = [
  { num: '1️⃣', title: 'NPL về <10%', timeline: 'Q2/2025', color: COLORS.green, desc: 'Re-rating mạnh từ thị trường, credibility được phục hồi. Đây là trigger quan trọng nhất.' },
  { num: '2️⃣', title: '4 quý lãi liên tiếp', timeline: 'Q3/2025', color: COLORS.blue, desc: 'Xác nhận phục hồi bền vững → mở cửa cho IPO FE Credit độc lập.' },
  { num: '3️⃣', title: 'Cost-to-Income <60%', timeline: 'Cuối 2025', color: COLORS.yellow, desc: 'OPEX giảm nhờ Finacle cloud → mở rộng biên lợi nhuận, leverage NIM cao.' },
]

export const kpis = [
  { label: 'Thị phần dư nợ', value: '~45%', sub: 'Consumer finance VN', change: '↓ vs 55% (2021)', changeType: 'down' as const },
  { label: 'LNTT 2025A', value: '611 tỷ', sub: 'VND — Xác nhận từ PDF', change: 'KH 2026: +1.179 tỷ', changeType: 'up' as const },  // ✅ PDF
  { label: 'Q1/2026 Status', value: '✅ Lãi', sub: 'Phục hồi tiếp tục', change: '4+ quý lãi liên tiếp', changeType: 'up' as const }, // ✅ PDF
  { label: 'Định giá ước tính', value: '$0.8–1.2B', sub: 'USD — 2025E', change: '↓ vs $2.8B (2021)', changeType: 'down' as const },
  { label: 'Khách hàng', value: '10M+', sub: '63 tỉnh thành', change: '', changeType: 'neutral' as const },
  { label: 'CAR (VPBank HN)', value: '14,35%', sub: 'Q1/2026 — từ PDF', change: 'Nhóm dẫn đầu', changeType: 'up' as const },       // ✅ PDF
  { label: 'VPBank PBT Q1/26', value: '7.921 tỷ', sub: 'Hợp nhất +58% YoY', change: 'FE Credit đóng góp', changeType: 'up' as const }, // ✅ PDF
  { label: 'Health Score', value: '7/10', sub: 'Nâng lên từ 6/10', change: 'Q1/2026 confirmed lãi', changeType: 'up' as const },     // Updated
]

export const PIPELINE_STEPS = [
  'alphaear-search', 'alphaear-news', 'alphaear-stock', 'alphaear-sentiment',
  'alphaear-predictor', 'signal-tracker', 'logic-visualizer',
  'financial-analyst', 'investment-advisor', 'alphaear-reporter',
]
