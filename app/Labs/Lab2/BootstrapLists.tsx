"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function BootstrapLists() {
  return (
    <div id="wd-css-styling-lists">
      <h2>Favorite movies</h2>
      <ListGroup>
        <ListGroupItem active>Aliens</ListGroupItem>
        <ListGroupItem>Terminator</ListGroupItem>
        <ListGroupItem>Blade Runner</ListGroupItem>
        <ListGroupItem>Lord of the Ring</ListGroupItem>
        <ListGroupItem disabled>Star Wars</ListGroupItem>
      </ListGroup>
    </div>
  );
}
