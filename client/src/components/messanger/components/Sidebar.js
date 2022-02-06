import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from "../../reusable/Modal";
import {
  // StyledEmployeeForm,
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledModal,
  OneColumn,
} from "../../reusable/Inputs/StyledEmployeeForm.js";

// import { Tab, Nav,Button,Modal } from "react-bootstrap";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired
// };

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  // const [modalOpen,setModalOpen]=useState(false)
  // const conversationsOpen = activeKey === CONVERSATIONS_KEY

  // function closeModal(){
  //     setModalOpen(false)
  // }

  const[value,setValue]= useState()

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  


  return (
    <>
    
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Contacts" {...a11yProps(0)} />
        <Tab label="Conversations" {...a11yProps(1)} />
        
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
    <Contacts />
    </TabPanel>
    <TabPanel value={value} index={1}>
    <Conversations/>
    </TabPanel>
  </Box>

  <StyledButton
            fontSize={"1.5em"}
            margin={"1em"}
            padding={"10"}
           onClick={(()=>setIsOpen(true))}
          >
    New Conversation
  </StyledButton>
  <Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <NewConversationModal setIsOpen={(setIsOpen)}/>:
  </Modal>
  </>
  );
}
//     <div style={{ width: "250px" }} className="d-flex flex-column">
//       <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
//         <Nav variant="tabs" className="justify-content-center">
//           <Nav.Item>
//             <Nav.Link eventKey={CONVERSATIONS_KEY}>Convertastions</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
//           </Nav.Item>
//         </Nav>
//         <Tab.Content className="border-right overflow-auto flex-grow-1">
//           <Tab.Pane eventKey={CONVERSATIONS_KEY}>
//             <Conversations />
//           </Tab.Pane>
//           <Tab.Pane eventKey={CONTACTS_KEY}>
//             <Contacts />
//           </Tab.Pane>
//         </Tab.Content>
//         <div className="p-2 border-top border-end small">
//             Your Id:<span className="text-muted">{id}</span>
//         </div>

//       </Tab.Container>

//       <Modal show={modalOpen} onHide={closeModal}>
// {conversationsOpen?

// <NewContactModal closeModal={closeModal}/>}
//       </Modal>