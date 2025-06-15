#!/usr/bin/env python3
import requests
import json
import unittest
import os
import sys
import uuid
from datetime import datetime

# Get the backend URL from the frontend .env file
BACKEND_URL = "https://51773a74-df7a-4568-9c66-1d45a9063559.preview.emergentagent.com"
API_URL = f"{BACKEND_URL}/api"

class BackendAPITest(unittest.TestCase):
    """Test suite for the Frontier Web Development backend API endpoints"""

    def setUp(self):
        """Set up test environment"""
        self.api_url = API_URL
        self.test_contact_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "message": "This is a test message from the automated test suite."
        }
        print(f"\nTesting against API URL: {self.api_url}")

    def test_health_endpoint(self):
        """Test the health check endpoint"""
        print("\n--- Testing Health Check Endpoint ---")
        response = requests.get(f"{self.api_url}/health")
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        self.assertEqual(response.status_code, 200)
        self.assertIn("status", response.json())
        self.assertEqual(response.json()["status"], "healthy")
        self.assertIn("timestamp", response.json())
        print("✅ Health check endpoint test passed")

    def test_services_endpoint(self):
        """Test the services endpoint"""
        print("\n--- Testing Services Endpoint ---")
        response = requests.get(f"{self.api_url}/services")
        
        print(f"Status Code: {response.status_code}")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        self.assertIn("services", data)
        services = data["services"]
        self.assertEqual(len(services), 5, "Should return exactly 5 services")
        
        # Check that each service has the required fields
        required_fields = ["id", "name", "price", "description", "image", "features"]
        for service in services:
            for field in required_fields:
                self.assertIn(field, service, f"Service missing required field: {field}")
            
            # Check that features is a non-empty list
            self.assertIsInstance(service["features"], list)
            self.assertTrue(len(service["features"]) > 0, "Features list should not be empty")
        
        # Verify specific service exists
        service_names = [service["name"] for service in services]
        expected_services = [
            "Website Development", 
            "Logo Designing", 
            "Streaming Accounts", 
            "Code Dealer", 
            "Free PSP Games"
        ]
        
        for expected in expected_services:
            self.assertIn(expected, service_names, f"Missing expected service: {expected}")
        
        print("✅ Services endpoint test passed")

    def test_contact_form_submission(self):
        """Test the contact form submission endpoint"""
        print("\n--- Testing Contact Form Submission Endpoint ---")
        
        # Generate a unique email to avoid duplicate submissions
        unique_email = f"test.{uuid.uuid4()}@example.com"
        self.test_contact_data["email"] = unique_email
        
        print(f"Submitting contact form with data: {self.test_contact_data}")
        
        response = requests.post(
            f"{self.api_url}/contact", 
            json=self.test_contact_data
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Check that the response contains the expected fields
        self.assertIn("id", data)
        self.assertIn("name", data)
        self.assertIn("email", data)
        self.assertIn("message", data)
        self.assertIn("timestamp", data)
        self.assertIn("status", data)
        
        # Check that the data matches what we sent
        self.assertEqual(data["name"], self.test_contact_data["name"])
        self.assertEqual(data["email"], self.test_contact_data["email"])
        self.assertEqual(data["message"], self.test_contact_data["message"])
        self.assertEqual(data["status"], "new")
        
        # Save the message ID for later tests
        self.message_id = data["id"]
        print(f"Created contact message with ID: {self.message_id}")
        print("✅ Contact form submission test passed")
        
        return data

    def test_get_contact_messages(self):
        """Test retrieving contact messages"""
        print("\n--- Testing Get Contact Messages Endpoint ---")
        
        # First submit a contact form to ensure there's at least one message
        submitted_data = self.test_contact_form_submission()
        
        response = requests.get(f"{self.api_url}/contact")
        
        print(f"Status Code: {response.status_code}")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Check that we got a list of messages
        self.assertIsInstance(data, list)
        
        # Check if our submitted message is in the list
        found = False
        for message in data:
            if message["id"] == submitted_data["id"]:
                found = True
                self.assertEqual(message["name"], submitted_data["name"])
                self.assertEqual(message["email"], submitted_data["email"])
                self.assertEqual(message["message"], submitted_data["message"])
                break
        
        self.assertTrue(found, "Submitted message not found in retrieved messages")
        print("✅ Get contact messages test passed")

    def test_update_message_status(self):
        """Test updating a message status"""
        print("\n--- Testing Update Message Status Endpoint ---")
        
        # First submit a contact form to get a message ID
        submitted_data = self.test_contact_form_submission()
        message_id = submitted_data["id"]
        
        # Update the status to "read"
        new_status = "read"
        response = requests.put(
            f"{self.api_url}/contact/{message_id}/status?status={new_status}"
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        self.assertEqual(response.status_code, 200)
        self.assertIn("message", response.json())
        
        # Verify the status was updated by retrieving the message
        response = requests.get(f"{self.api_url}/contact")
        self.assertEqual(response.status_code, 200)
        
        messages = response.json()
        found = False
        for message in messages:
            if message["id"] == message_id:
                found = True
                self.assertEqual(message["status"], new_status)
                break
        
        self.assertTrue(found, "Updated message not found in retrieved messages")
        print("✅ Update message status test passed")

    def test_analytics_endpoint(self):
        """Test the analytics endpoint"""
        print("\n--- Testing Analytics Endpoint ---")
        
        # First submit a contact form to ensure there's data for analytics
        self.test_contact_form_submission()
        
        response = requests.get(f"{self.api_url}/analytics")
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Check that the response contains the expected fields
        self.assertIn("total_messages", data)
        self.assertIn("new_messages", data)
        self.assertIn("recent_messages", data)
        self.assertIn("timestamp", data)
        
        # Check that the counts are non-negative integers
        self.assertIsInstance(data["total_messages"], int)
        self.assertIsInstance(data["new_messages"], int)
        self.assertIsInstance(data["recent_messages"], int)
        self.assertGreaterEqual(data["total_messages"], 0)
        self.assertGreaterEqual(data["new_messages"], 0)
        self.assertGreaterEqual(data["recent_messages"], 0)
        
        # Total messages should be at least as many as new messages
        self.assertGreaterEqual(data["total_messages"], data["new_messages"])
        
        print("✅ Analytics endpoint test passed")

    def test_error_handling(self):
        """Test error handling for invalid requests"""
        print("\n--- Testing Error Handling ---")
        
        # Test invalid contact form submission (missing required fields)
        print("Testing invalid contact form submission...")
        invalid_data = {"name": "Test User"}  # Missing email and message
        response = requests.post(f"{self.api_url}/contact", json=invalid_data)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        self.assertNotEqual(response.status_code, 200)
        self.assertTrue(response.status_code >= 400)
        
        # Test invalid message ID for status update
        print("Testing invalid message ID for status update...")
        invalid_id = "nonexistent-id-12345"
        response = requests.put(f"{self.api_url}/contact/{invalid_id}/status?status=read")
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        self.assertEqual(response.status_code, 404)
        
        print("✅ Error handling test passed")

    def test_cors_headers(self):
        """Test that CORS headers are properly set"""
        print("\n--- Testing CORS Headers ---")
        
        response = requests.options(f"{self.api_url}/health")
        
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {response.headers}")
        
        self.assertIn("Access-Control-Allow-Origin", response.headers)
        self.assertEqual(response.headers["Access-Control-Allow-Origin"], "*")
        
        print("✅ CORS headers test passed")

def run_tests():
    """Run all tests"""
    print(f"Starting backend API tests against {API_URL}")
    unittest.main(argv=['first-arg-is-ignored'], exit=False)

if __name__ == "__main__":
    run_tests()