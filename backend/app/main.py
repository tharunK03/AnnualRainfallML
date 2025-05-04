from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
from typing import List, Dict
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Generate sample data
def generate_sample_data():
    # List of states/regions
    states = [
        "Tamil Nadu", "Uttar Pradesh", "Karnataka", "Maharashtra", "Gujarat",
        "West Bengal", "Rajasthan", "Madhya Pradesh", "Bihar", "Andhra Pradesh",
        "Telangana", "Kerala", "Odisha", "Punjab", "Haryana"
    ]
    
    # Generate data for years 1901-2015
    years = range(1901, 2016)
    
    # Create empty lists to store data
    data = []
    
    for year in years:
        for state in states:
            # Generate random monthly rainfall data
            monthly_rainfall = np.random.normal(100, 30, 12)  # Mean 100mm, std 30mm
            monthly_rainfall = np.clip(monthly_rainfall, 0, None)  # Ensure non-negative
            
            # Calculate annual total
            annual = np.sum(monthly_rainfall)
            
            # Create row data
            row = {
                'SUBDIVISION': state,
                'YEAR': year,
                'JAN': monthly_rainfall[0],
                'FEB': monthly_rainfall[1],
                'MAR': monthly_rainfall[2],
                'APR': monthly_rainfall[3],
                'MAY': monthly_rainfall[4],
                'JUN': monthly_rainfall[5],
                'JUL': monthly_rainfall[6],
                'AUG': monthly_rainfall[7],
                'SEP': monthly_rainfall[8],
                'OCT': monthly_rainfall[9],
                'NOV': monthly_rainfall[10],
                'DEC': monthly_rainfall[11],
                'ANNUAL': annual
            }
            data.append(row)
    
    return pd.DataFrame(data)

# Generate and load the dataset
try:
    df = generate_sample_data()
except Exception as e:
    raise Exception(f"Error generating dataset: {str(e)}")

# Train the prediction model
def train_model():
    # Prepare features and target
    X = df[['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN']].values
    y = df['JUL'].values
    
    # Train RandomForest model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    return model

# Create region encoder
def create_region_encoder():
    encoder = LabelEncoder()
    encoder.fit(df['SUBDIVISION'].unique())
    return encoder

# Initialize model and encoder
model = train_model()
region_encoder = create_region_encoder()

class RainfallInput(BaseModel):
    region: str
    jan: float
    feb: float
    mar: float
    apr: float
    may: float
    jun: float

class YearRangeInput(BaseModel):
    start_year: int
    end_year: int

@app.post("/predict")
async def predict_rainfall(input_data: RainfallInput):
    try:
        # Encode the region
        region_encoded = region_encoder.transform([input_data.region])[0]
        
        # Prepare input features
        features = [
            input_data.jan,
            input_data.feb,
            input_data.mar,
            input_data.apr,
            input_data.may,
            input_data.jun
        ]
        
        # Make prediction
        prediction = model.predict([features])[0]
        
        return {"predicted_rainfall": float(prediction)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/country-trend")
async def get_country_trend(input_data: YearRangeInput):
    try:
        # Filter data for the given year range
        mask = (df['YEAR'] >= input_data.start_year) & (df['YEAR'] <= input_data.end_year)
        filtered_df = df[mask]
        
        # Calculate average annual rainfall for each subdivision
        avg_rainfall = filtered_df.groupby('SUBDIVISION')['ANNUAL'].mean().reset_index()
        avg_rainfall = avg_rainfall.sort_values('ANNUAL', ascending=False)
        
        # Convert to list of dictionaries
        result = [
            {"subdivision": row['SUBDIVISION'], "average_rainfall": float(row['ANNUAL'])}
            for _, row in avg_rainfall.iterrows()
        ]
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Rainfall Analysis API is running"} 



