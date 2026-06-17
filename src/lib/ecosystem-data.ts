import { COLORS } from './fecredit-data'

// ─── ENTITIES ─────────────────────────────────────────────────────────────────
// ✅ Updated with official Q1/2026 data from VPBank PDF (vpbank.com.vn/quan-he-nha-dau-tu)
export const entities = [
  {
    id: 'cake',
    icon: '🍰', name: 'CAKE Digital Bank', type: 'Digital Bank · Gen Z/Millennial',
    bcg: 'Star', score: 8.5, sentiment: 0.75, rating: 'STRONG BUY',
    color: COLORS.orange, colorDim: '#f0883e20',
    kv: [
      { k: 'Khách hàng (01/2026)', v: '6,2 triệu', hl: true },
      { k: 'EBITDA Status', v: '✅ Dương (Q3/2024)', hl: true },
      { k: 'Revenue/user (2024)', v: '$12 (×3 YoY)' },
      { k: 'Payment transactions', v: '$4,7B USD (+113%)' },
      { k: 'Credit apps/tháng', v: '400.000 (AI)' },
      { k: 'Ra mắt', v: '01/2021 (VPBank + Be)' },
    ],
    valuation: { low: 0.5, high: 1.5, basis: 'Revenue multiple', note: 'Upside ↑' },
    lnttTrend: [100, 300, 600, 1000],
  },
  {
    id: 'vpbanks',
    icon: '📊', name: 'VPBankS (VPX)', type: 'Securities · HOSE Listed',
    bcg: 'Cash Cow', score: 7.5, sentiment: 0.65, rating: 'BUY',
    color: COLORS.green, colorDim: '#3fb95020',
    kv: [
      { k: 'Mã CK', v: 'HOSE: VPX · IPO $483M (11/2025)', hl: true },
      { k: 'Doanh thu 2024', v: '2.080 tỷ VND (+19,6%)' },
      { k: 'LNTT Q1/2026', v: '~515 tỷ (+196% vs Q1/24)', hl: true }, // ✅ PDF
      { k: 'KH LNTT 2026', v: '6.453 tỷ (+44%)', hl: true },           // ✅ PDF
      { k: 'Margin lending', v: '18.000 tỷ (+6,4% YTD)' },
      { k: 'Định giá IPO', v: '$2,4 tỷ USD' },
    ],
    valuation: { low: 0.5, high: 0.8, basis: 'P/E 12.9x', note: 'Undervalued' },
    lnttTrend: [600, 1800, 4476, 6453], // ✅ 2023→2024→2025A→2026KH
  },
  {
    id: 'fecredit',
    icon: '🏍️', name: 'FE Credit (VPB FC)', type: 'Consumer Finance · NBFI',
    bcg: 'Recovery', score: 6.0, sentiment: 0.32, rating: 'SPEC BUY',
    color: COLORS.yellow, colorDim: '#d2992220',
    kv: [
      { k: 'Cổ đông', v: 'VPBank 51% + SMBC 49%' },
      { k: 'Thị phần dư nợ', v: '~45% (CF Vietnam)', hl: true },
      { k: 'Q1/2026 status', v: '✅ Lãi (phục hồi tiếp)', hl: true },  // ✅ PDF
      { k: 'LNTT 2025A', v: '611 tỷ (+93% → KH 1.179 tỷ)', hl: true }, // ✅ PDF
      { k: 'NPL Ratio (ước)', v: '~12–15%' },
      { k: 'Khách hàng', v: '10M+ / 18.000+ POS' },
    ],
    valuation: { low: 0.8, high: 1.2, basis: 'P/BV recovery', note: 'Peak $2.8B (2021)' },
    lnttTrend: [-3000, -1000, 611, 1179], // ✅ 2022→2023→2025A→2026KH
  },
  {
    id: 'opes',
    icon: '🛡️', name: 'OPES Insurance', type: 'Non-life & Health Insurance',
    bcg: 'Question Mark', score: 6.5, sentiment: 0.45, rating: 'WATCH',
    color: COLORS.blue, colorDim: '#58a6ff20',
    kv: [
      { k: 'Thành lập', v: '2018 (First digital insurer VN)', hl: true },
      { k: 'Chủ sở hữu', v: 'VPBank 100%' },
      { k: 'LNTT Q1/2026', v: '261 tỷ (×3 YoY)', hl: true },   // ✅ PDF
      { k: 'KH LNTT 2026', v: '936 tỷ (+47%)', hl: true },      // ✅ PDF
      { k: 'Tiến độ Q1', v: '~28% KH năm — Ahead of plan 🟢' },
      { k: 'Innovation', v: 'First telematics car ins. VN' },
    ],
    valuation: { low: 0.1, high: 0.3, basis: 'Embedded value', note: 'Early stage' },
    lnttTrend: [50, 638, 261 * 4, 936], // ✅ 2023→2025A→annualized Q1→2026KH
  },
  {
    id: 'gpbank',
    icon: '🏛️', name: 'GPBank (Tiếp nhận)', type: 'Chuyển giao bắt buộc · Restructuring',
    bcg: 'Question Mark', score: 5.5, sentiment: 0.50, rating: 'WATCH',
    color: '#f778ba', colorDim: '#f778ba20',
    kv: [
      { k: 'Loại', v: 'Chuyển giao bắt buộc từ NHNN', hl: true },
      { k: 'LNTT Q1/2026', v: '>400 tỷ ≈ cả năm 2025', hl: true }, // ✅ PDF
      { k: 'Lợi ích', v: 'Giảm 50% tỷ lệ dự trữ bắt buộc' },       // ✅ PDF
      { k: 'Nguồn vốn thêm', v: '~9.000 tỷ đồng' },                  // ✅ PDF
      { k: 'Tình trạng', v: 'Tái cơ cấu toàn diện 2025' },
      { k: 'Tiềm năng', v: 'Earnings ramp-up 2026' },
    ],
    valuation: { low: 0, high: 0, basis: 'Included in VPBank HN', note: 'Mandatory transfer' },
    lnttTrend: [-500, -200, 400, 1200],
  },
  {
    id: 'ubank',
    icon: '🏢', name: 'Übank + CAEX', type: 'Digital Bank · Crypto Exchange',
    bcg: 'Pivot', score: 5.5, sentiment: 0.45, rating: 'HOLD',
    color: COLORS.purple, colorDim: '#bc8cff20',
    kv: [
      { k: 'Übank', v: 'Finacle SaaS + Backbase BaaS (APAC first)', hl: true },
      { k: 'CAEX', v: 'Sàn crypto VN — thành viên mới 2026', hl: true }, // ✅ PDF
      { k: 'CAEX investors', v: 'OKX Ventures + HashKey Capital' },        // ✅ PDF
      { k: 'CAEX vốn yêu cầu', v: '10.000 tỷ (~$380M) để pilot' },        // ✅ PDF
      { k: 'Übank target', v: '5M customers' },
      { k: 'Blockchain', v: 'Mở rộng sang tài sản số 2026' },
    ],
    valuation: { low: 0.1, high: 0.3, basis: 'Pre-revenue + CAEX optionality', note: 'High risk/reward' },
    lnttTrend: [-50, -20, 50, 150],
  },
  {
    id: 'neo',
    icon: '📱', name: 'VPBank NEO + Prime', type: 'Super App + Wealth Mgmt',
    bcg: 'Core', score: 7.5, sentiment: 0.70, rating: 'BUY',
    color: '#39d0d8', colorDim: '#39d0d820',
    kv: [
      { k: 'New users (2024)', v: '1,2M+ new-to-bank', hl: true },
      { k: 'POS/EDC terminals', v: '10.000+' },
      { k: 'Core upgrade', v: 'Temenos on AWS OpenShift' },
      { k: 'VPBank Prime', v: '"Best Bank Gen Z 2025"', hl: true },
      { k: 'Tổng tài sản HN', v: '1.373.000 tỷ (+9% YTD)', hl: true }, // ✅ PDF
      { k: 'Dư nợ HN Q1/26', v: '1.060.000 tỷ (+10,2% YTD)' },         // ✅ PDF
    ],
    valuation: { low: 0, high: 0, basis: 'Included in VPBank', note: 'Not split' },
    lnttTrend: [18000, 24000, 26364, 34240], // ✅ 2023→2024→2025A→2026KH
  },
]

