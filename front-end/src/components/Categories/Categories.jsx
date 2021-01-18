import { Link } from "react-router-dom";

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import useApplicationData from '../../hooks/useApplicationData';

import Button from '../shared/Button';

export default function Categories(props) {

  const { state } = useApplicationData();

  return (
    <div className="Categories">
      <h4>Categories</h4>
      <Button>
        <Link to="/categories/edit">
          Edit categories
        </Link>
      </Button>
      <br/><br/><br/>
      <div>{state.categories}</div>

      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
              Education
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>All the videos</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
            Sports
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>All the videos</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
            Dance
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>All the videos</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
            Art
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>All the videos</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="5">
            Cooking
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="5">
            <Card.Body>All the videos</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="6">
            DIY
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="6">
            <Card.Body>All the videos</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

    </div>
  );
}