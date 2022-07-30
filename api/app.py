import connexion
import logging



def get_status():
    return {
        "version": "0.0.1-peta_1.3.44"
    }

logging.basicConfig(level=logging.INFO)
app = connexion.App(__name__, specification_dir='docs/')
app.add_api("v1.yml")


if __name__ == '__main__':
    app.run(port=8080)