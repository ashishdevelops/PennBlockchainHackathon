import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'

import Metamask from './react-metamask-medium/src/Metamask'
import Radios from './Radios'
import BasicCard from './react-metamask-medium/src/BasicCard'
import CardGrid from './CardGrid'
import Grid from '@mui/material/Unstable_Grid2';
import mainLogo from'./Kino_Logo4.png';
import IconButton from "@mui/material/IconButton";
//import buttonLogo from'./Kino_Logo3.png';
import {addSubscription, contract} from "../../web3Interfaces/SubscriptionManager"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ page }) {
  const [valid, setValid] = React.useState(false);
  const [open, setOpen] = React.useState(page !== 'home');
  const handleOpen = () => { setOpen(true); }
  const handleValid = () => {
    setValid(true);
    console.log("VALID");
    setOpen(false);
    console.log("OPEN");
  }
  const handleClose = () => {
    console.log("BOOP");
    if (page === 'home' || valid) {
      setOpen(false)
      console.log("CLOSED");
    }
  }
  ;

  console.log(page, open)

  const [value, setValue] = React.useState('Week');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  /*
    <Button onClick={handleOpen} variant='outlined'>
            Subscribe
          </Button>
  */
  /*


  */

  return (
    <div>
      <Button onClick={handleOpen} variant='outlined'>
            Subscribe
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <img src={require('./Kino_Logo4.png')} 
              width="15%" 
              height="15%"
              //style={{float:"right", marginLeft: '0.8rem', marginRight: '0.8rem'}}
              alt="Kino_Logo4.png"/>
          <Metamask />
          <br />
          <br />
          <Typography id="modal-modal-title" variant="h5" component="h2">
            <b>Subscription Manager</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Read all the news that's fit to print, for just $1 per week
          </Typography>

          <Divider>
            <Chip label='OPTIONS' />
          </Divider>

          {/* <Radios
            value={value}
            handleChange={handleChange}
          /> */}
          <br />
          <CardGrid />
          <br />
        </Box>
        
      </Modal>
      
    </div>
  );
}
