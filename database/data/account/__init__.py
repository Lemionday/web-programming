import factory
import factory.fuzzy
import rstr
from car import Provider as CarProvider
from faker.providers import BaseProvider
from collections import OrderedDict
import datetime


class RoleProvider(BaseProvider):
    def role(self):
        return self.random_elements(
            OrderedDict([(1, 0.97), (2, 0.02), (3, 0.01)]), length=1, use_weighting=True
        )[0]


factory.Faker.add_provider(CarProvider)
factory.Faker.add_provider(RoleProvider)


class Account:
    def __init__(self, username, password, role, center, hired_date, avatar):
        self.username = username
        self.avatar = avatar
        self.password = password
        self.role = role
        self.center = center
        self.hired_date = hired_date.strftime("%Y-%m-%d")
        if role == 2:
            self.center = "1000V"


class AccountFactory(factory.Factory):
    class Meta:
        model = Account

    avatar = factory.fuzzy.FuzzyInteger(low=1, high=99)
    username = factory.Sequence(lambda n: rstr.xeger(r"[a-z]{10}"))
    password = factory.fuzzy.FuzzyText()
    role = factory.Faker("role")
    center = factory.Faker("center_id")
    hired_date = factory.fuzzy.FuzzyDate(
        datetime.date(2018, 1, 1), datetime.date(2020, 12, 31)
    )
