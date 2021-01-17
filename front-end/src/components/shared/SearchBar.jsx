import React from 'react'
// import "../stylesheets/SearchBar.css"

import useApplicationData from '../../hooks/useApplicationData';

class SearchBar extends React.Component{
  state={title:""}

  onSearchChanged = event => {
    const _title = event.target.value

    console.log(_title)

    this.setState({title:_title})
  }

  onSubmit = event => {
    event.preventDefault()

    console.log(this.state.title)

    this.props.onSearch(this.state.title)
  }
  
  render(){
    return (
      <div>
      <form onSubmit={this.onSubmit}>
        <div class="form-controls">
          <label>Search</label>
          <input value={this.state.title} onChange={this.onSearchChanged} id="video-search" type="text" placeholder="Enter Search Keyword"></input>
        </div>
      </form>
    </div>
    )
  }
}

export default SearchBar;


// const SearchBar =  (props) => {

//   const { state, onSearchChanged, onSubmit, onSearch} = useApplicationData();
  
//   return (
//     <div>
//     <form onSubmit={onSubmit} onSearch={props.onSearch}>
//       <div className="form-controls">
//         <label>Search</label>
//         <input value={state.title} onChange={onSearchChanged} id="video-search" type="text" placeholder="Enter Search Keyword"></input>
//       </div>
//     </form>
//   </div>
//   )
// }

// export default SearchBar;
