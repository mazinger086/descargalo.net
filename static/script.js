async function descargar() {
    const urlInput = document.getElementById("videoURL");
    const boton = document.querySelector("button");
    const url = urlInput.value.trim();

    if (!url) {
        Swal.fire({
            icon: 'warning',
            title: 'Enlace vacío',
            text: 'Por favor, pegá un enlace válido.'
        });
        return;
    }

    // Mostrar mensaje de carga
    Swal.fire({
        title: 'Descargando...',
        text: 'Procesando el video, por favor esperá...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    boton.disabled = true;

    try {
        const res = await fetch("/api/descargar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        });

        const data = await res.json();

        if (data.success && data.download) {
            // Forzar descarga
            const a = document.createElement("a");
            a.href = data.download;
            a.download = "video.mp4";
            document.body.appendChild(a);
            a.click();
            a.remove();

            // 🎉 Confeti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            Swal.fire({
                icon: 'success',
                title: '¡Descarga completa!',
                text: 'El video se descargó correctamente.'
            });

            urlInput.value = "";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.error || "No se pudo procesar el video."
            });
        }
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error inesperado',
            text: 'Verificá tu conexión o intentá más tarde.'
        });
    } finally {
        boton.disabled = false;
    }
}

 function toggleMenu() {
    const nav = document.getElementById('nav-links'); 
    const inicio = document.getElementById('inicio');   
    nav.classList.toggle('show');    

    if (nav.classList.contains('show')) {
        console.log('True');            
        inicio.style.setProperty('margin-top', '14rem', 'important');
    } else {
        console.log('False');        
        inicio.style.removeProperty('margin-top');
    }

  }


