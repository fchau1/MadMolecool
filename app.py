from flask import Flask
from notebook_routes import notebook_routes
from chemcyclopedia_routes import chemcyclopedia_routes

app = Flask(__name__)

app.register_blueprint(notebook_routes)
app.register_blueprint(chemcyclopedia_routes)

if __name__ == '__main__':
    app.run(debug=True)