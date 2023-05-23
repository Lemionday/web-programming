# web-programming

# Team member
| Mã sinh viên | Tên              | Số điện thoại |
|--------------|------------------|---------------|
| 21020196     | Lương Nhật Hào   | 0988972003    |
| 21020222     | Nguyễn Đức Nam   | 0345316858    |
| 21021547     | Nguyễn Hữu Trọng | 0961308192    |

# Cache
Do dữ liệu về các trung tâm không thường xuyên thay đổi nên khi server khởi động sẽ lấy dữ liệu từ database và dùng cơ sở dữ liệu redis để cache các mã trung tâm và tên tương ứng với key và value.

# Routing

Thông tin xe trong file database/data/final/cars.json

Thống kê
/cars/statistics/

query parameters:

+ period = month | quater | year

+ center = <center_id> | main

tham số trong file json

+ least_recently_registered = thời gian đăng kiểm gần nhất

+ invalidate_date = thời gian hết hạn đăng kiểm

```json
{
    "manufacturer": "peugeot",
    "model": "504",
    "carbody": "sedan",
    "fueltype": "gas",
    "least_recently_registered": "2/2/2022",
    "invalidate_date": "2/8/2024",
    "center_registered": "1702D",
}
```

URL: GET /owner/<id>
thông tin chủ sở hữu gồm 2 loại chủ sở hữu: trong file people.json và companies.json
```json
{
    "id": "op-8376ffa8-76fe-479f-a382-f3b5f9adf8c5",
    "name": "Hồ Khánh Châu",
    "sex": "nữ",
    "birthdate": "5/3/1961",
    "ssn": "04911961579661",
    "birthplace": "Quảng Nam"
},
```

```json
{
    "id": "oc-dcff697d-d26d-428d-91f1-5ee755e9718e",
    "name": "CÔNG TY TNHH MTV ĐẦU TƯ XUẤT NHẬP KHẨU VÀ CƠ KHÍ TRƯỜNG THÀNH",
    "legal_representative": {
        "id": "op-e355c369-b931-426d-b26e-8017061f5679",
        "name": "Dương Văn Bảo Nam",
        "sex": "nam",
        "birthdate": "5/3/1961",
        "ssn": "02401961913149",
        "birthplace": "Bắc Giang"
    },
    "office_address": "Tầng 47, tòa nhà Apollo, Xã Thiện Thuật, Huyện Bình Gia, Tỉnh Lạng Sơn"
}
```