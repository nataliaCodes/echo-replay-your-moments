import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'

import useApplicationData from '../../hooks/useApplicationData';

export default function Save({videoInfo, setVideoInfo, selectedCat, categories }) {
  
  const { state } = useApplicationData();
  const cat = state.categories

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTitle = (catergory) => setVideoInfo(prev => ({...prev, selectedCat: catergory }))

  console.log(categories)

  let categoriesDropdown;
  if(cat) {
    categoriesDropdown = cat.map((catergory) => {
      return(
        <Dropdown.Item onClick={()=>handleTitle(catergory)}>{catergory}</Dropdown.Item>
      );
    });
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
          <Button variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}