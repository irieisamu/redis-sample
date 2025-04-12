'use client';

import { useState } from "react";

export default function Home() {
  const [taskId, setTaskId] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/start-task", {
      method: "POST",
    });
    const data = await res.json();
    setTaskId(data.task_id);
    setResult("🔄 タスク実行中...");
    
    const interval = setInterval(async () => {
      const statusRes = await fetch(`http://localhost:8000/task-status/${data.task_id}`);
      const statusData = await statusRes.json();

      if (statusData.status === "success") {
        setResult("✅ " + statusData.result);
        clearInterval(interval);
        setLoading(false);
      } else if (statusData.status === "failure") {
        setResult("❌ エラー：" + statusData.error);
        clearInterval(interval);
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>🚀 非同期タスクを実行</h1>
      
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s'
        }}
      >
        {loading ? '実行中...' : '🎯 タスクを実行'}
      </button>

      <div style={{ marginTop: 30 }}>
        <p><strong>🆔 task_id:</strong> {taskId}</p>
        <p><strong>📦 結果:</strong> {result}</p>
      </div>
    </main>
  );
}
