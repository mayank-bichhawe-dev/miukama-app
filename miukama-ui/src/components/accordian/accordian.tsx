'use client';

import React, { useState } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from './accordian.module.css';
import { Add } from '@mui/icons-material';

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return (
    <MuiAccordion expanded={expanded} onChange={handleAccordionChange}>
      <MuiAccordionSummary
        expandIcon={
          expanded ? (
            <RemoveIcon style={{ color: 'red' }} />
          ) : (
            <Add style={{ color: 'red' }} />
          )
        }
        // className={styles.accordionSummary}
        sx={{
          padding: '32px',
          minHeight: 0,
          '& .MuiAccordionSummary-content': {
            margin: 0,
          },
          '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: 0,
          },
          background:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.1) -1.52%, rgba(255, 255, 255, 0.1) 104.35%)',
          border: '1px solid #FFFFFF99',
          backdropFilter: 'blur(100px)',
        }}>
        <Typography
          sx={{ fontSize: '17px', fontWeight: 600, lineHeight: '21px' }}>
          {title}
        </Typography>
      </MuiAccordionSummary>
      {expanded ? (
        <Box sx={{ backgroundColor: 'inherit', height: '12px' }} />
      ) : null}
      <MuiAccordionDetails className={styles.accordionDetails}>
        <Typography sx={{ fontSize: '16px', fontWeight: 300 }}>
          {content}
        </Typography>
      </MuiAccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
