import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      <h1>Movie Detail Info X2 {id}</h1>
      <Link to={`/home`}>Home</Link>&nbsp;
      <Link to={`/bootstrap`}>BootStrap</Link>
    </div>
  );
}
export default Detail;
