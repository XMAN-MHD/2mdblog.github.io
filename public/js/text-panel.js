let showTextEl = document.getElementById('show-text-link');
let textEl = document.getElementById('hidden-text');
let hideTextEl = document.getElementById('hide-text-link');

textEl.classList.add('hide');
hideTextEl.classList.add('hide');
showTextEl.addEventListener(
    'click', 
    function(e) {
        textEl.classList.toggle('hide');
        hideTextEl.classList.toggle('hide');
        showTextEl.classList.toggle('hide');
    }
);
hideTextEl.addEventListener(
    'click', 
    function(e) {
        textEl.classList.toggle('hide');
        showTextEl.classList.toggle('hide');
        hideTextEl.classList.toggle('hide');
    }
);