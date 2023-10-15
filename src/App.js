// import React, { useCallback, useEffect, useState } from 'react';

// import MoviesList from './components/MoviesList';
// import './App.css';
// import AddMovie from './components/AddMovie';

// function App() {
//   const [movies,setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);


//   const fetchMoviesHandler = useCallback( async ()=> {
//     setIsLoading(true);
//     setError(null);
//     // https://react-http-e189d-default-rtdb.firebaseio.com/
//     // https://swapi.dev/api/films
//     try{
//       const response = await 
//       fetch('https://react-http-e189d-default-rtdb.firebaseio.com/movies.json');
//       if(!response.ok){
//         throw new Error('Something went wrong!');
//       }
//     const data = await response.json();
    
//     const loadedMovies = [];
//     for(const key in data) {
//       loadedMovies.push({
//         id: key,
//         title: data[key].title,
//         openingText: data[key].openingText,
//         releaseDate: data[key].releaseDate,
//       })
//     }
//     // const transformedMovies = data.results.map((movieData)=> {
//     //   return {
//     //     id: movieData.episode_id,
//     //     title: movieData.title,
//     //     openingText: movieData.opening_crawl,
//     //     releaseDate: movieData.release_date
//     //   }
//     // })
//     setMovies(loadedMovies);
//     }
//     catch(error) {
//       setError(error.message);
//     }
//     setIsLoading(false);
//   })

//   // useEffect(()=>
//   //   fetchMoviesHandler()
//   // ,[fetchMoviesHandler]);
//   //  useEffect(fetchMoviesHandler,[]);
//    async function addMovieHandler(movie) {
//     const response = await fetch('https://react-http-e189d-default-rtdb.firebaseio.com/movies.json', {
//       method: 'POST',
//       body: JSON.stringify(movie),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     const data = await response.json();
//     console.log(data);
//   }

//   useEffect(()=>
//   fetchMoviesHandler()
// ,[fetchMoviesHandler]);
//   // useEffect(()=>{
//   //   fetchMoviesHandler();
//   // },[fetchMoviesHandler]);

//   // async function fetchMoviesHandler() {
//   //   setIsLoading(true);
//   //   setError(null);
//   //   try{
//   //     const response = await fetch('https://swapi.dev/api/film/');
//   //     if(!response.ok){
//   //       throw new Error('Something went wrong!');
//   //     }
//   //   const data = await response.json();
      
//   //   const transformedMovies = data.results.map((movieData)=> {
//   //     return {
//   //       id: movieData.episode_id,
//   //       title: movieData.title,
//   //       openingText: movieData.opening_crawl,
//   //       releaseDate: movieData.release_date
//   //     }
//   //   })
//   //   setMovies(transformedMovies);
//   //   }
//   //   catch(error) {
//   //     setError(error.message);
//   //   }
//   //   setIsLoading(false);
//   // }

//   // function fetchMoviesHandler() {
//   //   fetch('https://swapi.dev/api/films').then(response =>{
//   //     return response.json();
//   //   }).then(data => {
//   //     const transformedMovies = data.results.map(movieData => {
//   //       return {
//   //         id: movieData.episode_id,
//   //         title: movieData.title,
//   //         openingText: movieData.opening_crawl,
//   //         releaseDate: movieData.release_date
//   //       };
//   //     })
//   //     setMovies(transformedMovies);
//   //   });
//   // }

//   let content = <p>Found no movies</p>;

//   if(movies.length > 0) {
//     content = <MoviesList movies= {movies} />
//   }

//   if(error) {
//     content = <p>{error}</p>
//   }

//   if(isLoading){
//     content = <p>Loading...</p>
//   }
//   return (
//     <React.Fragment>
//       <section>
//         <AddMovie onAddMovie = {addMovieHandler} />
//       </section>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         {content}
//         {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} /> }
//         {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
//         {!isLoading && error && <p>{error}</p>}
//         {isLoading && <p>Loading...</p>} */}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;

import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-6b4a6.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-6b4a6.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
