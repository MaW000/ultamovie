import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react";
import Layout from '../components/Layout';
import { trpc } from "../utils/trpc";
import React, { useState, useEffect } from "react";
import { CreateMovieInput } from "../server/trpc/router/schema/movie.schema";
const MovieDash: NextPage = () => {
  const mutation = trpc.auth.getAll.useQuery();
  
    const handleDelete = async(e) => {
        const dbkey = (e.target.parentNode.parentNode.getAttribute('dbkey'));
        try {
          
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <Layout>
    
    <div className='flex flex-nowrap flex-row overflow-x-auto gap-10 max-h-full py-5'>
        {mutation.data && mutation.data.map((movie) => {
            return (
      
                <div className="flex flex-col bg-slate-400  mx-2 rounded-xl basis-1" key={movie.id}>
                  <div className="flex px-2 py-5 justify-center">
                    <Image
                      className="justify-center"
                      alt="Movie Poster"
                      src={ movie.poster}
                      width={300}
                      height={300}
                      priority
                    />
                  </div>
        
                  <div className='flex-1'>
                    <div className='px-12'>
                      <h1 className='text-3xl px-5 py-0 break-normal text-center whitespace-nowrap'>{movie.title}</h1>
        
                      <div className="flex text-center justify-center">
                        <h2 className='w-14 text-xl'>{movie.year}</h2>
                        <h2 className='text-xl w-3.5'>|</h2>
                        <h2 className='w-14 text-xl'>{movie.rated}</h2>
                        <h2 className='text-xl w-3.5'>|</h2>
                        <h2 className='w-14 text-xl'>{movie.imdbRating}</h2>
                      </div>
                    </div>
                    <div className='leading-relaxed px-3 pb-2  '>
                      <p className="text-lg">{movie.plot}</p>
                    </div>
                  </div>
                  <div className='flex justify-center pb-5'>
                    <button type="button" onClick={handleDelete} className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Delete</button>
                  </div>
                </div>
            )
        })}
    </div>
  
  </Layout>
  );
};

export default MovieDash;