// ─── CONTRIBUTION FORECAST ✅ OFFICIAL NUMBERS FROM PDF ──────────────────────
export const contributionData = [
  { entity: 'VPBank Core', e24: 18000, a25: 26364, b26: 34240, bull26: 38000 }, // ✅
  { entity: 'FE Credit',   e24: 300,   a25: 611,   b26: 1179,  bull26: 2000 },  // ✅
  { entity: 'VPBankS',     e24: 1100,  a25: 4476,  b26: 6453,  bull26: 8000 },  // ✅
  { entity: 'OPES',        e24: 50,    a25: 638,   b26: 936,   bull26: 1200 },  // ✅
  { entity: 'GPBank+Übank',e24: 0,     a25: 400,   b26: 1200,  bull26: 2000 },  // ✅ GPBank Q1→ annualized
]

// ─── BCG DATA ─────────────────────────────────────────────────────────────────
export const bcgItems = [
  { id: 'cake',    label: 'CAKE',     icon: '🍰', x: 38, y: 18, size: 52, color: COLORS.orange, score: 8.5 },
  { id: 'vpbanks', label: 'VPBankS',  icon: '📊', x: 30, y: 70, size: 46, color: COLORS.green,  score: 7.5 },
  { id: 'neo',     label: 'NEO',      icon: '📱', x: 18, y: 77, size: 56, color: '#4dabf7',     score: 7.5 },
  { id: 'opes',    label: 'OPES',     icon: '🛡️', x: 68, y: 22, size: 40, color: COLORS.blue,   score: 6.5 },
  { id: 'fecredit',label: 'FE Credit',icon: '🏍️', x: 42, y: 44, size: 44, color: COLORS.yellow, score: 6.0 },
  { id: 'gpbank',  label: 'GPBank',   icon: '🏛️', x: 60, y: 38, size: 36, color: '#f778ba',     score: 5.5 },
  { id: 'ubank',   label: 'Übank+CAEX',icon: '🏢', x: 75, y: 58, size: 36, color: COLORS.purple, score: 5.5 },
]

