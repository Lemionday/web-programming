import random
from company import CompanyFactory
from faker import Faker
from avatar import generate_avatar
import datetime

import json
from person import PersonFactory
from car import CarRegistryFactory
from account import AccountFactory, Account

fake = Faker()
Faker.seed(0)
# companies = []
# for i in range(10):
#     companies.append({
#         "name": fake.company(),
#         "type": 1,
#         "office_address": fake.address(),
#         "legal representative": fake.name(),
#     })

#     for i in range(random.randint(20)):
#         fake.vehicle_object()

#     # print(fake.company())

# with open("company.json", "w", encoding="utf8") as outFile:
#     json.dump(companies, outFile, indent=4, ensure_ascii=False)
# for i in range(100):
#     print(fake.name())

# for i in range(100):
#     print(fake.unique.vehicle_vin())
#     print(fake.fueltype())

# for i in range(10):
#     city = fake.plate_city()
#     id = {
#         "registered_center": city[-1],
#         "city": city[1],
#         "_id": f"{city[0]}{fake.random_uppercase_letter()} - {fake.unique.plate_number()}",
#         "vin": fake.unique.vehicle_vin(),
#         "engine_number": fake.unique.engine_number(),
#         "center_id": fake.center_id(),
#     }
#     print(json.dumps({**fake.car_spec(), **id}, indent=4))

# person = PersonFactory()
# print(json.dumps(person.__dict__, ensure_ascii=False, indent=4))

# for i in range(2):
#     # carRegistry = CarRegistryFactory()
#     # print(json.dumps(carRegistry.__dict__, ensure_ascii=False, indent=4))
#     company = CompanyFactory()
#     print(json.dumps(company.__dict__, indent=4, ensure_ascii=False))
personalUsages = ["Đi lại cá nhân", "Dịch vụ chở khách", "Cho thuê"]
companyUsages = [
    "Dịch vụ chở khách",
    "Dịch vụ chở khách cao cấp",
    "Dịch vụ du lịch",
    "Đưa đón nhân viên",
    "Cho thuê làm dịch vụ vận tải",
]


def generate(
    people_number: int,
    company_number: int,
    cars_per_person: int,
    max_cars_per_company: int,
    min_cars_per_company: int,
):
    people = []
    companies = []
    cars = []
    for _ in range(people_number):
        person = PersonFactory()
        for _ in range(fake.pyint(min_value=0, max_value=cars_per_person)):
            car = CarRegistryFactory()
            car.add_owner_id(person.ssn)
            car.add_usage(random.choice(personalUsages))
            cars.append(car.__dict__)
            person.add_car(car.plate)
        people.append(person.__dict__)

    for _ in range(company_number):
        company = CompanyFactory()
        for _ in range(
            fake.pyint(min_value=min_cars_per_company, max_value=max_cars_per_company)
        ):
            car = CarRegistryFactory()
            car.add_owner_id(company.id)
            car.add_usage(random.choice(companyUsages))
            cars.append(car.__dict__)
            company.add_car(car.plate)
        companies.append(company.__dict__)

    return people, companies, cars


def generate_and_write():
    people_number = 50000
    companies_number = 1000
    cars_per_person = 2
    max_cars_per_company = 10
    min_cars_per_company = 5
    people, companies, cars = generate(
        people_number,
        companies_number,
        cars_per_person,
        max_cars_per_company,
        min_cars_per_company,
    )
    with open("final/companies.json", "w+") as companyFile:
        json.dump(companies, companyFile, ensure_ascii=False, indent=4)

    with open("final/people.json", "w+") as peopleFile:
        json.dump(people, peopleFile, ensure_ascii=False, indent=4)

    with open("final/cars.json", "w+") as carsFile:
        json.dump(cars, carsFile, ensure_ascii=False, indent=4)


def generateAccounts():
    accounts = [
        Account(
            "adminTester",
            "1234567890",
            3,
            "admin",
            avatar=0,
            hired_date=datetime.date(2000, 11, 1),
        ).__dict__,
        Account(
            "tester2",
            "1234567890",
            2,
            "1000V",
            avatar=0,
            hired_date=datetime.date(2000, 11, 1),
        ).__dict__,
        Account(
            "tester1",
            "1234567890",
            1,
            "1501V",
            avatar=0,
            hired_date=datetime.date(2000, 11, 1),
        ).__dict__,
    ]
    for _ in range(1000):
        account = AccountFactory()
        accounts.append(account.__dict__)

    with open("final/accounts.json", "w+") as accountsFile:
        json.dump(accounts, accountsFile, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    generateAccounts()
    generate_avatar()
    generate_and_write()
