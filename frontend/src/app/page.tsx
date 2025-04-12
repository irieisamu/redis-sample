'use client'; // クライアントコンポーネントであることを明示

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const res = await fetch("http://localhost:8000/start-task", {
      method: "POST",
    });
    const data = await res.json();
    setMessage(`${data.message} / task_id: ${data.task_id}`);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>非同期タスクを実行</h1>
      <button onClick={handleClick}>実行</button>
      <p>{message}</p>
    </main>
  );
}
