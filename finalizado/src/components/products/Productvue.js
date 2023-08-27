import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Image, ZoomIn } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Image1 from '../../assets/IMAGO/Pics/TDM Compact 2 02.png'
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
            <div className="values__image" style={{width: '100%'}}>
                    <img src={Image1} alt="Values_Image" />
                </div>
            </div>

          {showMagnify && (
            <div
              style={{ position: 'absolute', top: mouseY, left: mouseX }}
            >
              <ZoomIn fontSize="large" />
            </div>
          )}
        </div>
        <Dialog open={showImage} onClose={handleCloseImage} fullScreen hideBackdrop>
          <DialogTitle>Full-size Image</DialogTitle>
          <DialogContent>
            <Image
              src="/cambio_pagina.gif"
              height={window.innerHeight - 160}
              style={{ objectFit: 'contain' }}
            />

          </DialogContent>
        </Dialog>
      </Grid>
      <Grid item xs={12} md={6}>
        <div>
          <Typography variant="h5" component="h2" className="title font-weight-bold mb-3">
          TDM Compact 2
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Features</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>


                <TableRow>
                  <TableCell>Imagin</TableCell>
                  <TableCell>Direct sample illumination</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Maximum Sample Size</TableCell>
                  <TableCell>400x700</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Field of view</TableCell>
                  <TableCell>300mm x 375</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Depth of view</TableCell>
                  <TableCell>40mm</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>CCD camera Resolution</TableCell>
                  <TableCell>40mm</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Depth of view</TableCell>
                  <TableCell>12 megapixel</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Accuracy</TableCell>
                  <TableCell>1micron</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Heating rate</TableCell>
                  <TableCell>up to 6°C/s</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Cooling rate</TableCell>
                  <TableCell>40mm</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Footprint</TableCell>
                  <TableCell>260mm x 97mm</TableCell>
                </TableRow>
                
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <br/><br/>              
        <Link to="/contact" className="btn lg">
            REQUEST INFORMATION
        </Link>
      </Grid>
    </Grid>
  );
}
export default MyComponent