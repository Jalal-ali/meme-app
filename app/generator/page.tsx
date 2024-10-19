"use client"

import { useSearchParams } from "next/navigation"

const page = () => {
    // interface memes {
    //     id: string ,
    //     name: string,
    //     url: string,
    //     width: number,
    //     height: number,
    //     box_count: number  
    //   }

    const searchParams = useSearchParams()
     // Get individual parameters
  const url = searchParams.get('url')?? '';
  const id = searchParams.get('id')?? '';
  const boxCount = searchParams.get('box_count')?? '';
  return (
    <>
    <h1>Generate</h1>
    <img src={url} alt="meme" />
    <p>ID: {id}</p>
    <p>Box Count: {boxCount}</p>

    
    </>
  )
}

export default page