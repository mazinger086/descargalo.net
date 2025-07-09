async function descargar() {
    const url = document.getElementById("videoURL").value;
    document.getElementById("status").innerText = "Procesando...";

    const res = await fetch("/api/descargar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (data.success && data.download) {
        const a = document.createElement("a");
        a.href = data.download;
        a.download = "video.mp4";  // nombre sugerido
        document.body.appendChild(a);
        a.click();
        a.remove();

    } else {
        document.getElementById("status").innerText = "Error: " + (data.error || "No se pudo descargar el video.");
    }



}