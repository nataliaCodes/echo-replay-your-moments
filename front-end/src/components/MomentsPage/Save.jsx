import { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { useCookies } from "react-cookie";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export default function Save({ videoInfo, setVideoInfo, selectedCat, categories, moments, oldVideo, categWithId, selectedVidId, state, setState }) {

  const [cookies, setCookies] = useCookies(["user"]);

  //used to redirect
  let history = useHistory();

  //Alert and Model states
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Modal input states
  const [vidTitle, setVidTitle] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const onInput = event => {
    const input = event.target.value;
    setVidTitle(input);
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

  //retrieve id for selected category
  const getCatid = () => {
    let catId;
    if (categWithId) {

      catId = categWithId.find(categ => categ.name === selectedCat);

      if (catId == undefined) {
        setShowAlert(true);
        return;
      };

      if (catId !== undefined) {
        setState((prev) => ({ ...prev, categoryId: catId.id }));
        setShowAlert(false);
      };
    }

  };

  const handleSave = () => {

    const categ_id = getCatid();
    if (!categ_id) {
      getCatid();
    }

    if (!vidTitle) {
      setShowAlert(true);
    }

    const formatedLink = "https://www.youtube.com/watch?v=" + videoInfo.selectedVideoID;

    const videoSaveInfo = { title: vidTitle, link: formatedLink, cat_id: state.categoryId };



    if (videoSaveInfo.cat_id) {
      handleClose();
      return axios.post('/api/videos', { videoSaveInfo })
        .then((response) => {
          const youtubeId = response.data.info.videoSaveInfo.link .slice(32, 43);
          setState((prev) => ({ ...prev, selectedVideoID: youtubeId, selectedVidId: response.data.response.id, oldVideo: true}));

          return axios.get('api/videos')
            .then((response) => {
              setState((prev) => ({ ...prev, videos: response.data.response}));
            })
            .catch(err => console.log(err));

            
        });
    }

  };

  return (
    <>
      {cookies.user ? <Form>
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
            <Modal.Title>Save Video to add Moments</Modal.Title>
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
        :
        <Alert variant='info'>
          <h5>
            <Link to="/login">Login </Link>
              or
              <Link to="/register"> Register </Link>
              to Save Videos and Moments
          </h5>
        </Alert>
      }
    </>
  );
}