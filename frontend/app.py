from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Backend API URL
BACKEND_URL = os.getenv('BACKEND_URL', 'http://localhost:8001')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/country-trends')
def country_trends():
    return render_template('country_trends.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        response = requests.post(f"{BACKEND_URL}/predict", json=data)
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/historical-data', methods=['POST'])
def historical_data():
    try:
        data = request.json
        response = requests.post(f"{BACKEND_URL}/historical-data", json=data)
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/country-trends')
def get_country_trends():
    try:
        response = requests.get(f"{BACKEND_URL}/country-trends")
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001) 