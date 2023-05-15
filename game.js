// Oyunun değişikliklerini kontrol etmek için kullanılan DOM öğelerini alınır.
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const cursor = document.querySelector('.cursor');
const body = document.querySelector('body');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
const easyButton = document.getElementById('easyButton');
const mediumButton = document.getElementById('mediumButton');
const hardButton = document.getElementById('hardButton');
const exitButton = document.getElementById('exitButton');
const restartButton = document.getElementById('restartButton');
const howToPlayButton = document.getElementById('howToPlayButton');
const menu = document.getElementById('menu');
let gameTimer = null; // Oyun zamanlayıcısı
let speed = 1100; // Oyunun başlangıç hızı
let score = 0; // Oyunun başlangıç skoru


// Nasıl oynanır mesajınızı burada gösterebilirsiniz.
howToPlayButton.addEventListener('click', () => {
    alert("Sincapları vurmak için fareyi kullanın. Her sincap 10 puan değerindedir. 200 puanı geçtiğinizde oyunu kazanırsınız!");
});

// Oyunu durdurup başlangıç ekranını getiren "Çıkış" düğmesi işlevselliği.
exitButton.addEventListener('click', () => {
    clearInterval(gameTimer);
    startScreen.style.display = 'flex';
    menu.style.display = 'none';
});

// Oyunu yeniden başlatan "Yeniden Başlat" düğmesi işlevselliği.
restartButton.addEventListener('click', () => {
    clearInterval(gameTimer);
    score = 0;
    scoreEl.textContent = score;
    gameTimer = setInterval(run, speed);
});

// Zorluk seviyesini belirleyen düğmelerin işlevselliği.
easyButton.addEventListener('click', () => {
    speed = 1400;
});

mediumButton.addEventListener('click', () => {
    speed = 1100;
});

hardButton.addEventListener('click', () => {
    speed = 700;
});

// Oyunu başlatan düğmenin işlevselliği.
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    menu.style.display = 'block';
    body.appendChild(cursor);
    gameTimer = setInterval(run, speed);
});

// Sincap vurulduğunda çalacak ses efektini belirliyoruz.
const sound = new Audio("sounds/ses-efektleri.mp3");

// Oyunun ana fonksiyonu.
function run() {
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'images/mole.png';

    img.addEventListener('click', () => {
        // Skoru artırır ve ses efektini çalar.
        score += 10;
        sound.play();
        scoreEl.textContent = score;
        img.src = 'images/mole-whacked.png';
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
        }, 500);

        const winSound = new Audio('sounds/win.mp3');
        if (score >= 200) { // Kazanma durumunu kontrol eder.
            clearInterval(gameTimer);
            const winImg = document.createElement('img');
            winImg.src = 'images/winner.png';
            winImg.id = 'win-image';
            body.appendChild(winImg);
            winSound.play();

            setTimeout(() => { 
                // Kazandıktan sonra kullanıcıya tekrar oynamak isteyip istemediğini sorar.
                const continueGame = confirm("Kazandınız! Tekrar oynamak ister misiniz?");
                if (continueGame) {
                    body.removeChild(document.getElementById('win-image'));
                    score = 0; 
                    scoreEl.textContent = score; 
                    gameTimer = setInterval(run, speed); 
                    winImg.style.display='none';
                } else {
                    startScreen.style.display = 'flex';
                    menu.style.display = 'none';
                    winImg.style.display='none';
                }
            }, 1000); 
        }
    });

    hole.appendChild(img);

    timer = setTimeout(() => {
        hole.removeChild(img);
    }, speed);
}

// Fare hareketlerini takip eden olay dinleyicileri.
window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

