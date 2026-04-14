# articles/views.py
from django.shortcuts import render, redirect
from django.http import Http404
from .models import Article

def archive(request):
    posts = Article.objects.all().order_by('-created_date')
    return render(request, 'archive.html', {'posts': posts})

def get_article(request, article_id):
    try:
        post = Article.objects.get(id=article_id)
        return render(request, 'article.html', {'post': post})
    except Article.DoesNotExist:
        raise Http404 

def create_post(request):
    if not request.user.is_authenticated:  
        raise Http404
    
    if request.method == "POST":
        form = {
            'text': request.POST["text"],
            'title': request.POST["title"]
        }
        
        if Article.objects.filter(title=form["title"]).exists():
            form['errors'] = u"Статья с таким названием уже существует"
            return render(request, 'create_post.html', {'form': form})
        
        if form["text"] and form["title"]:
            article = Article.objects.create(
                text=form["text"],
                title=form["title"],
                author=request.user
            )
            return redirect('get_article', article_id=article.id)
        else:
            form['errors'] = u"Не все поля заполнены"
            return render(request, 'create_post.html', {'form': form})
    else:

        return render(request, 'create_post.html', {})