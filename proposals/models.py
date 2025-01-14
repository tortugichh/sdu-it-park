import os
from django.db import models

def project_attachment_path(instance, filename):
    # Формирование пути для вложений: attachments/<project_title>/<filename>
    sanitized_title = instance.title.replace(" ", "_").lower()
    return os.path.join(f'attachments/{sanitized_title}/', filename)


# Модель "Проекта"
class Project(models.Model):
    STATUS_CHOICES = [
        ('new', 'Новая заявка'),
        ('approved', 'Одобрено'),
        ('rejected', 'Отклонено'),
    ]

    title = models.CharField(
        max_length=255,
        verbose_name="Название проекта",
        help_text="Введите название проекта."
    )
    description = models.TextField(
        verbose_name="Описание проекта",
        help_text="Подробно опишите детали проекта."
    )
    budget = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Бюджет",
        help_text="Укажите бюджет проекта в валюте (₸)."
    )
    deadline = models.DateField(
        verbose_name="Крайний срок",
        help_text="Укажите крайний срок завершения проекта."
    )
    applicant_name = models.CharField(
        max_length=255,
        verbose_name="Имя заявителя",
        help_text="Введите полное имя заявителя."
    )
    applicant_email = models.EmailField(
        verbose_name="Email заявителя",
        help_text="Укажите адрес электронной почты для обратной связи."
    )
    applicant_phone = models.CharField(
        max_length=15,
        verbose_name="Телефон заявителя",
        help_text="Укажите контактный номер телефона."
    )
    attachments = models.FileField(
        upload_to=project_attachment_path,
        verbose_name="Вложения",
        help_text="Загрузите файл(-ы), относящийся к проекту."
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='new',
        verbose_name="Статус заявки",
        help_text="Выберите текущий статус заявки."
    )
    decision_comment = models.TextField(
        blank=True,
        null=True,
        verbose_name="Комментарий руководства",
        help_text="Добавьте комментарий об одобрении или отклонении заявки."
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания",
        help_text="Автоматически сохраняет дату и время создания заявки."
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления",
        help_text="Автоматически обновляется при внесении изменений."
    )

    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"
        ordering = ['-created_at']

    def __str__(self):
        return self.title