// ─── VALUATION PORTFOLIO ─────────────────────────────────────────────────────
export const valuationPortfolio = [
  { name: 'FE Credit',  low: 0.8,  high: 1.2, color: COLORS.yellow, pct: 43, note: 'Peak $2.8B (2021)' },
  { name: 'VPBankS',   low: 0.5,  high: 0.8, color: COLORS.green,  pct: 25, note: 'P/E 12.9x' },
  { name: 'CAKE',      low: 0.5,  high: 1.5, color: COLORS.orange, pct: 50, note: 'Upside ↑' },
  { name: 'OPES',      low: 0.1,  high: 0.3, color: COLORS.blue,   pct: 12, note: 'Early stage' },
  { name: 'Übank',     low: 0.1,  high: 0.2, color: COLORS.purple, pct: 8,  note: 'Pre-revenue' },
]

// ─── ECOSYSTEM SIGNALS ✅ UPDATED WITH Q1/2026 ACTUALS ───────────────────────
export const ecosystemSignals = [
  {
    entity: 'CAKE', icon: '🍰', color: 'orange' as const,
    thesis: 'Vietnam\'s Nubank moment',
    status: 'Strengthening', score: 8,
    pros: ['6.2M users (01/2026)', 'EBITDA dương 3.5 năm', 'Revenue/user ×3 lên $12', 'AI 400K apps/tháng'],
    cons: ['PAT chưa dương', 'NIM pressure từ cạnh tranh'],
  },
  {
    entity: 'VPBankS', icon: '📊', color: 'green' as const,
    thesis: 'Securities boom — IPO confirmed',
    status: 'Strengthening', score: 9, // ✅ Upgraded: +196% Q1/2026
    pros: ['LNTT Q1/2026: ~515 tỷ (+196% YoY)', 'IPO $483M thành công (11/2025)', 'KH 2026: 6.453 tỷ (+44%)', 'Margin lending +6,4% YTD'],
    cons: ['Biến động thị trường Q1/2026 ảnh hưởng trading', 'Cạnh tranh SSI, VND'],
  },
  {
    entity: 'FE Credit', icon: '🏍️', color: 'yellow' as const,
    thesis: 'Recovery confirmed — lãi Q1/2026',
    status: 'Recovering', score: 7, // ✅ Upgraded: PDF confirms Q1/2026 positive
    pros: ['Q1/2026 lãi (xác nhận từ VPBank PDF)', 'LNTT 2025A: 611 tỷ; KH 2026: 1.179 tỷ (+93%)', 'Finacle cloud live', 'SMBC support'],
    cons: ['NPL ~12-15% vẫn cao', 'Brand damage chưa phục hồi'],
  },
  {
    entity: 'OPES', icon: '🛡️', color: 'blue' as const,
    thesis: 'Ahead of plan — ×3 YoY',
    status: 'Strengthening', score: 7, // ✅ Upgraded: 261 tỷ Q1/2026 = ×3 YoY
    pros: ['LNTT Q1/2026: 261 tỷ (×3 YoY) — vượt kỳ vọng', '~28% KH năm sau Q1 — ahead of plan', '6.2M customers migrated', 'First telematics VN'],
    cons: ['Bancassurance regulatory risk', 'Phụ thuộc VPBank distribution'],
  },
]

