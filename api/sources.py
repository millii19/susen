import csv
import datetime
import math
import requests
from pandas import DataFrame

AUSTRIA_MODULE_ID = 8004170


def load_historical_energy_prices_hourly(from_date, to_date):
    """Loads historical electricity prices of Austria from www.smard.de"""

    def parse_hour(row):
        date_time_str = f"{row[0]}T{row[1]}"
        price = float(row[2].replace(",", "."))

        merged_date = datetime.datetime.strptime(
            date_time_str, "%d.%m.%YT%H:%M")

        return (merged_date, price)

    from_ts = math.floor(from_date.timestamp() * 1000)
    to_ts = math.floor(to_date.timestamp() * 1000)
    data = {
        "request_form": [
            {
                "format": "CSV",
                "moduleIds": [AUSTRIA_MODULE_ID],
                "region": "AT",
                "timestamp_from": from_ts,
                "timestamp_to": to_ts,
                "type": "discrete",
                "language": "de",
            }
        ]
    }

    res = requests.post(
        "https://www.smard.de/nip-download-manager/nip/download/market-data", json=data
    )

    reader = csv.reader(res.text.splitlines(), delimiter=";")
    csv_data = list(reader)
    parsed = [parse_hour(row) for row in csv_data[1:]]  # skip header line
    return parsed


def load_meteorological_data_hourly(location, from_date, to_date):
    res = requests.get(
        f'https://dataset.api.hub.zamg.ac.at/v1/timeseries/historical/inca-v1-1h-1km?parameters=GL,UU,VV,T2M&start={from_date.isoformat()}&end={to_date.isoformat()}&lat={location[0]}&lon={location[1]}')
    if not 200 <= res.status_code < 300:
        raise Exception(res.content)
    json_data = res.json()
    daily = list(zip(json_data['timestamps'], json_data['features'][0]['properties']['parameters']['GL']['data'], json_data['features']
                 [0]['properties']['parameters']['UU']['data'], json_data['features'][0]['properties']['parameters']['VV']['data']))
    daily_frame = DataFrame(
        [dict(timestamp=datetime.datetime.fromisoformat(day[0]), gl=day[1], uu=day[2], vv=day[3]) for day in daily])

    daily_frame[['gl', 'uu', 'vv']].interpolate(inplace=True)
    daily_frame['windspeed'] = daily_frame.apply(parse_row, axis=1)

    # data = DataFrame([dict(timestamp=datetime.datetime.fromisoformat(day.timestamps), gl=day.GL,
    #   windspeed = math.sqrt(day.UU*day.UU + day.VV*day.VV)) for day in daily_frame])

    return daily_frame


def parse_row(row):
    return math.sqrt(row[2]*row[2]+row[3]*row[3])


if __name__ == "__main__":

    end = datetime.datetime.combine(date=datetime.date.today(
    ) - datetime.timedelta(datetime.date.today().day), time=datetime.time(hour=23))
    # a "year" before that
    start = end - datetime.timedelta(days=365) + datetime.timedelta(hours=1)
    start = start - datetime.timedelta(start.day-1)

    # Example for debugging:
    data = load_historical_energy_prices_hourly(
        start, end
    )

    data2 = load_meteorological_data_hourly(
        (48.2157796, 16.3699576),
        start, end)
