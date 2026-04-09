"""
HandTalk Admin Configuration
"""

from django.contrib import admin
from .models import TranslationHistory, UserFeedback


@admin.register(TranslationHistory)
class TranslationHistoryAdmin(admin.ModelAdmin):
    list_display = ['input_text_short', 'output_text_short', 'translation_type', 'created_at']
    list_filter = ['translation_type', 'created_at']
    search_fields = ['input_text', 'output_text']
    date_hierarchy = 'created_at'
    
    def input_text_short(self, obj):
        return obj.input_text[:50] + '...' if len(obj.input_text) > 50 else obj.input_text
    input_text_short.short_description = 'Input'
    
    def output_text_short(self, obj):
        return obj.output_text[:50] + '...' if len(obj.output_text) > 50 else obj.output_text
    output_text_short.short_description = 'Output'


@admin.register(UserFeedback)
class UserFeedbackAdmin(admin.ModelAdmin):
    list_display = ['translation', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['comment']
    date_hierarchy = 'created_at'