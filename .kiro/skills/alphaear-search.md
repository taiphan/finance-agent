# alphaear-search

## Mô tả
Tìm kiếm trên web và truy xuất dữ liệu cục bộ (RAG — Retrieval Augmented Generation), hỗ trợ nhiều nguồn tìm kiếm: Jina Reader, DuckDuckGo và Baidu. Cầu nối giữa dữ liệu bên ngoài và các skill phân tích.

## Khi nào dùng
- Tìm kiếm thông tin tài chính, báo cáo, nghiên cứu trên web
- Truy xuất tài liệu nội bộ (RAG từ knowledge base)
- Lấy nội dung từ URL cụ thể (annual report, investor presentation...)
- Tìm benchmark ngành, peer comparison data

## Hướng dẫn

### Các nguồn tìm kiếm

#### Web Search
| Nguồn | Phù hợp cho |
|---|---|
| DuckDuckGo | Tìm kiếm tổng quát, tin tức tiếng Anh |
| Baidu | Nội dung tài chính tiếng Trung, A股 |
| Jina Reader | Trích xuất nội dung từ URL cụ thể |

#### RAG (Retrieval Augmented Generation)
- Tìm kiếm trong knowledge base / tài liệu nội bộ đã được index
- Hữu ích khi có annual report, prospectus, nội quy công ty đã upload

### Quy trình tìm kiếm
1. **Xác định query**: tối ưu hoá từ khoá cho từng nguồn
2. **Chọn nguồn phù hợp**: web search vs RAG vs URL fetch
3. **Trích xuất thông tin**: lọc relevant content, bỏ noise
4. **Tổng hợp**: kết hợp từ nhiều nguồn, kiểm tra nhất quán
5. **Trích dẫn**: luôn ghi rõ nguồn và ngày truy cập

### Loại query phổ biến trong tài chính
```
# Annual report / financial statements
"[Tên công ty] annual report 2024"
"[Ticker] 10-K SEC filing"

# Industry data
"[Ngành] industry benchmark revenue multiple"
"[Ngành] average EBITDA margin 2024"

# News & analysis
"[Company/ticker] latest news Q4 2024"
"[Event] market impact analysis"

# VN-specific
"[Mã CK] BCTC 2024 hose"
"[Tên công ty] báo cáo thường niên"
```

### Tích hợp với skill khác
- Feed kết quả vào `alphaear-news` để phân tích tin tức
- Cung cấp dữ liệu cho `financial-analyst` khi không có file báo cáo
- Tìm peer data cho `business-investment-advisor`

### Format đầu ra
```
🔍 KẾT QUẢ TÌM KIẾM — "[Query]"

[1] [Tiêu đề nguồn]
    Nguồn: [URL / Tên tài liệu]
    Ngày: [Ngày publish]
    Nội dung: [Đoạn relevant]
    
[2] ...

📋 Tổng hợp: [2–3 câu kết luận từ kết quả tìm kiếm]
```

## Đầu vào cần thiết
- Query tìm kiếm hoặc URL cụ thể
- Nguồn ưu tiên (nếu có)
- Ngôn ngữ nội dung cần tìm (tiếng Anh, Việt, Trung)

## Lưu ý
- Jina Reader tốt cho trích xuất nội dung từ trang web phức tạp
- Với nội dung tiếng Việt: DuckDuckGo + tìm trực tiếp trên CafeF, VnExpress, HOSE
- Luôn verify thông tin quan trọng từ nhiều nguồn độc lập
- Kiểm tra ngày publish — tài chính thay đổi nhanh
