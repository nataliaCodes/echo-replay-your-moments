import Button from '../shared/Button';
import CategoriesList from './CategoriesList';
import ShowCategories from './ShowCategories';
import EditCategories from './EditCategories';
import useVisualMode from '../../hooks/useVisualMode';

const MAIN = "MAIN";
const EDIT = "EDIT";

export default function Categories(props) {
  const { mode,handleEditClick, transition, back } = useVisualMode(
    props.main ? MAIN : EDIT
  );

  return (

    <div className="Categories">
      {mode === MAIN && <ShowCategories onClick={() => handleEditClick(EDIT)}/>}
      {mode === EDIT && <EditCategories />}
    </div>
    
  );
};