from faker_vehicle import VehicleProvider
import factory
import factory.fuzzy
import rstr
import csv
import json
import math
import datetime
from dateutil.relativedelta import relativedelta


class Provider(VehicleProvider):
    car_headers = [
        "manufacturer",
        "model",
        "carbody",
        "carlength",
        "carwidth",
        "carheight",
        "curbweight",
        "fueltype",
        "symboling",
    ]

    def __init__(self, generator) -> None:
        super().__init__(generator)
        with open("car/car_list.csv") as inFile:
            csv_reader = csv.reader(inFile, delimiter=",")
            self.header = next(csv_reader, [])
            row = {self.header[i]: i for i in range(len(self.header))}
            self.header = row
            self.cars = []
            for line in csv_reader:
                row = []
                for spec in self.car_headers:
                    row.append(line[self.header[spec]])
                self.cars.append(row)

        with open("center/id.csv") as inFile:
            csv_reader = csv.reader(inFile, delimiter=";")
            self.centers_id = tuple(id[0] for id in csv_reader)

        with open("car/city_code.csv") as inFile:
            csv_reader = csv.reader(inFile, delimiter=";")
            self.city_codes = tuple(id for id in csv_reader)

    def center_id(self):
        return self.random_element(self.centers_id)

    def passenger_number(self):
        return self.random_element((2, 4, 7))

    def plate_city(self) -> list:
        city = self.random_element(self.city_codes)
        for center in self.centers_id:
            if center.startswith(city[0]):
                city.append(center)
                break
        return city

    base_lengths = [
        2.425,
        2.400,
        2.385,
        2.455,
        2.405,
    ]

    def valid_period(self):
        return self.random_element((12, 18, 24, 30))

    def car_spec(self):
        car = self.random_element(self.cars)
        temp = {key: car[idx] for idx, key in enumerate(self.car_headers)}
        temp["base_length"] = self.random_element(self.base_lengths)
        return temp


factory.Faker.add_provider(Provider)


def inch2mm(inch):
    return math.floor(float(inch) * 25.4)


class CarRegistry:
    def __init__(
        self,
        car_spec,
        city,
        unique_num,
        vin,
        engine_number,
        least_recently_registered,
        valid_period,
        center_registered,
        register_number,
        bill_number,
    ) -> None:
        self.manufacturer = car_spec["manufacturer"]
        self.model = car_spec["model"]
        self.carbody = car_spec["carbody"]
        carlength = inch2mm(car_spec["carlength"])
        carwidth = inch2mm(car_spec["carwidth"])
        carheight = inch2mm(car_spec["carheight"])
        self.size = [carlength, carwidth, carheight]
        self.fueltype = car_spec["fueltype"]
        self.city = city[1]
        district = rstr.xeger(r"[A-Z]")
        self.plate = f"{city[0]}{district} - {unique_num}"
        self.vin = vin
        self.engine_number = engine_number
        self.least_recently_registered = least_recently_registered.strftime(
            "%-d/%-m/%Y"
        )
        self.invalidate_date = (
            least_recently_registered
            + relativedelta(years=int(valid_period / 12), months=valid_period % 12)
        ).strftime("%-d/%-m/%Y")
        self.center_registered = center_registered
        self.register_number = register_number
        self.bill_number = bill_number


class CarRegistryFactory(factory.Factory):
    class Meta:
        model = CarRegistry

    car_id = factory.Sequence(lambda n: f"c-{factory.Faker('uuid4')}")
    car_spec = factory.Faker("car_spec")

    city = factory.Faker("plate_city")
    unique_num = factory.Sequence(lambda n: rstr.xeger(r"[0-9]{5}"))
    vin = factory.Sequence(lambda n: rstr.xeger(r"[A-Z]{12}[0-9]{5}"))
    engine_number = factory.Sequence(lambda n: rstr.xeger(r"[A-Z]{7}[0-9]{5}"))
    least_recently_registered = factory.fuzzy.FuzzyDate(
        datetime.date(2019, 1, 1), datetime.date(2022, 12, 31)
    )
    valid_period = factory.Faker("valid_period")
    center_registered = factory.Faker("center_id")
    # e.g:  DA-0865931
    register_number = factory.Sequence(lambda n: rstr.xeger(r"[A-Z]{2}-[0-9]{7}"))
    # e.g: 	BH-22T/0007095
    bill_number = factory.Sequence(
        lambda n: rstr.xeger(r"[A-Z]{2}-[0-9]{2}[A-Z]/[0-9]{7}")
    )
