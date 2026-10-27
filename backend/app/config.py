from functools import lru_cache
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=(".env", "backend/.env"), extra="ignore")

    app_name: str = "SafeLand Risk Intelligence API"
    app_env: Literal["development", "test", "production"] = "development"
    api_prefix: str = "/api/v1"
    mongodb_uri: str = "mongodb://127.0.0.1:27017"
    mongodb_database: str = "safeland"
    redis_url: str = "redis://127.0.0.1:6379/0"
    cors_origins: str = "http://localhost:3000"
    safeland_api_key: str | None = Field(default=None, min_length=12)

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
