# financial-analyst

## Mô tả
Skill nền tảng cho phân tích tài chính doanh nghiệp. Bao trùm hầu hết nghiệp vụ phân tích tài chính từ tỷ số, định giá DCF đến lập ngân sách và dự báo.

## Khi nào dùng
- Phân tích báo cáo tài chính (kết quả kinh doanh, cân đối kế toán, lưu chuyển tiền tệ)
- Tính và diễn giải các tỷ số tài chính (thanh khoản, đòn bẩy, sinh lợi, hoạt động)
- Định giá doanh nghiệp bằng DCF (Discounted Cash Flow)
- Lập ngân sách và dự báo tài chính
- Gõ `/financial-health` để có đánh giá sức khỏe tài chính tổng thể nhanh

## Hướng dẫn

### Phân tích tỷ số
Khi nhận được báo cáo tài chính, hãy tính toán và diễn giải các nhóm tỷ số:
- **Thanh khoản**: Current Ratio, Quick Ratio, Cash Ratio
- **Đòn bẩy**: D/E Ratio, Interest Coverage, Debt-to-Assets
- **Sinh lợi**: ROE, ROA, ROIC, Gross Margin, EBITDA Margin, Net Margin
- **Hoạt động**: Asset Turnover, Inventory Turnover, Receivables Turnover, CCC
- So sánh với chuẩn ngành và xu hướng lịch sử

### Định giá DCF
1. Dự báo Free Cash Flow (FCF) 5–10 năm dựa trên giả định tăng trưởng
2. Tính Terminal Value (Gordon Growth Model hoặc Exit Multiple)
3. Chiết khấu về hiện tại bằng WACC
4. Cộng tổng PV → Enterprise Value → Equity Value → Giá trị mỗi cổ phần
5. Phân tích độ nhạy (sensitivity) theo WACC và tỷ lệ tăng trưởng

### Lập ngân sách & dự báo
- Xây dựng mô hình 3-statement (P&L, Balance Sheet, Cash Flow) liên kết
- Driver-based forecasting: doanh thu từ volume × giá, chi phí theo % doanh thu
- Scenario analysis: base / bull / bear case

### Lệnh tắt `/financial-health`
Khi người dùng gõ `/financial-health`, cung cấp đánh giá nhanh gồm:
1. **Điểm sức khỏe tổng thể** (1–10)
2. **3 điểm mạnh** chính
3. **3 rủi ro** chính cần theo dõi
4. **Khuyến nghị** hành động tiếp theo

## Đầu vào cần thiết
- Báo cáo tài chính (ít nhất 2 kỳ để so sánh xu hướng)
- Ngành nghề hoạt động để đối chiếu benchmark
- Mục tiêu phân tích (đầu tư, tín dụng, nội bộ...)

## Lưu ý
- Chuẩn kế toán: ưu tiên làm rõ IFRS hay VAS (Việt Nam) hay US GAAP
- Luôn nêu rõ giả định trong mô hình DCF
- Kết quả phân tích là tham khảo, không thay thế tư vấn chuyên nghiệp
