import SearchBar from '../shared/SearchBar';
import PasteBar from './PasteBar'
import Button from '../shared/Button';
import VideoList from '../shared/VideoList';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'

export default function Home(props) {

  return (

    <div className="Home">
      <h3>Welcome message</h3>
      <h3>Another message</h3>

      <PasteBar />
      <SearchBar onSearch={props.onSearch} />
      <VideoList onVideoSelected={props.onVideoSelected} data={props.data} />


      <form>
        <input type="text"></input>
        <Button>Load video</Button>
      </form>
    </div>

  );
}