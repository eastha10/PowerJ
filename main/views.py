from django.http import HttpResponse

def home(request):
    return HttpResponse("✅ 뷰는 정상 연결됨")