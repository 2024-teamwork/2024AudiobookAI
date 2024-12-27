import React, { useState } from "react";

const DownloadJob = () => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  const handleDownload = async () => {
    const taskID = "8961e00f-ad32-4f31-9b5e-35cab438bf72";
    const resultType = "podcast";
    const url = `https://audioai.alphalio.cn/api/v1/jobs/download?task_id=${taskID}&result_type=${resultType}`;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNDU4MGVlZC0zMjIyLTQ5YmQtODE3MS0wYmNkZTBiMmQ3OTQiLCJleHAiOjE3MzcwNjk2NDJ9.uKR7IA1j5n9i0xBlksTZMNPl-gnbu_3qyG6znRzE5Xc";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const downloadLink = window.URL.createObjectURL(blob);
      setDownloadUrl(downloadLink);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Job</button>
      {downloadUrl && (
        <p>
          <a href={downloadUrl} download="job_podcast">
            Click here to download the file
          </a>
        </p>
      )}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default DownloadJob;
