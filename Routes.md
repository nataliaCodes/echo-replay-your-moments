## BACK-END ROUTES

### Categories
user categories = GET /api/categories
new category = POST /api/categories
edit categories = PUT /api/categories/
delete category = DELET /api/categories


### Videos
user videos = GET /api/videos

### Moments
show video with moments attached = GET api/moments

save new video with moments attached = POST api/moments

save existing video with moments attached = 
PUT api/moments
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

look up which moments exist on the front-end and then send the new ones to the back-end
how to do multiple inserts in postgress - one statement(promise.all) vs loop of inserts

### USER ROUTES
all users = GET /api/users
register = POST /register
log in = POST /login


### FRONT-END ROUTES

homepage: /
user videos: /videos
user categories + edit: /categories
user routes: /login, /logout, /register

**Not available from navbar, only page navigation:**
search results: /search (from /)
display video with moments: /moments (from /videos or /search)


