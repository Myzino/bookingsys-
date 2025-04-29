'use client';

import { useState } from 'react';

export default function UploadForm() {
  const [url, setUrl] = useState('');

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const file = e.target.file.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setUrl(data.url);
  };

  return (
    <div className="p-4 border rounded">
      <form onSubmit={handleUpload}>
        <input type="file" name="file" accept="image/*" />
        <button type="submit" className="ml-2 px-4 py-1 bg-blue-500 text-white">Upload</button>
      </form>
      {url && (
        <div className="mt-4">
          <p>Image URL:</p>
          <a href={url} target="_blank" rel="noreferrer">{url}</a>
          <img src={url} alt="Uploaded" className="mt-2 w-64 rounded" />
        </div>
      )}
    </div>
  );
}
