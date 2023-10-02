"use client"
import React,{useState} from 'react'

const Cloud = () => {
    const cloudName = "dgu1akbmr"
    const[image, setimage] = useState<any>()
    const[base64, setbase64] = useState<string>("")
    const handleform = (e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        if(!e.target.files)return alert("no file here")
        setimage(e.target.files[0])
    }
    const handleUpload = async()=>{
        
        // lets get the image converted to string of base64 first
        const reader = new FileReader();

reader.readAsDataURL(image);

reader.onloadend = () => {
  const base64 = reader.result as string; // Get the base64 data here

  // Create a new FormData object and append the base64 data
  const form = new FormData();
  form.append("file", base64);
  form.append("upload_preset", "images");

  // Now, let's upload to Cloudinary
  fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: form, // Pass the FormData directly
  })
    .then((result) => {
      return result.json(); // Parse the response
    })
    .then((res) => {
      alert(res.secure_url); // Log the parsed response
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

        
    }
  return (
    <div>
        <input type='file'  onChange={handleform}/>
        <button onClick={handleUpload}>upload</button>
    </div>
  )
}

export default Cloud