import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'
import Layout from '../components/Layout';
import { trpc } from "../utils/trpc";
import React, { useState, useEffect, MouseEvent } from "react";
import { CreateGroupInput } from "../server/trpc/router/schema/movie.schema";
import { Dropdown } from 'flowbite-react';
import { useForm } from 'react-hook-form'

const MovieDash: NextPage = () => {
  const [group, setGroup] = useState({group: 'General'})
  const { handleSubmit, register } = useForm<CreateGroupInput>()
  const [groupa, setGroupa] = useState({id: 'General'})
  const [editToggle, setEditToggle] = useState(false)
  const movies = trpc.auth.getAll.useQuery(group);
  let movieNum = ""
  const mutation = trpc.auth.editGroup.useMutation();

  function onSubmit(values: CreateGroupInput) {
    let valuesObj = {
      ...values,
      ...groupa
    }
    console.log(valuesObj)
    mutation.mutate(valuesObj)
  }

  function buttonHandler(e: MouseEvent<HTMLButtonElement>) {
    
    const target = e.target as Element;
    movieNum = target.id
    setGroupa({id: target.id})
    setEditToggle(!editToggle)
    
  }

  const CatShowcase: React.FC = () => {
    const groups = trpc.auth.getAllGroups.useQuery();
    const justGroups = [...new Set(groups.data?.map((group) => group.group))]
    
    const handleClick = (e: MouseEvent<HTMLButtonElement>, group: string) => {
      
      setGroup({group})
    }
    return (
      <div>
        <Dropdown
        label="Dropdown button"
        dismissOnClick={false}
        >
        {justGroups && justGroups.map((group) => {
          return (
            <Dropdown.Item key={group}>
              <button onClick={(e) => handleClick(e, group!)}>
                {group}
              </button>
            </Dropdown.Item>
          )
        })}
      </Dropdown>
    </div>
    );
  };
  return (
    <Layout>
    <CatShowcase />
    <div className='flex flex-nowrap flex-row overflow-x-auto gap-10 max-h-full py-5'>
        {movies.data && movies.data.map((movie) => {
            return (
                <div className="flex flex-col bg-slate-400  mx-2 rounded-xl basis-1" key={movie.id} id={movie.id}>
                  <div className="align-bottom px-2 py-5 flex justify-center">
                    <Image
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
                    {!editToggle &&
                      <button type="button" id={movie.id} onClick={buttonHandler} className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Add to Group</button>
                    }
                    {editToggle &&
                      <form onSubmit={handleSubmit(onSubmit)}>
                      <input className="color-blue" type='text' placeholder="Group title" {...register('group')}/>
                      <button className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Save</button>
                      </form >
                    }
                  </div>
                </div>
            )
        })}
    </div>
  
  </Layout>
  );
};

export default MovieDash;



