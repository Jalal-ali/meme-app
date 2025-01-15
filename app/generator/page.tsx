"use client"

import axios from "axios"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const page = () => {
  const searchParams = useSearchParams()
  const [boxCount, setBoxCount] = useState<number>(0);
  const [meme, setMeme] = useState<string | null>(null);
  const [download , setDownload] = useState(true)

  const id = searchParams.get('id')?? '';
  // on page load 
  useEffect(() => {
    // Get individual parameters
    const url = searchParams.get('url')?? '';
    setMeme(url)
    const count = parseInt(searchParams.get('box_count') ?? '0', 10);
    setBoxCount(count);
  }, [searchParams]);

  

  const [inputValues, setInputValues] = useState(Array(boxCount).fill('')); // Initialize state with empty strings
  
     const updateInputValue = (index: number, value: string): void => {
      const newValues: string[] = [...inputValues]; 
      newValues[index] = value;                     
      setInputValues(newValues);                 
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      alert("Creating... Please wait!")
      event.preventDefault();
      console.log("Submitted Values:", inputValues);
      const response = await axios(`https://api.imgflip.com/caption_image?template_id=${id}&username=UmarKhan8&password=memeapp12&${inputValues.map((text , index) => `text${index}=${text}`).join(`&`)}`,{
        method: 'POST'
      })
      const memeUrl = response.data.data.url;
      setMeme(memeUrl);
      alert("Meme Created Successfully!")
      setDownload(true)
    }
    
    const renderInputFields = () => {
      return Array.from({ length: boxCount }).map((_, index) => (
        <div key={index}>
          <label>Text {index + 1} : </label>
          <input
            className="text-black px-2 m-1"
            type="text"
            value={inputValues[index] || ''}
            onChange={(e) => updateInputValue(index, e.target.value)}
          />
        </div>
      ));
    };

    const downloadImage = async () => {
      if (!meme) return;
    
      try {
        // Fetch the image as a Blob
        const response = await fetch(meme);
        const blob = await response.blob();
    
        // Create a local URL for the Blob
        const blobUrl = URL.createObjectURL(blob);
    
        // Create a temporary link element
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "meme.jpg"; // Specify the filename
        document.body.appendChild(link);
    
        // Trigger the download
        link.click();
    
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl); // Release memory
      } catch (error) {
        console.error("Error downloading the image:", error);
      }
    };
    

     
   

  
  return (
    <>
    {meme && <Image src={meme} width={200} height={150} alt="meme" />}
      <form onSubmit={handleSubmit}>
      {renderInputFields()}
      <button className="border py-2 px-3 my-2 rounded" type="submit">Create</button>
    </form>    
    {download && <button  className="border py-2 px-3 my-4 rounded-2xl" onClick={downloadImage}>Download Meme</button>}

    </>
  )
}

export default page