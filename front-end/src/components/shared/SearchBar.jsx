import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    // <div>
    // <form onSubmit={onSubmit}>
    //   <div className="form-controls">
    //     <label>Search</label>
    //     <input value={state.title} onChange={onSearchChanged} id="video-search" type="text" placeholder="Enter Search Keyword"></input>
    //   </div>
    // </form>

    <Form onSubmit={onSubmit}>
      <InputGroup onChange={onSearchChanged} className="form-controls" id="video-search">
        <FormControl
          placeholder="Enter Search Keyword"
          aria-label="Search"
        />
        <InputGroup.Append>
          <Button type="submit" value={state.title} variant="outline-secondary" >Search</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  // </div>

  
  )
}

