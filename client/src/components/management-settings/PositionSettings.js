import React, { useState, useEffect } from "react";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";
import {
  StyledButton,
  StyledInput,
  StyledForm,
  StyledFormWrapper,
  StyledForm2,
} from "../reusable/Inputs/StyledEmployeeForm";
import StyledTable from "../reusable/tables/StyledTable";
import Modal from "../reusable/Modal";
import DeletePositionConfirm from "./DeletePositionConfirm";
import PositionsForm from "./PositionsForm";

function PositionSettings() {
  const [value, setValue] = useState();
  const [label, setLabel] = useState();
  const [positionToEdit, setPositionToEdit] = useState();
  const [positionList, setPositionList] = useState([]);
  const [method, setMethod] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [idToEdit, setIdToEdit] = useState();

  useEffect(() => {
    async function getPositionList() {
      let fetchedResult = await fetch("/api/positions/get-all");
      let fetchedPositions = await fetchedResult.json();
      setPositionList(fetchedPositions);
    }
    getPositionList();
  }, []);

  const deletePositionById = async () => {
    console.log(" FROM DELETE FUNCTION", idToEdit);
    await fetch(`/api/positions/delete?id=${idToEdit}`, {
      method: "DELETE",
    });
    let filteredPositions = positionList.filter((position) => {
      return position._id !== idToEdit;
    });
    setPositionList(filteredPositions);
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <StyledForm2 style={{ justifyContent: "left" }}>
        <StyledTable>
          <thead>
            <tr style={{ height: "40px" }}>
              <th>Position</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {positionList?.map((position) => {
              return (
                <tr key={position._id} style={{ height: "30px" }}>
                  <td>{position.label}</td>
                  <td>
                    <div>
                      <StyledEditButton
                        onClick={() => {
                          setPositionToEdit(position);
                          setIdToEdit(position._id);
                          setMethod("edit");
                          setModalOpen(!modalOpen);
                        }}
                        style={{ margin: "0px 15px" }}
                      >
                        E
                      </StyledEditButton>
                      <StyledEditButton
                        onClick={() => {
                          setIdToEdit(position._id);
                          setMethod("delete");
                          setModalOpen(!modalOpen);
                        }}
                        style={{ margin: "0px 15px" }}
                      >
                        X
                      </StyledEditButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
        <StyledButton
          style={{ marginTop: "1em" }}
          onClick={() => setModalOpen(!modalOpen)}
        >
          Add Position
        </StyledButton>
      </StyledForm2>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {method === "delete" ? (
          <DeletePositionConfirm
            deletePosition={() => deletePositionById(idToEdit)}
            onClose={() => setModalOpen(!modalOpen)}
          />
        ) : (
          <PositionsForm
            existingValues={positionToEdit}
            setPositionList={setPositionList}
            positionList={positionList}
            setIdToEdit={setIdToEdit}
            idToEdit={idToEdit}
            value={value}
            setValue={setValue}
            label={label}
            setLabel={setLabel}
          />
        )}
      </Modal>
    </div>
  );
}

export default PositionSettings;
