import React from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material';
import { Image, ZoomIn, Close } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Image1 from '../../assets/IMAGO/Pics/CPT (1).png';
import imageexpanded from '../../assets/IMAGO/pdf/compact3.jpg';

function MyComponent() {
  const [sX, setSX] = useState(false);
  const [sM, setSM] = useState(false);
  const [mX, setMX] = useState(0);
  const [mY, setMY] = useState(0);

  const hIC = () => {
    setSX(true);
  };

  const hMM = (e) => {
    setMX(e.clientX);
    setMY(e.clientY);
    setSM(true);
  };

  const hML = () => {
    setSM(false);
  };

  const hC = () => {
    setSX(false);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <div style={{ position: 'relative' }}>
          <div className="values__left">
            <div className="values__image" style={{ width: '100%' }}>
              <IconButton size="large" onClick={hIC} onMouseMove={hMM} onMouseLeave={hML}>
                <img src={Image1} alt="Values_Image" style={{ cursor: 'zoom-in' }} />
              </IconButton>
            </div>
          </div>

          {sM && (
            <div style={{ position: 'fixed', top: mY, left: mX, transform: 'translate(-50%, -50%)' }}>
              <ZoomIn fontSize="large" />
            </div>
          )}
        </div>
        <Dialog open={sX} onClose={hC} fullScreen hideBackdrop>
          {/* <DialogTitle>TDM Compact 3</DialogTitle> */}
          <DialogContent>
            <div style={{ textAlign: 'right' }}>
              <Close onClick={hC} style={{ cursor: 'pointer' }} />
            </div>
            <img src={imageexpanded} alt="Expanded_Image" style={{ width: '100%', height: 'auto' }} />
          </DialogContent>
        </Dialog>
      </Grid>
      <Grid item xs={12} md={6}>
        <div>
          <Typography variant="h5" component="h2" className="title font-weight-bold mb-3" style={{fontWeight: 'bold'}}>
            TDM Compact 3
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell style={{fontWeight: 'bold'}}>Features</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

              <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>Measurement technology</TableCell>
                  <TableCell>Phase shift projection moiré</TableCell>
                </TableRow>
      
                
              </TableBody>
              </Table>
          </TableContainer>
        </div>
        <br/><br/>              
        <Link to="/contact" className="btn lg">
            REQUEST INFORMATION
        </Link>
        <br/>
      </Grid>
    </Grid>
  );
}

export default MyComponent;