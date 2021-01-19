import Button from './Button';
import useApplicationData from '../../hooks/useApplicationData';

export default function List(props) {

  const { state } = useApplicationData();

  const categories = state.categories;
  const categoriesList = categories && categories.map((cat, i) => {

    return (
      <li 
        key={i}>{cat}
        <Button onClick={props.onEdit}>Edit</Button>
        <Button onClick={props.onDelete}>Delete</Button>
      </li>
    );

  });

  return (
    <div className="List">
      {props.onCateg &&
      <ul>
        {categoriesList}
      </ul>
      }
      {props.onVideos &&
      <ul>
        <li>Moment 1 <Button>Edit</Button><Button>Delete</Button></li>
        <li>Moment 2 <Button>Edit</Button><Button>Delete</Button></li>
        <li>Moment 3 <Button>Edit</Button><Button>Delete</Button></li>
      </ul>
      }
    </div>
  );
}