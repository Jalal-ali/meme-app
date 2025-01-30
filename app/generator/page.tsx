"use client";

import axios from "axios"
import { useEffect, useState } from "react"

const page = (searchParam : any) => {
  // Get params
  const { url, box_count, id } = searchParam.searchParams

  const [boxCount, setBoxCount] = useState<number>(0);
  const [meme, setMeme] = useState<string | null>(null);
  const [download , setDownload] = useState(true)

  // on page load 
  useEffect(() => {
    setMeme(url)
    const count = parseInt((box_count) ?? '0', 10);
    setBoxCount(count);
  }, []);

  

  const [inputValues, setInputValues] = useState(Array(boxCount).fill('')); // Initialize state with empty strings
  
     const updateInputValue = (index: number, value: string): void => {
      const newValues: string[] = [...inputValues]; 
      newValues[index] = value;                     
      setInputValues(newValues);                 
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if(inputValues.length <= 0){
        alert("Text fields must be filled.")
        return
      }
      setMeme(null)
      // console.log("Submitted Values:", inputValues);
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
        <div key={index} className="text-center items-center flex space-x-1 my-2">
          <label className="font-mono" htmlFor="text"> {index + 1}.</label>
          <input
          placeholder="Text here..."
          className="w-full rounded-md border border-gray-800 shadow-md bg-slate-200 py-1 px-3 text-base font-medium text-black outline-none focus:border-[#6A64F1] focus:shadow-md"
          id="text"
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
    
        //  link element
        const link = document.createElement("a");
        link.href = blobUrl;
        //  filename
        link.download = "meme.jpg";
        document.body.appendChild(link);
        // Trigger the download
        link.click();
    
        // Clean 
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error downloading the image:", error);
      }
    };
    

     
   

  
  return (
    <>
    <div className="from-indigo-900 to-indigo-950 bg-gradient-to-tr pt-6 min-h-screen max-h-full">
  <div className="flex justify-center items-center min-h-screen">
    <div className="bg-gray-900 my-4 bg-opacity-40 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl text-center w-full max-w-md">
      {meme ? (
        <img
          className="shadow-lg rounded-lg w-full max-w-60 justify-self-center"
          src={meme}
          alt="meme"
        />
      ) : (
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-10 my-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-4">
        {renderInputFields()}
        <button
          className="focus:outline-none text-slate-200 bg-indigo-700 focus:ring-4 hover:bg-indigo-900 focus:ring-indigo-700 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2"
          type="submit"
        >
          Create
        </button>
      </form>
      {download && (
        <button
          className="mt-2 focus:outline-none text-slate-200 bg-emerald-800 hover:bg-teal-900 focus:ring-4 focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={downloadImage}
        >
          Download Meme
        </button>
      )}
    </div>
  </div>
</div>

    </>
  )
}

export default page