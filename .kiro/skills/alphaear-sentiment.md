# alphaear-sentiment

## Mô tả
Phân tích cảm xúc thị trường (market sentiment) bằng FinBERT / LLM, cho điểm từ -1.0 đến +1.0 để đo mức tích cực/tiêu cực của thị trường hoặc một cổ phiếu/ngành cụ thể.

## Khi nào dùng
- Đo "tâm lý đám đông" trước khi vào lệnh
- Phát hiện sự phân kỳ giữa cảm xúc và giá (contrarian signal)
- Đánh giá cảm xúc xung quanh một sự kiện (earnings, IPO, tin tức macro)
- Làm input cho `alphaear-predictor`

## Hướng dẫn

### Thang điểm cảm xúc
| Điểm | Mức độ | Ý nghĩa |
|---|---|---|
| +0.7 đến +1.0 | Rất tích cực | Thị trường euphoric — cẩn thận với FOMO |
| +0.3 đến +0.7 | Tích cực | Tâm lý lạc quan, xu hướng tăng |
| -0.3 đến +0.3 | Trung lập | Không rõ xu hướng cảm xúc |
| -0.7 đến -0.3 | Tiêu cực | Tâm lý lo ngại, xu hướng giảm |
| -1.0 đến -0.7 | Rất tiêu cực | Panic / capitulation — có thể là đáy |

### Nguồn dữ liệu phân tích
- **Tin tức tài chính**: Cailian, WSJ, Reuters, Bloomberg
- **Mạng xã hội**: Weibo, Twitter/X, Reddit (WallStreetBets)
- **Prediction market**: Polymarket — xác suất sự kiện
- **Báo cáo phân tích**: Analyst reports, earnings call transcripts

### Quy trình phân tích
1. Thu thập văn bản từ các nguồn trong khung thời gian chỉ định
2. Phân loại từng đơn vị văn bản: Positive / Negative / Neutral
3. Tính điểm tổng hợp có trọng số theo nguồn và độ tin cậy
4. So sánh với điểm cảm xúc kỳ trước (momentum)

### Cảnh báo contrarian
- Điểm > +0.8: thị trường quá lạc quan → rủi ro điều chỉnh
- Điểm < -0.8: thị trường quá bi quan → có thể là cơ hội mua

### Tích hợp với skill khác
- Input cho `alphaear-predictor`: điều chỉnh dự báo theo cảm xúc
- Kết hợp với `alphaear-news` để xác định tin nào đang drive sentiment
- Dùng trong `alphaear-reporter` như một phần của báo cáo phân tích

### Format đầu ra gợi ý
```
🎭 SENTIMENT ANALYSIS — [Chủ đề/Mã] — [Ngày]

Điểm tổng hợp: [+X.XX] → [Mức độ]
So với hôm qua: [↑/↓ X.XX]

Phân tích nguồn:
• Tin tức: [+X.XX] (XX bài)
• Mạng xã hội: [+X.XX] (XX posts)
• Prediction market: [XX%] xác suất tích cực

Tín hiệu: [Mô tả ngắn gọn]
```

## Đầu vào cần thiết
- Chủ đề, mã cổ phiếu, ngành hoặc từ khoá
- Khung thời gian phân tích

## Lưu ý
- FinBERT được train trên văn bản tài chính tiếng Anh — cần điều chỉnh với văn bản tiếng Việt/Trung
- Sentiment là chỉ báo phụ, không dùng độc lập để ra quyết định đầu tư
- Trung lập về thị trường: dùng được với dữ liệu Việt Nam nếu có nguồn văn bản đầu vào phù hợp
