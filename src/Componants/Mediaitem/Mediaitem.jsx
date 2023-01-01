import React from "react";
import { Link } from "react-router-dom";

function Mediaitem({ movie }) {
  return (
    <>
     
        <div className="col-md-2">
      <Link to={`/Moviedetails/${movie.id}/${movie.media_type}`}>
          <div className="position-relative  ">
            <div className=" cur item">
              {movie.poster_path ? (
                <img
                  src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                  className="w-100 rounded-3 border border-warning border-opacity-50"
                  alt="movie"
                />
              ) : (
                <img
                  src={"https://image.tmdb.org/t/p/w500/" + movie.profile_path}
                  className="w-100 rounded-3 border border-warning border-opacity-50"
                  alt="person"
                />
              )}

              <h2 className=" h6 my-2 ">
                {movie.title ? movie.title : movie.name}
              </h2>
              <h3 className="position-absolute bg-warning text-black h6 rounded-pill px-2 m-1 end-0 top-0 fw-bolder placeholder-wave ">
                <i className=" fas fa-star p-1 "></i>
                {movie.vote_average
                  ? movie.vote_average.toFixed(1)
                  : movie.known_for_department}
              </h3>
            </div>
          </div>
      </Link>
        </div>
    </>
  );
}

export default Mediaitem;
