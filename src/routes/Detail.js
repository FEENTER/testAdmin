import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const getMovieDetail = async (movieId) => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`)
    ).json();
    console.log(json);

    const json2 = await (
      await fetch(`https://www.betstation1.com/api/member/point`, {method: 'POST', 
      credentials: 'include', 
      body: 'lang=en',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }})
    ).json();
    console.log(json2);
  };
  useEffect(() => {
    getMovieDetail(id);
  }, [id]);
  return (
    <div>
      <h1>Movie Detail Info X3 {id}</h1>
      <Link to={`/home`}>Home</Link>&nbsp;
      <Link to={`/bootstrap`}>BootStrap</Link>
    </div>
  );
}
export default Detail;
