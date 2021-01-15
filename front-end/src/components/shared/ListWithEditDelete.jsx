import Button from './Button';

export default function List(props) {

  return (
    <div className="List">
      <h4>{props.children}</h4>
      <ul>
        <li>Item 1 <Button>Edit</Button><Button>Delete</Button></li>
        <li>Item 2 <Button>Edit</Button><Button>Delete</Button></li>
        <li>Item 3 <Button>Edit</Button><Button>Delete</Button></li>
        <li>Item 4 <Button>Edit</Button><Button>Delete</Button></li>
      </ul>
    </div>
  );
}