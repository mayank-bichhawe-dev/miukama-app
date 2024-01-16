/* eslint-disable max-lines */
'use client';
import React from 'react';
import { Box } from '@mui/material';
import Section from '../section';
import { PlansContainerProps } from '@/interfaces/plans';

const PlansContainer: React.FC<PlansContainerProps> = ({
  planData,
  displayBorder,
  firstRow,
  lastRow,
  highlightIndices,
  setHighlightedIndex,
}) => {
  const { property, values } = planData;
  const handleColumnClick = (index: number) => {
    setHighlightedIndex(index);
  };
  return (
    <Box
      display="grid"
      gridTemplateColumns={`minmax(180px, 208px) repeat(${planData.values.length}, minmax(170px, 208px))`}>
      <Section plan={property} displayBorder={displayBorder} highLight module />
      {values.map((val, index) => {
        const planIndexNumber = highlightIndices?.find((planIndex) => {
          return index === planIndex;
        });
        return (
          <Section
            plan={val}
            first={index === 0}
            last={index === values.length - 1}
            firstRow={firstRow}
            lastRow={lastRow}
            displayBorder={displayBorder}
            key={index}
            highLight={index === planIndexNumber}
            onClick={() => handleColumnClick(index)}
          />
        );
      })}
    </Box>
  );
};

export default PlansContainer;