// ─── ECOSYSTEM RISKS ✅ UPDATED WITH COF PRESSURE FROM PDF ──────────────────
export const ecosystemRisks = [
  { label: 'COF tăng lên 5,2% — NIM bị nén', prob: 60, level: 'HIGH' as const, affects: 'Ngân hàng mẹ' },  // ✅ NEW from PDF
  { label: 'FE Credit NPL tái bùng phát', prob: 25, level: 'HIGH' as const, affects: 'FEC, VPBank' },
  { label: 'CAEX (crypto) rủi ro pháp lý', prob: 35, level: 'HIGH' as const, affects: 'CAEX, Reputation' }, // ✅ NEW from PDF
  { label: 'Cạnh tranh digital (MoMo, Timo)', prob: 50, level: 'MEDIUM' as const, affects: 'CAKE, NEO' },
  { label: 'NHNN siết bancassurance', prob: 35, level: 'MEDIUM' as const, affects: 'OPES' },
  { label: 'CK VN điều chỉnh >20%', prob: 30, level: 'MEDIUM' as const, affects: 'VPBankS' },
]

// ─── ECOSYSTEM CATALYSTS ✅ UPDATED ──────────────────────────────────────────
export const ecosystemCatalysts = [
  { num: '1️⃣', title: 'Vốn điều lệ tăng lên 106.243 tỷ', timeline: '2026', color: COLORS.blue, desc: 'Tăng từ 79.339 tỷ (+34%) → nền tảng tăng trưởng 30%+/năm giai đoạn 2026–2030' }, // ✅ PDF
  { num: '2️⃣', title: 'FE Credit NPL <10% + KH 1.179 tỷ', timeline: '2026E', color: COLORS.yellow, desc: 'KH LNTT 2026 = 1.179 tỷ (+93%). NPL giảm về <10% là trigger re-rating chính' },    // ✅ PDF
  { num: '3️⃣', title: 'CAEX pilot — crypto exchange VN', timeline: '2026–2027', color: COLORS.purple, desc: 'Nếu pilot thành công với OKX+HashKey → VPBank becomes Web3 platform, upside cao' }, // ✅ PDF
]

// ─── NIM TREND ✅ FROM PDF ────────────────────────────────────────────────────
// Solo bank (standalone), quarterly Q1/25–Q1/26
export const nimTrendData = [
  { q: 'Q1/25', nim: 4.8, cof: 4.4, yield: 8.7 },
  { q: 'Q2/25', nim: 4.3, cof: 4.4, yield: 8.3 },
  { q: 'Q3/25', nim: 4.5, cof: 4.5, yield: 8.5 },
  { q: 'Q4/25', nim: 4.8, cof: 4.8, yield: 9.1 },
  { q: 'Q1/26', nim: 4.5, cof: 5.2, yield: 9.2 }, // ✅ COF spike
]

// ─── Q1/2026 SCORECARD ✅ FROM PDF ────────────────────────────────────────────
export const q1Scorecard = [
  { label: 'PBT ngân hàng mẹ', value: '7.383 tỷ', change: '+49,4%', good: true },
  { label: 'PBT hợp nhất',     value: '~7.921 tỷ', change: '+58%',   good: true },
  { label: 'CIR',               value: '21,4%',    change: '↓5pp',   good: true },
  { label: 'ROE (standalone)',  value: '17,1%',    change: '+3,9pp', good: true },
  { label: 'ROA (standalone)',  value: '2,0%',     change: '+0,2pp', good: true },
  { label: 'NIM',               value: '4,5%',     change: '→',      good: true },
  { label: 'Chi phí tín dụng', value: '1,85%',    change: '<2%',    good: true },
  { label: 'CAR hợp nhất',     value: '14,35%',   change: '>>8%',   good: true },
  { label: 'LDR',               value: '82,7%',    change: '<85%',   good: true },
  { label: 'NPL riêng lẻ',     value: '2,03%',    change: '<2,5%',  good: true },
  { label: 'COF (cost of fund)', value: '5,2%',   change: '↑+0,8pp',good: false }, // ⚠️
  { label: 'Provision',         value: '+57,9%',  change: 'YoY',    good: false }, // ⚠️
]

