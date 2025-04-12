from celery import Celery
import time

celery_app = Celery(
    "tasks",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)


@celery_app.task
def heavy_task():
    time.sleep(5)
    return "処理が完了しました！これは結果です"