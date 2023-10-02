"use client"
import React,{useState} from 'react'

const Cloud = () => {
    const cloudName = "dgu1akbmr"
    const[image, setimage] = useState<any>()
    const[base64, setbase64] = useState<string>("")
    const[allBase, setallBase] = useState<any[]>([])
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
    // handling new form here
    const newForm = async(e: React.ChangeEvent<HTMLInputElement>)=>{
        if(!e.target.files) return 
        const files = e.target.files
        const newFile = Array.from(files)
        let promise:Promise<string | ArrayBuffer>[] = [];

        for(let i = 0; i < newFile.length; i++){
            const reader = new FileReader()
            const gottenPromise = new Promise<string | ArrayBuffer>((resolve)=>{
                reader.readAsDataURL(newFile[i]);
                reader.onloadend = ()=>{
                    resolve(reader.result as string | ArrayBuffer)
                }
            })
            promise.push(gottenPromise)
        }
        const allPromise = await Promise.all(promise)
        setallBase(allPromise)
    }
    // lets upload many images
    const handleMany = async () => {
        const urlLink: string[] = [];
      
        // Create an array of promises for each fetch request
        const fetchPromises = allBase.map(async (base) => {
          const formData = new FormData();
          formData.append(`file`, base);
          formData.append("upload_preset", "images");
      
          try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
              method: "POST",
              headers: {
                // Remove "Content-Type" header or set it to "multipart/form-data" for FormData
              },
              body: formData,
            });
      
            if (response.ok) {
              const result = await response.json();
              urlLink.push(result.secure_url);
            } else {
              console.error(`Failed to upload an image: ${response.statusText}`);
            }
          } catch (err) {
            console.error(err);
          }
        });
      
        // Wait for all promises to resolve using Promise.all
        await Promise.all(fetchPromises);
      
        // At this point, all fetch requests have completed
        console.log(urlLink);
        alert(urlLink)
      };
      
      // Call the function
      
      
  return (
    <div>
        <input type='file' multiple accept='image/*'  onChange={handleform}/>
        <input  type='file' multiple accept='image/*'  onChange={newForm}/>
        <button onClick={handleUpload}>upload</button>
        <button onClick={handleMany}>upload many</button>
    </div>
  )
}

export default Cloud