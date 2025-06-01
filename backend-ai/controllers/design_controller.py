def handle_generate_design(data):
    try:
        user_text = data.get('text', '')
        user_image = data.get('image', None)  # base64 image string (optional)
        sender = data.get('sender', '')

        # Contoh proses sederhana:
        # Kalau ada gambar + teks, AI atau logic lain bisa dipanggil di sini.
        # Sekarang kita balikin contoh reply statis dulu.

        reply_text = f"Terima kasih, saya terima permintaan desain Anda: '{user_text[:100]}'."

        # Bisa juga logic AI atau pemrosesan gambar ditempatkan di sini.

        response = {
            "reply": reply_text
        }
        return response, 200

    except Exception as e:
        return {"error": str(e)}, 500
