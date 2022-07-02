from unicodedata import bidirectional
from flask import Flask, request, redirect, jsonify
from flask.helpers import send_from_directory
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import pytz
import json
from flask_marshmallow import Marshmallow
from flask_marshmallow.fields import fields
from models.town import TownsList

app = Flask(__name__, static_folder="./output", static_url_path="")
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://{user}:{password}@{host}/{db_name}?charset=utf8'.format(**{
      'user': "root",
      'password': "wagasyo2",
      'host': "localhost",
      'db_name': "test_db"
  })
# おまじない
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# dbの初期化
db = SQLAlchemy(app)


class BlogArticle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    body = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.now(pytz.timezone('Asia/Tokyo')))

# class TownsList(db.model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(50), nullable=False)
#     body = db.Column(db.String(500), nullable=False)
#     created_at = db.Column(db.DateTime, nullable=False,
#     default=datetime.now(pytz.timezone('Asia/Tokyo')


ma = Marshmallow()


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ("id", "title", "body", "created_at")


articles_schema = ArticleSchema(many=True)


@app.route("/api")
def true():
    return {
        "tutorial": "true eye"
    }


@app.route("/api_false")
def false():
    return {
        "tutorial": "false eye"
    }


@app.route("/blog")
def blog():

    jsonArray = []
    blogarticles = BlogArticle.query.all()
    blogsArray = articles_schema.dump(blogarticles)
    return {"blogs": blogsArray}
    # for article in blogarticles:
    #     articleData = json.loads(article)
    #     jsonArray.append(articleData)
    # return jsonify({"blogs": jsonArray})


@app.route('/create', methods=['GET', 'POST'])
def create():
    js = json.loads(request.data.decode('utf-8'))
    title = js.get("title")
    body = js.get("body")
    # BlogArticleのインスタンスを作成
    blogarticle = BlogArticle(title=title, body=body)
    db.session.add(blogarticle)
    db.session.commit()
    return {"result": "OK"}


@app.route('/', methods=['GET'])
def serve():
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run()
