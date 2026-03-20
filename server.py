from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from backend.core.database import init_db

from backend.routes.objects_route import router as objects_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    print("[DB] Disposing connection. Closing server...")


server = FastAPI(
    title="Backend Test",
    version="1.0.0",
    prefix="/api/v1",
    lifespan=lifespan,
    # swagger_ui_parameters={
    #     "syntaxHighlight.theme": "monokai",
    #     "defaultModelsExpandDepth": -1,
    #     "docExpansion": "none"
    # },
)

server.mount("/static", StaticFiles(directory="static"), name="static")


@server.get("/icon", include_in_schema=False)
async def favicon():
    return FileResponse("static/image.png")

ALLOWED_ORIGINS = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8081",
    "http://192.168.1.42:8081",  # ← IP locale de ta machine, accès depuis mobile
]

server.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ plus de double liste
    allow_methods=["POST", "GET", "PUT", "PATCH", "DELETE"],
    allow_headers=["*"],
)

# Debug: trace chaque requête HTTP (utile quand on reçoit un 404)
@server.middleware("http")
async def log_requests(request: Request, call_next):
    client_ip = request.client.host if request.client else "unknown"
    query = request.url.query
    full_url = str(request.url)
    print(
        f"[HTTP] {client_ip} {request.method} {full_url}"
        + (f"?{query}" if query else "")
    )

    response = await call_next(request)

    print(
        f"[HTTP] <- {response.status_code} {request.method} {request.url.path}"
    )
    return response

# Routes
server.include_router(objects_router)
