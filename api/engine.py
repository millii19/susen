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


from pandas import DataFrame

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
    pass

# solar Wh production per qm of panel


def solar_wattage(radiation, stype):

    return radiation * solar_dir_dict.get('south', 0.5) * solar_type_dict.get(stype, 0.15)

# wind Wh production per turbine


def wind_wattage(windspeed, wtype):

    return wind_type_dict[wtype](windspeed) * 1000


# returns meteorological data for the last year
def load_data(location,from_date,to_date):
    res = requests.get(
        f'https://dataset.api.hub.zamg.ac.at/v1/timeseries/historical/inca-v1-1h-1km?parameters=GL,UU,VV,T2M&start={from_date.isoformat()}&end={to_date.isoformat()}&lat={location[0]}&lon={location[1]}')
    if not 200 <= res.status_code < 300:
        raise Exception(res.content)
    json_data = res.json()
    daily = list(zip(json_data['timestamps'], json_data['features'][0]['properties']['parameters']['GL']['data'], json_data['features']
                 [0]['properties']['parameters']['UU']['data'], json_data['features'][0]['properties']['parameters']['VV']['data']))
    data = DataFrame([dict(timestamp=datetime.datetime.fromisoformat(day[0]), gl=day[1],
                           windspeed=math.sqrt(day[2]*day[2] + day[3]*day[3])) for day in daily])
    
    return data


def unit_output(raw_data):
    stupid_pandas = [pandas.Series(raw_data['timestamp']),
                     pandas.Series([wind_wattage(dat, 'small') for dat in raw_data['windspeed']]),
                     pandas.Series([wind_wattage(dat, 'medium') for dat in raw_data['windspeed']]),
                     pandas.Series([wind_wattage(dat, 'large') for dat in raw_data['windspeed']]),
                     pandas.Series([solar_wattage(dat, 'mono') for dat in raw_data['gl']]),
                     pandas.Series([solar_wattage(dat, 'poly') for dat in raw_data['gl']])]
    headers = ['timestamp','small', 'medium', 'large', 'mono', 'poly']
    production_data = pandas.concat(stupid_pandas, axis=1, keys=headers)
    return production_data

def aggregate_monthly(raw_data):
    raw_data['date'] = [stamp.date() for stamp in raw_data.timestamp]
    raw_data['month'] = [datetime.date(
        year=date.year, month=date.month, day=1) for date in raw_data.date]

    data = raw_data.groupby('month', as_index=False).sum()
    
    return data



def total_output(unit_data,budget):
    
    #obvious data transformation
    aggr_dict = {param: functools.partial(operator.mul,math.floor(budget/unit_cost_dict[param])) for param in [car for car in unit_data.keys() if car != 'timestamp']}
    total = unit_data.aggregate(aggr_dict)
    total['timestamp'] = unit_data.timestamp
    return total


if __name__ == "__main__":
    # end of last month
    end = datetime.datetime.combine(date=datetime.date.today(
    ) - datetime.timedelta(datetime.date.today().day), time=datetime.time(hour=23))
    # a "year" before that
    start = end - datetime.timedelta(days=365) + datetime.timedelta(hours=1)
    start = start - datetime.timedelta(start.day-1)
    raw_data = load_data((47.5, 16.5),start,end)
    #production of Wh per unit of powerplant
    unit_data = unit_output(raw_data)
    #production of Wh with full budget
    total_data = total_output(unit_data,10*1000*1000)
    monthly_data = aggregate_monthly(total_data)
    # amounts units
    # total cost
    # break-even-point => linear anschaffungskosten/(revenue + ersparnis (pro jahr))

    # per month per type:
    # total kWh
    # CO2_saved
    # revenue = einspeisstarif * (1-usage) * kWh
    # ersparnis durch eigennutzung = 0.7 * kWh * usage

    #sum



