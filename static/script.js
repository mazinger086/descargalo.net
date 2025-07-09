
//OLD
// async function descargar() {
//     const url = document.getElementById("videoURL").value;
//     document.getElementById("status").innerText = "Procesando...";

//     const res = await fetch("/api/descargar", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ url })
//     });

//     const data = await res.json();

//     if (data.success && data.download) {
//         const a = document.createElement("a");
//         a.href = data.download;
//         a.download = "video.mp4";  // nombre sugerido
//         document.body.appendChild(a);
//         a.click();
//         a.remove();

//     } else {
//         document.getElementById("status").innerText = "Error: " + (data.error || "No se pudo descargar el video.");
//     }



// }

// NEW

async function descargar() {
    const urlInput = document.getElementById("videoURL");
    const status = document.getElementById("status");
    const boton = document.querySelector("button");

    const url = urlInput.value.trim();

    if (!url) {
        status.innerText = "Por favor, pegá un enlace válido.";
        return;
    }

    // Mostrar mensaje de carga
    status.innerText = "🔄 Procesando... descargando video...";
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

            status.innerText = "✅ ¡Video descargado!";
            urlInput.value = ""; // ✅ Limpiar input solo si se descarga bien
        } else {
            status.innerText = "❌ Error: " + (data.error || "No se pudo procesar el video.");
        }
    } catch (err) {
        status.innerText = "❌ Error inesperado. Verificá tu conexión.";
    } finally {
        boton.disabled = false;
    }
}
