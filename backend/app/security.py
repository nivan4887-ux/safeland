import secrets

from fastapi import Header, HTTPException, status

from .config import get_settings


async def require_api_key(x_api_key: str | None = Header(default=None)) -> None:
    configured_key = get_settings().safeland_api_key
    if configured_key and (not x_api_key or not secrets.compare_digest(x_api_key, configured_key)):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or missing API key")
