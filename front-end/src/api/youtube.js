import axios from 'axios';
const KEY = 'AIzaSyCyrT0ITFDDF93n5-Bmfvbf8gQQ06QbBOE'
// const KEY = 'AIzaSyCaAzbIIIlc8NwPICsHvIkgmN8Wx9cwUjQ';

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: 'snippet',
    maxResults: 20,
    key: KEY
  }
})