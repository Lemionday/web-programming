from collections import OrderedDict
from typing import Any, Optional, Tuple

from faker.providers.address import Provider as AddressProvider
from faker import Faker
import csv


class Provider(AddressProvider):
    house_number_formats = ("###", "##", "#")
    building_floor_number_formats = ("##", "#")

    def __init__(self, generator: Any) -> None:
        super().__init__(generator)
        with open("address/street_names.csv") as inFile:
            csv_reader = csv.reader(inFile, delimiter=',')
            self.street_names = tuple(line[0] for line in csv_reader)

        with open("address/commune.csv") as inFile:
            csv_reader = csv.reader(inFile, delimiter=',')
            self.communes = tuple(
                (line[0], line[2], line[4]) for line in csv_reader)

        with open("address/greek_gods.csv") as inFile:
            csv_reader = csv.reader(inFile, delimiter=',')
            self.greek_gods = tuple(
                line[0] for line in csv_reader)

    address_formats = (
        "Số {{house_number}}, đường {{street_name}}, {{commune}}",
        "Tầng {{building_floor_number}}, tòa nhà {{building_name}}, {{commune}}"
    )

    def house_number(self) -> str:
        return self.numerify(self.random_element(self.house_number_formats))

    def street_name(self) -> str:
        return self.random_element(self.street_names)

    def commune(self) -> str:
        result = self.random_element(self.communes)
        return f"{result[2]}, {result[1]}, {result[0]}"

    def building_floor_number(self) -> str:
        return self.numerify(self.random_element(self.building_floor_number_formats))

    def building_name(self) -> str:
        return self.random_element(self.greek_gods)


# fake = Faker()
# fake.add_provider(Provider)
# addresses = [fake.unique.address() for i in range(10)]
# print(addresses)
