import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import BasicCard from './BasicCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <BasicCard
            value='Week'
          />
        </Grid>
        <Grid xs={4}>
          <BasicCard
            value='Month'
          />
        </Grid>
        <Grid xs={4}>
          <BasicCard
            value='Year'
          />
        </Grid>
      </Grid>
    </Box>
  );
}
