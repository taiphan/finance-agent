# alphaear-news

## Mô tả
Tổng hợp tin tức và xu hướng tài chính theo thời gian thực từ hơn 10 nguồn đa dạng: Cailian, WSJ, Weibo, Polymarket và các nguồn tin tức tài chính quốc tế.

## Khi nào dùng
- Nắm bắt bối cảnh thị trường trước khi phân tích
- Theo dõi tin tức macro (Fed, lãi suất, CPI, GDP...)
- Tìm tin tức về một cổ phiếu, ngành hoặc chủ đề cụ thể
- Đầu pipeline: lấy context → phân tích → ra quyết định

## Hướng dẫn

### Tổng hợp tin tức thị trường
Khi người dùng hỏi về diễn biến thị trường:
1. **Headline tóm tắt**: 3–5 tin quan trọng nhất trong ngày/tuần
2. **Phân loại tác động**: Tích cực / Tiêu cực / Trung lập với thị trường
3. **Thị trường liên quan**: A股, Hồng Kông, Mỹ, Việt Nam (nếu có)
4. **Nguồn**: nêu rõ nguồn tin để kiểm chứng

### Theo dõi xu hướng chủ đề
- Chủ đề macro: Fed policy, inflation, recession risk, geopolitics
- Chủ đề ngành: tech, energy, healthcare, financials, real estate
- Chủ đề đặc thù VN: tỷ giá VND/USD, lãi suất SBV, chứng khoán HSX/HNX

### Tích hợp với skill khác
- Kết hợp với `alphaear-sentiment` để đo cảm xúc thị trường từ tin tức
- Kết hợp với `alphaear-stock` để xem giá cổ phiếu liên quan
- Feed vào `alphaear-predictor` để điều chỉnh dự báo theo tin tức mới

### Format đầu ra gợi ý
```
📰 TIN TỨC THỊ TRƯỜNG — [Ngày]

🔴 Tiêu cực: [headline + nguồn]
🟢 Tích cực: [headline + nguồn]
⚪ Trung lập: [headline + nguồn]

💡 Nhận định nhanh: [1–2 câu tóm lược tác động]
```

## Đầu vào cần thiết
- Chủ đề, mã cổ phiếu hoặc khu vực địa lý quan tâm
- Khung thời gian (hôm nay, tuần này, tháng này)

## Lưu ý
- Nguồn tin mạnh nhất ở thị trường Trung Quốc, Hồng Kông và Mỹ
- Tin tức Việt Nam: cần bổ sung nguồn trong nước (CafeF, VnExpress, HOSE...)
- Polymarket cung cấp xác suất sự kiện dựa trên prediction market — hữu ích cho macro
