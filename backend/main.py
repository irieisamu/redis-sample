from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tasks import heavy_task

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
