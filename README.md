# Backend-Project-II-
Backend cho Project II

Route

Đăng nhập cho người dùng: post
http://localhost:4000/api/user/login
body: {
    "email": String,
    "password": String
}

Đăng ký người dùng mới: post
http://localhost:4000/api/user/register
body: {
    "name": String,
    "phoneNumber": String,
    "email": String,
    "password": String
}