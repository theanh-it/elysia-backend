# elysia-backend

Backend API được xây dựng với [ElysiaJS](https://elysiajs.com/) và runtime [Bun](https://bun.sh/), sử dụng ORM [Prisma](https://www.prisma.io/) kết nối MySQL.

## Mô tả tổng quan

Dự án cung cấp nền tảng backend cơ bản với các chức năng quản lý người dùng, xác thực, và các tiện ích mở rộng. Project sử dụng [elysia-nnn-router](https://www.npmjs.com/package/elysia-nnn-router) để tổ chức và quản lý route một cách linh hoạt, giúp mở rộng và bảo trì hệ thống dễ dàng hơn. Phù hợp cho các ứng dụng web hiện đại cần hiệu năng cao và dễ mở rộng.

## Sử dụng elysia-nnn-router

`elysia-nnn-router` là plugin router cho Elysia framework, cho phép tự động quét và đăng ký các route từ cấu trúc thư mục.

### Cách tổ chức routes

Tạo thư mục `routes` trong dự án và tổ chức các route theo cấu trúc thư mục, ví dụ:

```
routes/
  ├── _middleware.ts
  ├── users/
  │   ├── _middleware.ts
  │   ├── get.ts
  │   ├── post.ts
  │   ├── put.ts
  │   ├── delete.ts
  │   ├── [id]/
  │   │   ├── _middleware.ts
  │   │   ├── get.ts
  │   │   ├── post.ts
  │   │   ├── put.ts
  │   │   └── delete.ts
  └── posts/
      ├── get.ts
      └── post.ts
```

### Sử dụng plugin trong Elysia

```typescript
import { Elysia } from "elysia";
import { nnnRouterPlugin } from "elysia-nnn-router";

const app = new Elysia();

app.use(nnnRouterPlugin());

app.listen(3000, () => {
  console.log("Elysia server running at http://localhost:3000");
});
```

### Quy ước đặt tên

- Tên file route phải trùng với phương thức HTTP (`get.ts`, `post.ts`, `put.ts`, `delete.ts`, `patch.ts`, `options.ts`)
- File `_middleware.ts` trong mỗi thư mục sẽ được áp dụng cho tất cả các route trong thư mục đó
- Tham số động được đặt trong dấu ngoặc vuông, ví dụ: `[id]`

### Ví dụ

```typescript
// routes/users/[id]/get.ts
export default ({ params }) => {
  return `User ID: ${params.id}`;
};

// routes/_middleware.ts
import { Context } from "elysia";

export default [
  (context: Context) => {
    console.log("global middleware");
  },
];
```

## Cài đặt

1. Cài đặt dependencies:
   ```bash
   bun install
   ```
2. Tạo file `.env` và cấu hình biến môi trường:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/dbname"
   ```

## Quản lý database với Prisma

- Tạo/migrate database:
  ```bash
  bun run prisma:migrate
  ```
- Reset database:
  ```bash
  bun run prisma:reset
  ```
- Generate Prisma Client:
  ```bash
  bun run prisma:generate
  ```

## Seed dữ liệu mẫu

```bash
bun run prisma/seed
```

## Các lệnh scripts

- Phát triển:
  ```bash
  bun run dev
  ```
- Build production:
  ```bash
  bun run build
  ```
- Chạy production:
  ```bash
  bun run start
  ```

## Các package chính

- `elysia`, `@elysiajs/cors`, `@elysiajs/static`: Framework và middleware
- `elysia-nnn-router`: Quản lý và tổ chức route linh hoạt cho ElysiaJS
- `@prisma/client`, `prisma`: ORM và quản lý database
- `bcrypt`, `jsonwebtoken`: Xác thực, bảo mật
- `dotenv`: Quản lý biến môi trường
- `sharp`: Xử lý ảnh
- `zod`: Validate dữ liệu
