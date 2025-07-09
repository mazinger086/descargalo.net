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
        window.location.href = data.download;
    } else {
        document.getElementById("status").innerText = "Error: " + (data.error || "No se pudo descargar el video.");
    }
}