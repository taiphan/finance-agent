# alphaear-signal-tracker

## Mô tả
Theo dõi tiến hoá của các tín hiệu đầu tư theo thời gian: tín hiệu đang mạnh lên (strengthening), yếu đi (weakening) hay đã bị bác bỏ (invalidated). Giúp quản lý danh mục dựa trên dữ liệu thực tế thay vì cảm tính.

## Khi nào dùng
- Theo dõi tín hiệu đầu tư sau khi vào lệnh
- Đánh giá xem luận điểm đầu tư có còn nguyên vẹn không
- Thiết lập điều kiện "invalidation" trước khi vào position
- Quản lý danh mục nhiều tài sản cùng lúc

## Hướng dẫn

### Vòng đời của một tín hiệu
```
[Emerging] → [Strengthening] → [Peak] → [Weakening] → [Invalidated]
                                    ↕
                              [Persistent]
```

### Cấu trúc một tín hiệu
Mỗi tín hiệu được ghi nhận gồm:
- **Hypothesis**: Luận điểm / thesis ban đầu
- **Evidence**: Dữ liệu/sự kiện ủng hộ tín hiệu
- **Invalidation conditions**: Điều kiện nào sẽ bác bỏ tín hiệu
- **Strength score**: 0–10 (tự động cập nhật theo evidence mới)
- **Last updated**: Thời điểm cập nhật gần nhất

### Đánh giá trạng thái tín hiệu
| Trạng thái | Mô tả | Hành động gợi ý |
|---|---|---|
| 🟢 Strengthening | Evidence mới ủng hộ thesis | Giữ / tăng position |
| 🟡 Weakening | Evidence mới không ủng hộ | Giảm position, theo dõi sát |
| 🔴 Invalidated | Điều kiện bác bỏ kích hoạt | Thoát lệnh, xem lại thesis |
| ⚪ Persistent | Không có evidence mới | Giữ nguyên, tiếp tục theo dõi |

### Quy trình theo dõi hàng ngày/tuần
1. **Thu thập evidence mới**: tin tức, giá, chỉ số từ các skill khác
2. **So khớp với tín hiệu hiện có**: evidence này ủng hộ hay bác bỏ?
3. **Cập nhật strength score**
4. **Kiểm tra invalidation conditions**
5. **Gửi cảnh báo** nếu trạng thái thay đổi

### Format danh sách tín hiệu
```
📡 SIGNAL TRACKER — [Ngày cập nhật]

[1] BUY thesis: [Tên tài sản]
    Hypothesis: [Mô tả luận điểm]
    Evidence:   ✅ [Evidence 1] | ✅ [Evidence 2] | ❌ [Counter-evidence]
    Status:     🟡 Weakening (score: 6/10 → 5/10)
    Invalidate if: [Điều kiện]
    
[2] WATCH thesis: [Tên tài sản]
    ...
```

### Tích hợp với skill khác
- **Input**: dữ liệu từ `alphaear-stock`, `alphaear-news`, `alphaear-sentiment`
- **Input**: dự báo từ `alphaear-predictor`
- **Output**: tóm tắt tín hiệu cho `alphaear-reporter`

## Đầu vào cần thiết
- Danh sách tín hiệu / thesis cần theo dõi
- Điều kiện invalidation cho mỗi tín hiệu
- Tần suất cập nhật (hàng ngày / tuần)

## Lưu ý
- Nguyên tắc quan trọng: **đặt ra invalidation conditions TRƯỚC khi vào lệnh**
- Tránh confirmation bias: chủ động tìm evidence phản bác thesis
- Trung lập về thị trường — áp dụng được cho cổ phiếu VN nếu có dữ liệu đầu vào
