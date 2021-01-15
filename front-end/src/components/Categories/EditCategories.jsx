import Button from '../shared/Button';
import List from '../shared/ListWithEditDelete';

export default function EditCategories(props) {

  return (
    <div className="EditCategories">
      <h4>Edit categories</h4>
      <Button>Add category</Button>
      <List>Categories</List>
    </div>
  );
}