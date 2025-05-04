import joblib
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor

# Create a mock region encoder
regions = ['Tamil Nadu', 'Uttar Pradesh', 'Karnataka', 'Maharashtra', 'Gujarat']
region_encoder = LabelEncoder()
region_encoder.fit(regions)
joblib.dump(region_encoder, 'region_encoder.pkl')

# Create a mock model
model = RandomForestRegressor(n_estimators=10, random_state=42)
# Train with some dummy data
X = np.random.rand(100, 7)  # 7 features: region_encoded + 6 months
y = np.random.rand(100) * 200  # Random rainfall values
model.fit(X, y)
joblib.dump(model, 'july_rainfall_model.pkl')

print("Mock model files created successfully!") 