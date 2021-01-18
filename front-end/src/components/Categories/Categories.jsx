import { Link } from "react-router-dom";

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import useApplicationData from '../../hooks/useApplicationData';

import Button from '../shared/Button';

export default function Categories(props) {

  const { state } = useApplicationData();

  const categories = state.categories;

  const accordionCards = !categories ? false : categories.map((name, index) => {
    return (

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey={index + 1}>
            {name}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={index + 1}>
          <Card.Body>All the videos</Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  });

  return (
    <div className="Categories">
      <h4>Categories</h4>
      <Button>
        <Link to="/categories/edit">
          Edit categories
        </Link>
      </Button>
      <br/><br/><br/>
      <div>{categories}</div>

      {accordionCards ?
      <Accordion style={{width: "90%", marginLeft: "3em"}}>
        {accordionCards}
      </Accordion>
      :
      <p>No categories found</p>
      }
    </div>
  );
}