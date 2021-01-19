import Button from '../shared/Button';
import CategoriesList from './CategoriesList';

export default function ShowCategories(props) {

  return (

    <div className="Categories">
      <h4>Categories</h4>
      <Button onClick={props.onClick}>
        Edit categories
      </Button>
      <br/><br/><br/>
      <CategoriesList />
    </div>
    
  );
};