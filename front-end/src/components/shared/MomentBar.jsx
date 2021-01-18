import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  useState
} from 'react';


const { Range } = Slider;
const style = { width: 400, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

export default function MomentBar(props) {
  
  const [state, setState] = useState({
    startTime: 71,
    endTime: 80
  })

  const onSliderChange = (value) => {
    log(value);
    const min = value[0]
    const max = value[1]
    console.log("min", props.startTime, "max", props.endTime )
    setState({...state, startTime: min, endTime: max })
  };

  const onMinChange = (e) => {
    console.log("MIN",e.target.value)
    setState({
      ...state, startTime: e.target.value
    });
  };
  
  const onMaxChange = (e) => {
    setState({
      ...state, endTime: e.target.value
    });
  };
  
  return (
    <div style={style} >
      <label>Min: </label>
      <input type="number" value={state.startTime} onChange={(e)=>onMinChange(e)} />
      <br />
      <label>Max: </label>
      <input type="number" value={state.endTime} onChange={(e)=>onMaxChange(e)}  />
      <br />
      <br />
      <Range
        defaultValue={[props.startTime, props.endTime]}
        value={[state.startTime, state.endTime]}
        allowCross={false}
        onChange={onSliderChange}
        min={0}
        max={1379}
      />
    </div>
  )
};
