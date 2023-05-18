from company import CompanyFactory
from faker import Faker
import json
from person import PersonFactory
from car import CarRegistryFactory

fake = Faker()
Faker.seed(0)


def generateData(
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
    people, companies, cars = generateData(
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
