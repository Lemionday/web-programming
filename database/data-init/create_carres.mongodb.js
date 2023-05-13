// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
const database = 'carres';
use(database);

function getCollection(name) {
  if (!db.getCollectionNames().includes(name)) {
    db.createCollection(name);
  }
  return db.getCollection(name);
}

// Create a new collection.
const accounts_db = getCollection("accounts");
accounts_db.deleteMany({});
accounts_db.dropIndexes();
accounts_db.createIndex({ "username": 1 }, { unique: true });
accounts_db.insertOne(
  {
    "username": "tester",
    "role": 3,
    "department": "",
    "hashedpassword": {
      "$binary": {
        "base64": "JDJhJDEwJDFOTXl4MzA3RmR3YUt2Lm82eGpiTGVCTzZnWC5nVHBpTmlJdGRvZnRWZTQxOVNUYlJSeXhD",
        "subType": "00"
      }
    },
    "salt": {
      "$binary": {
        "base64": "faBhI2RLOOJkdY56g8Lw1Q==",
        "subType": "00"
      }
    }
  }
)

// if (!isCollectionExisted("carres")) {
//   db.createCollection("carres");
// }
const car_registry_db = getCollection("cars");
car_registry_db.deleteMany({});
car_registry_db.dropIndexes();
car_registry_db.createIndex({ "id": 1 }, { unique: true });

