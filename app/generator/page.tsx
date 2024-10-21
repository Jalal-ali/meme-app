"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const page = () => {
  const searchParams = useSearchParams()
  const [boxCount, setBoxCount] = useState<number>(0);
  const input = useRef
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
  
     // Get individual parameters
     const url = searchParams.get('url')?? '';
     const id = searchParams.get('id')?? '';
     
     const updateInputValue = (index: number, value: string) => {
      setInputValues((prev) => ({ ...prev, [index]: value }));
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Submitted Values:", inputValues);
    };
    const renderInputFields = () => {
      return Array.from({ length: boxCount }).map((_, index) => (
        <div key={index}>
          <label>Input {index + 1}: </label>
          <input
            type="text"
            value={inputValues[index] || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateInputValue(index, e.target.value)}
          />
        </div>
      ));
    };

     https://api.imgflip.com/caption_image?template_id=181913649&username=UmarKhan8&password=memeapp12&text0=Heythere&text1=hello world
   

  useEffect(() => {
    const count = parseInt(searchParams.get('box_count') ?? '0', 10);
    setBoxCount(count);
  }, [searchParams]);
 
  
  
  
  return (
    <>
    <h1>Generate</h1>
    <img src={url} alt="meme" />
    <p>ID: {id}</p>
    <p>Box Count: {boxCount}</p>
    <form onSubmit={handleSubmit}>
      <h1>Dynamic Input Fields</h1>
      {renderInputFields()}
      <button type="submit">Submit</button>
    </form>
    {Object.values(inputValues).map((value: string, index: number)  => {
      return <div key={index}>
        <p>{value}</p>
      </div>
    })}

    
    </>
  )
}

export default page