import re
from docs_indexer.indexer import get_documentation_snippet

def process_query(query):
    """
    Process the incoming query to determine:
    - Which CDP it refers to (Segment, mParticle, Lytics, Zeotap)
    - The specific task (e.g., setting up a source, creating a profile)
    """
    # Identify CDP based on keywords
    platforms = {
        "segment": "Segment",
        "mparticle": "mParticle",
        "lytics": "Lytics",
        "zeotap": "Zeotap"
    }
    detected_platform = None
    for key, name in platforms.items():
        if re.search(key, query, re.IGNORECASE):
            detected_platform = name
            break

    if not detected_platform:
        return {"error": "No valid CDP detected in query."}

    # Extract task description
    # (In a full implementation, use NLP techniques for better intent detection.)
    task = query

    # Retrieve documentation snippet
    snippet = get_documentation_snippet(detected_platform, task)
    response = {
        "platform": detected_platform,
        "task": task,
        "documentation": snippet
    }
    return response

def process_comparison(query):
    """
    Process a comparative query between two CDPs.
    Example: "How does Segment's audience creation process compare to Lytics'?"
    """
    if "compare" in query.lower():
        segment_info = get_documentation_snippet("Segment", "audience")
        lytics_info = get_documentation_snippet("Lytics", "audience")
        return {
            "Segment": segment_info,
            "Lytics": lytics_info,
            "comparison": "Segment uses a streamlined setup process while Lytics provides more in-depth customization options."
        }
    return {"error": "Comparison not detected in query."}
