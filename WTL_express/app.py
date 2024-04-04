# from flask import Flask, request, jsonify
# import test
# import train
# import tensorflow as tf
# from flask_cors import CORS
# from flask import url_for,request,redirect,session,jsonify,url_for
# from flask import render_template
# app = Flask(__name__)
# CORS(app)
# app.secret_key="ruchi"
# model = tf.keras.models.load_model('chatbot_model.model')
# model_file_path = 'chatbot_model.model'

# @app.route('/chatbot', methods=['GET','POST'])
# def chatbot():
#     if request.method == "POST":
#         user_message = request.form.get('message', '')
#         response = test.predict_response(user_message)
#         print(response)
#         return jsonify({'response': response})
#     else:
#         session['referrer_url'] = request.referrer
#         return render_template('chatbotwindow.html')

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify, render_template
import test
import tensorflow as tf
from flask_cors import CORS
from flask import url_for,request,redirect,session,jsonify,url_for

app = Flask(__name__)
CORS(app)
app.secret_key = "ruchi"

# Load the pre-trained model
model = tf.keras.models.load_model('chatbot_model.model')

@app.route('/chatbot', methods=['POST'])
def chatbot():
    if request.method == "POST":
        # Get the user message from the request data
        user_message = request.form.get('message', '')

        # Validate user input
        if not user_message:
            return jsonify({'response': 'Please provide a message.'}), 400

        try:
            # Predict the response using the model
            response = test.predict_response(user_message)
            return jsonify({'response': response}), 200
        except Exception as e:
            return jsonify({'response': f'Error: {str(e)}'}), 500

@app.route('/',methods=['POST','GET'])
def chatbot_window():
    # Store the referrer URL in the session
    session['referrer_url'] = request.referrer
    return render_template('chatwindow.html')

if __name__ == '__main__':
    app.run(debug=True)
