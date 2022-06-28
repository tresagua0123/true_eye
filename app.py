from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__)

CORS(
    app,
    supports_credentials=True
)


@app.route("/api")
@cross_origin()
def index():
    return {
        "tutorial": "true eye"
    }


@app.route('/')
@cross_origin()
def serve():
    return {
        "serve": "The first page"
    }
# def serve():
#     # return {
#     #     "indexPage": "Here is the index"
#     # }
#     # return send_from_directory(app.static_folder, "index.html")
#     # return send_from_directory(app.static_folder, "index.html")
#     return app.send_static_file("index.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
