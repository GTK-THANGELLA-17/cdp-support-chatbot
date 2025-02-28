from flask import Flask, render_template, request, jsonify
from datetime import datetime
from nlp_processor.processor import process_query

app = Flask(__name__)

# Predefined responses for basic questions
basic_responses = {
    "hello": "Hello! How can I assist you today?",
    "hi": "Hi there! How can I help?",
    "who are you": "I am a chatbot that answers questions about CDPs like Segment, mParticle, Lytics, and Zeotap.",
    "what can you do": "I can help you with CDP-related queries! Ask me about Segment, mParticle, Lytics, or Zeotap.",
    "date": f"Today's date is {datetime.now().strftime('%Y-%m-%d')}.",
    "time": f"The current time is {datetime.now().strftime('%H:%M:%S')}.",
}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    user_query = request.form.get("query").lower()

    # Check if it's a basic question
    for key in basic_responses:
        if key in user_query:
            return jsonify({"response": basic_responses[key]})

    # Process CDP-related query using NLP (or another method like querying a database, etc.)
    response = process_query(user_query)

    # If the response contains an error or no relevant information, send a default documentation message
    if "error" in response or "response" not in response:
        response["response"] = "🤖 I couldn't find that in the documentation. Please check the official docs."
        response["documentation"] = """
        You can refer to these sources for more information:
        <ul>
            <li><a href="https://segment.com/docs/">Segment Documentation</a></li>
            <li><a href="https://www.mparticle.com/developers/">mParticle Documentation</a></li>
            <li><a href="https://www.lytics.com/docs/">Lytics Documentation</a></li>
            <li><a href="https://www.zeotap.com/resources">Zeotap Documentation</a></li>
        </ul>
        """
    
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
