import React from 'react'


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

// export default function SearchBar(props) {

//   return (
//     <div>
//       <form onSubmit={props.onSubmit}>
//         <div class="form-controls">
//           <label>Search</label>
//           <input id="video-search" type="text" placeholder="Enter Search Keyword"></input>
//         </div>
//       </form>
//     </div>
    
//   );
// }