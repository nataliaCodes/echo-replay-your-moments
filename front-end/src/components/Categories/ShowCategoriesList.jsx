import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import VideoThumbnails from "./VideoThumbnails";

import useApplicationData from '../../hooks/useApplicationData';

export default function categoriesList(props) {

  const { state } = useApplicationData();

  const categories = state.categories;

  const accordionCards = !categories ? false : categories.map((name, index) => {

    return (

      <Card key={index}>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey={index + 1}>
            {name}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={index + 1}>
          <Card.Body>
            <VideoThumbnails category={name} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>

    );
  });

  return accordionCards.length > 0 ?
    <Accordion style={{width: "90%", marginLeft: "3em"}}>
      {accordionCards}
    </Accordion>
    :
    <p>No categories found</p>

};