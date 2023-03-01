//VARIABLES GLOBALES
const audio = document.getElementById("reproductor")
const img = document.getElementById("imagen")
let musica;
let contador = 0;
let click = true;


//FETCH PARA CANCIONES
fetch('songs.json')
    .then(response => response.json())
    .then(data => {
        musica = data
        cargaInformacion(0)
    })
    .catch(error => {
        console.error(error);
    });

//FUNCIONES PAUSE NEXT PREVIOUS
function playPause() {
    if (document.getElementById("inicio").innerHTML == "play_circle") {
        if (contador == 0 & click) {
            audio.src = musica[contador].url;
            img.classList.add("inyeccion")
        }
        audio.play();
        click = false;
        document.getElementById("inicio").innerHTML = "stop_circle"
        img.classList.remove("paused")

    } else {
        img.classList.add("paused")
        audio.pause();
        document.getElementById("inicio").innerHTML = "play_circle"
    }
}

function next(reproducir) {
    if (contador == (musica.length - 1)) contador = -1
    cargaInformacion(++contador)
    reset()
    if (reproducir) audio.play()
}
//REPRODUCCION AUTOMATICA
audio.addEventListener("ended", function() {
    next(true)
    document.getElementById("inicio").innerHTML = "stop_circle";
});

function previous() {
    if (contador == 0) contador = musica.length
    cargaInformacion(--contador)
    reset()
}

//FUNCION PARA PREVIOUS Y NEXT
function reset() {
    audio.pause();
    img.classList.add("paused");
    document.getElementById("inicio").innerHTML = "play_circle";
    img.style.animation = 'none';
    img.offsetHeight;
    img.style.animation = null;
}

//FUNCION PARA CARGAR ARTISTA CANCION Y DURACION
function cargaInformacion(numero) {
    document.getElementById("cancion").innerHTML = musica[numero].nombre;
    document.getElementById("duracion").innerHTML = musica[numero].duracion;
    document.getElementById("artista").innerHTML = musica[numero].artista;
    img.src = musica[numero].image;
    audio.src = musica[numero].url

}