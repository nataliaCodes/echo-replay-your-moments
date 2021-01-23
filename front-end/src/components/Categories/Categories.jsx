//custom hook to render page conditionally
import useVisualMode from '../../hooks/useVisualMode';
//components rendered based on visual mode
import ShowCategories from './ShowCategories';
import EditCategories from './EditCategories';

const MAIN = "MAIN";
const EDIT = "EDIT";

export default function Categories(props) {

  const { state, setState, cookies } = props;

  const { mode, transition } = useVisualMode(MAIN);

  return (

    <div className="Categories">
      {mode === MAIN && <ShowCategories state={state} setState={setState} onVideoSelected={props.onVideoSelected} onEdit={() => transition(EDIT)} />}
      {mode === EDIT && <EditCategories state={state} setState={setState} cookies={cookies} onBack={() => transition(MAIN)} />}
    </div>
    
  );
};