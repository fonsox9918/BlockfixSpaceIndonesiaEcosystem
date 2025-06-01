from flask import Blueprint, request, jsonify
from controllers.design_controller import handle_generate_design

design_bp = Blueprint('design', __name__)

@design_bp.route('/api/design', methods=['POST'])
def generate_design():
    data = request.get_json()
    response, status_code = handle_generate_design(data)
    return jsonify(response), status_code
