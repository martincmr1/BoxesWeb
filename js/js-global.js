








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


/* js para lista de autos

document.addEventListener("DOMContentLoaded", () => {
    // Cargar servicios y productos desde Firebase y localmente
    Promise.all([
        fetch("./services.json").then(res => res.json()),
        fetch("https://api-boxes-default-rtdb.firebaseio.com/productos.json").then(res => res.json())
    ])
    .then(([servicios, productos]) => {
        if (!servicios || !productos) {
            console.error("No se recibieron datos correctos desde Firebase.");
            return;
        }

        console.log("Servicios cargados:", servicios);
        console.log("Productos cargados:", productos);

        const container = document.querySelector(".service-section .row");
        if (!container) {
            console.error("No se encontró el contenedor en el HTML.");
            return;
        }

        container.innerHTML = ""; // Limpiar contenido previo

        // Crear un mapa de productos { codigo: precio } asegurándonos de que los precios sean números
        const productosMap = {};
        productos.forEach(producto => {
            productosMap[producto.codigo] = Number(producto.precio) || 0; // Convertir a número y evitar NaN
        });

        // Iterar sobre cada servicio y calcular su precio total
        servicios.forEach(service => {
            let precioTotal = service.codigos.reduce((total, codigo) => {
                return total + (productosMap[codigo] || 0); // Si no existe el código, suma 0
            }, 0);

            // Formatear el precio sin decimales
            let precioFormateado = new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 0, // Evita decimales
                maximumFractionDigits: 0  // Evita decimales
            }).format(precioTotal);

            // Crear la tarjeta del servicio
            const card = document.createElement("div");
            card.classList.add("col-md-4", "col-12");
            card.innerHTML = `
                <div class="service-card">
                    <span class="price-tag">${precioFormateado}</span>
                    <img src="${service.imagen}" alt="${service.marca}">
                    <div class="service-card-body">
                        <h3 class="service-title">${service.marca}</h3>
                        <ul class="service-details">
                            ${service.detalles.map(item => `<li>${item}</li>`).join("")}
                        </ul>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    })
    .catch(error => console.error("Error al obtener los datos desde Firebase:", error));
});
*/
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".service-section .row");
    const paginationContainer = document.getElementById("pagination");
    const mobileNav = document.getElementById("mobile-navigation");
    const prevCardBtn = document.getElementById("prev-card");
    const nextCardBtn = document.getElementById("next-card");

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "form-control mb-4";
    searchInput.placeholder = "Buscar modelo...";
    searchInput.style.height = "5rem";
    searchInput.style.fontSize = "2rem";
    
    // Insertar el buscador antes del contenedor de servicios
    container.parentNode.insertBefore(searchInput, container);

    let serviciosData = [];
    let productosMap = {}; 
    let currentPage = 1;
    let itemsPerPage = 3;  

    Promise.all([
        fetch("./services.json").then(res => res.json()),
        fetch("https://api-boxes-default-rtdb.firebaseio.com/productos.json").then(res => res.json())
    ])
    .then(([servicios, productos]) => {
        if (!servicios || !productos) {
            console.error("No se recibieron datos correctos desde Firebase.");
            return;
        }

        productos.forEach(producto => {
            productosMap[producto.codigo] = {
                descripcion: producto.descripcion,
                precio: Number(producto.precio) || 0
            };
        });

        serviciosData = servicios.map((service, index) => {
            let precioTotal = service.codigos.reduce((total, codigo) => total + (productosMap[codigo]?.precio || 0), 0);
            let precioFormateado = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(precioTotal);
            let precioCuotasFormateado = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(precioTotal / 6);

            return {
                index,
                modelo: service.modelo.toLowerCase(),
                codigos: service.codigos,
                marca: service.marca,
                año: service.año,
                detalles: service.detalles,
                imagen: service.imagen,
                html: `
                    <div class="col-md-4 col-12 card-item">
                        <div class="service-card">
                            <span class="price-tag">${precioFormateado}</span>
                            <img src="${service.imagen}" alt="${service.marca}">
                            <div class="service-card-body">
                                <h3 class="service-title">${service.marca}</h3>
                                <h3 class="service-model">${service.modelo}</h3>
                                <h3 class="service-model">${service.año}</h3>
                                <ul class="service-details">
                                    ${service.detalles.map(item => `<li>${item}</li>`).join("")}
                                </ul>
                                <h3 class="green-text">6 cuotas sin interés de ${precioCuotasFormateado} pagando con App YPF</h3>
                                <h3 class="green-text">VISA ó MASTERCARD</h3>
                                <p class="notice-text"><em>*Precios sujetos a modificación sin previo aviso</em></p>
                                <button class="details-btn" data-index="${index}">Detalles</button>
                            </div>
                        </div>
                    </div>`
            };
        });

        renderCards();
        setupDetailsModal();
        setupMobileNavigation();

        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase().trim();
            if (query === "") {
                renderCards();
                return;
            }
            const filteredServices = serviciosData.filter(service => service.modelo.includes(query));
            currentPage = 1;
            renderCards(filteredServices);
        });

    })
    .catch(error => console.error("Error al obtener los datos desde Firebase:", error));

    function renderCards(services = serviciosData) {
        let totalPages = Math.ceil(services.length / itemsPerPage);
        currentPage = Math.max(1, Math.min(currentPage, totalPages));

        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedItems = services.slice(start, end);
        container.innerHTML = paginatedItems.map(service => service.html).join("");

        renderPagination(services);
        updateMobileNavigation(totalPages);
    }

    function renderPagination(services) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = ''; 

        let totalPages = Math.ceil(services.length / itemsPerPage);

        // Botón "Anterior"
        let prevBtn = document.createElement("button");
        prevBtn.innerText = "◀";
        prevBtn.classList.add("page-btn");
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderCards(services);
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Botones numéricos (solo para escritorio)
        for (let i = 1; i <= totalPages; i++) {
            let btn = document.createElement("button");
            btn.innerText = i;
            btn.classList.add("page-btn");
            if (i === currentPage) btn.classList.add("active");
            btn.addEventListener("click", () => {
                currentPage = i;
                renderCards(services);
            });
            paginationContainer.appendChild(btn);
        }

        // Botón "Siguiente"
        let nextBtn = document.createElement("button");
        nextBtn.innerText = "▶";
        nextBtn.classList.add("page-btn");
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderCards(services);
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    function setupMobileNavigation() {
        if (!prevCardBtn || !nextCardBtn) return;

        prevCardBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderCards();
            }
        });

        nextCardBtn.addEventListener("click", () => {
            let totalPages = Math.ceil(serviciosData.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderCards();
            }
        });
    }

    function updateMobileNavigation(totalPages) {
        if (!prevCardBtn || !nextCardBtn) return;
        prevCardBtn.disabled = currentPage === 1;
        nextCardBtn.disabled = currentPage === totalPages;
    }

    function setupDetailsModal() {
        container.addEventListener("click", event => {
            if (event.target.classList.contains("details-btn")) {
                let index = parseInt(event.target.getAttribute("data-index"), 10);
                let service = serviciosData.find(s => s.index === index);
                if (!service) return;
    
                let modal = document.getElementById("modal-detalles");
                let modalContent = document.getElementById("modal-content");
    
                if (!modal || !modalContent) {
                    console.error("No se encontró el modal en el DOM.");
                    return;
                }
    
                let detallesHTML = `
                    <h3>${service.marca} - ${service.modelo} (${service.año})</h3>
                    <img src="${service.imagen}" alt="${service.marca}" style="width: 100%; max-height: 200px; object-fit: contain;">
                    <ul>
                        ${service.codigos.map(codigo => {
                            let producto = productosMap[codigo];
                            return producto 
                                ? `<li>${producto.descripcion}: <strong>${new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(producto.precio)}</strong></li>` 
                                : "<li>Producto no encontrado</li>";
                        }).join("")}
                    </ul>
                    <p><em>*Precios sujetos a modificación sin previo aviso</em></p>
                    <button id="close-modal" class="close-btn">Cerrar</button>
                `;
    
                modalContent.innerHTML = detallesHTML;
                modal.style.display = "block";
    
                document.getElementById("close-modal").addEventListener("click", () => {
                    modal.style.display = "none";
                });
    
                modal.addEventListener("click", (event) => {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                });
            }
        });
    }
    
});
