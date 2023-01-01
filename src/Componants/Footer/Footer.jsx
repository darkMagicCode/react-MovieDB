
import React, { useContext } from "react";
// import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { MediaContext } from "../Context/MediaContext";
import Slider from "react-slick";

function Footer() {
    const { terdMovie } = useContext(MediaContext);
    
    const settings = {
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 8,

        speed: 400,
        dots: true,

        arrows: true,
        autoplay: true,
        // draggable: false,
        responsive: [
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 3,
            slidesToScroll: 8,
                   
                }
            }]
      };
  return (
    <>
   
      <div className=" mb-4 bg-img-owl pb-4 row align-items-end">
        <Slider {...settings}>
                      

        {terdMovie.map((movie, index) => (
            <img
              key={index}
              src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                  alt="asd"
            />
          ))}
                 
        </Slider>
      </div>
    </>
  );
}

export default Footer;
