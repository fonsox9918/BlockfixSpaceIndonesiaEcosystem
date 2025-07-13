from flask import Flask, jsonify
from routes.design_routes import design_bp
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configure app
app.config['DEBUG'] = True
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
    print("🚀 Starting Blockfix AI Design Service...")
    print("📍 Server will be available at: http://localhost:5000")
    print("🔗 API Endpoint: http://localhost:5000/api/design")
    print("💡 Health Check: http://localhost:5000/health")
    print("-" * 50)
    
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        use_reloader=True
    )
