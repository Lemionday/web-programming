from company import Provider as CompanyProvider
from name import Provider as NameProvider
from address import Provider as AddressProvider
from faker import Faker
import json

fake = Faker()
fake.add_provider(CompanyProvider)
fake.add_provider(AddressProvider)
fake.add_provider(NameProvider)
companies = []
for i in range(10):
    companies.append({
        "name": fake.company(),
        "type": 1,
        "office_address": fake.address(),
        "legal representative": fake.name(),
    })
    # print(fake.company())

with open("company.json", "w", encoding="utf8") as outFile:
    json.dump(companies, outFile, indent=4, ensure_ascii=False)
# for i in range(100):
#     print(fake.name())
