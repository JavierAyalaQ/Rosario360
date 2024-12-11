let banner_botones = document.querySelector(".caja_banner_bottom");
let cajaBtnVideo = document.querySelector('.cajaOculta');
let porsentaje = document.querySelector('.porsentaje');
let progreso = document.querySelector('.progreso');
let texto = document.querySelector('.text');
let contador = 4;
let por = 16;
let loading = setInterval(animate, 50);

cajaBtnVideo.style.display = 'none';

function animate() {
    if (contador == 100 && por == 400) {
        porsentaje.classList.add("text-blink");
        texto.style.display = 'block';

        clearInterval(loading);
    } else {
        por = por + 4;
        contador = contador + 1;
        progreso.style.width = por + 'px';
        porsentaje.textContent = contador + '%';
    }
}

let position_image = 1;
let ultimaPosicion;
let images;

window.addEventListener("load", function() {
    document.getElementById('loader').classList.toggle('loader2')
    document.querySelector('.loader').style.display = 'none';
    
    console.log('entre 😎😎');

    let  ultimaPosicion = window.pageYOffset; 
    // Tomamos todas las imagenes del contenedor
    images = document.querySelectorAll(".contimages img");
    // Creamos la variable para tomar el alto de todas
    let content_height = 0;
    images.forEach(e=>{
        content_height += e.height;
    });
    document.querySelector(".contimages").style.height = content_height+"px"; 
    let pase = false;
    window.addEventListener('scroll', function() { 
        document.querySelector(`#imageoriginal`).classList.remove('active');
        // Obtiene la posición actual del scroll
        const  posicionActual = window.pageYOffset;
        pase = true;
        changeimage(posicionActual);
        pase = false;
    });
    
    changeimage = (posicionActual)=>{
        // Compara la posición actual con la última posición para determinar la dirección del scroll
        if (posicionActual > ultimaPosicion) {
        // Si el usuario cambiamos a la miagen anterior
        position_image++; 
        } else if (posicionActual < ultimaPosicion) {
        // Si el usuario sube cambiamos a la sigueinte imagen
        position_image--; 
        } 

        // Actualiza la última posición del scroll
        ultimaPosicion = posicionActual;
        //Validamos que la imagen no pase el limite de inicio y final. 
        if(position_image >= images.length){
            position_image = images.length;
        } else if (position_image < 1){
            position_image = 1;
        }
        
        const ruta_actual = document.querySelector(".contimages img.active").src;
        const original = ruta_actual.replace("/lowpick", "");
        const btnVideo = document.querySelector(".contimages img.ultima").src;

        if (ruta_actual == btnVideo) {
            cajaBtnVideo.style.display='block';
            // console.log('si funciona');
        } else {
            cajaBtnVideo.style.display='none';
        }
        
        // console.log(position_image);
        //remover clase active a las otras imagenes
        images.forEach(e=>{
            e.classList.remove('active');
        });
        //Añadimos la clase a la imagen selecionada. 
        document.querySelector(`#imageoriginal`).classList.add('active');
        document.querySelector(`#imageoriginal`).src=original;
        document.querySelector(`.contimages img:nth-child(${position_image})`).classList.add('active');
    }
})
