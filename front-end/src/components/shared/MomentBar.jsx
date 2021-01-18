import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const { Range } = Slider;
const style = { width: 400, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

const onSliderChange = (value) => {
  log(value);
};

const onMinChange = (e) => {
  this.setState({
    min: +e.target.value || 0,
  });
};

const onMaxChange = (e) => {
  this.setState({
    max: +e.target.value || 100,
  });
};


export default function MomentBar(props) {
  
  return (
    <div style={style} >
    <label>Min: </label>
    <input type="number" value={props.startTime}  />
    <br />
    <label>Max: </label>
    <input type="number" value={props.endTime}  />
    <br />
    <br />
    <Range
      defaultValue={[0, 100]}

      onChange={onSliderChange}
    />
  </div>
  )
};

{/* <input type="number" value={props.startTime} onChange={this.onMinChange} />
<br />
<label>Max: </label>
<input type="number" value={props.endTime} onChange={this.onMaxChange} /> */}