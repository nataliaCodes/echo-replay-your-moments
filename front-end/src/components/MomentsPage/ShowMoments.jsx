import SearchBar from '../shared/SearchBar';
import Button from '../shared/Button';
import VideoPlayer from '../shared/VideoPlayer';
import List from '../shared/ListWithEditDelete';
import Slider from './Slider';
import NewMoment from './NewMoment';
import Save from './Save';

export default function Moment(props) {

  return (
    <div className="Moment">
      <SearchBar />
      <Button>Save video</Button>
      <VideoPlayer />
      <Slider />
      <Button>Add moment</Button>
      <NewMoment />
      <List>Moments</List>
      <Save />
    </div>
  );
}