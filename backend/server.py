from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Frontier Web Development API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Frontier Web Development API is running"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Contact form submission
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_form(contact_data: ContactMessageCreate):
    """
    Submit contact form and save to database
    """
    try:
        # Create contact message object
        contact_message = ContactMessage(**contact_data.dict())
        
        # Save to database
        result = await db.contact_messages.insert_one(contact_message.dict())
        
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to save contact message")
        
        # Here you could add email notification logic if needed
        # For now, we'll just return success
        
        return contact_message
        
    except Exception as e:
        logging.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

# Get all contact messages (for admin use)
@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages(limit: int = 100):
    """
    Get all contact messages (admin endpoint)
    """
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).limit(limit).to_list(limit)
        return [ContactMessage(**message) for message in messages]
    except Exception as e:
        logging.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact messages")

# Update contact message status
@api_router.put("/contact/{message_id}/status")
async def update_message_status(message_id: str, status: str):
    """
    Update the status of a contact message
    """
    try:
        result = await db.contact_messages.update_one(
            {"id": message_id},
            {"$set": {"status": status, "updated_at": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
        
        return {"message": "Status updated successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating message status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update message status")

# Services endpoint
@api_router.get("/services")
async def get_services():
    """
    Get all available services
    """
    services = [
        {
            "id": "website-development",
            "name": "Website Development",
            "price": "$200",
            "description": "Professional, responsive websites tailored to your business needs.",
            "image": "https://files.catbox.moe/6dj5x3.jpg",
            "features": ["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile First"]
        },
        {
            "id": "logo-design",
            "name": "Logo Designing",
            "price": "$10",
            "description": "Professional logo design services that capture your brand's essence.",
            "image": "https://files.catbox.moe/4ezw8t.jpg",
            "features": ["Unique Design", "Multiple Formats", "Commercial Rights", "Revisions Included"]
        },
        {
            "id": "streaming-accounts",
            "name": "Streaming Accounts",
            "price": "Contact for pricing",
            "description": "Affordable Netflix and Crunchyroll accounts.",
            "image": "https://files.catbox.moe/c1ekuj.jpg",
            "features": ["Netflix Access", "Crunchyroll Access", "Reliable Service", "Competitive Pricing"]
        },
        {
            "id": "code-dealer",
            "name": "Code Dealer",
            "price": "Custom pricing",
            "description": "Custom code solutions designed for resale and commercial use.",
            "image": "https://files.catbox.moe/7uhq6h.jpg",
            "features": ["Clean Code", "Well Documented", "Commercial Rights", "Multiple Languages"]
        },
        {
            "id": "free-psp-games",
            "name": "Free PSP Games",
            "price": "FREE",
            "description": "Join our exclusive WhatsApp channel for free PSP games!",
            "image": "https://files.catbox.moe/b05woz.jpg",
            "features": ["Free Access", "Regular Updates", "Game Library", "Community Support"]
        }
    ]
    
    return {"services": services}

# Analytics endpoint (basic)
@api_router.get("/analytics")
async def get_basic_analytics():
    """
    Get basic analytics data
    """
    try:
        total_messages = await db.contact_messages.count_documents({})
        new_messages = await db.contact_messages.count_documents({"status": "new"})
        
        # Get messages from last 30 days
        from datetime import timedelta
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        recent_messages = await db.contact_messages.count_documents({
            "timestamp": {"$gte": thirty_days_ago}
        })
        
        return {
            "total_messages": total_messages,
            "new_messages": new_messages,
            "recent_messages": recent_messages,
            "timestamp": datetime.utcnow()
        }
        
    except Exception as e:
        logging.error(f"Error fetching analytics: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch analytics")

# Legacy status check endpoints (keeping for compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("Frontier Web Development API started successfully")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Database connection closed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)