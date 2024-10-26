import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function WordReader() {
  const [text, setText] = useState("");

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setText(data.text);
    } catch (error) {
      console.error(error);
    }
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop a Word document here, or click to select one</p>
      <p>{text}</p>
    </div>
  );
}
