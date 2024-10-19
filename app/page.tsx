

import axios from 'axios'
import { error, log } from 'console'
import Image from 'next/image'
import React from 'react'

const page = async () => {

  interface memes {
    id: string ,
    name: string,
    url: string,
    width: number,
    height: number,
    box_count: number
    
  }

  const res = await  axios('https://api.imgflip.com/get_memes')
  .then((res) => res.data.data.memes)
  .catch((error) => {
    console.log(error);
    
  })
  
  console.log(res);
  
  return (
    <>
    <h1 className='text-center'>Memes</h1>
    <div className='text-center'>
      {res ? res.map((item : memes) =>{ 
        return <div key={item.id} className='flex justify-center'>
          {/* <h1>{item.name}</h1> */}
          <img className='' src={item.url} alt="no-img" width={200} height={item.height} />
           {/* <Image src={item.url} width={item.width} height={item.height} alt='meme-img' /> */}
        </div>  
      }) : <h1>Loading..</h1>}
    </div>
    </>

  )
}

export default page