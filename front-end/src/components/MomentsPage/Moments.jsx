import ShowMoments from './ShowMoments';
import NewMoments from './NewMoments';

export default function Moments(props) {

  //oldVideo = false by default; true if from /videos
  const { oldVideo } = props;

  return oldVideo ? <ShowMoments /> : <NewMoments />
};