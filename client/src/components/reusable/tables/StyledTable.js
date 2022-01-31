import styled from "styled-components";

const StyledTable = styled.table`
  color: #545454;
  background-color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 300;
  border: 1px solid grey;
  filter: drop-shadow(5px 5px 10px grey);
  border-collapse: collapse;
  border-radius: 0px;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0rem auto;
  width: 60%;

  th {
    font-size: 1em;

    height: 1.5rem;
    min-width: 15px;
    text-align: center;
    font-weight: 600;
    /* color: #545454; */
    color: whitesmoke;
    /* background-color: #dbdbfc; */
    background-color: #e37222;
    border: none;
    border-radius: 0px;
    padding: 10px 53px;
    border-collapse: collapse;
    border-spacing: 0;
    box-shadow: 0 4px 2px -2px gray;
  }

  td {
    /* border-right: 0.5px solid grey;
  border-left: 0.5px solid grey; */
    /* border: 0.25px solid lightgrey; */
    background-color: ${(props) => props.backgroundColor || "none"};
    border-top: 1px solid #f2f2f2;
    padding: 0;
    margin: 0;
    color: #545454;
  }
  td:nth-child(even) {
    background-color: #eee;
  }

  tr {
    margin: 3px;
    padding-top: 5px;
    font-size: 1em;
    height: 4rem;
    text-align: center;
    font-weight: 300;
    color: #545454;
    background-color: white;
    border: none;
    border-radius: 0px;
    padding: 10px 40px;
    margin: 2px;
    border: 1px solid darkgrey;
    border-collapse: separate;
    box-shadow: 0 2px 5px 0;
  }
`;

export default StyledTable;
