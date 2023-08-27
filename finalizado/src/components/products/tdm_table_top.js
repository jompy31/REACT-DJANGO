import React from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton  } from '@mui/material';
import { Image, ZoomIn, Close } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Image1 from '../../assets/IMAGO/Pics/tabletop2.png';
import imageexpanded from '../../assets/IMAGO/pdf/table-top.jpg';

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
          TDM TABLE TOP
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
                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>CCD camera Resolution</TableCell>
                  <TableCell>12 megapixel</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>Maximum Sample Size</TableCell>
                  <TableCell>200 mm x 200 mm</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>Field of view</TableCell>
                  <TableCell>30 x 37 mm to 70 x 82 mm</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>Depth of view</TableCell>
                  <TableCell>15 mm</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>Accuracy</TableCell>
                  <TableCell>{"+/-1 micron or 2% of measured value, whichever is greater"}</TableCell>
                </TableRow>


                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>Heating rate</TableCell>
                  <TableCell>up to +3°C/s</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>Cooling rate</TableCell>
                  <TableCell>Up to -2°/s</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{fontWeight: 'bold'}}>Footprint</TableCell>
                  <TableCell>870 mm x 780 mm x 910 mm</TableCell>
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