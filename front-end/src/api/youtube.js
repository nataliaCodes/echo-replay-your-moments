import axios from 'axios';
const KEY = 'AIzaSyDEfsH47Gz9kxeePNeOh-pvBFVe2Tyb-Bw'

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: 'snippet',
    maxResults: 20,
    key: KEY
  }
})