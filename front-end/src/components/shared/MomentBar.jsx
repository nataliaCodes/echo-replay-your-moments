import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  useState
} from 'react';


const { Range } = Slider;
const style = { width: 400, margin: 50 };

export default function MomentBar(props) {
  
  const [state, setState] = useState({
    startTime: 71,
    endTime: 80
  })
  
  return (
    <div style={style} >
      <label>Min: </label>
      <input type="number" value={props.state.startTime} onChange={(e)=>props.onMinChange(e)} />
      <br />
      <label>Max: </label>
      <input type="number" value={props.state.endTime} onChange={(e)=>props.onMaxChange(e)}  />
      <br />
      <br />
      <Range
        defaultValue={[props.startTime, props.endTime]}
        value={[props.state.startTime, props.state.endTime]}
        allowCross={false}
        onChange={props.onSliderChange}
        min={0}
        max={1379}
      />
    </div>
  )
};
