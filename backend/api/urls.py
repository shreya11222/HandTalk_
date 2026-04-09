from django.urls import path
from . import views
from .views import signup, login

urlpatterns = [
    path('', views.home),
    path('signup/', signup),
    path('login/', login),

    path('text-to-gloss/', views.text_to_gloss),
    path('speech-to-text/', views.speech_to_text),

    path('history/', views.get_history),
    path('history/delete/<int:id>/', views.delete_history),
    path('clear-history/', views.clear_history),
]