import React, { useState } from 'react'

export default function SearchBar(props){
  const [state, setState] = useState({
    title: ''
  })

  const onSearchChanged = event => {
    const _title = event.target.value

    console.log(_title)

    setState({title: _title})
  }

  const onSubmit = event => {
    event.preventDefault()

    console.log(state.title)

    props.onSearch(state.title)
  }

  return (
    <div>
    <form onSubmit={onSubmit}>
      <div class="form-controls">
        <label>Search</label>
        <input value={state.title} onChange={onSearchChanged} id="video-search" type="text" placeholder="Enter Search Keyword"></input>
      </div>
    </form>
  </div>
  )
}

