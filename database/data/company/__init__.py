from typing import Any
from faker import Faker
from faker.providers.company import Provider as CompanyProvider
from collections import OrderedDict
import csv
import factory
from person import PersonFactory
from address import Provider as AddressProvider
import nanoid


class Provider(CompanyProvider):
    company_suffixes = ("Việt Nam", "Hà Nội", "miền Bắc", "miền Trung")
    company_types = OrderedDict(
        [
            ("TNHH", 0.7),
            ("TNHH MTV", 0.1),
            ("CỔ PHẦN", 0.2),
        ]
    )

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
            csv_reader = csv.reader(inFile, delimiter=",")
            self.company_names = tuple(line[0] for line in csv_reader)

    def type(self) -> str:
        return self.random_element(self.company_types)

    def bsPrefix(self) -> str:
        return self.random_element(self.bsPrefixes)

    def bs(self) -> str:
        return self.random_element(self.bsWords)

    def bs2(self) -> str:
        return " và ".join(self.random_elements(self.bsWords, unique=True, length=2))

    def bs3(self) -> str:
        result = self.random_elements(self.bsWords, unique=True, length=3)
        return f"{result[0]}, {result[1]} và {result[2]}"

    def company_name(self) -> str:
        return self.random_element(self.company_names)


class Company:
    def __init__(self, id, name, legal_representative, office_address):
        self.id = f"c-{id}"
        self.name = name.upper()
        self.legal_representative = legal_representative.__dict__
        self.office_address = office_address
        self.cars_list = []

    def add_car(self, car_id):
        self.cars_list.append(car_id)


factory.Faker.add_provider(Provider)
factory.Faker.add_provider(AddressProvider)


class CompanyFactory(factory.Factory):
    class Meta:
        model = Company

    id = factory.Sequence(lambda n: nanoid.generate())
    name = factory.Faker("company")
    legal_representative = factory.SubFactory(PersonFactory)
    office_address = factory.Faker("address")
