let lienzo, ctx;
let angulo, velocidad, anguloRad, gravedad = 9.81;
let tiempoDeVuelo, distancia;
let proyectil = {x: 0, y: 0, vx: 0, vy: 0}; 
let tiempo = 0;
let intervalo;

function calcularTrayectoria() {
    angulo = parseFloat(document.getElementById('angulo').value);
    velocidad = parseFloat(document.getElementById('velocidad').value);

    if (isNaN(angulo) || isNaN(velocidad)) {
        alert("Por favor ingresa un ángulo y una velocidad válidos.");
        return;
    }

    // aca convertimos el ángulo a radianes
    anguloRad = angulo * Math.PI / 180;

    // en esta parte calculamos el tiempo de vuelo
    tiempoDeVuelo = (2 * velocidad * Math.sin(anguloRad)) / gravedad;

    // Calcularemos la distancia
    distancia = (velocidad * Math.cos(anguloRad)) * tiempoDeVuelo;

    // lo que hacemos en esta parte es mostrar los resultados a la pagina
    document.getElementById('resultadoDistancia').innerHTML = "Distancia de impacto: " + distancia.toFixed(2) + " metros.";
    document.getElementById('resultadoTiempo').innerHTML = "Tiempo en el aire: " + tiempoDeVuelo.toFixed(2) + " segundos.";

    // Aca empezaremos a realizar la grafica 
    lienzo = document.getElementById('trayectoria')
    ctx = lienzo.getContext('2d');
    ctx.clearRect(0, 0, lienzo.width, lienzo.height); 

    // Dibujo del cañón 
    ctx.fillStyle = "#333"; // Color del cañón
    ctx.beginPath();
    ctx.arc(20, lienzo.height - 18, 9 * 0.6, 0, Math.PI * 2); // Base del cañón 
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(20, lienzo.height - 18); 
    ctx.lineTo(50, lienzo.height - 24); 
    ctx.lineTo(50, lienzo.height - 44); 
    ctx.lineTo(20, lienzo.height - 38); 
    ctx.closePath();
    ctx.fill();

    // Dibujo del piso (suelo)
    ctx.fillStyle = "#795548";
    ctx.fillRect(0, lienzo.height - 8, lienzo.width, 8); 

    
    proyectil.x = 50;  
    proyectil.y = lienzo.height - 44;  
    proyectil.vx = velocidad * Math.cos(anguloRad); 
    proyectil.vy = -velocidad * Math.sin(anguloRad); 

    tiempo = 0;
    intervalo = requestAnimationFrame(animarTrayectoria);
}

function animarTrayectoria() {

    ctx.clearRect(0, 0, lienzo.width, lienzo.height);

    // Fondo menta
    ctx.fillStyle = "#b2e0c7"; // Color menta
    ctx.fillRect(0, 0, lienzo.width, lienzo.height); // Rellenar todo el fondo con el color menta

    // Dibujo del cañón 
    ctx.fillStyle = "#333"; // Color del cañón
    ctx.beginPath();
    ctx.arc(20, lienzo.height - 18, 9 * 0.6, 0, Math.PI * 2); // Base del cañón (círculo más pequeño)
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(18, lienzo.height - 18); // Cañón base
    ctx.lineTo(41, lienzo.height - 18); // Tubo del cañón más pequeño
    ctx.lineTo(41, lienzo.height - 38); // Continuación del tubo
    ctx.lineTo(14, lienzo.height - 32); // Final del tubo
    ctx.closePath();
    ctx.fill();

    // Dibujo del piso (suelo)
    ctx.fillStyle = "#795548";
    ctx.fillRect(0, lienzo.height - 10, lienzo.width, 10); // Línea horizontal que simula el suelo

    // Actualizar la posición del proyectil
    proyectil.x += proyectil.vx * 0.05; // Movimiento horizontal
    proyectil.y += proyectil.vy * 0.05; // Movimiento vertical
    proyectil.vy += gravedad * 0.05; // Aceleración de la gravedad

    // Dibujar el proyectil (bola de cañón) en color negro
    ctx.beginPath();
    ctx.arc(proyectil.x, proyectil.y, 3, 0, Math.PI * 2); // Bola de cañón
    ctx.fillStyle = "#000000"; // Color negro para la bola
    ctx.fill();
    ctx.closePath();

    // Detener la animación cuando el proyectil llegue al suelo
    if (proyectil.y > lienzo.height - 10) {
        ctx.beginPath();
        ctx.arc(proyectil.x, lienzo.height - 10, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#1b5e20"; // Color del punto de impacto
        ctx.fill();
        ctx.closePath();

        cancelAnimationFrame(intervalo);
        return;
    }

    // Continuar la animación
    intervalo = requestAnimationFrame(animarTrayectoria);
}
