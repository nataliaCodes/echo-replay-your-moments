import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

import useApplicationData from '../../hooks/useApplicationData';

export default function Save(props) {

  const { state } = useApplicationData();
  const categories = state.categories;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTitle = (catergory) => props.setVideoInfo(prev => ({...prev, selectedCat: catergory }))

  const categoriesDropdown = !categories ? console.log("NO VALUES") : categories.map(catergory => {
    <Dropdown.Item onClick={()=>handleTitle(catergory)}>{catergory}</Dropdown.Item>
  });

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
                {props.selectedCat}
              </Dropdown.Toggle>

              <Dropdown.Menu>
              <Dropdown.Item >lol</Dropdown.Item>
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