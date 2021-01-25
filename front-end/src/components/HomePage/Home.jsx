import SearchBar from '../shared/SearchBar';
import PasteBar from './PasteBar'
import Button from '../shared/Button';
import VideoList from '../shared/VideoList';

export default function Home(props) {

  return (

    <div className="Home">
      <div className="content-container">
        <h3>Welcome message</h3>
        <div class="link-input">
          <PasteBar setSelectedVideoID={props.setSelectedVideoID} />
          <br></br>
          <p>- OR -</p>
          <SearchBar onSearch={props.onSearch} />
        </div>
          <VideoList onVideoSelected={props.onVideoSelected} data={props.data} />
      </div>
    </div>

  );
}