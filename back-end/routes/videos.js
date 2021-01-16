var express = require('express');
var videos = express.Router();

/* GET videos for specific user */
videos.get('/', function(req, res, next) {

  const user_id = req.params.user_id;
  console.log(user_id)

  res.json([
    {
      video_id: 11,
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
    },
    {
      video_id: 22,
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
    },
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

  const id = req.params.id;
  console.log(id);

});

/* Save existing video with new moments attached */ 
videos.post('/:id', (req, res) => {

  const id = req.params.id;
  console.log(id);

});

module.exports = videos;
