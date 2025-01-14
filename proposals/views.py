from rest_framework.generics import RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Project
from .serializers import ProjectSerializer


# Представление (Получение информации о всех "Проектах") на основе класса
class ProjectListView(APIView):
    def get(self, request, *args, **kwargs):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Представление (Получение информации о конкретном "Проекте") на основе класса
class ProjectDetailView(RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


# Представление (Создание/Добавление "Проекта") на основе класса
class ProjectCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Проект успешно добавлен!", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Представление (Получение информации о "Проектах" отфильрованной по "Статус") на основе класса
class ProjectFilterView(APIView):
    def get(self, request, *args, **kwargs):
        status_filter = request.query_params.get('status')
        if status_filter:
            projects = Project.objects.filter(status=status_filter)
        else:
            projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
