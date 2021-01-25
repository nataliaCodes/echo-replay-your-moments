import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';

//components rendered based on visual mode
import ShowCategories from './ShowCategories';
import EditCategories from './EditCategories';


export default function Categories(props) {

  const { state, setState, cookies, onVideoSelected, selectedVideoID } = props;

  const [ mode, setMode ] = useState("main");

  return (

    <div className="Categories">
      <div className="content-container">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link onClick={() => setMode("main")}>Categories</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={() => setMode("edit")}>
            <Nav.Link>Edit</Nav.Link>
          </Nav.Item>
        </Nav>
        {mode === "main" && <ShowCategories selectedVideoID={selectedVideoID} state={state} setState={setState} onVideoSelected={onVideoSelected} />}
        {mode === "edit" && <EditCategories state={state} setState={setState} cookies={cookies} />}
      </div>
    </div>

  );
};