import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import {useModal} from "../context/modalContext";
import {addBoard} from "../store/slices/boardSlice";

const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, "* Min length is 3 characters")
    .max(30, "* Max length is 30 characters")
    .required("Board title is a required field"),
});

const ModalForm = () => {
  const dispatch = useDispatch();
  const {showModal, handleCloseModal} = useModal();

  const onSubmitBoard = async data => {
    dispatch(addBoard({title: data.title}));
    handleCloseModal();
    reset();
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmitBoard)}>
            <Form.Control
              className="mt-2"
              type="text"
              placeholder="Board title"
              aria-label="Board title"
              aria-describedby="basic-addon1"
              {...register("title")}
            />
            <div className="error error-text text-danger my-1">{errors?.title && errors?.title?.message}</div>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                className="ms-4"
                variant="primary"
                type="submit"
                disabled={!isValid}
              >
                Add board
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalForm;
