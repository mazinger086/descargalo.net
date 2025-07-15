from flask import Flask, request, render_template, jsonify, send_from_directory
import subprocess
import os
import uuid

app = Flask(__name__)
DOWNLOAD_FOLDER = "videos"
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')

@app.route('/api/descargar', methods=['POST'])
def descargar():
    data = request.get_json()
    url = data.get('url')
    if not url:
        return jsonify({'success': False, 'error': 'URL vacía'})

    try:
        filename = f"{uuid.uuid4().hex}.mp4"
        output_path = os.path.join(DOWNLOAD_FOLDER, filename)

        result = subprocess.run(['python', '-m', 'yt_dlp', '-o', output_path, url], capture_output=True, text=True)

        if result.returncode != 0 or not os.path.exists(output_path):
            return jsonify({'success': False, 'error': 'No se pudo descargar el video.'})

        return jsonify({'success': True, 'download': f'/descargar/{filename}'})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/descargar/<filename>')
def serve_video(filename):
    return send_from_directory(DOWNLOAD_FOLDER, filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)