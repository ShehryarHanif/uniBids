import "./HomePage.css";
import { useState } from "react"
import { useHistory } from "react-router-dom";

const HomePage = (props) => {
  const [searchStuff, setSearchStuff] = useState("");

  const history = useHistory();

  const handleChange = (e) => {
    setSearchStuff(e.target.value);

    console.log(searchStuff);
  };

  const handleClick = (e) => {
    e.preventDefault();

    props.setSearchQuery(searchStuff);

    history.replace('/products-page');
  };

  return (
    <div className="homePageBackground">
      {/* <input type="text" placeholder="Enter a search string" onChange={handleChange}/>

      <button onClick={handleClick}>Search</button> */}
    </div>
  );
};

export default HomePage;