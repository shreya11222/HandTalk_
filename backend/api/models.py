from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
# ============================================
# TRANSLATION HISTORY
# ============================================
class TranslationHistory(models.Model):
    """Store translation history"""

    TRANSLATION_TYPES = [
        ('text_to_gloss', 'Text to Gloss'),
        ('speech_to_gloss', 'Speech to Gloss'),
        ('gloss_to_text', 'Gloss to Text'),
    ]

    input_text = models.TextField(
        help_text="Original input text"
    )

    output_text = models.TextField(
        help_text="Translated output"
    )

    translation_type = models.CharField(
        max_length=20,
        choices=TRANSLATION_TYPES,
        default='text_to_gloss'
    )

    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Translation History'
        verbose_name_plural = 'Translation Histories'
        indexes = [
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f"{self.input_text[:25]} → {self.output_text[:25]}"


# ============================================
# USER FEEDBACK
# ============================================
class UserFeedback(models.Model):
    """Store user feedback"""

    RATING_CHOICES = [
        (1, '1 - Poor'),
        (2, '2 - Fair'),
        (3, '3 - Good'),
        (4, '4 - Very Good'),
        (5, '5 - Excellent'),
    ]

    translation = models.ForeignKey(
        TranslationHistory,
        on_delete=models.CASCADE,
        related_name='feedbacks'
    )

    rating = models.IntegerField(choices=RATING_CHOICES)

    comment = models.TextField(
        blank=True,
        help_text="Optional feedback comment"
    )

    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f"Rating: {self.rating} ⭐"