import { useState } from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'

export default function Save({videoInfo, setVideoInfo, selectedCat, categories }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTitle = (catergory) => setVideoInfo(prev => ({...prev, selectedCat: catergory }))

  //waits for state have values
  let categoriesDropdown;
  if(categories) {
    categoriesDropdown = categories.map((catergory) => {
      console.log("saveCATS", catergory )
      return(
        <Dropdown.Item onClick={()=>handleTitle(catergory)}>{catergory.name}</Dropdown.Item>
      );
    });
  }

  const handleSave = () => {
    console.log("Save clicked")

    const formatedLink = "https://www.youtube.com/" + videoInfo.selectedVideoID;

    const videoSaveInfo = {link: formatedLink}
    return axios.post('http://localhost:3001/api/videos', { videoSaveInfo })
    .then((response) => {
      console.log("FEres", response);
    })
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Save video
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Save Video with Moments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <p>Video title:</p><input type="text"></input>
            <Dropdown>
              <Dropdown.Toggle variant="warning" id="dropdown-basic">
                {selectedCat}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {categoriesDropdown}
              </Dropdown.Menu>
            </Dropdown>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}