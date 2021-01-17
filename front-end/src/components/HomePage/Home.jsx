import SearchBar from '../shared/SearchBar';
import Button from '../shared/Button';

export default function Home(props) {

  return (

    <div className="Home">
      <h3>Welcome message</h3>
      <h3>Another message</h3>
      <form>
        <input type="text"></input>
        <Button>Load video</Button>
      </form>
    </div>

  );
}