centers = [
  {
    "name": "Phòng Kiểm định xe cơ giới (VAR) 1000V – Cục Đăng kiểm Việt Nam",
    "address": "35/10 - 35/12 Đường D5, P25, Q.Bình Thạnh, TP HCM",
    "id": "1000V"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1101S - Cao Bằng",
    "address": "Km4 - P. Sông Hiến - TP. Cao Bằng",
    "id": "1101S"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 1102D - Cao Bằng trực thuộc công ty TNHH đăng kiểm Cao Bằng",
    "address": "Tổ 8, phường Ngọc Xuân, TP. Cao Bằng",
    "id": "1102D"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 1201D, trực thuộc công ty cổ phần đăng kiểm xe cơ giới  Lạng Sơn",
    "address": "50 Lê Đại Hành - Phường Vĩnh Trại - Lạng Sơn",
    "id": "1201D"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 1202D, trực thuộc công ty cổ phần đăng kiểm xe cơ giới  Lạng Sơn",
    "address": "tổ 5, khối 1+2, thị trấn Cao Lộc, huyện Cao Lộc, tỉnh Lạng Sơn",
    "id": "1202D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới Hạ Long 1401D - Quảng Ninh",
    "address": "Phường Hà Phong - Thành phố Hạ Long - Quảng Ninh",
    "id": "1401D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới Uông Bí 1402D - Quảng Ninh",
    "address": "Phường Thanh Sơn - T.p Uông Bí - Quảng Ninh",
    "id": "1402D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới Móng Cái 1403D - Quảng Ninh",
    "address": "Km 9, xã Hải Đông – T.p Móng Cái - Quảng Ninh",
    "id": "1403D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới Móng Cái 1404D - Quảng Ninh",
    "address": "Tổ 5, khu 11, Phường Mông Dương, Tp. Cẩm Phả, tỉnh Quảng Ninh",
    "id": "1404D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới Móng Cái 1405D - Quảng Ninh",
    "address": "Ô đất số 9,10,34 và 35, lô ĐNN_D thuộc Cụm Công nghiệp Hà Khánh, Tp. Hạ Long, tỉnh Quảng Ninh",
    "id": "1405D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới Móng Cái 1406D - Quảng Ninh",
    "address": "Khu CN Cái Lân, phường Giếng Đáy, Tp. Hạ Long, tỉnh Quảng Ninh",
    "id": "1406D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới Móng Cái 1407D - Quảng Ninh",
    "address": "Tổ 1, khu 4, P. Quang Hanh, Tp. Cẩm Phả, tỉnh Quảng Ninh",
    "id": "1407D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1501V - Hải Phòng",
    "address": "Km 90 QL 5 mới, Khu Cam Lộ 2, Hồng Bàng, Hải Phòng",
    "id": "1501V"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1502S - Hải Phòng",
    "address": "Khu Hạ Đoạn 2, P. Đông Hải 2, Q. Hải An, Hải Phòng",
    "id": "1502S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1503D - Hải Phòng",
    "address": "Kênh Giang, Thuỷ Nguyên, Hải Phòng",
    "id": "1503D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1504D - Hải Phòng",
    "address": "Cụm CN Cầu Nghìn, xã Hưng Nhân, huyện Vĩnh Bảo, TP Hải Phòng",
    "id": "1504D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1505D - Hải Phòng",
    "address": "Số 01 đường Lê Thánh Tông, phường Máy Tơ, quận Ngô Quyền, Tp. Hải Phòng",
    "id": "1505D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1506D - Hải Phòng",
    "address": "Lô Cn 3.2H khu công nghiệp Đình Vũ, P. Đông Hải, Q. Hải An, Tp. Hải Phòng",
    "id": "1506D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1507D - Hải Phòng",
    "address": "Tổ dân phố Đồng Tâm, phường Đồng Hòa, quận Kiến An, Tp. Hải Phòng",
    "id": "1507D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1701D - Thái Bình",
    "address": "Phường Trần Hưng Đạo, TP Thái Bình",
    "id": "1701D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1702D - Thái Bình",
    "address": "Thôn Nam quán, xã Đông Các, huyên Đông Hưng, TP Thái Bình",
    "id": "1702D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1801S - Nam Định",
    "address": "Km 101, QL10, xã Mỹ Tân, Mỹ Lộc, TP Nam Định",
    "id": "1801S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1802S - Nam Định",
    "address": "Số 3 Quang Trung, TP. Nam Định",
    "id": "1802S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1802D - Nam Định (Công ty Cổ phần phát triển công nghệ điện thông)",
    "address": "Km 150+800 (Phải tuyến) QL 21 (Đường Lê Đức Thọ), xã Nghĩa An, huyện Nam Trực, tỉnh Nam Định",
    "id": "1802D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1803D - Nam Định",
    "address": "xã Hải Thanh, huyện Hải Hậu, tỉnh Nam Định",
    "id": "1803D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1804D - Nam Định",
    "address": "Km3, Đại Lộ Thiên Trường, xã Mỹ Hưng, huyện Mỹ Lộc, Tp. Nam Định",
    "id": "1804D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1805D - Nam Định",
    "address": "thửa đất số 350, tờ bản đồ số 5, Đại lộ Thiên Trường, Lộc Hòa, Tp. Nam Định",
    "id": "1805D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1901V - Phú Thọ",
    "address": "2821, đại lộ Hùng Vương, p. Vân Cơ, TP. Việt Trì, Phú Thọ",
    "id": "1901V"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1902D - Phú Thọ",
    "address": "QL2, Khu 3, xã Phú Hộ, thị xã Phú Thọ, tỉnh Phú Thọ",
    "id": "1902D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1904D - Phú Thọ",
    "address": "Khu 4, xã Kinh Kệ, huyện Lâm Thao, tỉnh Phú Thọ",
    "id": "1904D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1905D - Phú Thọ",
    "address": "Khu Bãi Tần, thị trấn Thanh Sơn, huyện Thanh Sơn, tỉnh Phú Thọ",
    "id": "1905D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1906D - Phú Thọ",
    "address": "Khu Hóc Tranh, xóm Mai, xã Trưng Vương, Tp. Việt Trì, tỉnh Phú Thọ",
    "id": "1906D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 1908D - Phú Thọ",
    "address": "Khu 7, xã Phượng Lâu, Tp. Việt Trì, tỉnh Phú Thọ",
    "id": "1908D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2001S - Thái Nguyên",
    "address": "Tổ 1A, Phường Tân lập - TP Thái Nguyên",
    "id": "2001S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2002S - Thái Nguyên",
    "address": "Xóm Ao Vàng, Xã Cao Ngạn, TP Thái Nguyên",
    "id": "2002S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2003D - Thái Nguyên",
    "address": "Cụm công nghiệp Nguyên Gon, phường Cải Đan, TP. Sông Công, tỉnh Thái Nguyên",
    "id": "2003D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2004D - Thái Nguyên",
    "address": "Xóm 9, xã Cổ Lũng, huyện Phú Lương, tỉnh Thái Nguyên",
    "id": "2004D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2005D - Thái Nguyên",
    "address": "Ngõ 845, đường Dương Tự Minh, tổ 6, phường Quang Vinh,T.p Thái Nguyên, tỉnh Thái Nguyên",
    "id": "2005D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2006D - Thái Nguyên",
    "address": "Ngõ 398, đường Thống Nhất, phường Đồng Quang, Tp. Thái Nguyên, tỉnh Thái Nguyên",
    "id": "2006D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2007D - Thái Nguyên",
    "address": "Tổ 2, phường Cam Giá, Tp. Thái Nguyên, tỉnh Thái Nguyên",
    "id": "2007D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2008D - Thái Nguyên",
    "address": "Tổ dân phố Đình, phường Nam Tiến, thành phố Thái Nguyên, tỉnh Thái Nguyên",
    "id": "2008D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2009D - Thái Nguyên",
    "address": "Xã Sơn Cẩm, Tp. Thái Nguyên, tỉnh Thái Nguyên",
    "id": "2009D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2101S - Yên Bái",
    "address": "Km2 - Phường Nguyễn Thái Học - TP Yên Bái",
    "id": "2101S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2102D - Yên Bái",
    "address": "bản Nà Làng, xã Nghĩa Lợi, TX. Nghĩa Lộ, tỉnh Yên Bái",
    "id": "2102D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2201S - Tuyên Quang",
    "address": "Thôn Yên Phú, xã An Tường - TP. Tuyên Quang",
    "id": "2201S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2202D - Tuyên Quang",
    "address": "Thôn Lượng, xã Tứ Quận, huyện Yên Sơn, tỉnh Tuyên Quang",
    "id": "2202D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2203D - Tuyên Quang",
    "address": "Tổ 16, phường Tân Hà, Tp. Tuyên Quang, tỉnh Tuyên Quang",
    "id": "2203D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2301S - Hà Giang",
    "address": "Tổ 17 - Phường Nguyễn Trãi - TP. Hà Giang",
    "id": "2301S"
  },
  {
    "name": "Công ty cổ phần đăng kiểm xe cơ giới giao thông Lào Cai - 2401D",
    "address": "Phường Bắc Cường - Tp Lào Cai - Tỉnh Lào Cai",
    "id": "2401D"
  },
  {
    "name": "Công ty cổ phần đăng kiểm xe cơ giới Bảo Thắng- 2403D",
    "address": "Quốc lộ 4E, thôn Tiến Lợi, xã Xuân Giao, huyện Bảo Thắng, tỉnh Lào Cai",
    "id": "2403D"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 2404D - Công ty cổ phần Kinh doanh kỹ thuật giao thông Kim Thành",
    "address": "Lô 21, KCN Bắc Duyên Hải, Tp. Lào Cai, tỉnh Lào Cai",
    "id": "2404D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2501S - Lai Châu",
    "address": "Phường Tân Phong, Thị xã Lai Châu, Lai Châu",
    "id": "2501S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2602D - Sơn La (Công ty cổ phần đăng kiểm cơ giới thủy bộ Sơn La)",
    "address": "Tổ 8 Phường Quyết Thắng - TP. Sơn La - Tỉnh Sơn La",
    "id": "2602D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2601D - Sơn La",
    "address": "bản Noọng La, phường chiềng Sinh - TP Sơn La",
    "id": "2601D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2603D - Sơn La",
    "address": "Km177, Quốc lộ 6, Bản Chiềng Đi 1, xã Vân Hồ, huyện Vân Hồ, tỉnh Sơn La",
    "id": "2603D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2701S - Điện Biên",
    "address": "Phố 10 - phường Thanh Trườn - thành phố Điện Biên Phủ - tỉnh Điện Biên",
    "id": "2701S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2801S - Hoà Bình",
    "address": "Km 71+100 - Quốc lộ 6 - P.Đồng Tiến - TP Hòa Bình",
    "id": "2801S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2901S - Hà Nội",
    "address": "Số 454 Phạm Văn Đồng - Từ Liêm - Hà Nội",
    "id": "2901S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2901V - Hà Nội",
    "address": "Km 15+200 Quốc lộ 1A, Thôn Yên Phú - Xã Liên Ninh - Thanh Trì - Hà Nội",
    "id": "2901V"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2902S - Hà Nội",
    "address": "Đường Đặng Phúc Thông- Yên Viên- Gia Lâm-Hà Nội.",
    "id": "2902S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2902V - Hà Nội",
    "address": "Xã Phú Thị, Huyện Gia Lâm - Hà Nội",
    "id": "2902V"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2903S - Hà Nội",
    "address": "Số 3 Lê Quang Đạo - Mỹ Đình - Nam Từ Liên - Hà Nội",
    "id": "2903S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2903V - Hà Nội",
    "address": "Láng Thượng - Đống Đa - Hà Nội",
    "id": "2903V"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2904V - Hà Nội",
    "address": "Km 8, đường Bắc Thăng Long – Nội Bài, Xã Quang Minh, Huyện Mê Linh, Hà Nội",
    "id": "2904V"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2905V - Hà Nội",
    "address": "Số 49 Phố Đức Giang, Phường Đức Giang, Quận Long Biên, Hà Nội",
    "id": "2905V"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2906V - Hà Nội",
    "address": "Km 4 - Đường 70 - Xã Tam Hiệp - Thanh trì - Hà Nội",
    "id": "2906V"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2907D - Hà Nội",
    "address": "Km 1, QL3, Du Nội, Mai Lâm, Đông Anh- Hà Nội",
    "id": "2907D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2908D - Hà Nội",
    "address": "Lô 6, cụm CN Lai Xá, xã Kim Chung, Hoài Đức,Hà Nội",
    "id": "2908D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2909D - Hà Nội",
    "address": "685, đường Lĩnh Nam, phường Lĩnh Nam, Hoàng Mai, Hà Nội",
    "id": "2909D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2910D - Hà Nội",
    "address": "Bãi đỗ xe công cộng và dịch vụ Đền Lừ, phường Hoàng Văn Thụ, quận Hoàng Mai, Hà Nội",
    "id": "2910D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2911D - Hà Nội",
    "address": "Km31, QL 6, xã Đông Sơn, Chương Mỹ, Hà Nội",
    "id": "2911D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2912D - Hà Nội",
    "address": "Km 21+200 QL3, Mai Đình, Sóc Sơn, Hà Nội",
    "id": "2912D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2913D - Hà Nội",
    "address": "Thôn Sơn Du, xã Nguyên Khê, Đông Anh, Hà Nội",
    "id": "2913D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2914D - Hà Nội",
    "address": "Cụm CN Thanh Oai, Bích Hòa, Thanh Oai, Hà Nội",
    "id": "2914D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2915D - Hà Nội",
    "address": "Km21, xã Hà Hồi, huyện Thường Tín, Tp. Hà Nội",
    "id": "2915D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2916D – Hà Nội, trực thuộc công ty CP đăng kiểm xe cơ giới Long Biên",
    "address": "144/95 đường Vũ Xuân Thiều, phường Sài Đồng, quận Long Biên, Hà Nội.",
    "id": "2916D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2917D - Hà Nội",
    "address": "Tổ 16, đường Nguyễn Văn Linh, phường Thạch Bàn, quận Long Biên, Hà Nội",
    "id": "2917D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2918D - Hà Nội",
    "address": "Km2+100, đường tránh QL32, xã Thanh Mỹ, Tx. Sơn Tây, Tp. Hà Nội",
    "id": "2918D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2921D - Hà Nội",
    "address": "Ô số 3 lô 5, Cụm công nghiệp An Khánh, huyện An Đức, Tp. Hà Nội",
    "id": "2921D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2922D - Hà Nội",
    "address": "Khu đất số 10 đường 254 phố Tây Sơn, thị trấn Phùng, huyện Đan Phượng, Tp. Hà Nội",
    "id": "2922D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2923D - Hà Nội",
    "address": "Km25, Quốc lộ 6, KCN Phú Nghĩa, huyện Chương Mỹ, Tp. Hà Nội",
    "id": "2923D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2925D - Hà Nội",
    "address": "Đường Trần Vỹ, phường Mai Dịch, quận Cầu Giấy, Thành phố Hà Nội",
    "id": "2925D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2927D - Hà Nội",
    "address": "Km số 3, đường Phạm Văn Đồng, phường Cổ Nhuế 1, quận Bắc Từ Liêm, Tp Hà Nội",
    "id": "2927D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2929D - Hà Nội",
    "address": "Số 115. tổ 15, phường Kiến Hưng, quận Hà Đông, Tp. Hà Nội",
    "id": "2929D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2930D - Hà Nội",
    "address": "Lô 24, cụm CN Yên Nghĩa, P. Yên Nghĩa, Q. Hà Đông, Tp. Hà Nội",
    "id": "2930D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 2932D - Hà Nội",
    "address": "Số 9, tổ 15, đường Pháp Vân, phường Yên Sở, quận Hoàng Mai, Tp. Hà Nội",
    "id": "2932D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3301S - Hà Nội",
    "address": "Km15 - Quốc lộ 6 - Hà Đông - Hà Nội",
    "id": "3301S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3302S - Hà Nội",
    "address": "Phường Quang Trung - Thị Xã Sơn tây - Hà Nội",
    "id": "3302S"
  },
  {
    "name": "Công ty cổ phần đăng kiểm xe cơ giới Hải Dương - 3401D",
    "address": "Đường Tân Dân, P. Việt Hòa,TP.Hải Dương",
    "id": "3401D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3402D - Hải Dương",
    "address": "Km 33+300, cụm CN II, p. Văn An, thị xã Chí Linh,TP.Hải Dương",
    "id": "3402D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3403D - Hải Dương",
    "address": "thôn Dân, xã Đồng Tâm, huyện Ninh Giang, tỉnh Hải Dương",
    "id": "3403D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3404D - Hải Dương",
    "address": "Thôn Quỳnh Khê, xã Kim Xuyên, huyên Kim Thành, Tỉnh Hải Dương",
    "id": "3404D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3405D - Hải Dương",
    "address": "Phân khu 2, đô thị mới phía nam thành phố Hải Dương, xã Liên Hồng, Tp. Hải Dương, tỉnh Hải Dương",
    "id": "3405D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3407D - Hải Dương",
    "address": "Cụm công nghiệp Ngọc Sơn, xã Ngọc Sơn, Tp. Hải Dương",
    "id": "3407D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3501D - Ninh Bình (Công ty cổ phần đăng kiểm xe cơ giới Ninh Bình).",
    "address": "Số 58 đường Trần Nhân Tông, phố An Hòa, phường Ninh Phong, TP. Ninh Bình, tỉnh Ninh Bình",
    "id": "3501D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3502D - Ninh Bình",
    "address": "Phố Bích Sơn, P. Bích Đào, TP Ninh Bình",
    "id": "3502D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3503D - Ninh Bình",
    "address": "Tổ 2, phường Bắc Sơn, Tp. Tam Điệp, Tỉnh Ninh Bình",
    "id": "3503D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3504D - Ninh Bình",
    "address": "Thôn Cổ Loan Hạ, giáp đường 477, xã Ninh Tiến, Tp. Ninh Bình, tỉnh Ninh Bình",
    "id": "3504D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3601S - Thanh Hoá",
    "address": "267 Bà Triệu - Đông Thọ - TP Thanh Hóa",
    "id": "3601S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3602S - Thanh Hoá",
    "address": "Phường Bắc Sơn - TX Bỉm Sơn - Thanh Hoá",
    "id": "3602S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3603D - Thanh Hoá",
    "address": "Đường Võ Nguyên Giáp, P. Quảng Thành, T.p Thanh Hoá",
    "id": "3603D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3604D - Thanh Hoá",
    "address": "Phố 7, Phường Quảng Thắng, T.p Thanh Hóa, tỉnh Thanh Hóa",
    "id": "3604D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3605D - Thanh Hoá",
    "address": "Xã Thạch Quảng, huyện Thạch Thành, tỉnh Thanh Hóa",
    "id": "3605D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3606D - Thanh Hoá",
    "address": "Khu phố Ngọc Minh, thị trấn Ngọc Lặc, huyện Ngọc Lặc. Tỉnh Thanh Hóa",
    "id": "3606D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3608D - Thanh Hoá",
    "address": "Xã Đông Hoàng, huyện Đông Sơn, tỉnh Thanh Hóa",
    "id": "3608D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3609D - Thanh Hoá",
    "address": "25/38 Phú Thọ 3, Phường Phú Sơn, Tp. Thanh Hóa, tỉnh Thanh Hóa",
    "id": "3609D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3610D - Thanh Hoá",
    "address": "Quốc lộ 10, xã Liên Lộc, huyện Hậu Lộc, tỉnh Thanh Hóa",
    "id": "3610D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3701S - Nghệ An",
    "address": "72 Phan Bội Châu - TP Vinh - Nghệ An",
    "id": "3701S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3702S - Nghệ An",
    "address": "Xã Đông Hiếu – TX Thái Hoà - Nghệ An",
    "id": "3702S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3703D - Nghệ An",
    "address": "Km 6, QL 46, Nghi Thạch, Nghi Lộc, Nghệ An",
    "id": "3703D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3704D - Nghệ An",
    "address": "Xã Diễn Hòng, huyện Diễn Châu, tỉnh Nghệ An",
    "id": "3704D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3705D - Nghệ An",
    "address": "Xóm 1, xã Nghi Long, huyện Nghi Lộc, tỉnh Nghệ An",
    "id": "3705D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3706D - Nghệ An",
    "address": "QL7B, xã Yên Sơn, huyện Đô Lương, tỉnh Nghệ An",
    "id": "3706D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3707D - Nghệ An",
    "address": "Xóm 5, xã Quỳnh Lộc, thị xã Hoàng Mai, tỉnh Nghệ An",
    "id": "3707D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3708D - Nghệ An",
    "address": "Xóm 3, xã Hưng Thịnh, huyện Hưng Nguyên, tỉnh Nghệ An",
    "id": "3708D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 3709D - Nghệ An",
    "address": "Khối 9, phường Quán Bàu, Tp. Vinh, tỉnh Nghệ An",
    "id": "3709D"
  },
  {
    "name": "Công ty cổ phần đăng kiểm Hà Tĩnh - 3801D",
    "address": "Km 9 tránh Hà Tĩnh, xã Thạch Đài, Thạch Hà, Hà Tĩnh",
    "id": "3801D"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 3802D - Hà Tĩnh",
    "address": "km486+354 QL1A, phường Đậu Liêu, TX. Hồng Lĩnh, tỉnh Hà Tĩnh.",
    "id": "3802D"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 3803D - Hà Tĩnh",
    "address": "phường Kỳ Trinh, thị xã Kỳ Anh, tỉnh Hà Tĩnh.",
    "id": "3803D"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 3804D - Hà Tĩnh",
    "address": "Xã Trung Lễ, huyện Đức Thọ, tỉnh Hà Tĩnh",
    "id": "3804D"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 3805D - Hà Tĩnh",
    "address": "Km821+810, đường Hồ Chí Minh, xã Hương Long, huyện Hương Khê, tỉnh Hà Tĩnh",
    "id": "3805D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 4301S - Đà Nẵng",
    "address": "25 Hoàng Văn Thái - P.Hòa Minh - Q.Liên Chiểu - TP. Đà Nẵng",
    "id": "4301S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 4302S - Đà Nẵng",
    "address": "Km 800 + 40 Xã Hoà Châu – Hoà Vang - Đà Nẵng",
    "id": "4302S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 4304D - Đà Nẵng",
    "address": "Đường số 01, KCN Hòa Cầm, P.Hòa Thọ Tây, Q. Cẩm Lệ, Tp. Đà Nẵng",
    "id": "4304D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 4305D - Đà Nẵng",
    "address": "Số 10B, Tú Mỡ, phường Hòa An, quận Cẩm Lệ, Tp. Đà Nẵng",
    "id": "4305D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 4701D - Đăklăk",
    "address": "Km 4+500 - QL 14 - Tân An - Buôn Mê Thuột - Đăklăk",
    "id": "4701D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 4702D - Đăklăk",
    "address": "Km 12 - QL 14 – Thôn 7- Hoà Phú - Buôn Mê Thuột - Đăklăk",
    "id": "4702D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 4703D - Đăklăk",
    "address": "Thôn 9, xã Ea Đar, Eakar, Đắk lắk",
    "id": "4703D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 4704D - Đăklăk",
    "address": "75 Nguyễn Thị Định, P. Thành Nhất, TP. Buôn Ma Thuột, Đắk lắk",
    "id": "4704D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 4705D - Đăklăk",
    "address": "Thôn Pơng Drang, Krông Buk, Đắk lắk",
    "id": "4705D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 4706D - Đăklăk",
    "address": "Thôn Hòa Thắng, xã Hòa Đông, huyện Krông Pắc, tỉnh Đắk Lắk",
    "id": "4706D"
  },
  {
    "name": "Công ty cổ phần đăng kiểm xe cơ giới ĐakNông - 4801D",
    "address": "Km 3 QL 14, Tổ 4, P Nghĩa Tân, TX Gia Nghĩa, Đak Nông",
    "id": "4801D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 4901S - Lâm Đồng",
    "address": "Số 1 Tô Hiến Thành - P.3 - TP. Đà Lạt",
    "id": "4901S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 4902S - Lâm Đồng",
    "address": "01 Huỳnh Thúc Kháng, P.2, TX Bảo Lộc, Lâm Đồng",
    "id": "4902S"
  },
  {
    "name": "Chi nhánh trung tâm đăng kiểm xe cơ giới Lâm Đồng - 4903S",
    "address": "Thị trấn Liên Nghĩa, Đức Trọng, Lâm Đồng",
    "id": "4903S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 4904D - Lâm Đồng",
    "address": "Số 204 đường Hoàng Văn Thụ, phường 1, Tp. Bảo Lộc, tỉnh Lâm Đồng",
    "id": "4904D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5001S - T.p HCM",
    "address": "Lô 13, đường số 07, KCN Tân Tạo mở rộng, phường Tân Tạo A, quận Bình Tân, Tp. Hồ Chí Minh",
    "id": "5001S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5002S - T.p HCM",
    "address": "343/20 Lạc Long Quân - P.5 - Quận 11",
    "id": "5002S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5003S - T.p HCM",
    "address": "Số 6/6 - QL 13 - P.Hiệp Bình Chánh - Tp.Thủ Đức",
    "id": "5003S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5003V - T.p HCM",
    "address": "107 Đường Phú Châu - P. Tam Bình - Q.Thủ Đức",
    "id": "5003V"
  },
  {
    "name": "Chi nhánh đăng kiểm thuộc 5003H - T.p HCM",
    "address": "Khu phố 4, Trường Sơn, Linh Trung,Q.Thủ Đức",
    "id": "5003H"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5004V - T.p HCM",
    "address": "Lô H4, khu công nghiệp cát lái - Cụm 2, phường Thạnh Mỹ Lợi, quận 2, TP. Hồ Chí Minh",
    "id": "5004V"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5005V - T.p HCM",
    "address": "1143/3B, QL 1A, KP3, P. An Phú Đông, Q.12, T.p HCM",
    "id": "5005V"
  },
  {
    "name": "Chi nhánh đăng kiểm XCG 5005T - T.p HCM",
    "address": "1A Hồng Hà, P.2, Q.Tân Bình, T.p HCM",
    "id": "5005T"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5006V - T.p HCM",
    "address": "118 Huỳnh Tấn Phát - P.Tân Thuận Tây - Quận 7 - TP. HCM.",
    "id": "5006V"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5007V - T.p HCM",
    "address": "428/56 Quốc lộ 1, P.Bình Hưng Hoà B, Q.Bình Tân, T.p HCM",
    "id": "5007V"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5008D - T.p HCM",
    "address": "218/42 đường TA28, Phường Thới An, Quận 12, TP HCM",
    "id": "5008D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5009D - T.p HCM",
    "address": "201, tỉnh lộ 8, xã Tân Thạnh Tây, huyện Củ Chi, TP. Hồ Chí Minh",
    "id": "5009D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5010D - T.p HCM",
    "address": "số 5, km14+700, đg 85, Tân Phú Trung, Củ Chi, TP. Hồ Chí Minh",
    "id": "5010D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5012D - T.p HCM trực thuộc công ty CP xăng dầu Mai Châu",
    "address": "D3/16G, khu phố 4, thị trấn Tân Túc, huyện Bình Chánh, TP. Hồ Chí Minh",
    "id": "5012D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5013D - T.p HCM trực thuộc công ty CP đăng kiểm Bình Chánh",
    "address": "Số A5/20H6, Trần Đại Nghĩa, Ấp 1, Tân Kiên, huyện Bình Chánh, TP. Hồ Chí Minh",
    "id": "5013D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5014D - T.p HCM",
    "address": "Số 5A, quốc lộ 22, quốc lộ Thới Sơn, H. Hóc Môn, Tp. Hồ Chí Minh",
    "id": "5014D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5015D - T.p HCM",
    "address": "Số 36, Hoàng Hữu Nam, Quận 9, Tp. Hồ Chí Minh",
    "id": "5015D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5017D - T.p HCM",
    "address": "Số 1031, đường Nguyễn Hữu Thọ, ấp 2, xã Long Thới, huyện Nhà Bè, Tp. Hồ Chí Minh",
    "id": "5017D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 5019D - T.p HCM",
    "address": "117/2D1, đường Hồ Văn Long, khu phố 3, P. Tân",
    "id": "5019D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6001S - Đồng Nai",
    "address": "Số 25, Đường 2A, KCN Biên Hoà II - P.An Bình - TP Biên Hoà - Tỉnh Đồng Nai",
    "id": "6001S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6002S - Đồng Nai",
    "address": "Khu Xuân Bình - TT Xuân lộc - Long Khánh - Đồng Nai",
    "id": "6002S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6003S - Đồng Nai",
    "address": "QL 20, Ấp Trung Hoà, Ngọc Định, Định Quán, Đồng Nai",
    "id": "6003S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6004D - Đồng Nai",
    "address": "Số 1A, xa lộ Hà Nội, phường Tân Biên, thành phố Biên Hòa, tỉnh Đồng Nai",
    "id": "6004D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6005D - Đồng Nai",
    "address": "370/2A Võ Nguyên ​​​​​Giáp, xã Phước Tân​​, TP. Biên Hòa, tỉnh Đồng Nai",
    "id": "6005D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6006D - Đồng Nai",
    "address": "Xá An Phước, Huyện Long Thành-Đồng Nai",
    "id": "6006D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6101S - Bình Dương",
    "address": "QL13 - P.Hiệp thành - TP. Thủ Dầu Một - Bình Dương",
    "id": "6101S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6102S - Bình Dương",
    "address": "Đường Nguyễn Thị Minh Khai, khu phố Tân Thắng, phường Tân Bình, Tp. Dĩ An, tỉnh Bình Dương",
    "id": "6102S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6103S - Bình Dương",
    "address": "Khu phố 9, phường Phú Hòa, TP. Thủ Dầu Một, tỉnh Bình Dương",
    "id": "6103S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6103D - Bình Dương",
    "address": "Đường ĐX 82, Khu 2, P. Định Hòa, T.p TDM, Bình Dương",
    "id": "6103D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6104D - Bình Dương",
    "address": "414/3B ĐL Bình Dương, Thạnh Bình, Thuận An, Bình Dương",
    "id": "6104D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6105D - Bình Dương",
    "address": "Thửa đất số 117, tờ bản đồ số 23, KCN Nam Tân Uyên, phường Khánh Bình, thị xã Tân Uyên, tỉnh Bình Dương",
    "id": "6105D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6106D - Bình Dương",
    "address": "Số 216, khu phố 1, phường Tân Bình, thị xã Dĩ An, Bình Dương",
    "id": "6106D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6109D - Bình Dương",
    "address": "19/2 khu phố Bình Đáng, phường Bình Hòa, Tx. Thuận Anh, tỉnh Bình Dương",
    "id": "6109D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6110D - Bình Dương",
    "address": "291, QL 13, Khu 2, P. Mỹ Phước, Tx. Bến Cát, tỉnh Bình Dương",
    "id": "6110D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6111D - Bình Dương",
    "address": "Lô CC-9A, đường NE9, khu công nghiệp Mỹ Phước 3, phường Thới Hòa, thị xã Bến Cát, tỉnh Bình Dương",
    "id": "6111D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6112D- Bình Dương",
    "address": "Thửa đất số 294, tờ bản đồ số DC 9.4, khu phố Đông, phường Vĩnh Phú, Tp. Thuận An, tỉnh Bình Dương",
    "id": "6112D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6201S - Long An",
    "address": "Số 12 Quốc Lộ 1 - Phường 5 - Thị xã Tân An - Long An",
    "id": "6201S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6202D - Long An",
    "address": "356 KP9, QL1A, TT Bến Lức, Long An",
    "id": "6202D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6203D - Long An",
    "address": "Khu Công nghiệp Hải Sơn, ấp Bình Tiền 2, xã Đức Hòa Hạ, huyên Đức Hòa, tỉnh Long An",
    "id": "6203D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6301S - Tiền Giang",
    "address": "Thân Cửu nghĩa - Huyện Châu Thành - Tiền Giang",
    "id": "6301S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6302D - Tiền Giang",
    "address": "Xã Tam Hiệp, huyện Châu Thành, tỉnh Tiền Giang",
    "id": "6302D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6303D - Tiền Giang",
    "address": "Ấp đông B, xã Nhị Bình, huyện Châu Thành, tỉnh Tiền Giang",
    "id": "6303D"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 6401V - Vĩnh Long",
    "address": "10/2 Đinh Tiên Hoàng - F8 - T.P Vĩnh Long",
    "id": "6401V"
  },
  {
    "name": "Trung Tâm kiểm định kỹ thuật phương tiện thiết bị thủy bộ Cần Thơ 6501S - Cần Thơ",
    "address": "19A, KCN Trà nóc 1, Q Bình Thuỷ, Cần Thơ",
    "id": "6501S"
  },
  {
    "name": "Chi nhánh Trung Tâm kiểm định kỹ thuật phương tiện thiết bị thủy bộ Cần Thơ 6502S - Cần Thơ",
    "address": "KV1, phường Hưng Thạnh, quận Cái Răng, TP Cần Thơ",
    "id": "6502S"
  },
  {
    "name": "Trung Tâm Đăng kiểm xe cơ giới 6502D - Cần Thơ",
    "address": "số 26B, Nguyễn Văn Linh, phường Long Hòa, quận Bình Thủy, Cần Thơ.",
    "id": "6502D"
  },
  {
    "name": "Trung Tâm Đăng kiểm xe cơ giới 6503D - Cần Thơ",
    "address": "9A, Quốc lộ 91B, Khu vực Bình Hòa A, phường Phước Thới, quận Ô Môn, Tp. Cần Thơ",
    "id": "6503D"
  },
  {
    "name": "Trung Tâm Đăng kiểm xe cơ giới 6504D - Cần Thơ",
    "address": "Khu vực Tràng Thọ 1, phường Thốt Nốt, Q. Thốt Nốt, Tp. Cần Thơ",
    "id": "6504D"
  },
  {
    "name": "Trung Tâm Đăng kiểm xe cơ giới 6505D - Cần Thơ",
    "address": "Khu vực 4, phường Hưng Thạnh, quận Cái Răng, Tp. Cần Thơ",
    "id": "6505D"
  },
  {
    "name": "Trung Tâm Đăng kiểm xe cơ giới 6506D - Cần Thơ",
    "address": "Ấp Vĩnh Long, xã Vĩnh Trinh, huyện Vĩnh Thanh, Tp. Cần Thơ",
    "id": "6506D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6601S - Đồng Tháp",
    "address": "Số 386, Ấp 1, Điện Biên Phủ, xã Mỹ Trà, TP Cao lãnh, tỉnh Đồng Tháp",
    "id": "6601S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6602D - Đồng Tháp",
    "address": "Số 123, Quốc lộ 80, ấp An Thạnh, xã An Nhơn, huyện Châu Thành, tỉnh Đồng Tháp",
    "id": "6602D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6701S - An Giang",
    "address": "67 khóm Thới Hoà, P.Mỹ Thạnh, T.p Long Xuyên - An Giang",
    "id": "6701S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6702S -  An Giang",
    "address": "68 Châu Phú A - TX Châu Đốc - An Giang",
    "id": "6702S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6703D - An Giang",
    "address": "Tuyến tránh QL 91 (N1), Khóm Hòa Bình, phường Vĩnh Mỹ, Tp. Châu Đốc, tỉnh An Giang",
    "id": "6703D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6801S - Kiên Giang",
    "address": "Khu dân cư BX liên tỉnh, đường số 2, ấp So Đũa, xã Vĩnh Hòa Hiệp, Châu Thành, Kiên Giang",
    "id": "6801S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 6803D - Kiên Giang",
    "address": "Đường Võ Văn Kiệt, tổ 15, khu phố Dãy Ốc, phường Vĩnh Hiệp, thành phố Rạch Giá, tỉnh Kiên Giang",
    "id": "6803D"
  },
  {
    "name": "Trung tâm Đăng kiểm xe cơ giới 6901V - Cà Mau",
    "address": "Ấp 5 - Xã An Xuyên - TP. Cà Mau - Tỉnh Cà Mau",
    "id": "6901V"
  },
  {
    "name": "Trung tâm Đăng kiểm xe cơ giới 6902D - Cà Mau",
    "address": "Số 36, đường Võ Văn Kiệt, ấp Tắc Thủ, xã Hồ Thị Kỷ, huyện Thới Bình, tỉnh Cà Mau",
    "id": "6902D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7001S - Tây Ninh",
    "address": "82 đường Trần Phú - p. Ninh Sơn - Tp. Tây Ninh - Tỉnh Tây Ninh",
    "id": "7001S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7002S - Tây Ninh",
    "address": "Đường tránh xuyên Á, P. Gia Lộc, Tx. Tràng Bảng, Tỉnh Tây Ninh",
    "id": "7002S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7003D - Tây Ninh",
    "address": "đường 793, xã Thạnh Đông, huyện Tân Châu, tỉnh Tây Ninh",
    "id": "7003D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7101S - Bến Tre",
    "address": "Số 7 - Nguyễn Văn Tư - P7 - TX Bến Tre - Tỉnh Bến Tre",
    "id": "7101S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7102D - Bến Tre",
    "address": "QL60, ấp Tân Long 1, xã Tân Thành Bình, huyện Mỏ Cày Bắc, tỉnh Bến Tre",
    "id": "7102D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7202D - Bà Rịa Vũng Tàu",
    "address": "QL51, KP2, Phước Trung, TX Bà Rịa - Tỉnh Bà Rịa Vũng Tàu",
    "id": "7202D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7203D - Bà Rịa Vũng Tàu",
    "address": "Đường 1, thị trấn Phú Mỹ, huyện Tân Thành, tỉnh Bà Rịa – Vũng Tàu",
    "id": "7203D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7204S - Bà Rịa Vũng Tàu",
    "address": "Đường D6, khu công nghiệp Đất Đỏ 1, huyện Đất Đỏ, tỉnh Bà Rịa - Vũng Tàu",
    "id": "7204S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7205D - Bà Rịa Vũng Tàu",
    "address": "KCN Mỹ Xuân A, phường Mỹ Xuân, thị xã Phú Mỹ, tỉnh Bà Rịa - Vũng Tàu",
    "id": "7205D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7301S - Quảng Bình",
    "address": "Đường Hữu Cảnh - T.P Đồng Hới - Quảng Bình",
    "id": "7301S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7302D - Quảng Bình",
    "address": "Thanh Lương, quảng Xuân, Quảng Trạch, Quảng Bình",
    "id": "7302D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7303D - Quảng Bình",
    "address": "Thôn Lệ Kỳ 1, xã Vĩnh Ninh, huyện Quảng Ninh, tỉnh Quảng Bình",
    "id": "7303D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7304D - Quảng Bình",
    "address": "Thôn 2, xã Trung Trạch, huyện Bố Trạch, tỉnh Quảng Bình",
    "id": "7304D"
  },
  {
    "name": "Trung Tâm đăng kiểm phương tiện cơ giới thủy bộ 7401S - Quảng Trị",
    "address": "61 Lý Thương Kiệt - Đông Hà - Quảng Trị",
    "id": "7401S"
  },
  {
    "name": "Chi nhánh Trung Tâm đăng kiểm phương tiện cơ giới thủy bộ 7402S - Quảng Trị",
    "address": "Km 4 +700 Điện biên Phủ (9D), phường Đông Lương, TP Đông Hà, Quảng Trị",
    "id": "7402S"
  },
  {
    "name": "Trung Tâm đăng kiểm phương tiện cơ giới 7402D - Quảng Trị",
    "address": "Hà Thanh, xã Gio Châu, Gio Linh, Quảng Trị",
    "id": "7402D"
  },
  {
    "name": "Trung Tâm đăng kiểm phương tiện cơ giới 7403D - Quảng Trị",
    "address": "Đường Điện Biên Phủ, phường Đông Lương, Tp. Đông Hà, tỉnh Quảng Trị",
    "id": "7403D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7501S - Huế",
    "address": "150 Điện Biên Phủ - TP Huế",
    "id": "7501S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7502S - Huế",
    "address": "Hương Văn, Hương Trà, TT- Huế",
    "id": "7502S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7601S - Quảng Ngãi",
    "address": "Xã Tịnh Phong - Huyện Sơn Tịnh - Quảng Ngãi",
    "id": "7601S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7602D - Chi nhánh Công ty CP Thuận Phát",
    "address": "QL 1A, thôn Năng Tây 3, xã Nghĩa Phương, huyện Tư Nghĩa, tỉnh Quảng Ngãi",
    "id": "7602D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7603D - Quảng Ngãi",
    "address": "Thôn 4, xã Bình Hòa, huyện Bình Sơn, tỉnh Quảng Ngãi",
    "id": "7603D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7604D - Quảng Ngãi",
    "address": "Xã Hành Thuận, huyện Nghĩa Hành, tỉnh Quảng Ngãi",
    "id": "7604D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7701S - Bình Định",
    "address": "71 Tây Sơn - Quy Nhơn - Bình Định",
    "id": "7701S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7702S - Bình Định",
    "address": "QLộ 1A - Thôn Vạn Lương - Mỹ Châu - Phú Mỹ - Bình Định",
    "id": "7702S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7703D - Bình Định",
    "address": "Khu vực Liên Trực, p. Bình Định, Tx. An Nhơn, tỉnh Bình Định",
    "id": "7703D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7704D - Bình Định",
    "address": "LôA1.01 (khu A), khu kinh tế Nhơn Hội, xã Nhơn Hội, Tp. Quy Nhơn, tỉnh Bình Định",
    "id": "7704D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7705D - Bình Định",
    "address": "Cụm công nghiệp Hoài Tân, khu phố Giao hội 1, phường Hoài Tân, Tx. Hoài Nhơn, tỉnh Bình Định",
    "id": "7705D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7706D - Bình Định",
    "address": "Tổ 23, KV3, phường Nhơn Bình, thành phố Quy Nhơn, tỉnh Bình Định",
    "id": "7706D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7801S - Phú Yên",
    "address": "P.9 - Bình Kiến - Tuy Hòa - Phú Yên",
    "id": "7801S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7802D - Phú Yên",
    "address": "Km48+450, Quốc lộ 25, xã Suối Bạc, huyện Sơn Hòa, tỉnh Phú Yên",
    "id": "7802D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7803D - Phú Yên",
    "address": "Km 1319+300, Quốc lộ 1A, xã An Chấn, huyện Tuy An, tỉnh Phú Yên",
    "id": "7803D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7901S - Khánh Hoà",
    "address": "Đường 2 tháng 4 - Đồng Đế - Vĩnh Hoà - Nha Trang - Khánh Hoà",
    "id": "7901S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 7902S - Khánh Hoà",
    "address": "QL1A, Phú Sơn, Cam Phú, Cam Ranh, Khánh Hòa",
    "id": "7902S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8102D - Gia Lai",
    "address": "Làng Phung, xã Biển Hồ, Pleiku-Gia Lai",
    "id": "8102D"
  },
  {
    "name": "Công ty TNHH đăng kiểm xe cơ giới 8103D - Gia Lai",
    "address": "Nguyễn Chí Thanh, tổ 5, p. Chi Lăng, TP. Pleiku, Gia Lai",
    "id": "8103D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8104D",
    "address": "thôn 2 xã Đak Bơ, huyện Đak Bơ, GiaLai",
    "id": "8104D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8105D",
    "address": "Lô C50 Cụm CN Diên Phú, thôn 3, xã Diên Phú, Tp Pleiku, tỉnh Gia Lai",
    "id": "8105D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8201S - Kon Tum",
    "address": "Số 99 Huỳnh Thúc Kháng - TX Kon Tum - Tỉnh Kon Tum",
    "id": "8201S"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 8301V - Sóc Trăng",
    "address": "191A - Trần Hưng Đạo - TX Sóc Trăng",
    "id": "8301V"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 8302D - Sóc Trăng",
    "address": "Ấp Xây Đá B, xã Hồ Đắc Kiện, huyện Châu Thành, tỉnh Sóc Trăng",
    "id": "8302D"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 8401V - Trà Vinh",
    "address": "151 Nguyễn Đáng - P.7 - TX Trà Vinh - Trà Vinh",
    "id": "8401V"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 8402D - Trà Vinh",
    "address": "ấp Sâm Bua, xã Lương Hòa, huyện Châu Thành, tỉnh Trà Vinh",
    "id": "8402D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8501S - Ninh Thuận",
    "address": "Bình Quý - Phước Dân - Ninh Phước - Ninh Thuận",
    "id": "8501S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8502D - Ninh Thuận",
    "address": "Thôn Văn Lâm 3, xã Phước Nam, huyện Thuận Nam, tỉnh Ninh Thuận",
    "id": "8502D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8601S - Bình Thuận",
    "address": "Số 5 Từ Văn Tư - Phan Thiết - Bình Thuận",
    "id": "8601S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8602D - Bình Thuận",
    "address": "Km 32 xã Tân Lập, Hàm Thuận Nam, Bình Thuận",
    "id": "8602D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8801S - Vĩnh Phúc",
    "address": "Xã Khai Quang - T.P Vĩnh Yên - Vĩnh Phúc",
    "id": "8801S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8802D - Vĩnh Phúc",
    "address": "Thôn Yên Lỗ - xã Đạo Đức, huyện Bình Xuyên - Vĩnh Phúc",
    "id": "8802D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8803D -  trực thuộc công ty CP Hưng Linh Vĩnh Phúc.",
    "address": "phố Chợ Lầm, xã Tam Hồng, huyện Yên Lạc, tỉnh Vĩnh Phúc.",
    "id": "8803D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8804D",
    "address": "Km 40+500, Quốc lộ 2A, xã Hợp Thịnh, huyện Tam Dương, tỉnh Vĩnh Phúc",
    "id": "8804D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8806D",
    "address": "Xã Quất Lưu, huyện Bình Xuyên, tỉnh Vĩnh Phúc",
    "id": "8806D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8901S - Hưng Yên",
    "address": "Xã Dị Sử - Mỹ Hào - Hưng Yên",
    "id": "8901S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8902S - Hưng Yên",
    "address": "Thôn Tiền Thắng - Bảo Khê - TX Hưng Yên - Hưng Yên",
    "id": "8902S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8904D - Hưng Yên",
    "address": "Thôn Lại Ốc, xã Long Hưng, huyện Văn Giang, tỉnh Hưng Yên",
    "id": "8904D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8905D - Hưng Yên",
    "address": "Thôn Nghĩa Trang, thị trấn Yên Mỹ, huyện Yên Mỹ, tỉnh Hưng Yên",
    "id": "8905D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 8906D - Hưng Yên",
    "address": "Thửa đất số 302, tờ bản đồ số 07, xã Nghĩa Dân, huyện Kim Động, tỉnh Hưng Yên",
    "id": "8906D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9001S - Hà Nam",
    "address": "Xã Liêm Tiết, T.P Phủ Lý - Hà Nam",
    "id": "9001S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9002D - Hà Nam",
    "address": "Km 229, Tuyến tránh Quốc lộ 1A, xã Thi Sơn, huyện Kim Bảng, tỉnh Hà Nam",
    "id": "9002D"
  },
  {
    "name": "Công ty cổ phần đăng kiểm Quảng Nam - 9201D",
    "address": "Ngã ba Tây Cốc, Hà Lam, Thăng Bình, Quảng Nam",
    "id": "9201D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9202D - Quảng Nam",
    "address": "QL. 1A, khối Phong Nhị, P. Điện An, TX. Điện Bàn, tỉnh Quảng Nam",
    "id": "9202D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9301S - Bình Phước",
    "address": "P. Tân Xuân - TX Đồng Xoài - Tỉnh Bình Phước",
    "id": "9301S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9302D - Bình Phước",
    "address": "Tổ 1, Ấp 9, Minh Hưng, Chơn Thành, Bình Phước",
    "id": "9302D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9303D - Bình Phước",
    "address": "Đường ĐT 741, xã Tân Lập, huyện Đồng Phú, tỉnh Bình Phước",
    "id": "9303D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9304D - Bình Phước",
    "address": "Tổ 3, ấp Thuận Thành 2, xã Thuận Lợi, huyện Đồng Phú, tỉnh Bình Phước",
    "id": "9304D"
  },
  {
    "name": "Trung tâm đăng kiểm xe cơ giới 9401V - Bạc Liêu",
    "address": "QL 1 - Phường 7 - Xã Long Thạnh, Huyện Vĩnh Lợi- Bạc Liêu",
    "id": "9401V"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9501S - Hậu Giang",
    "address": "Km 2085 - QL 1- Tân Phú Thạnh - Châu Thành A - Hậu Giang",
    "id": "9501S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9502D - Hậu Giang",
    "address": "QL 91C, Ấp Nhơn Thuận 1, xã Nhơn Nghĩa A, huyện Châu Thành A, tỉnh Hậu Giang",
    "id": "9502D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9503D - Hậu Giang",
    "address": "Ấp 7, xã Vị Trung, huyện Vị Thủy, tỉnh Hậu Giang",
    "id": "9503D"
  },
  {
    "name": "Công ty cổ phần đăng kiểm Bắc Kạn - 9701D",
    "address": "Tổ 9 - Phùng Chí Kiên - TX Bắc Kạn - Bắc Kạn",
    "id": "9701D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9801S - Bắc Giang",
    "address": "Đồi Chỉ Chèo - Xương Giang - Bắc Giang",
    "id": "9801S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9802D - Bắc Giang",
    "address": "Km2, đường Hoàng Hoa Thám, P. Đại Mai, TP. Bắc Giang, tỉnh Bắc Giang",
    "id": "9802D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9803D - Bắc Giang",
    "address": "Cụm công nghiệp Tân Dĩnh – Phi Mô, huyện Lạng Giang, tỉnh Bắc Giang",
    "id": "9803D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9804D - Bắc Giang",
    "address": "Thôn chớp, xã Lương Phong, huyện Hiệp Hòa, tỉnh Bắc Giang",
    "id": "9804D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9805D - Bắc Giang",
    "address": "Thôn Dõng, xã Hương Gián, huyện Yên Dũng, tỉnh Bắc Giang",
    "id": "9805D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9806D - Bắc Giang",
    "address": "Cụm công nghiệp Tân Dĩnh - Phi Mô, thị trấn Vôi, huyện Lạng Giang, tỉnh Bắc Giang",
    "id": "9806D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9901S - Bắc Ninh",
    "address": "Khu 7 - P.Thị Cầu - TP. Bắc Ninh - Tỉnh Bắc Ninh",
    "id": "9901S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9902S - Bắc Ninh",
    "address": "Thôn Dương Sơn – Xã Tam Sơn – TX Từ Sơn - Tỉnh Bắc Ninh",
    "id": "9902S"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9903D - Bắc Ninh",
    "address": "Km 10, QL 18, TT Phố Mới, Quế Võ, Bắc Ninh",
    "id": "9903D"
  },
  {
    "name": "Trung Tâm đăng kiểm xe cơ giới 9904D - Bắc Ninh",
    "address": "Khu công nghiệp Lâm Bình, xã Lâm Thao, huyện Lương Tài, tỉnh Bắc Ninh.",
    "id": "9904D"
  },
  {
    "name": "Công ty cổ phần đầu tư xây dựng và tư vấn đăng kiểm – Trung tâm đăng kiểm xe cơ giới 9905D- Bắc Ninh",
    "address": "thôn Ngọc Trì, xã Ngọc Nội, huyện Thuận Thành, tỉnh Bắc Ninh.",
    "id": "9905D"
  }
];
const center_coll = getCollection("centers");
center_coll.deleteMany({});
center_coll.dropIndexes();
center_coll.createIndex({ "id": 1 }, { unique: true });
center_coll.insertMany(centers);