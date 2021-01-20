//custom hook to render page conditionally
import useVisualMode from '../../hooks/useVisualMode';
//components rendered based on visual mode
import ShowCategories from './ShowCategories';
import EditCategories from './EditCategories';

const MAIN = "MAIN";
const EDIT = "EDIT";

export default function Categories(props) {

  const { mode, transition } = useVisualMode(MAIN);

  return (

    <div className="Categories">
      {mode === MAIN && <ShowCategories onEdit={() => transition(EDIT)} />}
      {mode === EDIT && <EditCategories onBack={() => transition(MAIN)} />}
    </div>
    
  );
};