# CDP Support Chatbot

## Project Overview

The **CDP Support Chatbot** is a web-based application designed to assist users with "how-to" questions related to four major Customer Data Platforms (CDPs): **Segment**, **mParticle**, **Lytics**, and **Zeotap**. It extracts relevant information from official documentation and provides instant, accurate responses. The chatbot also supports voice input (speech recognition), dark/light mode switching, and dynamic error handling for enhanced user experience.

### Key Features

- **Real-Time Responses**: 
  The chatbot uses a Flask backend to process queries and return relevant documentation snippets or pre-defined responses.

- **Modern & Responsive UI**:
  Built using **Bootstrap 5** and custom CSS, the UI features:
  - Floating chat icon at the bottom-right corner.
  - A chatbot widget with smooth animations and a typing indicator.
  - Clean design with dark/light mode toggling.
  - Integration of **Font Awesome** icons for a polished look.

- **Enhanced UX**:
  - Speech recognition allows users to input queries by voice.
  - Pre-defined responses for basic questions like "Hello", "Who are you?", and "What time is it?".
  - If a query does not match any documentation snippet, the chatbot provides links to the official documentation for further reference.

- **Bonus Features**:
  - Smooth UI transitions and fade-in animations.
  - Dark mode preference saved via **localStorage**.
  - Footer with additional information and links.

## Tech Stack

### Backend:
- **Flask (Python)**: Handles web server and API endpoints.

### Frontend:
- **HTML5 & CSS3**: Structure and styling of the web pages.
- **JavaScript**: Manages UI interactions, API calls, and animations.
- **Bootstrap 5**: Provides responsive layout and components.
- **Font Awesome**: Supplies icons for a modern look.

## Project Setup & Running Instructions

### Prerequisites:
- Python 3.8+
- pip (Python package installer)
- Recommended: Use a **virtual environment** for dependency management.

### Steps to Run the Application:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/GTK-THANGELLA-17/cdp-support-chatbot.git

Or, if using GitHub CLI:

bash
Copy
gh repo clone GTK-THANGELLA-17/cdp-support-chatbot
Navigate to the Project Folder:

bash
Copy
cd cdp-support-chatbot
Run the Application: The project already includes all necessary dependencies in the requirements.txt file, so you don't need to install anything else. Run the application with:

bash
Copy
python app.py
This will start the Flask server. You should see something like:

csharp
Copy
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
Access the Application: Open a web browser and navigate to:

cpp
Copy
http://127.0.0.1:5000/
You should now be able to interact with the chatbot.

## Project Structure

```plaintext
cdp-support-chatbot/
├── __pycache__/                # Compiled Python files (auto-generated)
├── docs_indexer/               # Documentation indexing module (e.g., indexer.py, config.py)
├── nlp_processor/              # NLP processing module (contains processor.py)
├── static/                     # Static files served by Flask
│   ├── css/
│   │   └── styles.css          # Custom CSS (including animations, dark/light mode styles, etc.)
│   └── js/
│       └── index.js            # JavaScript for chatbot logic and UI interactions
├── templates/                  # HTML templates for the Flask app
│   └── index.html              # Main HTML file for the website and chatbot UI
├── venv/                       # Virtual environment files
├── app.py                      # Flask backend application
├── docs_index.json             # JSON file containing documentation snippets for CDPs
├── README.md                   # Project overview and documentation
└── requirements.txt            # Python package dependencies

Data Structures & Design Decisions
Documentation Data: Documentation snippets are stored in docs_index.json. This file maps keywords (e.g., "set up", "profile", "audience") to the corresponding documentation text extracted from the official sources.

Query Processing: The Flask backend uses simple keyword matching to detect whether a query is related to a CDP or if it’s a general question. For CDP-related queries, the backend calls functions in nlp_processor/processor.py to extract the relevant snippet. For general queries (e.g., greetings, time, date), pre-defined responses are returned.

UI/UX Design:

Floating Chat Icon & Widget: The chat icon is fixed at the bottom-right, and clicking it reveals the chatbot widget.
Animations: CSS animations enhance the interface (e.g., fade-in, hover effects, smooth transitions).
Dark/Light Mode: Users can toggle dark mode via a button, and the selected mode is stored in localStorage.
Speech Recognition: Integration with the Web Speech API allows voice input.
Bonus Features Implemented
Advanced UI Animations: The chatbot widget and messages have smooth transitions and fade-in effects.
Dark Mode Toggle: Users can switch between light and dark themes. The selected mode is remembered across sessions.
Speech Recognition: A dedicated speech button enables voice input, allowing users to ask questions by speaking.
Enhanced Error Handling: If a query does not match any known documentation, the chatbot provides helpful links to the official documentation sites.
Conclusion
The CDP Support Chatbot is a robust and user-friendly web application that assists users with CDP-related queries. By leveraging Flask for the backend and a modern, responsive frontend built with Bootstrap, custom CSS, and JavaScript, the application provides accurate responses and a smooth user experience. The inclusion of bonus features such as dark mode, speech recognition, and advanced UI animations further enhances the overall functionality and appeal of the chatbot.
