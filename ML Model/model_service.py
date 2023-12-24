from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import re

app = Flask(__name__)
CORS(app)

# Load your trained model
model = joblib.load('password_strength_model.joblib')


def extract_features(password):
    features = {
        'length': len(password),
        'num_uppercase': sum(1 for c in password if c.isupper()),
        'num_lowercase': sum(1 for c in password if c.islower()),
        'num_numbers': sum(1 for c in password if c.isdigit()),
        'num_special_chars': len(re.findall(r'\W', password))
    }
    return np.array([list(features.values())])


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    password = data['password']

    # Extract features from the password
    features = extract_features(password)

    # Make a prediction using the extracted features
    prediction = model.predict(features)

    # Create a JSON response containing the prediction
    response = jsonify({'strength': int(prediction[0])})

    print(response)  # Printing the response to the console (for debugging purposes)

    return response


if __name__ == '__main__':
    app.run(debug=True, port=5001)
