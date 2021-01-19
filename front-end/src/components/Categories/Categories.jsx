import Button from '../shared/Button';
import CategoriesList from './CategoriesList';
import useVisualMode from '../../hooks/useVisualMode';

export default function Categories(props) {

  return (
    <div className="Categories">
      <h4>Categories</h4>
      <Button>
        Edit categories
      </Button>
      <br/><br/><br/>
      <CategoriesList />
    </div>
  );
};