from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from flask import Flask, request
from flask_cors import CORS
import os
import logging
import sys
from llama_index import GPTListIndex, SimpleDirectoryReader
from IPython.display import Markdown, display

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
     
    file = request.files['file']
    user_text = request.form.get('userText')
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        # save the content of the file to "usertext.txt"
        with open('data/usertext.txt', 'w', encoding='utf-8') as f:
            f.write(file.read().decode('utf-8'))
        
        # return jsonify({'message': 'File upload successful'}), 200
    
        os.environ['OPENAI_API_KEY'] = "YOUR_API_KEY"

        logging.basicConfig(stream=sys.stdout, level=logging.INFO)
        logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))

        documents = SimpleDirectoryReader('data').load_data()
        print(documents)

        new_index = GPTListIndex.from_documents(documents)

        prompt = user_text
        print(prompt)

        query_engine = new_index.as_query_engine()
        # userquery = "Create a 300 word blog for a beginner"
        response = query_engine.query(prompt)

        display(Markdown(f"<b>{response}</b>"))
        print(response)
        return {"response": response}, 200


if __name__ == '__main__':
    app.run(port=5000)
