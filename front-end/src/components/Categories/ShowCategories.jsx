import Button from '../shared/Button';
import CategoriesList from './ShowCategoriesList';

export default function ShowCategories(props) {

  const { state, setState, onVideoSelected } = props;

  return (

    <div className="Categories">
      <h4>Categories</h4>
      <Button onClick={props.onEdit}>
        Edit categories
      </Button>
      <br/><br/><br/>
      <CategoriesList state={state} setState={setState} onVideoSelected={props.onVideoSelected} />
    </div>
    
  );
};