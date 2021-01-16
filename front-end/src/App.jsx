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
import Register from './components/Register/Register';


function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <Switch>
          <Route exact path="/">
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
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
