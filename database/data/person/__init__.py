from typing import Any
from faker.providers import BaseProvider
import csv
import factory
import factory.fuzzy
import datetime
import rstr


class Provider(BaseProvider):
    def __init__(self, generator: Any) -> None:
        super().__init__(generator)
        with open("person/city_codes.csv") as inFile:
            csv_reader = csv.reader(inFile, delimiter=";")
            self.city_codes = tuple(id for id in csv_reader)

    def ssn_city_code(self) -> list:
        return self.random_element(self.city_codes)


class Person:
    def __init__(
        self,
        id,
        sex_and_name,
        ssn_city,
        ssn_year,
        ssn_unique_number,
        birthdate,
    ):
        self.id = f"op-{id}"
        self.name = sex_and_name[1]
        self.sex = "nam"
        ssn_sex = 0
        if sex_and_name[0] == True:
            self.sex = "nữ"
            ssn_sex = 1
        self.birthdate = birthdate.strftime("%-d/%-m/%Y")
        self.ssn = f"{ssn_city[1]}{ssn_sex}{ssn_year}{ssn_unique_number}"
        self.birthplace = ssn_city[0]
        # self.address = address


from name import Provider as NameProvider

factory.Faker.add_provider(NameProvider, locale="vi_VN")
factory.Faker.add_provider(Provider, locale="vi_VN")


class PersonFactory(factory.Factory):
    class Meta:
        model = Person

    id = factory.Faker("uuid4")
    sex_and_name = factory.Faker("sex_and_name", locale="vi_VN")

    ssn_city = factory.Faker("ssn_city_code", locale="vi_VN")
    birthdate = factory.fuzzy.FuzzyDate(
        datetime.date(1950, 1, 1), datetime.date(1999, 12, 31)
    ).evaluate(2, None, False)
    ssn_year = birthdate.year
    ssn_unique_number = factory.Sequence(lambda n: rstr.xeger(r"[0-9]{6}"))