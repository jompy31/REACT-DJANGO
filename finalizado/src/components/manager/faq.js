import { Box, useTheme } from "@mui/material";
import Header from "../dashboard/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import {Button } from "react-bootstrap";



const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <br/><br/><br/><br/>
      <Header title="Make Webinar link" subtitle="You can make the webinar link for calendar days." />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Date and details of the webinar
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Complete description of the topics to be addressed in the webinar
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Date and details of the webinar2
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          A complete description of the topics to be addressed in the webinar, and make the extensive text to the coworkers know the topics to talk
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Link to="/webinar" target="_blank">
        <Button variant="primary" type="submit">
          Webinar
        </Button>
      </Link>
    </Box>
  );
};

export default FAQ;
