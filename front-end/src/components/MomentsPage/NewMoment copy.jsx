import Button from '../shared/Button';

export default function Moment(props) {

  return (
    <div className="Moment">
      <form>
        <p>Moment title:</p><input type="text"></input>
        <Button>Add</Button>
      </form>
    </div>
  );
}