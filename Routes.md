## BACK-END ROUTES

### Categories
user categories = GET /api/categories
new category = POST /api/categories
edit categories = POST /api/categories/:id


### Videos
user videos = GET /api/videos
show video with moments attached = GET api/videos/:id

save new video with moments attached = POST api/videos

save existing video with moments attached = 
POST api/videos/:id
when saving video with moments:
{
  video_id: ,
  video_title: ,
  moments: 
  [
    {name, start, finish},
    {name, start, finish},
    {name, start, finish}
  ]
}

### USER ROUTES
all users = GET /api/users
one user = GET /api/users/:id
create user = POST /api/users

register = POST /register
log in = POST /login

look up which moments exist on the front-end and then send the new ones to the back-end
how to do multiple inserts in postgress - one statement(promise.all) vs loop of inserts


## FRONT-END ROUTES

search = POST youtube search api
display search videos = GET youtube search api ?


/videos
/videos/:id
/categories
/categories/:id