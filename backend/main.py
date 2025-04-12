from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tasks import heavy_task, celery_app
from celery.result import AsyncResult

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/start-task")
def start_task():
    task = heavy_task.delay()
    return {"message": "タスクをバックグラウンドで開始しました", "task_id": task.id}

@app.get("/task-status/{task_id}")
def get_task_status(task_id: str):
    result = AsyncResult(task_id, app=celery_app)

    if result.state == "PENDING":
        return {"status": "pending", "result": None}
    elif result.state == "SUCCESS":
        return {"status": "success", "result": result.result}
    elif result.state == "FAILURE":
        return {"status": "failure", "error": str(result.result)}
    else:
        return {"status": result.state, "result": None}