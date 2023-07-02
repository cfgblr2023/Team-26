from django.urls import path
from . import views
urlpatterns=[
    
    path('register1', views.register1, name='register1'),
    path('register',views.register,name='register'), #a
    path('login',views.login,name='login'),
    path('logout',views.logout,name='logout'),
    path('mapping',views.mapping,name='mapping'),
    
    
    
  
]
