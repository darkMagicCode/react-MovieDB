import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let MediaContext = createContext("");
function MediaContextProvider(props) {
  //------------------------- states      ------------------
  const [terdMovie, setterdMovie] = useState([]);
  const [tredTv, settredTv] = useState([]);
  const [tredperson, settredperson] = useState([]);
  //---------------------------------componat will mount----------------------------
  useEffect(() => {
    getAllCateTrendingFromApi("movie", setterdMovie);
    getAllCateTrendingFromApi("tv", settredTv);
    getAllCateTrendingFromApi("person", settredperson);
  }, []);
  //--------------------------------- functions      ----------------------------

  // --------------------------------- function to get all media type from api      ----------------------------

  async function getAllCateTrendingFromApi(media_Type, callBackSetFuct) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${media_Type}/week?api_key=16e5f62cf801b1d8b2bda7b0c2a81953`
    );
    callBackSetFuct(data.results);
    console.log(data.results);
  }

  return (
    <MediaContext.Provider value={{ terdMovie, tredTv, tredperson }}>
      {props.children}
    </MediaContext.Provider>
  );
}
export default MediaContextProvider;
