import { useContext } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import useApplicationData from '../../hooks/useApplicationData';
import { VideoPlayerContext } from '../../hooks/VideoPlayerContext'

const { Range } = Slider;
const style = { width: 400, margin: 50 };

export default function MomentBar(props) {
  
  const { state, setState,} = useApplicationData();
  console.log("STATE",state)

  const [ videoDuration, setVideoDuration, startTime, setStartTime, endTime, setEndTime, start, end ] = useContext(VideoPlayerContext)

  const onSliderChange = (value) => {
    
    console.log(value);

    const min = value[0]
    const max = value[1]
    setState({...state, startTime: min, endTime: max})
  };

  const onMinChange = (e) => {
    console.log("MIN",e.target.value)
    let min = e.target.value
    setVideoDuration({...videoDuration, startTime: min});
  };
  
  const onMaxChange = (e) => {
    let max = e.target.value
    setVideoDuration({...videoDuration, endTime: max});
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
        defaultValue={[state.startTime, state.endTime]}
        value={[state.startTime, state.endTime]}
        allowCross={false}
        onChange={onSliderChange}
        min={0}
        max={videoDuration}
      />
    </div>
  )
};
