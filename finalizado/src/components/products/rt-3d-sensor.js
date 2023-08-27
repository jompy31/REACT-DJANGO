import React from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material';
import { Image, ZoomIn, Close } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Image1 from '../../assets/IMAGO/Tools2/5.png';
import archivoZip from '../../archivo.zip';
import imageexpanded from '../../assets/IMAGO/pdf/rt-3d-sensor.jpg';

function MyComponent() {
  const [showImage, setShowImage] = useState(false);
  const [showMagnify, setShowMagnify] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleImageClick = () => {
    setShowImage(true);
  };

  const handleMouseMove = (e) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
    setShowMagnify(true);
  };

  const handleMouseLeave = () => {
    setShowMagnify(false);
  };

  const handleCloseImage = () => {
    setShowImage(false);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <div style={{ position: 'relative' }}>
          <div className="values__left">
            <div className="values__image" style={{ width: '100%' }}>
              <IconButton size="large" onClick={handleImageClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <img src={Image1} alt="Values_Image" style={{ cursor: 'zoom-in' }} />
              </IconButton>
            </div>
          </div>

          {showMagnify && (
            <div style={{ position: 'fixed', top: mouseY, left: mouseX, transform: 'translate(-50%, -50%)' }}>
              <ZoomIn fontSize="large" />
            </div>
          )}
        </div>
        <Dialog open={showImage} onClose={handleCloseImage} fullScreen hideBackdrop>
          {/* <DialogTitle>TDM Compact 3</DialogTitle> */}
          <DialogContent>
            <div style={{ textAlign: 'right' }}>
              <Close onClick={handleCloseImage} style={{ cursor: 'pointer' }} />
            </div>
            <img src={imageexpanded} alt="Expanded_Image" style={{ width: '100%', height: 'auto' }} />
          </DialogContent>
        </Dialog>
      </Grid>
      <Grid item xs={12} md={6}>
        <div>
          <Typography variant="h5" component="h2" className="title font-weight-bold mb-3" style={{fontWeight: 'bold'}}>
          RT - 3D SENSOR
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
                  <TableCell style={{fontWeight: 'bold'}}>Measurement Technology</TableCell>
                  <TableCell>Phase Shift Projection Moiré</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>CCD camera Resolution</TableCell>
                  <TableCell>12 megapixel</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>Maximum Sample Size</TableCell>
                  <TableCell>1000 mm x 1000 mm</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>Field of view</TableCell>
                  <TableCell>20 x 24 mm to 640 x 470 mm</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>Depth of view</TableCell>
                  <TableCell>Up to 40 mm</TableCell>
                </TableRow>


                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>Accuracy</TableCell>
                  <TableCell>1 micron or 2% of measured value, whichever is greater</TableCell>
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
export default MyComponent