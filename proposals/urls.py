from django.urls import path
from .views import ProjectCreateView, ProjectListView, ProjectDetailView, ProjectFilterView

urlpatterns = [
    path('projects/', ProjectListView.as_view(), name='project-list'),  # Получение всех проектов
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),  # Один проект по ID
    path('projects/filter/', ProjectFilterView.as_view(), name='project-filter'),  # Фильтрация по статусу
    path('projects/create/', ProjectCreateView.as_view(), name='project-create'),  # Создание проекта
]
