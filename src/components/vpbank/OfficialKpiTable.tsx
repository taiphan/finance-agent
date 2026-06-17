'use client'
import { Card, CardTitle } from '@/components/ui/card'

const soloRows = [
  { label: 'Dư nợ tín dụng', q125: '849.643', q126: '940.786', yoy: '+10,7% YTD', good: true },
  { label: 'Huy động + GTCG', q125: '721.934', q126: '806.544', yoy: '+11,7% YTD', good: true },
  { label: 'TOI', q125: '11.526', q126: '15.162', yoy: '+31,5%', good: true },
  { label: 'OPEX', q125: '3.041', q126: '3.245', yoy: '+6,7%', good: true },
  { label: 'Chi phí dự phòng', q125: '3.543', q126: '4.533', yoy: '+28,0%', good: false },
  { label: 'PBT (LNTT)', q125: '4.942', q126: '7.383', yoy: '+49,4% 🟢', good: true },
  { label: 'CIR', q125: '26,4%', q126: '21,4%', yoy: '↓5pp 🟢', good: true },
  { label: 'ROA', q125: '1,8%', q126: '2,0%', yoy: '+0,2pp 🟢', good: true },
  { label: 'ROE', q125: '13,2%', q126: '17,1%', yoy: '+3,9pp 🟢', good: true },
  { label: 'Chi phí tín dụng', q125: '1,95%', q126: '1,85%', yoy: '<2% 🟢', good: true },
]

const consolidatedRows = [
  { label: 'Tổng tài sản HN', q125: '~1.200.000', q126: '~1.373.000', yoy: '+9% YTD', good: true },
  { label: 'Dư nợ HN', q125: '~961.414 (FY25)', q126: '~1.060.000', yoy: '+10,2% YTD', good: true },
  { label: 'Tiền gửi + GTCG HN', q125: '~735.165 (FY25)', q126: '~822.000', yoy: '+11,8% YTD', good: true },
  { label: 'NII', q125: '16.961', q126: '19.908', yoy: '+17,4%', good: true },
  { label: 'NFI', q125: 'N/A', q126: '7.921', yoy: '+80,8%', good: true },
  { label: 'Chi phí dự phòng HN', q125: '~2.750', q126: '4.318', yoy: '+57,9% ⚠️', good: false },
  { label: 'PBT hợp nhất', q125: '~5.016', q126: '~7.921', yoy: '+58% 🟢', good: true },
  { label: 'NIM (ngân hàng)', q125: '11,2%', q126: '11,2%', yoy: '→ Ổn định', good: true },
  { label: 'NIM (công ty con)', q125: '5,9%', q126: '5,4%', yoy: '↓0,5pp ⚠️', good: false },
]

const subsidiaryRows = [
  { entity: '🏦 Ngân hàng mẹ', q125: '4.942 tỷ', q126: '7.383 tỷ', yoy: '+49,4%', good: true },
  { entity: '📊 VPBankS',       q125: '351 tỷ',   q126: '~515 tỷ',  yoy: '+46%',   good: true },
  { entity: '🛡️ OPES',          q125: '~87 tỷ',   q126: '261 tỷ',   yoy: '×3 🟢',  good: true },
  { entity: '🏍️ FE Credit',     q125: 'Lỗ',       q126: '✅ Lãi',   yoy: 'Phục hồi', good: true },
  { entity: '🏛️ GPBank',        q125: '~100 tỷ',  q126: '>400 tỷ',  yoy: '×4 🟢',  good: true },
]

const planRows = [
  { label: 'Tổng tài sản', fy25: '1.260.150', kh26: '1.630.021', growth: '+29%', good: true },
  { label: 'Tiền gửi + GTCG', fy25: '735.165', kh26: '1.030.904', growth: '+40%', good: true },
  { label: 'Dư nợ tín dụng', fy25: '961.414', kh26: '1.291.535', growth: '+34%', good: true },
  { label: 'PBT hợp nhất', fy25: '30.625', kh26: '41.323', growth: '+35%', good: true },
  { label: 'PBT ngân hàng mẹ', fy25: '26.364', kh26: '34.240', growth: '+30%', good: true },
  { label: 'PBT FE Credit', fy25: '611', kh26: '1.179', growth: '+93% 🟢', good: true },
  { label: 'PBT VPBankS', fy25: '4.476', kh26: '6.453', growth: '+44%', good: true },
  { label: 'PBT OPES', fy25: '638', kh26: '936', growth: '+47%', good: true },
  { label: 'NPL riêng lẻ (TT31)', fy25: '2,03%', kh26: '<2,5%', growth: 'Mục tiêu', good: true },
]

function DataTable({ title, icon, cols, rows }: {
  title: string, icon: string,
  cols: string[], rows: { [k: string]: string | boolean }[]
}) {
  return (
    <Card>
      <CardTitle icon={icon}>{title}</CardTitle>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b" style={{ borderColor: '#30363d' }}>
              {cols.map(c => <th key={c} className="text-left py-2 px-2 text-[10px] uppercase tracking-wider text-[#8b949e]">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const isGood = row.good as boolean
              const vals = Object.entries(row).filter(([k]) => k !== 'good')
              return (
                <tr key={i} className="border-b last:border-0 hover:bg-[#ffffff06]" style={{ borderColor: 'rgba(48,54,61,.3)' }}>
                  {vals.map(([k, v], j) => (
                    <td key={k} className="py-2 px-2">
                      {j === vals.length - 1
                        ? <span className="font-semibold" style={{ color: isGood ? '#3fb950' : '#f85149' }}>{v as string}</span>
                        : <span className={j === 0 ? 'text-[#e6edf3] font-medium' : 'text-[#8b949e]'}>{v as string}</span>
                      }
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export function SoloTable() {
  return <DataTable title="Ngân Hàng Mẹ — Riêng Lẻ Q1/2026 (tỷ VND)" icon="🏦"
    cols={['Chỉ tiêu', 'Q1/2025', 'Q1/2026', 'YoY']}
    rows={soloRows.map(r => ({ 'Chỉ tiêu': r.label, 'Q1/2025': r.q125, 'Q1/2026': r.q126, YoY: r.yoy, good: r.good }))}
  />
}

export function ConsolidatedTable() {
  return <DataTable title="Hợp Nhất Q1/2026 (tỷ VND)" icon="🌐"
    cols={['Chỉ tiêu', 'Tham chiếu', 'Q1/2026', 'YoY']}
    rows={consolidatedRows.map(r => ({ 'Chỉ tiêu': r.label, 'Tham chiếu': r.q125, 'Q1/2026': r.q126, YoY: r.yoy, good: r.good }))}
  />
}

export function SubsidiaryTable() {
  return <DataTable title="Công Ty Con — PBT Q1/2026 (tỷ VND)" icon="🏢"
    cols={['Thực thể', 'Q1/2025', 'Q1/2026', 'YoY']}
    rows={subsidiaryRows.map(r => ({ 'Thực thể': r.entity, 'Q1/2025': r.q125, 'Q1/2026': r.q126, YoY: r.yoy, good: r.good }))}
  />
}

export function PlanTable() {
  return <DataTable title="Kế Hoạch 2026 — ĐHĐCĐ Đã Thông Qua (tỷ VND)" icon="📋"
    cols={['Chỉ tiêu', 'FY2025 (thực hiện)', 'KH 2026', 'Tăng trưởng']}
    rows={planRows.map(r => ({ 'Chỉ tiêu': r.label, 'FY2025': r.fy25, 'KH 2026': r.kh26, 'Tăng trưởng': r.growth, good: r.good }))}
  />
}
