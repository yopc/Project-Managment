// import React, { useState } from 'react';
// import axios from 'axios';

// function ImageUploadForm() {
//   const [image, setImage] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('');

//   const handleChange = (e) => {
//     setImage(e.target.files[0]); // Pick the first selected file
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       return setUploadStatus('Please select an image');
//     }

//     const formData = new FormData();
//     formData.append('image', image); // must match `upload.single('image')`

//     try {
//       const res = await axios.post('http://localhost:5000/upload/image', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setUploadStatus('Image uploaded successfully!');
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//       setUploadStatus('Failed to upload image');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <input type="file" name="image" accept="image/*" onChange={handleChange} />
//       <button type="submit">Upload</button>
//       <p>{uploadStatus}</p>
//     </form>
//   );
// }

// export default ImageUploadForm;
