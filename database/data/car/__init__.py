from faker_vehicle import VehicleProvider
import rstr
import csv
import json

class Provider(VehicleProvider):
    def __init__(self, generator) -> None:
        super().__init__(generator)
        with open("car/car_list.csv") as inFile:
            csv_reader = csv.reader(inFile, delimiter=',')
            self.header = next(csv_reader, [])
            temp = {self.header[i]: i for i in range(len(self.header))}
            self.header = temp
            self.cars = tuple(line for line in csv_reader)

        with open("center/id.csv") as inFile:
            csv_reader = csv.reader(inFile, delimiter=";")
            self.centers_id = tuple( id[0] for id in csv_reader )
    
    rm_headers = ["car_ID", "citympg", "highwaympg", "price"]

    vin_format = r"[0-9A-Z]{17}"
    def vehicle_vin(self):
        return rstr.xeger(self.vin_format)

    def engine_number(self):
        return rstr.xeger(r"[0-9A-Z]{7}")

    def vehicle(self):
        return self.random_element(self.cars)

    def fueltype(self):
        return self.random_element(self.cars)[self.header["fueltype"]]

    def center_id(self):
        return self.random_element(self.centers_id)

    def car_spec(self):
        car = self.random_element(self.cars)
        temp = {key: car[self.header[key]] for key in self.header.keys()}
        for key in self.rm_headers:
            temp.pop(key)
        return temp