from rest_framework import serializers
from .models import TranslationHistory, UserFeedback

class TranslationHistorySerializer(serializers.ModelSerializer):
    """Serializer for translation history"""

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M")

    class Meta:
        model = TranslationHistory
        fields = [
            'id',
            'input_text',
            'output_text',
            'translation_type',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    # ✅ VALIDATION
    def validate_input_text(self, value):
        if not value.strip():
            raise serializers.ValidationError("Input text cannot be empty")
        return value

    def validate_output_text(self, value):
        if not value.strip():
            raise serializers.ValidationError("Output text cannot be empty")
        return value

class UserFeedbackSerializer(serializers.ModelSerializer):
    """Serializer for user feedback"""

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M")

    class Meta:
        model = UserFeedback
        fields = [
            'id',
            'translation',
            'rating',
            'comment',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    # ✅ VALIDATION
    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value

    def validate_comment(self, value):
        if len(value) > 300:
            raise serializers.ValidationError("Comment too long")
        return value