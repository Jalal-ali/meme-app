import axios from 'axios'
import dynamic from 'next/dynamic';
import Link from 'next/link'
import { comment } from 'postcss';
import React from 'react'

const page = async () => {
  const Component = dynamic(() => import('./generator/page'));

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
    <div className='bg-gray-950 py-5'>
    <div className="max-w-3xl mx-auto text-center">
    <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Meme Generator</span>
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
    </h1>
    <p className="text-lg text-gray-800 mb-8">In this web application, you can create multiple memes. Simply select any template to get started.</p>
</div>
    <div className='text-center border-t-2 border-b-2 py-4 rounded mx-4 flex justify-center flex-wrap gap-4 pt-4'>
   
    {res ? (
  res.map((item: memes) => (
    <div key={item.id} className="w-52">
      <div className="hover:shadow-sm pb-4 pt-2 px-1  duration-400 hover:shadow-slate-400 border border-opacity-40 border-gray-800 bg-slate-950 object-contain rounded flex flex-col items-center">
        <img
          src={item.url}
          className="shadow rounded object-fill w-48 h-44"
          alt="Item"
        />
        <div className="mt-8">
          <div className="mt-4">
            <Link
              className="focus:outline-none text-slate-200 bg-teal-900 hover:bg-teal-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              href={{
                pathname: 'generator',
                query: {
                  url: item.url,
                  id: item.id,
                  box_count: item.box_count,
                },
              }}
            >
              Create
            </Link>
          </div>
        </div>
      </div>
    </div>
  ))
) : (
  <h1>Loading...</h1>
)}

    </div>
                  </div>
    </>
  )
}

export default page