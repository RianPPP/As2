// export default function ImageUpload({ onUpload }) {
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');

//     const res = await fetch(`https://api.cloudinary.com/v1_1/ddfss9v6q/image/upload`, {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await res.json();
//     onUpload(data.secure_url);
//   };

//   return <input type="file" accept="image/*" onChange={handleFileChange} />;
// }
export default function ImageUpload({ onUpload }) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ecom_project'); 
    formData.append('cloud_name', 'ddfss9v6q');


    const res = await fetch(`https://api.cloudinary.com/v1_1/ddfss9v6q/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.secure_url) {
      onUpload(data.secure_url); // ✅ truyền URL ảnh lên component cha
    } else {
      alert('❌ Upload failed!');
    }
  };

  return <input type="file" accept="image/*" onChange={handleFileChange} />;
}
