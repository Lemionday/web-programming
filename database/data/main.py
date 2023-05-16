from company import Provider as CompanyProvider
from name import Provider as NameProvider
from address import Provider as AddressProvider
from faker import Faker

# from faker_vehicle import VehicleProvider
from car import Provider as VehicleProvider
import random
import json
from person import PersonFactory
from car import CarRegistryFactory

fake = Faker()
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

carRegistry = CarRegistryFactory()
print(json.dumps(carRegistry.__dict__, ensure_ascii=False, indent=4))
