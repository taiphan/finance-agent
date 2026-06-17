---
inclusion: auto
---

# Finance Skills — Bộ 14 Skill Tài Chính cho AI Agent

Tổng hợp 14 skill tài chính từ [Finance Skills (AlphaEar)](https://finance-management-595.pages.dev/#bo-thi-truong): phân tích & định giá, dữ liệu thị trường real-time, và PHP finance backend từ GitHub OSS.

---

## Nhóm 1: Phân tích & Định giá (3 skills)

| Skill | Mô tả | Lệnh tắt |
|---|---|---|
| `financial-analyst` | Tỷ số, DCF, ngân sách, dự báo | `/financial-health` |
| `saas-metrics-coach` | ARR, MRR, churn, CAC, LTV, NRR | `/saas-health` |
| `business-investment-advisor` | Investment thesis, ROI, IRR, NPV, capital allocation | — |

## Nhóm 2: Dữ liệu Thị trường AlphaEar (8 skills)

| Skill | Mô tả | Thị trường |
|---|---|---|
| `alphaear-news` | Tin tức real-time, 10+ nguồn | A股, HK, Mỹ |
| `alphaear-stock` | Giá OHLCV, fundamentals | A股, HK, Mỹ |
| `alphaear-sentiment` | Cảm xúc thị trường -1.0 ~ +1.0 | Trung lập |
| `alphaear-predictor` | Dự báo chuỗi thời gian (Kronos) | Trung lập |
| `alphaear-signal-tracker` | Theo dõi tiến hoá tín hiệu đầu tư | Trung lập |
| `alphaear-logic-visualizer` | Sơ đồ truyền dẫn tác động (Mermaid/Draw.io) | Trung lập |
| `alphaear-reporter` | Tạo báo cáo phân tích chuyên nghiệp | Trung lập |
| `alphaear-search` | Web search + RAG (Jina/DDG/Baidu) | Trung lập |

## Nhóm 3: PHP Finance Skills — GitHub OSS (3 skills)

| Skill | Loại | VN | Ghi chú |
|---|---|---|---|
| `bcs-trade-php` | Composer package | ⚠️ Hạn chế | Broker Nga — học pattern |
| `keschain-backend` | REST API backend | ⚠️ Tùy | Repo non, đánh giá thêm |
| `hisabi` | Headless GraphQL backend | ✅ Dùng được | ⭐449, train SMS parser VN |

---

## Pipeline gợi ý

### Theo dõi thị trường & đầu tư
```
alphaear-news + alphaear-stock
  → alphaear-sentiment
  → alphaear-predictor
  → alphaear-signal-tracker
  → alphaear-reporter
```

### Phân tích tài chính doanh nghiệp
```
financial-analyst (báo cáo tài chính)
  → /financial-health (đánh giá nhanh)
  → business-investment-advisor (investment decision)
  → alphaear-reporter (báo cáo)
```

### SaaS / Startup
```
saas-metrics-coach (số liệu thuê bao)
  → /saas-health (đánh giá nhanh)
  → alphaear-reporter (báo cáo nhà đầu tư)
```

### Pipeline đầy đủ với PHP backend
```
hisabi (thu chi cá nhân / SMS ngân hàng VN)
  → financial-analyst (phân tích)
  → alphaear-reporter (báo cáo tháng)
```

---

## Lưu ý với dữ liệu Việt Nam

✅ **Dùng tốt**: financial-analyst, saas-metrics-coach, business-investment-advisor, alphaear-sentiment, alphaear-predictor, alphaear-logic-visualizer, alphaear-reporter, alphaear-search, hisabi  
⚠️ **Cần bổ sung nguồn VN**: alphaear-news, alphaear-stock (không phủ HSX/HNX theo mặc định)  
⚠️ **Hạn chế**: bcs-trade-php (gắn broker Nga), keschain-backend (repo mới)
