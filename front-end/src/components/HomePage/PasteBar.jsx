import React, { useState } from 'react'
import { Link } from "react-router-dom";

import useApplicationData from '../../hooks/useApplicationData';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';

export default function PasteBar(props){
  const [url, setUrl] = useState('');

  const { state, setState } = useApplicationData();

  const onSubmit = event => {
    event.preventDefault()
    
    const youtubeId = url.slice(32, 43);

    setState(prev => ({...prev, selectedVideoID: youtubeId}));
    console.log(url)
    
  }

  const onInput = event => {
    const input = event.target.value

    console.log(input)

    setUrl(input)
  }

  return (

    <InputGroup onChange={onInput} className="paste_bar">
      <FormControl
        placeholder="Paste Video Link"
        aria-label="Video Urls"
      />
      <InputGroup.Append>
        <Button type="submit" value={url} variant="outline-secondary" onSubmit={onSubmit} >Click</Button>
      </InputGroup.Append>
    </InputGroup>
  )
}