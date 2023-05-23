from typing import Any
from faker.providers.person import Provider as NameProvider
from collections import OrderedDict
import rstr
import csv


class Provider(NameProvider):
    def __init__(self, generator: Any) -> None:
        super().__init__(generator)
        with open("name/female.csv") as inFile:
            csv_reader = csv.reader(inFile, delimiter=";")
            self.female_names = tuple(id[0] for id in csv_reader)
        with open("name/male.csv") as inFile:
            csv_reader = csv.reader(inFile, delimiter=";")
            self.male_names = tuple(id[0] for id in csv_reader)

    first_names = OrderedDict(
        [
            ("Nguyễn", 38.4),
            ("Trần", 12.1),
            ("Lê", 9.5),
            ("Phạm", 7),
            ("Hoàng", 5.1),
            ("Phan", 4.5),
            ("Vũ", 3.9),
            ("Đặng", 2.1),
            ("Bùi", 2),
            ("Đỗ", 1.4),
            ("Hồ", 1.3),
            ("Ngô", 1.3),
            ("Dương", 1),
            ("Lý", 0.5),
        ]
    )

    female_name_formats = OrderedDict(
        [
            ("{{first_name}} {{female_last_name}}", 0.64),
            ("{{first_name}} Thị {{female_last_name}}", 0.36),
        ]
    )

    male_name_formats = OrderedDict(
        [
            ("{{first_name}} {{male_last_name}}", 0.64),
            ("{{first_name}} Văn {{male_last_name}}", 0.36),
        ]
    )

    def first_name(self) -> str:
        return self.random_element(self.first_names)

    def female_name(self):
        pattern = self.random_element(self.female_name_formats)
        return self.generator.parse(pattern)

    def male_name(self):
        pattern = self.random_element(self.male_name_formats)
        return self.generator.parse(pattern)

    def female_last_name(self) -> str:
        return self.random_element(self.female_names)

    def male_last_name(self) -> str:
        return self.random_element(self.male_names)

    def sex_and_name(self) -> tuple[int, str]:
        sex = self.random_element((True, False))
        if sex:
            return 0, self.male_name()
        else:
            return 1, self.female_name()
