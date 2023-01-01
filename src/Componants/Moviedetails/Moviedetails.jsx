import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useParams ,useNavigate  } from "react-router-dom";
// import { useHistory } from 'react-router-dom';

function Moviedetails() {
    let navigate = useNavigate();


    // const history = useHistory();

    // const handleClick = () => {
    //   history.push(`/page?param=newvalue`);
    // };


  let { id, media_type } = useParams();

  const [moviedetails, setmoviedetails] = useState({});
  const [similermoviedetails, setsimilermoviedetails] = useState([]);
  useEffect(() => {
    getItemDetails(id, media_type);
    geSimilertItemDetails(id, media_type);
      console.log(id, media_type);
      console.log('comwill');
  }, []);

  async function getItemDetails(id, media_type) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=16e5f62cf801b1d8b2bda7b0c2a81953&language=en-US`
    );
    setmoviedetails(data);
    console.log(data);
  }

  //    async function geSimilertItemDetails(id, media_type) {

  //       await  axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=16e5f62cf801b1d8b2bda7b0c2a81953&language=en-US&page=1`).then((response) => {
  //             setsimilermoviedetails(response.results)          }).catch((error) => {
  //             // handle the error
  //                 console.log(error);
  //           });
  //     }

  async function geSimilertItemDetails(id, media_type) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=16e5f62cf801b1d8b2bda7b0c2a81953&language=en-US&page=1`
    );
    setsimilermoviedetails(data.results);
    console.log(data.results);
  }

    const setsimilertomovie = (id, media_type) => {
        getItemDetails(id, media_type);
        geSimilertItemDetails(id, media_type);
        // <Navigate to={`/Moviedetails/${id}/${media_type}`} />
        navigate(`/Moviedetails/${id}/${media_type}`);

        
  };

  return (
      <>
               <Helmet>
                <meta charSet="utf-8" />
              <title>{moviedetails.title }</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <div className=" container">
        <div className="row">
          <div className="col-md-3">
            <img
              className="w-100 rounded-3 border"
              src={
                "https://image.tmdb.org/t/p/w500/" + moviedetails.poster_path
              }
              alt="movie"
            />
          </div>
          <div className="col-md-9">
            <h3 className=" border-start border-warning p-3 border-3">
              {moviedetails.title}
              {moviedetails.name}
            </h3>

            <h3 className="h5">{moviedetails.tagline}</h3>

            <p className="lead">{moviedetails.overview}</p>

            <h6 className="btn btn-warning noncurser">
              <i className="fas fa-star"></i>{" "}
              {moviedetails.vote_average?.toFixed(1)} / 10
            </h6>
            <br />

            <br />

            <p className="lead mt-4 ">
              type :
              {moviedetails.genres?.map((type, index) => (
                <h6 key={index} className="noncur mb-0 me-1  btn btn-dark px-2">
                  {type.name}
                </h6>
              ))}
            </p>

            <h5 className="">
              {moviedetails.status} :
              <span className="btn noncur btn-dark p-2">
                {moviedetails.release_date}
              </span>
            </h5>

            <p className="lead mt-4 text-capitalize">
              production companies :
              {moviedetails.production_companies?.map((comp, index) => (
                <h6 key={index} className="noncur me-1 mb-0 btn btn-dark p-2">
                  {comp.name}
                </h6>
              ))}
            </p>

            <Link
              target="_blank"
              hrefLang={moviedetails.homepage}
              className="my-3 btn btn-danger"
            >
              Movie Site
            </Link>
          </div>
          <div className=" container">
            <p className=" lead text-center fs-1 border-start border-end my-5">
              similar category to watch
            </p>
          </div>
                  
            {similermoviedetails.map((similerMoive, index) => (
              <div 
                // onClick={handleClick}
                onClick={() => setsimilertomovie(similerMoive.id, media_type)}
                key={index}
                className="col-md-2 cur "
              >
                <img
                  src={
                    "https://image.tmdb.org/t/p/w500/" +
                    similerMoive.poster_path
                  }
                  alt={similerMoive.title}
                  className="w-100"
                />
                <h5>{similerMoive.title}</h5>
              </div>
            ))}
        </div>
        <div className=" text-center">
          <a className="btn btn-outline-danger">see more</a>
        </div>
      </div>
    </>
  );
}

export default Moviedetails;
