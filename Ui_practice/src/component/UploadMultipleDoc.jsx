import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);  // ⬅️ matches backend multer array('files')
    });

    try {
      const res = await axios.post('http://localhost:5000/upload/multipleFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      alert('Files uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Upload failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="file"
        name="files"  // ⬅️ single input for both docs/images
        multiple
        accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt"
        onChange={handleChange}
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;
