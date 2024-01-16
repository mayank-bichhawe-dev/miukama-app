import React, { useState } from 'react';
import { RenderPasswordFieldProps } from '@/interfaces/renderPasswordField';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';

const RenderPasswordField = ({ ...rest }: RenderPasswordFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleToggle = () => {
    setIsPasswordVisible((current) => !current);
  };

  return (
    <>
      <TextField
        type={isPasswordVisible ? 'text' : 'password'}
        {...rest}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleToggle}>
              <InputAdornment position="end">
                {isPasswordVisible ? (
                  <VisibilityOffOutlined sx={{ paddingRight: '.625rem' }} />
                ) : (
                  <VisibilityOutlined sx={{ paddingRight: '.625rem' }} />
                )}
              </InputAdornment>
            </IconButton>
          ),
        }}
      />
    </>
  );
};

export default RenderPasswordField;
