from flask import Flask, request, render_template, jsonify
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/descargar', methods=['POST'])
def descargar():
    data = request.get_json()
    url = data.get('url')
    if not url:
        return jsonify({'success': False, 'error': 'URL vacía'})

    try:
        # Ejecutar yt-dlp para obtener el link directo
        result = subprocess.run(['yt-dlp', '-g', url], capture_output=True, text=True)
        if result.returncode != 0 or not result.stdout.strip():
            return jsonify({'success': False, 'error': 'Error al procesar el enlace'})
        download_url = result.stdout.strip().split('\n')[0]
        return jsonify({'success': True, 'download': download_url})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)