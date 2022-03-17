# Các bước tạo ban đầu

-   Khởi tạo ban đầu:

1. git init
2. mkr server
3. cd server
4. npm init

-   Thư viện cài đặt:
    -   express
    -   jsonwebtoken: Quản lí authentical
    -   mongoose: Giao tiếp từ server với database
    -   dotenv: Lấy biến mỗi trường
    -   argon2: hash password của người dùng vào trong database
    -   cors: Cho phép frontend nói chuyện với backend

=> npm i express jsonwebtoken mongoose dotenv argon2 cors

-   Thư viện cài trong môi trường dev:
    -   nodemon: Tự động start lại server khi code có sự thay đổi

=> npm i --save-dev nodemon

-   down extensition: Rest client: Cho phép thực hiện http request ngay trong vs code
