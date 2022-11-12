import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react";
import Layout from '../components/Layout';
import { trpc } from "../utils/trpc";
import { useState, useEffect } from "react";
import { CreateMovieInput } from "../server/trpc/router/schema/movie.schema";
import { group } from "console";
const Home: NextPage = () => {
  const { data: sessionData} = useSession();
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  interface Inputs {
    title: string,
    year?: number
  }
  const [inputs, setInputs] = useState<Inputs>({title: 'a'})
  const [movie, setMovie] = useState<{[key: string]: any}>({});
  const [like, setLike] = useState(0)
  const [liked, setLiked] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target
    console.log(e.target, name, value)
    setInputs(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const mutation = trpc.auth.saveMovie.useMutation();
  console.log(movie)
  const input = {
    plot: movie.Plot,
    title: movie.Title,
    year: movie.Year,
    rated: movie.Rated,
    imdbRating: movie.imdbRating,
    poster: movie.Poster,
    group: 'Generalfz',
  };
  const handleSave = (input: CreateMovieInput) => {
    
   
    mutation.mutate(input)
  }

  useEffect(() => {
    try {
      fetch(`http://www.omdbapi.com/?t=${inputs.title}&y=${inputs.year}&apikey=c450e1a6`)
        .then((response) => response.json())
        .then((data) => {
          if(Object.keys(data).length > 3){
            if(data.Poster && data.Poster.substring(0, 8) !== 'https://') {
              delete data.Poster
              setMovie(data)
              // setLike(likes.reduce((counter, obj) => {
              //   if(obj.imdbID === data.imdbID) counter += 1
              //   return counter;
              // }, 0))
            } else {
              setMovie(data)
              // setLike(likes.reduce((counter, obj) => {
              //   if(obj.imdbID === data.imdbID) counter += 1
              //   return counter;
              // }, 0))
            }}
        })
    } catch (error) {
      console.log(error);
    }
  }, [inputs])

  return (
    <Layout>
    <div className='text-center bg-slate-600 rounded-3xl flex flex-col'>
      <div className='flex justify-center p-5'>
        <div className='basis-1/5'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
          <input onChange={handleChange} name="title" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="A Beautiful Mind" required/>
        </div>
        <div className='basis-1/5'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Year</label>
          <input onChange={handleChange} type="text" name="year" id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2001" required/>
        </div>
      </div>
      <div className="" >
        <div className='flex justify-center hover:cursor-pointer p-2'>
          <div className="flex mr-2">
            {/* {liked ?  <ThumbUpAlt />:
            <ThumbUpOutlined onClick={handleLike}/>} */}
            <h1 className="ml-1">{like}</h1>
          </div>
          
          <div className="flex ml-2 hover:cursor-pointer">
            {/* <ThumbDownOutlined /> */}
            <h1 className="ml-1">1</h1>
          </div>
        </div>
        {movie &&
          <div className="movie-obj">
            
            {movie.Poster &&
            <div className="flex justify-center">
              <Image
                alt="Movie Poster"
                src={ movie.Poster.substring(0, 7) !== 'http://' ? movie.Poster : null}
                
                width={300}
                height={100}
                className="object-center"
                priority
              />
            </div>
            }
            
            <h1 className='text-3xl p-5'>{movie.Title}</h1>
            <div className="flex text-center justify-center">
              <h2 className='w-14'>{movie.Year}</h2>
              <h2 className=''>|</h2>
              <h2 className='w-14'>{movie.Rated}</h2>
              <h2 className=''>|</h2>
              <h2 className='w-14'>{movie.imdbRating}</h2>
            </div>
            <div>
              <p className="p-5 ">{movie.Plot}</p>
            </div>
            
            <button type="button" onClick={() => handleSave(input)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>
            
          </div>
        }
        </div>
    </div>
    </Layout>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl text-blue-500">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
      {secretMessage && (
        <p className="text-2xl text-blue-500">{secretMessage}</p>
      )}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  name,
  description,
  documentation,
}) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <Link
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </Link>
    </section>
  );
};
