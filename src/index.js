
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './component/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './component/video_list'
import VideoDetail from './component/video_detail';
import _ from 'lodash';

const API_KEY = 'AIzaSyD1svU_PuKDHRFc8VL0DL1OOB-SSfMvMfQ';

//Create a new component.This component should produce 
//some HTML
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos: [],
      selectedVideo : null };

    this.videoSearch('surfboards');

   
  }


  videoSearch(term){
       YTSearch({ key: API_KEY, term: term}, (videos)=> {
      this.setState({videos : videos,
        selectedVideo : videos[0]
      });
    });
  }
  render() {
  const videoSearch = _.debounce(term => this.videoSearch(term), 400);
  return (
      <div>
        <SearchBar onSearchTermChange = {videoSearch}/>
        <VideoDetail video = {this.state.selectedVideo}/>
        <VideoList 
        onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
        videos = {this.state.videos}/>
      </div>//jsx subset of javascript that looks like html
    );

  }
}


//Take this component's generated HTML and put it 
//on the page(in the DOM)

ReactDOM.render(<App />, document.querySelector('.container'));