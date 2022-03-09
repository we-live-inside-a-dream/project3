import styled from "styled-components";

const StyledTable = styled.table`
  color: var() (--tableFont);
  background-color: var(--tableBackground);
  font-family: "Lucida Sans", sans-serif;
  font-weight: 300;
  border: 1px solid grey;
  filter: drop-shadow(5px 5px 10px grey);
  border-collapse: collapse;
  border-radius: 0px;
  border-collapse: collapse;
  border-spacing: 0;
  margin: ${(props) => props.margin || "0rem auto"};

  width: 100%;

  th {
    font-size: 1em;

    height: 1.5rem;
    min-width: 15px;
    text-align: center;
    font-weight: 600;
    /* color: #545454; */
    color: var(--headerWhiteFont);
    /* background-color: #dbdbfc; */
    background-color: var(--mainHeader);
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
    padding: ${(props) => props.padding || 0};
    margin: 0;
    color: #545454;
    width: "auto";
    position: inline;
  }
  td:nth-child(even) {
    background-color: #f8f8f8;
  }

  tr {
    margin: 3px;
    padding-top: 5px;
    font-size: 1em;
    height: 4rem;
    text-align: center;
    font-weight: 300;
    color: var(--tableFont);
    background-color: var(--tableBackground);
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
