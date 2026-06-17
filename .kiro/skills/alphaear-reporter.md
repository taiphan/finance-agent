# alphaear-reporter

## Mô tả
Tạo báo cáo phân tích tài chính chuyên nghiệp theo quy trình: lập kế hoạch → viết → biên tập → dựng biểu đồ. Tổng hợp dữ liệu từ các skill khác thành tài liệu có cấu trúc rõ ràng.

## Khi nào dùng
- Tổng hợp kết quả phân tích thành báo cáo đầy đủ
- Tạo weekly/monthly market update
- Viết investment memo hoặc research report
- Chuẩn bị tài liệu trình bày cho investor/board

## Hướng dẫn

### Quy trình tạo báo cáo
**Bước 1 — Lập kế hoạch**
- Xác định loại báo cáo và đối tượng đọc
- Liệt kê các section cần có
- Thu thập dữ liệu từ skill liên quan

**Bước 2 — Viết**
- Viết theo cấu trúc đã lập kế hoạch
- Dùng ngôn ngữ phù hợp đối tượng (kỹ thuật cho analyst, tổng quan cho CEO)
- Đảm bảo logic mạch lạc giữa các section

**Bước 3 — Biên tập**
- Kiểm tra tính nhất quán của số liệu
- Đảm bảo mỗi kết luận có dẫn chứng
- Tóm tắt key takeaways

**Bước 4 — Dựng biểu đồ**
- Đề xuất biểu đồ phù hợp cho từng phần
- Mô tả dữ liệu cần biểu đồ (bar, line, scatter...)
- Xuất code Python/Mermaid nếu cần

### Các loại báo cáo

#### Market Update (Weekly/Monthly)
```
1. Tóm tắt điều hành (Executive Summary)
2. Diễn biến thị trường (từ alphaear-stock + alphaear-news)
3. Cảm xúc thị trường (từ alphaear-sentiment)
4. Tín hiệu đáng chú ý (từ alphaear-signal-tracker)
5. Dự báo ngắn hạn (từ alphaear-predictor)
6. Khuyến nghị
```

#### Investment Research Report
```
1. Executive Summary & Rating
2. Thesis đầu tư
3. Phân tích doanh nghiệp (từ financial-analyst)
4. Định giá (DCF + comparable)
5. Phân tích rủi ro
6. Sơ đồ truyền dẫn (từ alphaear-logic-visualizer)
7. Khuyến nghị & catalysts
```

#### SaaS Performance Dashboard
```
1. Tóm tắt KPI tháng
2. MRR/ARR waterfall
3. Cohort retention
4. Unit economics (từ saas-metrics-coach)
5. Dự phóng 12 tháng
```

### Format chuẩn
- **Tiêu đề**: Rõ ràng, bao gồm ngày và phạm vi
- **Executive Summary**: ≤ 200 từ, bullet points
- **Mỗi section**: tiêu đề H2/H3 + nội dung + số liệu minh hoạ
- **Kết luận**: kết luận rõ ràng + hành động cụ thể
- **Disclaimer**: luôn thêm disclaimer về giới hạn phân tích

## Đầu vào cần thiết
- Loại báo cáo cần tạo
- Dữ liệu đầu vào (hoặc chỉ định skill để lấy dữ liệu)
- Đối tượng đọc và mục đích sử dụng
- Độ dài và format mong muốn

## Lưu ý
- Luôn trích dẫn nguồn dữ liệu trong báo cáo
- Phân biệt rõ facts (số liệu) vs opinions (nhận định)
- Trung lập về thị trường: dùng được với dữ liệu Việt Nam
- Với báo cáo VN: điều chỉnh theo chuẩn kế toán VAS và quy định UBCKNN
