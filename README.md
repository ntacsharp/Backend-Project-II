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


Đăng nhập cho nhà xe: post
http://localhost:4000/api/provider/login
body: {
    "userName": String,
    "password": String
}

Đăng ký nhà xe mới: post
http://localhost:4000/api/provider/register
body: {
    "name": String,
    "phoneNumber": String,
    "address": String,
    "email": String,
    "password": String
}

Cập nhật thông tin cho nhà xe: patch
http://localhost:4000/api/provider
body: {
    "name": String,
    "address": String,
}

Lấy danh sách tất cả các xe do nhà xe cung cấp: get (có yêu cầu bearer token)
http://localhost:4000/api/bus

Lấy thông tin cụ thể cho 1 xe của nhà cung cấp: get (có yêu cầu bearer token)
http://localhost:4000/api/bus/:id

Lấy danh sách tất cả loại xe: get
http://localhost:4000/api/bus/types

Thêm 1 xe mới vào danh sách: post (có yêu cầu bearer token)
http://localhost:4000/api/bus
body: {
    "plateNumber": String,
    "busTypeId": String, (reference cho bus type)
}

Xóa 1 xe khỏi danh sách: delete (có yêu cầu bearer token)
http://localhost:4000/api/bus/:id