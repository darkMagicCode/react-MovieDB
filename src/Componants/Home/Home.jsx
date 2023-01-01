import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { MediaContext } from "../Context/MediaContext";
import Footer from "../Footer/Footer";
import Mediaitem from "../Mediaitem/Mediaitem";

//-------------------------   start   -------------------------------
function Home() {
  let { terdMovie, tredTv, tredperson } = useContext(MediaContext)

  // ----------------------------- render section ----------------------------
  return (
    <>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Movie DB</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      
   <Footer></Footer>
      <div className="  row pb-5">
        <div className="col-md-4 py-3  d-flex align-items-center">
          <h2 className="pt-1 pb-1">
            <span className="placeholder-wave border-top border-3 border-warning pt-1">
              Trending
            </span>
            <br />
            movie <br />
            <span className="h5">To Watch Right Now</span> <br />
            <span className="placeholder-wave pb-2 h5 text-muted border-bottom border-3 border-warning">
              Trending Movie To Watch Now
            </span>
          </h2>
        </div>

        {terdMovie.filter((person)=>person.profile_path !==null).slice(0,10).map((movie, index) => (
          <Mediaitem key={index} movie={movie} />
        ))}
             
      </div>              

      <div className=" row pb-5">
        <div className="col-md-4 py-3  d-flex align-items-center">
          <h2 className="pt-1 pb-1">
            <span className="placeholder-wave border-top border-3 border-warning pt-1">
              Trending
            </span>
            <br />
            tv <br />
            <span className="h5">To Watch Right Now</span> <br />
            <span className="placeholder-wave pb-2 h5 text-muted border-bottom border-3 border-warning">
              Trending tv To Watch Now
            </span>
          </h2>
        </div>

        {tredTv.filter((person)=>person.profile_path !==null).slice(0,10).map((movie, index) => (
          <Mediaitem key={index} movie={movie} />
        ))}
      </div>              

      <div className=" row">
        <div className="col-md-4 py-3  d-flex align-items-center">
          <h2 className="pt-1 pb-1">
            <span className="placeholder-wave border-top border-3 border-warning pt-1">
              Trending
            </span>
            <br />
            people <br />
            <span className="h5">To view Right Now</span> <br />
            <span className="placeholder-wave pb-2 h5 text-muted border-bottom border-3 border-warning">
              Trending people To view Now
            </span>
          </h2>
        </div>

        {tredperson.filter((person)=>person.profile_path !==null).slice(0,10).map((movie, index) => (
          <Mediaitem key={index} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default Home;
