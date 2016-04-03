import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';
const API_KEY = 'AIzaSyCIzUXWZGbm88_Vc5rQvGa2td8_0bXvSuM';


class App extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      videos:[],
      selectedVideo : null
    };
    this.videoSearch('surfboards');

  }

  videoSearch(term){
    YTSearch({key: API_KEY, term:term}, (videos) => {
      this.setState(
        {
          videos: videos,
          selectedVideo:videos[0]
        });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 10000);

    return (
      <div>
        <SearchBar onVideoSearch={term => this.videoSearch(term)}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList videos={this.state.videos}
        onVideoSelect={video => this.setState({selectedVideo:video})} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
