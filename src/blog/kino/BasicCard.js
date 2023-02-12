import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import {addSubscription, contract} from "../../web3Interfaces/SubscriptionManager";
import { GetAccount } from "./react-metamask-medium/src/App";
import { injected } from './src/components/wallet/connectors';
import { useWeb3React } from '@web3-react/core';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({ value }) {
  const days_mapping = {
    Week: 7,
    Month: 30,
    Year: 365
  }
  const days = days_mapping[value]
  
  const weeks_mapping = {
    Week: 1,
    Month: 4,
    Year: 52
  }
  const weeks = weeks_mapping[value]

  const rate = 10 ** 18 / 7 / 24 / 60 / 60;
  // 1 dollar per week, with 18 decimals, divided by 7 days, 24 hours, 60 minutes, and 60 seconds

  const styles = {
    "&.MuiButton-root": {
      background: "linear-gradient(to right, #ECA4F2, #005B97)!important",
      border: "2px black solid",
    },
    "&.MuiButton-text": {
      color: "grey"
    },
    "&.MuiButton-contained": {
      color: "white"
    },
    "&.MuiButton-outlined": {
      color: "brown"
    },
    ':hover': {
      background: "linear-gradient(to right, #eda8f3, #005e9d)!important", // theme.palette.primary.main
      color: 'white',
    }

  };


  function clickHandler(){
    
    //addSubscription(, contract);
  }
  
  

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {days} days
        </Typography>
        <Typography variant="h5" component="div">
          {value}ly Subscription
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          ${weeks}.00
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <br />
      <br />
      <CardActions>
      
        <Button variant='contained'  onClick={clickHandler()} sx={styles} style = {{margin: 'auto'}}>

          <p><b>Subscribe with </b></p>
          <img src={require('./Kino_Logo3.png')} 
                width="60" 
                height="25"
                style = {{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
                alt="Kino_Logo3.png"/>
        </Button>
        
      </CardActions>
      <br />
    </Card>
  );
}
