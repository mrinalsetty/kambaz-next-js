"use client";

import { Modal, Button, FormControl } from "react-bootstrap";

export default function ModuleEditor({
  show,
  handleClose,
  dialogTitle = "Add Module",
  moduleName,
  setModuleName,
  addModule,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle?: string;
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
}) {
  const onConfirm = () => {
    addModule();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormControl
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          placeholder="Introduction to Rocket Science"
          className="py-2"
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Add Module
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
