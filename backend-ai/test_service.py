import requests
import json
import time

def test_ai_service():
    """Test the AI Design Service endpoints"""
    BASE_URL = "http://localhost:5000"
    
    print("\n🔍 Testing Blockfix AI Design Service")
    print("-" * 50)

    # Test 1: Health Check
    print("\n1️⃣ Testing Health Check endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        assert response.status_code == 200
        print("✅ Health Check: OK")
    except Exception as e:
        print(f"❌ Health Check failed: {str(e)}")

    # Test 2: Home endpoint
    print("\n2️⃣ Testing Home endpoint...")
    try:
        response = requests.get(BASE_URL)
        assert response.status_code == 200
        print("✅ Home endpoint: OK")
    except Exception as e:
        print(f"❌ Home endpoint failed: {str(e)}")

    # Test 3: Design API - Room types
    print("\n3️⃣ Testing Design API with different room types...")
    test_messages = [
        "Saya ingin mendesain kamar tidur",
        "Bagaimana desain untuk ruang tamu?",
        "Berapa harga untuk renovasi dapur?",
        "Mau lihat katalog material",
    ]

    for msg in test_messages:
        try:
            response = requests.post(
                f"{BASE_URL}/api/design",
                json={
                    "text": msg,
                    "sender": "test_user",
                    "image": None
                }
            )
            assert response.status_code == 200
            print(f"✅ Design API ({msg[:20]}...): OK")
            print(f"   Response: {response.json()['reply'][:50]}...")
            time.sleep(1)  # Delay between requests
        except Exception as e:
            print(f"❌ Design API failed for '{msg}': {str(e)}")

    print("\n✨ Test suite completed!")

if __name__ == "__main__":
    test_ai_service()
