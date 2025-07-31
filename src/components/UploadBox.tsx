import  { useState } from "react";

interface UploadBoxProps {
  onUploadSuccess: () => void;
}

export default function UploadBox({ onUploadSuccess }: UploadBoxProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading...");
      const res = await fetch("https://cruxws.onrender.com/api/v1" + "/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      setStatus("✅ Uploaded successfully");
      onUploadSuccess();
    } catch (err) {
      setStatus("❌ Upload failed");
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
      />
      <button onClick={handleUpload} disabled={!file} style={{ marginLeft: "1rem" }}>
        Upload
      </button>
      <p>{status}</p>
    </div>
  );
}
