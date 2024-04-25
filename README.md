# Backend-Project-II-
Backend cho Project II

Route

Đăng nhập cho người dùng: post
http://localhost:4000/api/user/login
body: {
    "userName": String,
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

Lấy danh sách các tỉnh: get
http://localhost:4000/api/province

Lấy danh sách các chuyến xe: get
http://localhost:4000/api/trips
{
    "departureProvinceId": String,
    "arrivalProvinceId": String,
    "departureTime": String | null
}

Lấy danh sách các ghế của chuyến xe: get
http://localhost:4000/api/trips/seat/:id

Lấy danh sách các điểm đón của chuyến xe: get
http://localhost:4000/api/trips/pickup/:id

Lấy danh sách các điểm trả của chuyến xe: get
http://localhost:4000/api/trips/dropoff/:id