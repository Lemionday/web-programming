from company import Provider as CompanyProvider
from company import CompanyFactory
from name import Provider as NameProvider
from address import Provider as AddressProvider
from faker import Faker

# from faker_vehicle import VehicleProvider
from car import Provider as VehicleProvider
import random
from random import randrange
import json
from person import PersonFactory
from car import CarRegistryFactory

fake = Faker()
Faker.seed(0)
fake.add_provider(CompanyProvider)
fake.add_provider(AddressProvider)
fake.add_provider(NameProvider)
fake.add_provider(VehicleProvider)
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
        people.append(person.__dict__)
        for _ in range(fake.pyint(min_value=0, max_value=cars_per_person)):
            car = CarRegistryFactory()
            car.add_owner_id(person.id)
            cars.append(car.__dict__)

    for _ in range(company_number):
        company = CompanyFactory()
        companies.append(company.__dict__)
        for _ in range(
            fake.pyint(min_value=min_cars_per_company, max_value=max_cars_per_company)
        ):
            car = CarRegistryFactory()
            car.add_owner_id(company.id)
            cars.append(car.__dict__)

    return people, companies, cars


if __name__ == "__main__":
    people_number = 100
    companies_number = 50
    cars_per_person = 3
    max_cars_per_company = 20
    min_cars_per_company = 10
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
