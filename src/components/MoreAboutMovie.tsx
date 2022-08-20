import { MovieContentInterface } from "../interfaces/MovieContentInterface";
import { FetchMoreAboutMovie } from "../services/MORE_ABOUT_MOVIE_API";

import { Genres } from "./Genres";
import { Modal, Rating } from "@mui/material";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { Link } from "react-router-dom";

interface MovieAtributes extends MovieContentInterface {
  state?: any;
  data?: any;
}

export function MoreAboutMovie({ state, data }: MovieAtributes) {

  //desestrutura o atributo id do filme selecionado, para usar como parâmetro para uma outra requisição mais detalhada do filme
  const { id } = data
  const movie = FetchMoreAboutMovie(id);

  const runtimeInHours = movie && movie.runtime / 60

  return (

    <Modal
      open={state.showMore}
      className="flex justify-end bg-[#03090f] bg-opacity-60 backdrop-blur-sm w-screen h-screen z-10"
    >
      <div
        className="text-white h-full w-full sm:w-[70vw] lg:w-[50vw] max-w-[700px] absolute"
      >

        <div
          className="w-full h-full opacity-60 absolute bg-[#03090f]"
        ></div>

        <img
          className="w-full h-screen object-cover object-center -z-10 absolute"
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt="Poster"
        />

        <ClearRoundedIcon
          className="p-1 rounded-full bg-gray-100/40 absolute top-3 left-3 md:top-5 md:left-5 flex justify-center text-sm transition hover:bg-gray-100/50 z-10 shadow-md"
          onClick={() => state.setShowMore(false)}
        />

        <div
          className="relative w-full h-full p-7 pt-9 md:p-12 md:pt-14 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white scrollbar-track-gray-900 flex flex-col lg:justify-start"
        >

          <h1
            className="text-4xl text-center uppercase tracking-wider mt-6 mx-auto w-fit font-bold"
          >
            {data.title}
          </h1>

          <span
            className="flex gap-2 w-fit mx-auto items-center"
          >
            {movie &&
              <Rating
                className="w-full justify-center my-3"
                defaultValue={movie.vote_average / 2} //a API retorna um valor de >=10, mas eu usei ese valor como estrelas e só tem 5 estrelas, por isso a divisão por 2
                precision={0.5}
                icon={<StarRateIcon style={{ color: '#ffffff' }} />}
                emptyIcon={<StarBorderIcon style={{ color: '#ffffff' }} />}
                readOnly
              />
            }
            <span
              className="text-zinc-300 font-thin text-sm"

            >
              {movie && (
                movie.vote_count >= 1000 ? movie.vote_count = '999+' : movie.vote_count

              )}
            </span>
          </span>

          <div
            className="w-full flex ml-3 mt-10 gap-2 flex-wrap text-zinc-100"
          >
            {
              movie?.genres.map(genre => {
                return (
                <Link to={`/${genre.id}/${genre.name}`} key={genre.id}>
                  <Genres key={genre.id} data={genre.name} />
                </Link>
              )}
              )
            }
          </div>

          <p
            className="mt-3 ml-3 leading-relaxed text-lg text-zinc-200 md:text-lg first-letter:text-5xl first-letter:float-left first-letter:tracking-widest "
          >
            {data.overview}
          </p>



          <div
            className="flex-col flex text-lg ml-3 mt-5 tracking-wide"
          >
            <span
            >
              Lançamento: {movie?.release_date}
            </span>

            <span
            >
              Duração: {runtimeInHours?.toFixed(2) + 'h'}
            </span>

          </div>
        </div>

      </div>
    </Modal>
  )
}