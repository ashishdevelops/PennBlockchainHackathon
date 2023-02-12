import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import SubscriptionCard from './SubscriptionCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core';



const emails = ['username@gmail.com', 'user02@gmail.com'];

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const { active, chainId, account, activate, deactivate } = useWeb3React();
  

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
   });

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Purchase a Subscription or Log In</DialogTitle>
      <Button variant="outlined" size="small" onClick={() => { activate(Injected) }}>
          Log in with Metamask
        </Button>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SubscriptionCard price = {10} duration = {"month"} tier = {"Monthly"}></SubscriptionCard>
        </Grid>
        <Grid item xs={6}>
          <SubscriptionCard price = {100} duration = {"year"} tier = {"Yearly"}></SubscriptionCard>
        </Grid> 
      </Grid>
      
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function PopupDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
        
        <SimpleDialog
            selectedValue={selectedValue}
            open={1}
            // Uncomment to close
            // onClose={handleClose}
        />
      
    </div>
  );
}


/*

<Box sx={{ flexGrow: 1 }}
        <Typography variant="subtitle1" component="div">
            Selected: {selectedValue}
        </Typography>
        <br />
        <Button variant="outlined" onClick={handleClickOpen}>
            Open simple dialog
        </Button>
/>
*/


/*<List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>*/


