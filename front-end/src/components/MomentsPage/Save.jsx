import Button from '../shared/Button';

export default function Save(props) {

  return (
    <div className="Save">
      <h4>This will be a modal/popup when saving the video</h4>
      <Button>Save video</Button>
      <form>
        <p>Video title:</p><input type="text"></input>
        <p>Category:</p><input type="text"></input>
      </form>
    </div>
  );
}