import { useState } from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export default function Save({ videoInfo, setVideoInfo, selectedCat, categories, moments, oldVideo, categWithId, selectedVidId, state, setState }) {

  console.log("rendering save component: state=", state )
  console.log("rendering save component: categWithId=", categWithId )
  console.log("rendering save component: categories=", categories )

  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [vidTitle, setVidTitle] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const onInput = event => {
    const input = event.target.value;
    setVidTitle(input);
    // console.log(vidTitle);
  };

  const handleTitle = (catergory) => setVideoInfo(prev => ({ ...prev, selectedCat: catergory }));

  //waits for state have values
  let categoriesDropdown;
  if (categories) {
    categoriesDropdown = categories.map((catergory) => {
      return (
        <Dropdown.Item onClick={() => handleTitle(catergory)}>{catergory}</Dropdown.Item>
      );
    });
  }

  const newMoments = [
    { label: "something", start_time: 30, end_time: 70 },
    { label: "something2", start_time: 100, end_time: 102 },
    { label: "something3", start_time: 50, end_time: 55 }
  ];

  const getCatid = () => {
    let catId;
    console.log("inGetID:", selectedCat);
    if(categWithId){

      catId = categWithId.find(categ => categ.name === selectedCat);
      console.log("finderID", catId);
      setState((prev)=>({...prev, categoryId: catId.id}));
    }

  };

  const handleSave = () => {

    console.log("handleSave");

    const categ_id = getCatid();
    if (!categ_id){
      getCatid();
    }

    console.log("oldvideo =", oldVideo);

      if (!vidTitle) {
        console.log("alert title:", vidTitle, " catId:", categoryId);
        setShowAlert(true);
      }

    const formatedLink = "https://www.youtube.com/watch?v=" + videoInfo.selectedVideoID;

    const videoSaveInfo = { title: vidTitle, link: formatedLink, cat_id: state.categoryId };
    
    console.log("Sent to DB",videoSaveInfo)

    if(videoSaveInfo.cat_id){
      handleClose();
      return axios.post('/api/videos', { videoSaveInfo })
        .then((response) => {
          console.log("FEres", response);
        });
    }

  };

  return (
    <>
        <Form>
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
              <Form>
                <InputGroup className="video_save" onChange={onInput} >
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Input Title"
                    aria-label="Input Title"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>

                <Dropdown>
                  <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    {selectedCat}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {categoriesDropdown}
                  </Dropdown.Menu>
                </Dropdown>
              </Form>

              <Alert show={showAlert} variant="danger">
                Please input Title and Select a Category.
            </Alert>
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
        </Form>
    </>
  );
}