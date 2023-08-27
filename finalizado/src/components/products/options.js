import React from 'react';
import { useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

function MyComponent() {
  return (

      <Grid item xs={12} md={6}>
        <div>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>


                <TableRow>
                  <TableCell>SUB-ZERO CAPABILITY</TableCell>
                  <TableCell>A controlled flow of nitrogen is blown into the chamber to adjust the temperature of the samples from -65°C to 400°C</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>CTE QUANTIFICATION</TableCell>
                  <TableCell>In-plane deformation analysis</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>SOFTWARE DESIGN</TableCell>
                  <TableCell>Our software and application engineers can develop and implement special post-processing treatments on demand</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>MULTI SCALE IMAGING</TableCell>
                  <TableCell>Allows to view areas on a multiresolution level</TableCell>
                </TableRow>
                
              </TableBody>
            </Table>
          </TableContainer>
        </div>          
      </Grid>

      

  );
}
export default MyComponent



