from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    environment: str = "development"

    rabbitmq_host: str = "localhost"
    rabbitmq_port: int = 5672
    rabbitmq_user: str = "devsactum"
    rabbitmq_pass: str = "devsactum"

    postgres_host: str = "localhost"
    postgres_port: int = 5432
    postgres_db: str = "devsactum"
    postgres_user: str = "devsactum"
    postgres_pass: str = "devsactum"

    minio_endpoint: str = "localhost:9000"
    minio_access_key: str = "devsactum"
    minio_secret_key: str = "devsactum"
    minio_bucket: str = "devsactum-files"

    model_config = {"env_prefix": "", "case_sensitive": False}


settings = Settings()