// ─── ECOSYSTEM KPIs ✅ OFFICIAL Q1/2026 FROM PDF ─────────────────────────────
export const ecosystemKpis = [
  { label: 'PBT HN Q1/2026', value: '7.921 tỷ', sub: 'VND — +58% YoY', change: '~20% KH năm', changeType: 'up' as const },          // ✅ PDF
  { label: 'Tổng tài sản Q1/26', value: '1.373.000 tỷ', sub: '+9% YTD — #1 tư nhân', change: 'KH 2026: 1.630.000 tỷ', changeType: 'up' as const }, // ✅ PDF
  { label: 'Dư nợ Q1/26', value: '1.060.000 tỷ', sub: '+10,2% YTD — vượt 1 triệu tỷ', change: 'Gấp 3× ngành 3,17%', changeType: 'up' as const },  // ✅ PDF
  { label: 'CAR Hợp nhất', value: '14,35%', sub: 'Q1/2026 — nhóm dẫn đầu', change: 'Tier 1: 13,14%', changeType: 'up' as const },    // ✅ PDF
  { label: 'CIR Ngân hàng mẹ', value: '21,4%', sub: 'Q1/2026 — xuất sắc', change: '↓ từ 26,4% (Q1/25)', changeType: 'up' as const }, // ✅ PDF
  { label: 'ROE / ROA', value: '17,1% / 2,0%', sub: 'Riêng lẻ Q1/2026', change: '↑ từ 13,2% / 1,8%', changeType: 'up' as const },  // ✅ PDF
  { label: 'OPES LNTT Q1/26', value: '261 tỷ', sub: '×3 YoY — ahead of plan', change: 'KH 936 tỷ (+47%)', changeType: 'up' as const }, // ✅ PDF
  { label: 'VPBank Brand', value: '+41% value', sub: 'Brand Finance 2026 ~$1B', change: '+33 bậc toàn cầu', changeType: 'up' as const }, // ✅ IR #26
]

// ─── SYNERGY JOURNEY ─────────────────────────────────────────────────────────
export const synergyJourney = [
  { icon: '🏍️', name: 'FE Credit', sub: 'Sub-prime entry', color: COLORS.red },
  { icon: '🍰', name: 'CAKE', sub: 'Digital upgrade', color: COLORS.orange },
  { icon: '📱', name: 'VPBank NEO', sub: 'Full banking', color: '#4dabf7' },
  { icon: '🛡️', name: 'OPES', sub: 'Insurance embed', color: COLORS.blue },
  { icon: '📊', name: 'VPBankS', sub: 'Invest & grow', color: COLORS.green },
  { icon: '💎', name: 'Prime/Private', sub: 'Wealth lock-in', color: '#f778ba' },
]

export const synergyFlows = [
  { from: '🏍️ FE Credit', to: '🍰 CAKE AI scoring', desc: 'Credit history data', fromColor: COLORS.red, toColor: COLORS.orange },
  { from: '🍰 CAKE', to: 'Übank account', desc: 'Loan disbursement', fromColor: COLORS.orange, toColor: COLORS.purple },
  { from: '📱 NEO', to: '🛡️ OPES insurance', desc: '30M distribution', fromColor: '#4dabf7', toColor: COLORS.blue },
  { from: '📊 VPBankS', to: '💎 Prime/Diamond', desc: 'HNW referral', fromColor: COLORS.green, toColor: '#f778ba' },
]

// ─── IRR SCENARIOS ───────────────────────────────────────────────────────────
export const ecosystemIRR = [
  { scenario: '🐂 Bull (P/B 2.5x)', irr: 35, moic: 2.5, color: COLORS.green },
  { scenario: '📊 Base (P/B 1.8x)', irr: 20, moic: 1.7, color: COLORS.blue },
  { scenario: '🐻 Bear (P/B 1.0x)', irr: 2,  moic: 1.1, color: COLORS.red },
]
