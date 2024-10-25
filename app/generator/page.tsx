"use client"

import axios from "axios"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const page = () => {
  const searchParams = useSearchParams()
  const [boxCount, setBoxCount] = useState<number>(0);
  const [meme, setMeme] = useState<string | null>(null);

  
  // Get individual parameters
  // const url = searchParams.get('url')?? '';
  const id = searchParams.get('id')?? '';
  useEffect(() => {
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
      event.preventDefault();
      console.log("Submitted Values:", inputValues[2]);
      const response = await axios(`https://api.imgflip.com/caption_image?template_id=${id}&username=UmarKhan8&password=memeapp12&${inputValues.map((text , index) => `text${index}=${text}`).join(`&`)}`,{
        method: 'POST'
    })
    console.log(response.data.data.url);
    setMeme(response.data.data.url)
    };
    const renderInputFields = () => {
      return Array.from({ length: boxCount }).map((_, index) => (
        <div key={index}>
          <label>Input {index + 1}: </label>
          <input
            className="text-black px-2 m-1"
            type="text"
            value={inputValues[index] || ''}
            onChange={(e) => updateInputValue(index, e.target.value)}
          />
        </div>
      ));
    };

     
   

 
 
  
  
  
  return (
    <>
    <h1>Generate</h1>
    <form onSubmit={handleSubmit}>
      {renderInputFields()}
      <button type="submit">Submit</button>
    </form>    
    {meme && <Image src={meme} width={200} height={150} alt="meme" />}
    </>
  )
}

export default page