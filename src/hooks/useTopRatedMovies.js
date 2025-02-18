import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { addTopRatedMovies } from "../redux/slices/moviesSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();

    const topRatedMovies = useSelector((store) => store.movies?.topRatedMovies)

  const getTopRatedMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addTopRatedMovies(json.results));
    } catch (error) {
      console.log("There is something error,Try again");
    }
  };

  useEffect(() => {
    if(!topRatedMovies){
      getTopRatedMovies();
    }
  }, []);
};

export default useTopRatedMovies;

