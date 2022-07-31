import connexion
import logging
import os
import engine

app = connexion.App(__name__, specification_dir="docs/")
log_level = (
    logging.DEBUG if os.environ.get("FLASK_ENV") == "development" else logging.INFO
)
logging.basicConfig(level=log_level)


def get_status():
    return {"version": "0.0.1-peta_1.3.44"}


def simulate(budget, usage_quota, latitude, longitude):
    logging.debug(
        f"Budget: {budget} ({type(budget)}); Latitude: {latitude} ({type(latitude)}); "
        f"Longitude: {longitude} ({type(longitude)}); UsageQuota: {usage_quota}, ({type(usage_quota)})"
    )
    return engine.calculate((latitude, longitude), usage_quota, budget)


app.add_api("v1.yml")

if __name__ == "__main__":
    app.run(port=8080)
