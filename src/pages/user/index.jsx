import React, { useState } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import DataTables from "./componets/DataTables";
import axios from "axios";

function User() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleShow = () => setShow(!show);
  const saveUser = () => {
    axios
      .post("http://127.0.0.1:8000/users", {
        name: name,
        email: email,
      })
      .then(
        (result) => {
          setIsLoaded(true);
          handleShow();
        },
        (error) => {
          setIsLoaded(true);
          setError(error.message);
          console.log(error.response.data);
        }
      );
  };
  return (
    <Container className="pt-5 flex">
      <Button className="float-end" variant="primary" onClick={handleShow}>
        Tambah
      </Button>
      <DataTables />
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pengguna</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Joe Doe"
                onChange={(e) => {
                    setName(e.target.value)
                    // console.log(e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleShow}
            disabled={isLoaded ? true : false}
          >
            Tutup
          </Button>
          <Button
            variant="primary"
            onClick={saveUser}
            disabled={isLoaded ? true : false}
          >
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default User;
