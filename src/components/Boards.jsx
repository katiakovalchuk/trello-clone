import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Board from "./Board";
import AddBoard from "./AddBoard";
import Modal from "./Modal";
import Loader from "./Loader";
import {getBoards} from "../store/slices/boardSlice";
import {capitalize} from "../helpers/capitalize";

const Boards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const {boards, status} = useSelector(state => state.boardSlice);

  if (!status || status === "pending") return <Loader/>;

  return (
    <>
      <Modal/>
      <div className="m-2 p-3">
        <h2 className="px-2">
          {
            boards.length ? "Boards:" : "No boards available. You may create new board"
          }
        </h2>
        <div className="Boards d-flex flex-wrap">
          {
            boards.length ?
              boards.map(board => <Board key={board.id} title={capitalize(board.title)}/>) : ""
          }
          <AddBoard/>
        </div>
      </div>
    </>
  )
}

export default Boards;
