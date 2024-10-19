import axios from 'axios'
import Link from 'next/link'
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
        return <div key={item.id} className='flex-co flex w-full bg-gray-800 justify-center'>
          <div className='flex-col'>

          {/* <h1>{item.name}</h1> */}
          <img className='' src={item.url} alt="no-img" width={200} height={item.height} />
          <button className='border rounded-lg p-2 m-2'><Link
        href={{
          pathname: '/generator',
          query: {
            url: item.url,
            id: item.id,
            box_count: item.box_count,
          },
        }}
      >create
      </Link></button>
          
          </div>
           {/* <Image src={item.url} width={item.width} height={item.height} alt='meme-img' /> */}
        </div>  
      }) : <h1>Loading..</h1>}
    </div>
    </>

  )
}

export default page