from celery import Celery
import time

celery_app = Celery("tasks", broker="redis://localhost:6379/0")

@celery_app.task
def heavy_task():
    print("重い処理開始")
    time.sleep(10)
    print("完了")
