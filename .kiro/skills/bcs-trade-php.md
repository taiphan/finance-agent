# bcs-trade-php

## Mô tả
Laravel Composer package là client cho BCS Trade API — broker chứng khoán Nga. Hỗ trợ HTTP và WebSocket, tự động refresh token, validation và auto-pagination nến. Dùng như PHP Composer package trong pipeline tài chính.

**GitHub**: https://github.com/tigusigalpa/bcs-trade-php  
**Stars**: ⭐ 4 | **PHP**: 8.1+ | **Laravel**: 9–12

## Khi nào dùng
- Tích hợp với BCS Trade API (broker Nga) — hạn chế cho VN
- Học pattern WebSocket + auto token refresh để áp dụng cho broker VN
- Tham khảo kiến trúc API client cho trading platform
- Lấy pattern auto-pagination cho dữ liệu nến (candlestick)

## Hướng dẫn

### Cài đặt
```bash
composer require tigusigalpa/bcs-trade-php
```

### Cấu hình trong Laravel
```php
// config/bcs-trade.php
return [
    'base_url'      => env('BCS_API_URL', 'https://api.bcs.ru'),
    'client_id'     => env('BCS_CLIENT_ID'),
    'client_secret' => env('BCS_CLIENT_SECRET'),
    'websocket_url' => env('BCS_WS_URL', 'wss://ws.bcs.ru'),
];
```

### Tính năng chính
- **HTTP Client**: wrapper quanh Guzzle với retry logic
- **WebSocket**: kết nối realtime cho price feed
- **Auto token refresh**: tự động lấy token mới khi hết hạn
- **Validation**: validate request trước khi gọi API
- **Auto-pagination**: tự động fetch nhiều trang cho historical candlestick data

### Pattern đáng học: WebSocket + Token Refresh
```php
use Tigusigalpa\BcsTradePhp\WebSocketClient;

$client = new WebSocketClient([
    'on_token_expire' => fn() => $this->refreshToken(),
    'reconnect'       => true,
    'reconnect_delay' => 5, // seconds
]);

$client->subscribe('price.update', function($data) {
    // xử lý realtime price
});
```

### Áp dụng cho broker Việt Nam
Pattern có thể tái dùng khi build client cho SSI, VNDIRECT, TCBS:
1. **OAuth2 flow**: client_credentials hoặc authorization_code
2. **Token refresh**: background job refresh 5 phút trước khi expire
3. **WebSocket**: subscribe price feed theo format broker VN
4. **Pagination**: cursor-based hoặc page-based cho historical data

### PSR-12 và Tests
- Code tuân thủ PSR-12 — dùng làm template code style
- Test bằng Pest framework — pattern test API client

## Yêu cầu hệ thống
- PHP 8.1+
- Laravel 9, 10, 11, hoặc 12
- Composer

## Lưu ý quan trọng
⚠️ **API gắn với broker Nga** — không dùng trực tiếp cho giao dịch VN  
⚠️ Dùng chủ yếu để học pattern và tham khảo kiến trúc  
✅ PSR-12, Pest tests là pattern đáng áp dụng  
✅ WebSocket + token refresh pattern tái dùng được cho broker VN
