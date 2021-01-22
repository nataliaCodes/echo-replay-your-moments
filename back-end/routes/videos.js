var express = require('express');
var videos = express.Router();

/* GET videos for specific user */
module.exports = () => {
videos.get('/', function(req, res, next) {

  const user_id = req.params.user_id;
  console.log(user_id)

  res.json({
    hello: "Yo! from server",
    user_id: user_id
  })
});

/* GET specific video with moments attached */ 
videos.get('/:id', (req, res) => {

  const id = req.params.id;
  console.log(id);

  res.json([
    {
      video_id: 33,
      video_title: 'title',
      moments: 
      [
        {
          name: 'mom1',
          start: '00:01',
          finish: '00:11'
        },
        {
          name: 'mom2',
          start: '00:01',
          finish: '00:11'
        },
        {
          name: 'mom3',
          start: '00:01',
          finish: '00:11'
        }
      ]
    }
  ])
});

/* Save new video with moments attached */ 
videos.post('/', (req, res) => {

  const userId = req.cookies.user
  console.log("got this", req.body)
  res.json('Hello from server')

});

/* Save existing video with new moments attached */ 
videos.post('/:id', (req, res) => {

  const id = req.params.id;
  console.log(id);

});
return videos
}

