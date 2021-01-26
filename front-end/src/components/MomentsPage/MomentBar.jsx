import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { Range } = Slider;
const style = { width: 400, margin: 50 };

export default function MomentBar(props) {

  const onSliderChange = (value) => {
    const min = value[0]
    const max = value[1]
    props.setVideoInfo(prev => ({ ...prev, startTime: min, endTime: max }))
  };

  const onMinChange = (e) => {
    let min = e.target.value
    props.setVideoInfo(prev => ({ ...prev, startTime: min }));
  };

  const onMaxChange = (e) => {
    let max = e.target.value
    props.setVideoInfo(prev => ({ ...prev, endTime: max }));
  };

  return (
    <div style={style} >
      <label>Min: </label>
      <input type="number" value={props.videoInfo.startTime} onChange={(e) => onMinChange(e)} />
      <br />
      <label>Max: </label>
      <input type="number" value={props.videoInfo.endTime || props.videoInfo.duration} onChange={(e) => onMaxChange(e)} />
      <br />
      <br />

      <Range
        defaultValue={[props.videoInfo.startTime, props.videoInfo.endTime]}
        value={[props.videoInfo.startTime, props.videoInfo.endTime || props.videoInfo.duration]}
        allowCross={false}
        onChange={onSliderChange}
        min={0}
        max={props.videoInfo.duration}
      />
    </div>
  )
};
