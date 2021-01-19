import { useContext } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import useApplicationData from '../../hooks/useApplicationData';
import { VideoPlayerContext } from '../../hooks/VideoPlayerContext'

const { Range } = Slider;
const style = { width: 400, margin: 50 };

export default function MomentBar(props) {
  
  const [ videoDuration, setVideoDuration] = useContext(VideoPlayerContext)

  const onSliderChange = (value) => {
    
    console.log(value);

    const min = value[0]
    const max = value[1]
    setVideoDuration(videoDuration=>({...videoDuration, startTime: min, endTime: max}))
  };

  const onMinChange = (e) => {
    console.log("MIN",e.target.value)
    let min = e.target.value
    setVideoDuration(videoDuration=>({...videoDuration, startTime: min}));
  };
  
  const onMaxChange = (e) => {
    let max = e.target.value
    setVideoDuration(videoDuration=> ({...videoDuration, endTime: max}));
  };

  return (
    <div style={style} >
      <label>Min: </label>
      <input type="number" value={videoDuration.startTime} onChange={(e)=>onMinChange(e)} />
      <br />
      <label>Max: </label>
      <input type="number" value={videoDuration.endTime} onChange={(e)=>onMaxChange(e)}  />
      <br />
      <br />

      <Range
        defaultValue={[videoDuration.startTime, videoDuration.endTime]}
        value={[videoDuration.startTime, videoDuration.endTime]}
        allowCross={false}
        onChange={onSliderChange}
        min={0}
        max={videoDuration.duration}
      />
    </div>
  )
};
