import os
import json
import re
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import TranslationHistory
from .serializers import TranslationHistorySerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


# ============================================
# SPEECH (PLACEHOLDER)
# ============================================
@api_view(['POST'])
@permission_classes([AllowAny])
def speech_to_text(request):
    return Response({
        "text": "Speech feature placeholder"
    })


# ============================================
# SIGNUP
# ============================================
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({"error": "All fields required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username exists"}, status=400)

    User.objects.create_user(username=username, email=email, password=password)

    return Response({"message": "User created"})


# ============================================
# LOGIN (JWT)
# ============================================
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    if not user.check_password(password):
        return Response({"error": "Invalid password"}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    })


# ============================================
# LOAD MAPPING
# ============================================
def load_mapping():
    try:
        dataset_path = os.path.join(settings.BASE_DIR, "dataset", "mapping.json")

        if not os.path.exists(dataset_path):
            print("⚠️ mapping.json NOT FOUND")
            return []

        with open(dataset_path, "r", encoding="utf-8") as f:
            return json.load(f)

    except Exception as e:
        print("⚠️ Mapping load error:", str(e))
        return []


MAPPING = load_mapping()


# ============================================
# PREPROCESS
# ============================================
def preprocess(text):
    text = text.lower()
    text = re.sub(r"[^\w\s]", "", text)

    stopwords = ["is", "am", "are", "was", "were", "the", "a", "an", "to", "of"]
    words = [w for w in text.split() if w not in stopwords]

    return words


# ============================================
# SMART MATCH FUNCTION (FIXED)
# ============================================
def find_best_match(word):
    word = word.strip().lower()

    for item in MAPPING:
        item_text = item.get("text", "").strip().lower()
        item_gloss = item.get("gloss", "").strip()

        if item_text == word:
            return item_gloss

    return word


# ============================================
# GENERATE GLOSS
# ============================================
def generate_gloss(text):
    try:
        words = preprocess(text)
        gloss_words = []

        for word in words:
            gloss_words.append(find_best_match(word))

        return " ".join(gloss_words)

    except Exception as e:
        print("Gloss error:", str(e))
        return text


# ============================================
# HOME
# ============================================
@api_view(['GET'])
@permission_classes([AllowAny])
def home(request):
    return Response({"message": "Backend running ✅"})


# ============================================
# TEXT → GLOSS API
# ============================================
@api_view(['POST'])
@permission_classes([AllowAny])
def text_to_gloss(request):
    try:
        text = request.data.get('text', '').strip()

        if not text:
            return Response({"error": "Text required"}, status=400)

        print("Input:", text)

        gloss = generate_gloss(text)

        print("Gloss:", gloss)

        # SAVE HISTORY
        try:
            TranslationHistory.objects.create(
                input_text=text,
                output_text=gloss,
            )
        except Exception as db_error:
            print("DB ERROR:", str(db_error))

        return Response({
            "gloss": gloss.upper()
        })

    except Exception as e:
        print("🔥 MAIN ERROR:", str(e))
        return Response({
            "error": "Server crash",
            "details": str(e)
        }, status=500)


# ============================================
# GET HISTORY
# ============================================
@api_view(['GET'])
@permission_classes([AllowAny])
def get_history(request):
    history = TranslationHistory.objects.all().order_by('-created_at')[:10]
    serializer = TranslationHistorySerializer(history, many=True)
    return Response(serializer.data)


# ============================================
# DELETE SINGLE HISTORY
# ============================================
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_history(request, id):
    try:
        item = TranslationHistory.objects.get(id=id)
        item.delete()
        return Response({"message": "Deleted successfully"})
    except TranslationHistory.DoesNotExist:
        return Response({"error": "Not found"}, status=404)


# ============================================
# CLEAR HISTORY
# ============================================
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_history(request):
    TranslationHistory.objects.all().delete()
    return Response({"message": "History cleared"})