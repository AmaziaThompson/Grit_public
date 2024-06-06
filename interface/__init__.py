import os, cv2
from flask import Flask, request, Response, render_template, jsonify

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'interface.sqlite'),
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    global camera
    camera = None

    @app.before_request
    def before_request():
        global camera
        if request.path == '/video_feed':
            if camera is None:
                camera = cv2.VideoCapture(1)

    @app.route('/')
    def index():
        return render_template('index.html')
    
    @app.route('/gui')
    def gui():
        return render_template('gui.html', DRAWER_CONTENTS=app.config['DRAWER_CONTENTS'])
    
    def generate_frames():
        global camera
        while True:
            try:
                success, frame = camera.read()
                if not success:
                    break
                else:
                    ret, buffer = cv2.imencode('.jpg', frame)
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            except Exception as e:
                print("Error reading frame from camera:", e)
                break 

    @app.route('/video_feed')
    def video_feed():
        return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
    
    @app.route('/ping', )
    def ping():
        return jsonify({'status': 'ok'})

    return app

