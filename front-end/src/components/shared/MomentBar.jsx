import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import useApplicationData from '../../hooks/useApplicationData';

const { Range } = Slider;
const style = { width: 400, margin: 50 };

export default function MomentBar(props) {
  
  const { state, onVideoSelected, onSearch, onSliderChange,onMinChange, onMaxChange } = useApplicationData();

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
        defaultValue={[state.startTime, state.endTime]}
        value={[state.startTime, state.endTime]}
        allowCross={false}
        onChange={onSliderChange}
        min={0}
        max={1379}
      />
    </div>
  )
};
