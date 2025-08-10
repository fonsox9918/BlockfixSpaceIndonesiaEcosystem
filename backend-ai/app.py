from flask import Flask, jsonify
from routes.design_routes import design_bp
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)

# Configure CORS securely
allowed_origins = []
if os.getenv('ALLOWED_ORIGINS'):
    allowed_origins = [origin.strip() for origin in os.getenv('ALLOWED_ORIGINS').split(',')]
else:
    # Default origins for development
    allowed_origins = ['http://localhost:3000', 'http://localhost:5173']

CORS(app, 
     origins=allowed_origins,
     supports_credentials=True,
     methods=['GET', 'POST', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization', 'X-Requested-With'])

# Configure app - Debug mode controlled by environment
app.config['DEBUG'] = os.getenv('FLASK_ENV', 'production') == 'development'
app.config['JSON_AS_ASCII'] = False

# Register blueprints
app.register_blueprint(design_bp)

@app.route('/')
def home():
    return jsonify({
        "service": "Blockfix AI Design Service",
        "status": "running",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat(),
        "endpoints": {
            "design": "/api/design [POST]"
        }
    })

@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Endpoint not found",
        "message": "The requested endpoint does not exist"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "error": "Internal server error",
        "message": "Something went wrong on our end"
    }), 500

if __name__ == "__main__":
    debug_mode = os.getenv('FLASK_ENV', 'production') == 'development'
    
    print("🚀 Starting Blockfix AI Design Service...")
    print("📍 Server will be available at: http://localhost:5000")
    print("🔗 API Endpoint: http://localhost:5000/api/design")
    print("💡 Health Check: http://localhost:5000/health")
    print(f"🔧 Debug Mode: {'ON' if debug_mode else 'OFF'}")
    print(f"🌐 Allowed Origins: {', '.join(allowed_origins)}")
    print("-" * 50)
    
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=debug_mode,
        use_reloader=debug_mode
    )
