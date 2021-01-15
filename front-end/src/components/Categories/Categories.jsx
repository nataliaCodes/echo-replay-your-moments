import Button from '../shared/Button';
import Dropdown from './Dropdown';
import Thumbnail from '../shared/Thumbnail';

export default function Categories(props) {

  return (
    <div className="Categories">
      <h4>Categories</h4>
      <Button>Edit categories</Button>
      <Dropdown />
      <Dropdown />
      <Dropdown />
      <Dropdown />
      <Thumbnail />
      <Thumbnail />
    </div>
  );
}