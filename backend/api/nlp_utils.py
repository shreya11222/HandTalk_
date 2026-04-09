import re

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)

    # Remove filler words
    stopwords = ["is", "am", "are", "the", "a", "an", "to", "of"]
    words = [w for w in text.split() if w not in stopwords]

    return words