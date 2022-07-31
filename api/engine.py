# location, qm, solardir, cost?, usagequota
# all sind/solar types
# fix last year

# returns
# CO2 delta
# break even point forecast
# einspeissmenge
import datetime
import json
import requests
import math
import pandas
import functools
import operator
import sources

from pandas import DataFrame

CO2_SAVINGS_FACTOR = 77.352

solar_dir_dict = dict(south=1, south_east=0.95, south_west=0.95, east=0.9, west=0.9,
                      vertical_south=0.7, vertical_east=0.5, vertical_west=0.5, horizontal=0.93)

solar_type_dict = dict(mono=0.25, poly=0.15)


def sw5_calc(windspeed):
    if windspeed < 3:
        return 0
    if windspeed > 13:
        return 5.5
    return (windspeed-3)*5.5/10


def sw10_calc(windspeed):
    if windspeed < 3:
        return 0
    if windspeed > 13:
        return 10
    return (windspeed-3)


def multibrid_calc(windspeed):
    if windspeed < 3:
        return 0
    if windspeed > 13:
        return 5000
    return (windspeed-3)*5000/10


wind_type_dict = dict(small=sw5_calc, medium=sw10_calc, large=multibrid_calc)

unit_cost_dict = dict(mono=550, poly=300, small=25000,
                      medium=50000, large=7*1000*1000)


def calculate(location, usage_quota, budget):
    end = datetime.datetime.combine(date=datetime.date.today(
    ) - datetime.timedelta(datetime.date.today().day), time=datetime.time(hour=23))
    # a "year" before that
    start = end - datetime.timedelta(days=365) + datetime.timedelta(hours=1)
    start = start - datetime.timedelta(start.day-1)


    raw_data = sources.load_meteorological_data_hourly(location, start, end)
    # production of Wh per unit of powerplant
    unit_data = unit_output(raw_data)
    # production of Wh with full budget
    total_data = total_output(unit_data, budget)
    #total_data['co2_impact'] = total_data * 77.352
    monthly_data = aggregate_monthly(total_data)

    return jsonify_response_data(total_data, budget,usage_quota,start,end)
    
    

# solar Wh production per qm of panel


def solar_wattage(radiation, stype):

    return radiation * solar_dir_dict.get('south', 0.5) * solar_type_dict.get(stype, 0.15)

# wind Wh production per turbine


def wind_wattage(windspeed, wtype):

    return wind_type_dict[wtype](windspeed) * 1000


def unit_output(raw_data):
    stupid_pandas = [pandas.Series(raw_data['timestamp']),
                     pandas.Series([wind_wattage(dat, 'small')
                                   for dat in raw_data['windspeed']]),
                     pandas.Series([wind_wattage(dat, 'medium')
                                   for dat in raw_data['windspeed']]),
                     pandas.Series([wind_wattage(dat, 'large')
                                   for dat in raw_data['windspeed']]),
                     pandas.Series([solar_wattage(dat, 'mono')
                                   for dat in raw_data['gl']]),
                     pandas.Series([solar_wattage(dat, 'poly') for dat in raw_data['gl']])]
    headers = ['timestamp', 'small', 'medium', 'large', 'mono', 'poly']
    production_data = pandas.concat(stupid_pandas, axis=1, keys=headers)
    return production_data


def aggregate_monthly(raw_data):
    raw_data['date'] = [stamp.date() for stamp in raw_data.timestamp]
    raw_data['month'] = [datetime.date(
        year=date.year, month=date.month, day=1) for date in raw_data.date]

    data = raw_data.groupby('month', as_index=False).sum()

    return data


def total_output(unit_data, budget):

    # obvious data transformation
    aggr_dict = {param: functools.partial(operator.mul, math.floor(
        budget/unit_cost_dict[param])) for param in [car for car in unit_data.keys() if car != 'timestamp']}
    total = unit_data.aggregate(aggr_dict)
    total['timestamp'] = unit_data.timestamp
    return total


def jsonify_response_data(total_data, budget, usage, from_date, to_date):

    energy_prices = DataFrame(sources.load_historical_energy_prices_hourly(from_date, to_date))
    energy_data = total_data
    for param in ['small','medium','large','mono','poly']:
        energy_data[param] = total_data[param]*energy_prices[1]
    #energy_data['mono'] = energy_prices

    monthly_data = aggregate_monthly(total_data)
    monthly_energy = aggregate_monthly(energy_data)
    response_json = [dict(amount=math.floor(budget/unit_cost_dict[param]),
                          amountUnit= 'sqm' if param == 'mono' or param == 'poly' else 'pcs',  # sqm,pcs
                          total_cost=math.floor(budget/unit_cost_dict[param]) * unit_cost_dict[param],
                          breakEvenPoint=5, #TODO # float years
                          production=[monthly_data.get(param)/1000],  # array of kWh
                          co2saved=[monthly_data.get(param)/1000 * CO2_SAVINGS_FACTOR],  # array of g/kWh
                          # array of production * inputtariff * (1-usage)
                          revenue=[monthly_data.get(param) / 1000 * ( 18.12 if param == 'mono' or param == 'poly' else 9.34) * (1-usage)],
                          # array of production * tariff * usage
                          savings=[monthly_data.get(param) * monthly_energy.get(param) / 1000 * usage],
                          type= 'solar' if param == 'mono' or param == 'poly' else 'wind',  # solar, wind
                          subType= f'{param}chrystalline' if param == 'mono' or param == 'poly' else param  # monocrystalline, polychristalline, small, medium, large
                          ) for param in unit_data.keys() if param != 'timestamp']

    response_json.breakEvenPoint
    


if __name__ == "__main__":
    # end of last month
    end = datetime.datetime.combine(date=datetime.date.today(
    ) - datetime.timedelta(datetime.date.today().day), time=datetime.time(hour=23))
    # a "year" before that
    start = end - datetime.timedelta(days=365) + datetime.timedelta(hours=1)
    start = start - datetime.timedelta(start.day-1)
    raw_data = sources.load_meteorological_data_hourly(
        (47.5, 16.5), start, end)
    # production of Wh per unit of powerplant
    unit_data = unit_output(raw_data)
    # production of Wh with full budget
    total_data = total_output(unit_data, 10*1000*1000)
    #total_data['co2_impact'] = total_data * 77.352
    monthly_data = aggregate_monthly(total_data)

    jsonify_response_data(total_data, 10*1000*1000,0.7,start,end)
    # amounts units
    # total cost
    # break-even-point => linear anschaffungskosten/(revenue + ersparnis (pro jahr))

    # per month per type:
    # total kWh
    # CO2_saved
    # revenue = einspeisstarif * (1-usage) * kWh
    # ersparnis durch eigennutzung = 0.7 * kWh * usage

    # sum
