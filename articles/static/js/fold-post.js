// articles/static/js/fold-post.js
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.getElementsByClassName('fold-button');
    
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(e) {
            var post = e.target.closest('.one-post');
            post.classList.toggle('folded');
            e.target.innerHTML = post.classList.contains('folded') ? 'развернуть' : 'свернуть';
        });
    }
});