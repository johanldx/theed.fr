from app import app
from config import Config

config = Config()

if __name__ == "__main__":
    app.run(debug=config.DEBUG)
