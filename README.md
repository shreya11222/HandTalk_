# HandTalk – Speech/Text to Sign Language Translator

## About Project

HandTalk is a web-based application that converts **speech or text into sign language gloss**.
The main aim of this project is to reduce the communication gap between hearing and deaf people.

---

## Features

* 🎤 Speech input (basic placeholder)
* ✍️ Text to sign language gloss conversion
* 📂 Word mapping using dataset
* 🕓 Translation history storage
* 🔐 User authentication (Login & Signup using JWT)

---

## Technology Used

### Frontend:

* React.js
* Axios

### Backend:

* Django
* Django REST Framework

### Other:

* JSON dataset (`mapping.json`)
* Basic NLP (text preprocessing, stopword removal)

---

## How It Works

1. User enters text or speech
2. Backend cleans the text (removes unnecessary words)
3. Words are matched with dataset
4. Gloss is generated
5. Output is displayed on screen

---

## Project Structure

```
handtalk/
│
├── backend/
│   ├── api/
│   ├── dataset/
│   └── ...
│
├── frontend/
│   └── ...
│
└── README.md
```

---

## How to Run Project

### Backend:

```
cd backend
pip install -r requirements.txt
python manage.py runserver
```

### Frontend:

```
cd frontend
npm install
npm start
```

---

## Contributors

* Shreya Gupta
* Tanya Sahu

---

## Future Improvements

* Real-time speech recognition
* Advanced NLP for better sentence understanding
* Sign language animation/avatars
* Mobile application version

---

## Note

This project is created for academic purposes.

⭐ If you like this project, give it a star!!

