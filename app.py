from flask import Flask
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder="./output", static_url_path="")

CORS(app)


@app.route("/api")
@cross_origin()
def true():
    return {
        "tutorial": "true eye"
    }


@app.route("/api_false")
@cross_origin()
def false():
    return {
        "tutorial": "false eye"
    }


@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, "index.html")
# def serve():
#     # return {
#     #     "indexPage": "Here is the index"
#     # }
#     # return send_from_directory(app.static_folder, "index.html")
#     # return send_from_directory(app.static_folder, "index.html")
#     return app.send_static_file("index.html")


if __name__ == "__main__":
    app.run()
