from django.contrib import admin
from django.urls import path
from django.http import HttpResponse

def test_view(request):
    return HttpResponse("💥 이건 무조건 떠야 함")

urlpatterns = [
    path('', test_view),
]
