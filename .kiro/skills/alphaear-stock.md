# alphaear-stock

## Mô tả
Tra cứu dữ liệu cổ phiếu cho thị trường A股 (Trung Quốc), Hồng Kông và Mỹ: tìm mã cổ phiếu, giá OHLCV (Open/High/Low/Close/Volume) và thông tin cơ bản của doanh nghiệp.

## Khi nào dùng
- Tra cứu giá và biến động cổ phiếu
- Lấy dữ liệu lịch sử để phân tích kỹ thuật hoặc backtest
- Xem thông tin cơ bản: vốn hoá, P/E, P/B, cổ tức
- Tìm mã cổ phiếu theo tên công ty

## Hướng dẫn

### Tra cứu giá cổ phiếu
Khi người dùng hỏi về một mã cổ phiếu, cung cấp:
- **Giá hiện tại** và % thay đổi trong ngày
- **OHLCV**: Open, High, Low, Close, Volume
- **52-week High/Low**
- **Vốn hoá thị trường** (Market Cap)

### Thông tin cơ bản (Fundamentals)
- **Định giá**: P/E, Forward P/E, P/B, P/S, EV/EBITDA
- **Tăng trưởng**: Revenue Growth YoY, EPS Growth YoY
- **Cổ tức**: Dividend Yield, Payout Ratio
- **Chất lượng**: ROE, ROA, Gross Margin, Net Margin

### Phân loại thị trường
| Thị trường | Ký hiệu | Ví dụ |
|---|---|---|
| A股 Thượng Hải | .SS | 600519.SS (Moutai) |
| A股 Thâm Quyến | .SZ | 000858.SZ (Wuliangye) |
| Hồng Kông | .HK | 0700.HK (Tencent) |
| Mỹ (NYSE/NASDAQ) | Không hậu tố | AAPL, MSFT, TSLA |

### Tích hợp với skill khác
- Kết hợp với `alphaear-news` để giải thích biến động giá
- Feed vào `alphaear-sentiment` để đo cảm xúc thị trường quanh mã cổ phiếu đó
- Dùng dữ liệu OHLCV với `alphaear-predictor` để dự báo xu hướng

### Format đầu ra gợi ý
```
📊 [TÊN CÔNG TY] ([MÃ])

Giá: X.XX (+Y.YY%)
OHLCV: O:XX / H:XX / L:XX / C:XX / Vol:XX

Vốn hoá: $XXB
P/E: XX | P/B: XX | Div Yield: X.X%
ROE: XX% | Net Margin: XX%

52-week: Low XX — High XX
```

## Đầu vào cần thiết
- Mã cổ phiếu (ticker) hoặc tên công ty
- Thị trường (A股 / HK / Mỹ)
- Khung thời gian nếu cần dữ liệu lịch sử

## Lưu ý
- **Không hỗ trợ cổ phiếu Việt Nam (HSX/HNX)** theo mặc định
- Để dùng với VN: tích hợp thêm nguồn dữ liệu từ SSI, VNDIRECT, TCBS hoặc FiinGroup API
- Dữ liệu real-time có thể có độ trễ 15–20 phút tùy nguồn
