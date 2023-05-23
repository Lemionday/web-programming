import factory
import factory.fuzzy
import rstr
from car import Provider as CarProvider
from faker.providers import BaseProvider
from collections import OrderedDict


class RoleProvider(BaseProvider):
    def role(self):
        return self.random_elements(
            OrderedDict([(1, 0.97), (2, 0.02), (3, 0.01)]), length=1, use_weighting=True
        )[0]


factory.Faker.add_provider(CarProvider)
factory.Faker.add_provider(RoleProvider)


class Account:
    def __init__(self, username, password, role, center):
        self.username = username
        self.password = password
        self.role = role
        self.center = center
        if role == 2:
            self.center = "1000V"


class AccountFactory(factory.Factory):
    class Meta:
        model = Account

    username = factory.Sequence(lambda n: rstr.xeger(r"[a-z]{10}"))
    password = factory.fuzzy.FuzzyText()
    role = factory.Faker("role")
    center = factory.Faker("center_id")
