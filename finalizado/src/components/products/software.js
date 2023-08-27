import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

function MyComponent() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <div>
          <Typography variant="h5" component="h2" className="title font-weight-bold mb-3" style={{fontWeight: 'bold'}}>
            Software
          </Typography>
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
                  <TableCell style={{fontWeight: 'bold'}}>TDM CONTROL</TableCell>
                  <TableCell>
                    To calculate the warpage variations of samples during a batch measurement and to automatically generate a report (pdf, excel, ect)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>TDM WARPAGE</TableCell>
                  <TableCell>3D software for advanced application (more than 135 advanced features)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>TDM STRAIN</TableCell>
                  <TableCell>To evaluate the strain and CTE variation of samples during a thermal cycle</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>

      <Grid item xs={12} md={6}>
        <div>
          <Typography variant="h5" component="h2" className="title font-weight-bold mb-3" style={{fontWeight: 'bold'}}>
            Options
          </Typography>
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
                  <TableCell style={{fontWeight: 'bold'}}>SUB-ZERO CAPABILITY</TableCell>
                  <TableCell>
                    A controlled flow of nitrogen is blown into the chamber to adjust the temperature of the samples from -65°C to 400°C
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>CTE QUANTIFICATION</TableCell>
                  <TableCell>In-plane deformation analysis</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>SOFTWARE DESIGN</TableCell>
                  <TableCell>
                    Our software and application engineers can develop and implement special post-processing treatments on demand
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>MULTI SCALE IMAGING</TableCell>
                  <TableCell>Allows to view areas on a multiresolution level</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </Grid>
  );
}

export default MyComponent;
