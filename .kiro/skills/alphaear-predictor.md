# alphaear-predictor

## Mô tả
Dự báo chuỗi thời gian tài chính bằng mô hình Kronos, có khả năng điều chỉnh động theo tin tức và cảm xúc thị trường. Kết hợp dữ liệu lịch sử với tín hiệu fundamental và sentiment.

## Khi nào dùng
- Dự báo giá cổ phiếu, chỉ số thị trường ngắn hạn (1–30 ngày)
- Dự báo doanh thu, chi phí trong mô hình tài chính
- Tích hợp tín hiệu tin tức và cảm xúc vào dự báo định lượng
- Đánh giá xác suất các kịch bản thị trường

## Hướng dẫn

### Mô hình Kronos
- Mô hình dự báo chuỗi thời gian được tối ưu cho dữ liệu tài chính
- Học từ pattern lịch sử + điều chỉnh theo:
  - **News factor**: tác động của tin tức mới lên dự báo
  - **Sentiment factor**: cảm xúc thị trường từ `alphaear-sentiment`
  - **Regime detection**: nhận diện chế độ thị trường (bull/bear/sideways)

### Quy trình dự báo
1. **Data prep**: chuẩn hoá chuỗi thời gian (log returns, stationarity check)
2. **Feature engineering**: lag features, rolling stats, technical indicators
3. **Base forecast**: Kronos cho ra dự báo điểm + khoảng tin cậy
4. **Adjustment**: điều chỉnh theo sentiment score và news impact
5. **Output**: dự báo với probability distribution

### Đầu ra dự báo
```
📈 DỰ BÁO — [Mã/Chỉ số] — [Ngày dự báo]

Dự báo 5 ngày: [giá / chỉ số]
  Base case:   XX.XX (±XX%)
  Bull case:   XX.XX (+XX%)
  Bear case:   XX.XX (-XX%)

Khoảng tin cậy 80%: [XX.XX — XX.XX]

Điều chỉnh:
• Sentiment: [+/-XX%]
• News impact: [Mô tả]

Cảnh báo: [Rủi ro chính ảnh hưởng dự báo]
```

### Hạn chế và cảnh báo
- Dự báo giá ngắn hạn có độ không chắc chắn rất cao
- Sự kiện đột xuất (black swan, earnings surprise) không thể dự báo
- Luôn trình bày khoảng tin cậy, không chỉ điểm dự báo
- Dùng để đánh giá xác suất kịch bản, không phải "crystal ball"

### Tích hợp với skill khác
- **Input**: dữ liệu từ `alphaear-stock` + điểm từ `alphaear-sentiment`
- **Input**: context từ `alphaear-news` để điều chỉnh
- **Output**: feed vào `alphaear-signal-tracker` để theo dõi tín hiệu
- **Output**: feed vào `alphaear-reporter` để tổng hợp báo cáo

## Đầu vào cần thiết
- Chuỗi dữ liệu lịch sử (giá, doanh thu, hoặc chỉ số khác)
- Khung thời gian dự báo (1, 5, 10, 30 ngày)
- Sentiment score hiện tại (từ `alphaear-sentiment`)
- Các sự kiện đã biết sắp tới (earnings, dividend, macro event)

## Lưu ý
- Dự báo tốt nhất ở thị trường có dữ liệu lịch sử dày (A股, Mỹ, HK)
- Với VN: dùng được nếu tự cung cấp chuỗi dữ liệu lịch sử từ HSX/HNX
- Không dùng như cơ sở duy nhất để ra quyết định đầu tư
