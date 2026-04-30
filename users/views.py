from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout

def register(request):
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '')
        password2 = request.POST.get('password2', '')
        
        errors = []
        
        if not username or not email or not password:
            errors.append('Все поля обязательны для заполнения')
        
    
        if password != password2:
            errors.append('Пароли не совпадают')
        
    
        if User.objects.filter(username=username).exists():
            errors.append(f'Пользователь "{username}" уже существует')
        
        if not errors:
    
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )

            login(request, user)
            return redirect('archive')
        
        return render(request, 'users/register.html', {'errors': errors})
    
    return render(request, 'users/register.html')

def login_user(request):
    error = None
    
    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        
        # Проверка на пустые поля
        if not username or not password:
            error = 'Пожалуйста, заполните все поля'
        else:
            # Аутентификация пользователя
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                # Авторизация пользователя
                login(request, user)
                return redirect('archive')
            else:
                error = 'Неверное имя пользователя или пароль'
    
    return render(request, 'users/login.html', {'error': error})

def logout_user(request):
    logout(request)
    return redirect('archive')
