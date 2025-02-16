

document.addEventListener("DOMContentLoaded", function () {
    const fechaLimite = new Date("2025-02-15"); // 15 de enero a las 00:00
    const fechaActual = new Date();

    if (fechaActual >= fechaLimite) {
        const primerItem = document.querySelector(".carousel-item.active");
        if (primerItem) {
            primerItem.remove(); // Elimina la imagen de la promoción expirada
        }

        // Ajustar la siguiente imagen como activa
        const nuevoActivo = document.querySelector(".carousel-item");
        if (nuevoActivo) {
            nuevoActivo.classList.add("active");
        }

        // Ajustar los indicadores del carrusel
        const primerIndicador = document.querySelector(".carousel-indicators .active");
        if (primerIndicador) {
            primerIndicador.remove();
        }
        
        const nuevosBotones = document.querySelectorAll(".carousel-indicators button");
        if (nuevosBotones.length > 0) {
            nuevosBotones[0].classList.add("active");
        }
    }
});







// COPYRIGHT YEAR (AUTOMATIC)
let getyear = new Date().getFullYear();
let getyeardiv = document.getElementById('year');
if (getyeardiv) {
    getyeardiv.innerHTML = getyear;
}





// HEADER FIXED
function headerfixed() {
    let getheaderdiv = document.getElementsByTagName('header')[0].classList;
    if (document.documentElement.scrollTop > 100) {
        getheaderdiv.add('sticky');
    } else {
        getheaderdiv.remove('sticky');
    }
}
window.onscroll = headerfixed;

// JQUERY
jQuery(document).ready(function($) {
    // Variables de referencia
    var menuid = '#navigation';
    var gaptop = 100; // Ajusta según la altura de tu menú
    var scrollspeed = 800;
    var menu_active_class = 'active';
    var lastId, topMenu = $(menuid);
    var menuItems = topMenu.find("a");
    
    // Mapeo de las secciones con sus IDs
    var scrollItems = menuItems.map(function() {
        var item = $($(this).attr("href"));
        if (item.length) return item;
    });

    // Manejo de clic en el menú para desplazamiento suave
    menuItems.on('click', function(e) {
        var href = $(this).attr("href");
        var offsetTop = href === "#" ? 0 : $(href).offset().top - gaptop;

        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, scrollspeed);

        e.preventDefault();
    });

    // Cambiar clase `active` al hacer scroll
    $(window).on('scroll', function() {
        var fromTop = $(this).scrollTop() + gaptop;
        
        // Detectar la sección visible
        var current = scrollItems.map(function() {
            // Ajuste en la condición de detección
            if ($(this).offset().top <= fromTop && $(this).offset().top + $(this).outerHeight() > fromTop) {
                return this;
            }
        });

        // Obtener el ID de la sección visible
        current = current[current.length - 1];
        var id = current && current.length ? current[0].id : "";

        // Verificar si la sección activa ha cambiado
        if (lastId !== id) {
            lastId = id;
            // Actualizar la clase `active` según la sección visible
            menuItems.parent().removeClass(menu_active_class).end().filter("[href='#" + id + "']").parent().addClass(menu_active_class);
        }
    });

    // Nav Behaviour in Mobile
    $('a.showmenu').click(function() {
        $('.headermenu').fadeIn();
        $('a.hidemenu').fadeIn('slow');
        $('body').addClass('disable');
    });

    $('a.hidemenu').click(function() {
        $('.headermenu').fadeOut();
        $(this).hide();
        $('body').removeClass('disable');
    });

    $('nav ul li').click(function() {
        let getscreenwidth = $(window).width();
        if (getscreenwidth < 1201) {
            $('.headermenu').fadeOut();
            $('a.hidemenu').hide();
            $('body').removeClass('disable');
        }
    });
});

/*
    JS:  JS Global
    By:  LayoutFlow
    URL: https://layoutflow.com
*/

let productos = [];
const codigosPermitidos = [173895, 174495, 174195, 176395, 176195, 172795, 171895, 172895, 172995, 170995, 171795, 176095, 172695];

// Asociación manual de URLs de imágenes por código de producto
const imagenesProductos = {
    173895: "https://elaion.com.ar/assets/images/productos/Elaion_AURO_D2530.webp",
    174495: "https://elaion.com.ar/assets/images/productos/Elaion_MI2050.webp",
    174195: "https://elaion.com.ar/assets/images/productos/Elaion_MI1540.webp",
    176395: "https://elaion.com.ar/assets/images/productos/Elaion_TS1040.webp",
    176195: "https://elaion.com.ar/assets/images/productos/Elaion_FS540.webp",
    171895: "https://elaion.com.ar/assets/images/productos/Elaion_AURO_FE530.webp",
    172795: "https://elaion.com.ar/assets/images/productos/Elaion_AURO_PLUS540.webp",
    172895: "https://elaion.com.ar/assets/images/productos/Elaion_AURO_FR530.webp",
    172995: "https://elaion.com.ar/assets/images/productos/Elaion_AURO_FR540.webp",
    170995: "https://elaion.com.ar/assets/images/productos/Elaion_AURO_HYBRID_D1020.webp",
    171795: "https://elaion.com.ar/assets/images/productos/Elaion_AURO_HYBRID_D1530.webp",
    176095: "https://elaion.com.ar/assets/images/productos/Elaion_FS530.webp",
    172695: "https://elaion.com.ar/assets/images/productos/Elaion_AURO_HYBRID_DPF530.webp"
};

function verProductosapi() {
    fetch("https://api-boxes-default-rtdb.firebaseio.com/productos.json")
        .then((response) => response.json())
        .then((jsonResponse) => {
            productos = jsonResponse;
            mostrarProductos();
        });
}

function mostrarProductos() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar el contenedor

    // Filtrar productos por códigos permitidos
    const productosFiltrados = productos.filter(producto => codigosPermitidos.includes(parseInt(producto.codigo)));

    // Iterar sobre los productos filtrados y crear elementos HTML para cada uno
    productosFiltrados.forEach((producto) => {
        const productItem = document.createElement('div');
        productItem.className = 'item';

        // Obtener la URL de la imagen correspondiente al código del producto
        const urlImagen = imagenesProductos[producto.codigo] || "https://mi-sitio.com/imagenes/default.jpg"; // Imagen por defecto si no hay URL

        productItem.innerHTML = `
            <div class="itemcontent">
                <img src="${urlImagen}" alt="Imagen de ${producto.descripcion}" class="product-image">
                <h4>Código: ${producto.codigo}</h4>
                <h4>${producto.descripcion}</h4>
                <h5>Precio: $${producto.precio}</h5>
            </div>
        `;

        productList.appendChild(productItem);
    });
}

// Llamar a la función para cargar los productos al cargar la página
verProductosapi();

// Función para detectar si es un dispositivo móvil
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Definir el enlace de WhatsApp según el dispositivo
const whatsappLink = document.getElementById('whatsapp-link');
if (isMobile()) {
    whatsappLink.href = 'https://wa.me/5491138110074'; // Abrir en la app de WhatsApp
} else {
    whatsappLink.href = 'https://web.whatsapp.com/send?phone=5491138110074'; // Abrir en WhatsApp Web
}


const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('.accordion-icon');

        // Cierra cualquier acordeón abierto
        document.querySelectorAll('.accordion-content').forEach(otherContent => {
            if (otherContent !== content) {
                otherContent.style.maxHeight = null;
                otherContent.previousElementSibling.querySelector('.accordion-icon').textContent = '+';
            }
        });

        // Alternar el acordeón actual
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.textContent = '+';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.textContent = '−';
        }
    });
});
