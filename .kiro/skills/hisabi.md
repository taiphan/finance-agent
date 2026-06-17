# hisabi

## Mô tả
Personal finance app Laravel với GraphQL API đầy đủ — dùng headless như finance backend. Tích hợp sẵn OpenAI và SMS parser. Self-hosted, data model phổ quát, phù hợp với thị trường Việt Nam.

**GitHub**: https://github.com/hisabi-app/hisabi  
**Stars**: ⭐ 449 | **Type**: Headless GraphQL Backend | **VN**: ✅ Dùng được

## Khi nào dùng
- Cần backend quản lý tài chính cá nhân / doanh nghiệp nhỏ self-hosted
- Tích hợp agent với dữ liệu thu chi qua GraphQL endpoint
- Parse SMS biến động số dư từ ngân hàng tự động
- Xây dựng pipeline: PHP backend → AI skill phân tích → AI skill báo cáo

## Hướng dẫn

### Cài đặt (Self-hosted)
```bash
# Clone repo
git clone https://github.com/hisabi-app/hisabi.git
cd hisabi

# Cài dependencies
composer install
npm install

# Cấu hình
cp .env.example .env
php artisan key:generate

# Cấu hình database trong .env
DB_CONNECTION=mysql
DB_DATABASE=hisabi
DB_USERNAME=root
DB_PASSWORD=your_password

# Cấu hình OpenAI (optional)
OPENAI_API_KEY=sk-...

# Migrate & seed
php artisan migrate --seed

# Build assets
npm run build

# Start
php artisan serve
```

### GraphQL API
Truy cập GraphQL playground tại `http://localhost:8000/graphql`

#### Queries ví dụ
```graphql
# Lấy danh sách giao dịch
query GetTransactions($from: Date!, $to: Date!) {
  transactions(from: $from, to: $to) {
    id
    amount
    type          # income | expense
    category { name }
    account { name balance }
    description
    created_at
  }
}

# Tổng thu chi theo tháng
query MonthlySummary($month: Int!, $year: Int!) {
  monthlySummary(month: $month, year: $year) {
    total_income
    total_expense
    net
    by_category { category amount }
  }
}

# Số dư tài khoản
query Accounts {
  accounts {
    id name balance currency
  }
}
```

#### Mutations ví dụ
```graphql
# Thêm giao dịch
mutation AddTransaction($input: TransactionInput!) {
  createTransaction(input: $input) {
    id amount type created_at
  }
}
```

### SMS Parser — Train cho ngân hàng Việt Nam
Hisabi có sẵn SMS parser tích hợp OpenAI. Train lại cho format SMS ngân hàng VN:

#### Format SMS Vietcombank
```
So du TK 1234567890 la 15,250,000 VND (tang 2,000,000 VND).
ND: Chuyen tien tu NGUYEN VAN A. Ngay: 16/06/2024 09:30:45
```

#### Format SMS Techcombank
```
TK 1234567890 +2,000,000 VND luc 09:30 16/06/24
SD: 15,250,000 VND ND: NGUYEN VAN A chuyen tien
```

#### Cách train parser
```php
// app/Services/SmsParser.php — thêm pattern ngân hàng VN
$patterns = [
    'vietcombank' => [
        'regex'   => '/So du TK (\d+) la ([\d,]+) VND \((tang|giam) ([\d,]+) VND\)/',
        'mapping' => ['account', 'balance', 'direction', 'amount']
    ],
    'techcombank' => [
        'regex'   => '/TK (\d+) ([+-])([\d,]+) VND/',
        'mapping' => ['account', 'direction', 'amount']
    ],
    'mb_bank' => [
        'regex'   => '/Bien dong so du TK (\d+): (Tang|Giam) ([\d,.]+)VND/',
        'mapping' => ['account', 'direction', 'amount']
    ],
];
```

### Pipeline gợi ý với agent
```
1. Giao dịch vào từ SMS VN ngân hàng → hisabi SMS parser → lưu vào DB
2. Agent query GraphQL → lấy dữ liệu thu chi
3. Dùng financial-analyst → phân tích sức khỏe tài chính
4. Dùng alphaear-reporter → tạo báo cáo tháng
```

### Tích hợp agent qua GraphQL
```javascript
// Gọi từ agent (Node.js / Python)
const query = `
  query { 
    monthlySummary(month: 6, year: 2024) {
      total_income total_expense net
    }
  }
`;

const response = await fetch('http://localhost:8000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({ query })
});
```

## Yêu cầu hệ thống
- PHP 8.1+
- Laravel 10+
- MySQL / PostgreSQL
- Node.js (build assets)
- OpenAI API key (optional, cho SMS parser AI)

## Lưu ý
✅ **449 stars** — community tốt, tài liệu đầy đủ hơn keschain  
✅ Data model phổ quát — phù hợp VN không cần sửa nhiều  
✅ GraphQL API — linh hoạt hơn REST cho agent query  
✅ Train SMS parser cho VN: Vietcombank, Techcombank, MB Bank, BIDV...  
⚠️ Self-hosted — cần setup server, không có SaaS version
