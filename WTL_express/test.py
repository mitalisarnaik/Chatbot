import random
import json
import pickle
import numpy as np

import nltk
from nltk.stem import WordNetLemmatizer
# import tensorflow.python.keras as keras
# from keras.models import load_model
import tensorflow as tf
# import tensorflow.keras as keras
# from tensorflow.keras.models import Sequential, Model
nltk.download('punkt')
nltk.download('wordnet')

lemmatizer = WordNetLemmatizer()
intents = json.loads(open('intents.json').read())

words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = tf.keras.models.load_model('chatbot_model.model')
model_file_path = 'chatbot_model.model'

def sentenceCleanUp(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    return sentence_words

def bagOfWords(sentence):
    sentence_words = sentenceCleanUp(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word==w:
                bag[i] = 1
    return np.array(bag)

def predictClass(sentence):
    bow = bagOfWords(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})

    return return_list

def getResponse(intents_list, intents_json):
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result
def predict_response(message):
    ints = predictClass(message)
    res = getResponse(ints, intents)
    return res

print("Chatbot is running!")

