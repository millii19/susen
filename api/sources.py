import csv
import datetime
import math
import requests


AUSTRIA_MODULE_ID = 8004170


def load_historical_energy_prices_hourly(from_date, to_date):
    """Loads historical electricity prices of Austria from www.smard.de"""

    def parse_hour(row):
        date_time_str = f"{row[0]}T{row[1]}"
        price = float(row[2].replace(",", "."))

        merged_date = datetime.datetime.strptime(date_time_str, "%d.%m.%YT%H:%M")

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


if __name__ == "__main__":
    # Example for debugging:
    data = load_historical_energy_prices_hourly(
        datetime.datetime(year=2022, month=1, day=1),
        datetime.datetime(year=2022, month=6, day=30),
    )
