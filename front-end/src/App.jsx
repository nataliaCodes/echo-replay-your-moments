import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/HomePage/Home';
import UserVideos from './components/UserVideosPage/UserVideos';
import Videos from './components/VideosPage/Videos';
import Categories from './components/Categories/Categories';
import EditCategories from './components/Categories/EditCategories';
import ShowMoments from './components/MomentsPage/ShowMoments';

import useApplicationData from './hooks/useApplicationData';

import youtubeApi from './api/youtube'
import SearchBar from './components/shared/SearchBar'
import VideoList from './components/shared/VideoList'
import VideoPlayer from './components/shared/Videoplayer'


export default class App extends React.Component {

  state = {
    videoMetaInfo:[],
    selectedVideoID:null
  }

  onVideoSelected = videoId => {
    this.setState({
      selectedVideoID:videoId
    })
  }

  onSearch = async keyword => {
    const response = await youtubeApi.get("/search",{
      params:{
        q:keyword
      }
    })

    this.setState({
      videoMetaInfo: response.data.items,
      selectedVideoID: response.data.items[0].id.videoId
    })

    console.log(this.state)
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Header />
          <Navbar />
          <Switch>
            <Route exact path="/">
              <SearchBar onSearch={this.onSearch} />
              <VideoList onVideoSelected={this.onVideoSelected} data={this.state.videoMetaInfo} />
              <VideoPlayer videoId={this.state.selectedVideoID}/>
              <Home />
            </Route>
            <Route path="/videos">
              <UserVideos />
            </Route>
            <Route exact path="/categories">
              <Categories />
            </Route>
            <Route exact path="/categories/edit">
              <EditCategories />
            </Route>
            <Route path="/search">
              <Videos />
            </Route>
            <Route path="/videos/id">
              <ShowMoments />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

}


