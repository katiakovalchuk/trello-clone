import {useModal} from "../context/modalContext";

const AddBoard = () => {
  const {handleShowModal} = useModal();
  return (
    <div
      className="Add-board d-flex card justify-content-center align-items-center w-25 m-2 px-3 py-2 rounded"
      onClick={handleShowModal}
    >
      <span>Add new board</span>
    </div>
  )
}

export default AddBoard;
