import SearchBar from '../shared/SearchBar';
import Button from '../shared/Button';
import VideoList from '../shared/VideoList';
export default function Home(props) {

  return (

    <div className="Home">
      <h3>Welcome message</h3>
      <h3>Another message</h3>

      <SearchBar onSearch={props.onSearch} />
      <VideoList onVideoSelected={props.onVideoSelected} data={props.data} />
      <form>
        <input type="text"></input>
        <Button>Load video</Button>
      </form>
    </div>

  );
}