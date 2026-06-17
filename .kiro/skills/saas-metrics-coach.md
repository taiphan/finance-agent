# saas-metrics-coach

## Mô tả
Đánh giá sức khỏe tài chính cho doanh nghiệp SaaS và mô hình thuê bao (subscription). Tập trung vào các chỉ số vận hành đặc thù SaaS và dự phóng 12 tháng.

## Khi nào dùng
- Startup SaaS cần đánh giá unit economics
- Doanh nghiệp mô hình thuê bao (subscription, recurring revenue)
- Chuẩn bị fundraising deck / investor update
- Theo dõi sức khỏe tăng trưởng định kỳ
- Gõ `/saas-health` để có đánh giá nhanh

## Hướng dẫn

### Chỉ số cốt lõi cần tính

#### Doanh thu
- **MRR** (Monthly Recurring Revenue) = tổng doanh thu thuê bao tháng hiện tại
- **ARR** (Annual Recurring Revenue) = MRR × 12
- **MRR breakdown**: New MRR + Expansion MRR − Churned MRR − Contraction MRR
- **Net Revenue Retention (NRR)**: (MRR đầu kỳ + Expansion − Contraction − Churn) / MRR đầu kỳ × 100%
  - Mục tiêu: NRR > 100% (expansion bù được churn)

#### Churn
- **Customer Churn Rate** = Số khách hủy / Tổng khách đầu kỳ
- **Revenue Churn Rate** = MRR bị mất / MRR đầu kỳ
- Benchmark: churn < 2%/tháng (< 5% là đáng lo, > 10% là nguy hiểm)

#### Unit Economics
- **CAC** (Customer Acquisition Cost) = Tổng chi phí bán hàng & marketing / Số khách mới
- **LTV** (Lifetime Value) = ARPU / Churn Rate  hoặc  ARPU × Gross Margin / Churn Rate
- **LTV:CAC ratio**: mục tiêu ≥ 3:1; < 1:1 là mô hình không bền
- **CAC Payback Period** = CAC / (ARPU × Gross Margin) — mục tiêu < 12 tháng

#### Tăng trưởng & hiệu quả
- **Quick Ratio** = (New MRR + Expansion MRR) / (Churned MRR + Contraction MRR) — mục tiêu ≥ 4
- **Rule of 40** = Revenue Growth Rate % + EBITDA Margin % — mục tiêu ≥ 40

### Dự phóng 12 tháng
1. Giả định MRR Growth Rate mỗi tháng (theo kịch bản base/bull/bear)
2. Chiếu MRR, ARR, khách hàng tích lũy
3. Ước tính burn rate và runway nếu có dữ liệu chi phí
4. Tính điểm hoà vốn (breakeven MRR)

### Lệnh tắt `/saas-health`
Khi người dùng gõ `/saas-health`, cung cấp scorecard nhanh:
1. **NRR**: tốt / trung bình / kém
2. **LTV:CAC**: tốt / trung bình / kém
3. **Churn**: tốt / trung bình / nguy hiểm
4. **Quick Ratio**: tốt / trung bình / kém
5. **Điểm tổng thể** và 2–3 hành động ưu tiên

## Đầu vào cần thiết
- MRR / ARR hiện tại và lịch sử ít nhất 3–6 tháng
- Số khách hàng, số khách mới và số khách hủy mỗi tháng
- Chi phí bán hàng & marketing
- Gross Margin %

## Lưu ý
- Phân biệt rõ logo churn vs revenue churn
- NRR > 100% là dấu hiệu product-market fit tốt ở segment enterprise
- Áp dụng được cho SaaS B2B, B2C, và mô hình marketplace subscription tại Việt Nam
