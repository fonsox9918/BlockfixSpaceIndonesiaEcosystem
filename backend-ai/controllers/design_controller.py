import json
import time

def handle_generate_design(data):
    try:
        user_text = data.get('text', '')
        user_image = data.get('image', None)  # base64 image string (optional)
        sender = data.get('sender', '')

        print(f"[AI Service] Received request from {sender}: {user_text[:50]}...")
        
        # Simulate AI processing delay
        time.sleep(1)
        
        # Enhanced AI responses based on keywords
        reply_text = generate_smart_reply(user_text, user_image)
        
        response = {
            "reply": reply_text,
            "timestamp": time.time(),
            "processed": True
        }
        
        print(f"[AI Service] Sending response: {reply_text[:50]}...")
        return response, 200

    except Exception as e:
        print(f"[AI Service] Error: {str(e)}")
        return {"error": str(e)}, 500

def generate_smart_reply(text, image):
    """Generate contextual replies based on user input"""
    text_lower = text.lower()
    
    # Room type detection
    if any(word in text_lower for word in ['kamar', 'bedroom', 'tidur']):
        return "Saya melihat Anda ingin mendesain kamar tidur. Untuk kamar tidur, saya merekomendasikan:\n\n• Plafon PVC dengan motif kayu untuk kesan hangat\n• Dinding WPC dengan warna netral\n• Pencahayaan LED warm white\n• Furniture modular untuk efisiensi ruang\n\nApakah ada preferensi warna atau gaya tertentu?"
    
    elif any(word in text_lower for word in ['ruang tamu', 'living room', 'tamu']):
        return "Untuk ruang tamu yang menawan, saya sarankan:\n\n• Plafon bertingkat dengan LED strip\n• Wall panel WPC dengan aksen natural\n• Kombinasi warna earth tone\n• Smart lighting system\n\nBerapa ukuran ruangan Anda? Ini akan membantu saya memberikan estimasi yang lebih akurat."
    
    elif any(word in text_lower for word in ['dapur', 'kitchen']):
        return "Desain dapur modern memerlukan:\n\n• Plafon PVC anti-lembab\n• Wall panel tahan air\n• Ventilasi yang baik\n• Storage solution yang optimal\n\nApakah Anda memiliki foto ruangan saat ini? Upload foto untuk analisis yang lebih detail."
    
    elif any(word in text_lower for word in ['harga', 'biaya', 'cost', 'price']):
        return "Untuk estimasi biaya yang akurat, saya perlu informasi:\n\n• Ukuran ruangan (panjang x lebar x tinggi)\n• Jenis material yang diinginkan\n• Tingkat kompleksitas desain\n• Lokasi proyek\n\nRata-rata biaya:\n• Plafon PVC: Rp 85.000-120.000/m²\n• Wall Panel WPC: Rp 95.000-150.000/m²\n\nSilakan berikan detail ruangan untuk kalkulasi yang presisi."
    
    elif any(word in text_lower for word in ['material', 'bahan']):
        return "Kami menyediakan material premium:\n\n🏗️ **Plafon:**\n• PVC berkualitas tinggi\n• Tahan lama dan anti rayap\n• Berbagai motif tersedia\n\n🧱 **Dinding:**\n• WPC (Wood Plastic Composite)\n• Ramah lingkungan\n• Mudah perawatan\n\nMau lihat katalog lengkap? Ketik 'katalog' untuk melihat semua pilihan material."
    
    elif 'katalog' in text_lower:
        return "📋 **Katalog Material Blockfix:**\n\n**Plafon PVC:**\n• Motif Kayu - Rp 95.000/m²\n• Motif Marmer - Rp 110.000/m²\n• Polos Premium - Rp 85.000/m²\n\n**Wall Panel WPC:**\n• Natural Wood - Rp 125.000/m²\n• Modern Stone - Rp 135.000/m²\n• Classic Design - Rp 115.000/m²\n\nUntuk melihat gambar dan detail, kunjungi halaman Katalog atau ketik nama material yang diminati."
    
    elif image:
        return "Terima kasih telah mengupload foto ruangan! 📸\n\nSedang menganalisis:\n• Dimensi ruangan\n• Kondisi existing\n• Potensi desain\n• Estimasi material\n\nBerdasarkan foto, saya akan memberikan rekomendasi desain yang sesuai. Mohon tunggu sebentar untuk analisis lengkap..."
    
    else:
        return f"Halo! Saya AI Assistant Blockfix siap membantu desain interior Anda. 🏠\n\nAnda mengatakan: '{text[:100]}'\n\nSaya bisa membantu dengan:\n• Konsultasi desain ruangan\n• Estimasi biaya material\n• Rekomendasi produk\n• Analisis foto ruangan\n\nSilakan ceritakan lebih detail tentang ruangan yang ingin didesain atau upload foto untuk analisis yang lebih akurat!"
