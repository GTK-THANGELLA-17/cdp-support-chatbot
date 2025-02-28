import json
import os

# Load pre-indexed documentation snippets from local JSON files.
# For a production system, this could be a scheduled crawler or API integration.
DOCS_PATH = os.path.join(os.path.dirname(__file__), "docs_index.json")

def load_docs_index():
    with open(DOCS_PATH, "r") as f:
        return json.load(f)

DOCS_INDEX = load_docs_index()

def get_documentation_snippet(platform, task):
    """
    Returns a documentation snippet based on the detected platform and task.
    This is a simplified lookup that can be extended with more advanced NLP search.
    """
    platform_docs = DOCS_INDEX.get(platform.lower(), {})
    # Simple keyword search in indexed documentation
    for key, snippet in platform_docs.items():
        if key in task.lower():
            return snippet
    return "Relevant documentation section not found. Please refer to the official docs."
