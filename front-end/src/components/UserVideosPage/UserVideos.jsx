import SearchBar from '../shared/SearchBar';
import Thumbnail from '../shared/Thumbnail';

export default function UserVideos(props) {

  return (
    <div className="user-videos">
      <h4>UserVideos</h4>
      <SearchBar />
      <Thumbnail />
      <Thumbnail />
      <Thumbnail />
      <Thumbnail />
      <Thumbnail />
    </div>
  );
}