# keschain-backend

## Mô tả
Backend service tài chính expose REST API endpoint để tích hợp với frontend hoặc hệ thống khác. Viết bằng PHP 8, không kèm UI — dùng như finance API layer trong pipeline.

**GitHub**: https://github.com/ApeliDev/keschain-backend  
**Stars**: ⭐ 0 | **PHP**: 8 | **Type**: Backend-only REST API

## Khi nào dùng
- Cần finance API layer không có UI
- Tích hợp vào pipeline xử lý dữ liệu tài chính
- Làm điểm trung gian giữa data source và frontend/agent
- Tham khảo kiến trúc headless finance backend PHP

## Hướng dẫn

### Tính năng
- REST API endpoints cho các nghiệp vụ tài chính
- PHP 8 — dùng được với modern PHP features (match, nullsafe operator, fibers)
- Backend-only: không có session/login UI, phù hợp deploy như microservice

### Cách triển khai
```bash
# Clone repo
git clone https://github.com/ApeliDev/keschain-backend.git
cd keschain-backend

# Cài dependencies
composer install

# Cấu hình env
cp .env.example .env
php artisan key:generate  # nếu dùng Laravel

# Chạy migrations
php artisan migrate

# Start server
php artisan serve
```

### Tích hợp như skill
Sau khi deploy, gọi REST endpoint từ agent:
```
GET /api/transactions
POST /api/transactions
GET /api/accounts/{id}/summary
GET /api/reports/monthly
```

### Đánh giá trước khi production
Checklist cần kiểm tra:
- [ ] Authentication: có API key / OAuth2 không?
- [ ] Rate limiting: có giới hạn request không?
- [ ] Input validation: sanitize đầu vào chưa?
- [ ] Error handling: format lỗi chuẩn không?
- [ ] Documentation: có API docs (Swagger/OpenAPI) không?
- [ ] Tests: coverage đủ để tin production không?

### Lưu ý cho Việt Nam
- Data model cần kiểm tra: có phù hợp với cấu trúc tài chính VN không?
- Nếu dùng cho nghiệp vụ kế toán VN: điều chỉnh theo VAS (Việt Nam Accounting Standards)
- Cân nhắc thêm currency handling cho VND

## Yêu cầu hệ thống
- PHP 8+
- Composer
- Database (MySQL / PostgreSQL)

## Lưu ý quan trọng
⚠️ **Repo còn non, star thấp** — đánh giá kỹ trước khi dùng production  
⚠️ Tài liệu có thể chưa đầy đủ — cần đọc source code trực tiếp  
✅ Headless, không UI — phù hợp deploy như microservice  
✅ Tùy mục đích: dùng được cho VN nếu điều chỉnh data model
