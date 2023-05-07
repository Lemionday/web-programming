from typing import Any
from faker import Faker
from faker.providers.company import Provider as CompanyProvider
from collections import OrderedDict
import csv


class Provider (CompanyProvider):
    company_suffixes = ("Việt Nam", "Hà Nội", "miền Bắc", "miền Trung")
    company_types = OrderedDict([
        ("TNHH", 0.7),
        ("TNHH MTV", 0.1),
        ("CỔ PHẦN", 0.2),
    ])

    bsPrefixes = (
        "CÔNG NGHỆ",
        "ĐẦU TƯ",
        "GIẢI PHÁP",
        # "GIÁM SÁT",
        "TẬP ĐOÀN",
        "TƯ VẤN",
        "PHÁT TRIỂN",
        "DỊCH VỤ",
    )

    bsWords = (
        "XÂY DỰNG",
        "THƯƠNG MẠI",
        "SẢN XUẤT",
        "DU LỊCH",
        "KIẾN TRÚC",
        "NỘI THẤT",
        "KINH DOANH",
        "KỸ THUẬT",
        "NÔNG NGHIỆP",
        "THIẾT KẾ",
        "QUỐC TẾ",
        "XUẤT NHẬP KHẨU",
        "VẬN TẢI",
        "CHUYỂN PHÁT",
        "CƠ ĐIỆN LẠNH",
        "CƠ KHÍ",
        "ĐIỆN TỬ",
    )

    formats = (
        "Công ty {{type}} {{bsPrefix}} {{bs}} {{company_name}}",
        "Công ty {{type}} {{bsPrefix}} {{bs2}} {{company_name}}",
        "Công ty {{type}} {{bsPrefix}} {{bs3}} {{company_name}}",
        "Công ty {{type}} {{bs}} {{company_name}}",
        "Công ty {{type}} {{bs2}} {{company_name}}",
        "Công ty {{type}} {{bs3}} {{company_name}}",
    )

    def __init__(self, generator: Any) -> None:
        super().__init__(generator)
        with open("company/company_name.csv") as inFile:
            csv_reader = csv.reader(inFile, delimiter=',')
            self.company_names = tuple(
                line[0] for line in csv_reader)

    def type(self) -> str:
        return self.random_element(self.company_types)

    def bsPrefix(self) -> str:
        return self.random_element(self.bsPrefixes)

    def bs(self) -> str:
        return self.random_element(self.bsWords)

    def bs2(self) -> str:
        return " và ".join(self.random_elements(self.bsWords, unique=True, length=2))

    def bs3(self) -> str:
        result = (self.random_elements(self.bsWords, unique=True, length=3))
        return f"{result[0]}, {result[1]} và {result[2]}"

    def company_name(self) -> str:
        return " ".join(self.random_elements(self.company_names, length=2, unique=True))
