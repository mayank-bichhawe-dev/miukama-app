import { Box, Button, InputAdornment, OutlinedInput } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { KeyPrefix, TFunction } from 'i18next';
import { subCategories } from '@/interfaces/categories';

interface AddSubCategoryProps {
  id?: number;
  subCategory: string[] | subCategories[];
  setSubCategory: React.Dispatch<
    React.SetStateAction<string[] | subCategories[]>
  >;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

function AddSubCategoryField({
  id,
  subCategory,
  setSubCategory,
  t,
}: AddSubCategoryProps) {
  const addInputField = () => {
    id
      ? setSubCategory([
          ...subCategory,
          { id: undefined, name: '' },
        ] as subCategories[])
      : setSubCategory([...subCategory, ''] as string[]);
  };

  const removeInputFields = (index: any) => {
    const rows = id
      ? [...(subCategory as subCategories[])]
      : [...(subCategory as string[])];
    rows.splice(index, 1);
    setSubCategory(rows);
  };

  const handleChange = (index: any, evnt: any) => {
    const { value } = evnt.target;
    const list = id
      ? [...(subCategory as subCategories[])]
      : [...(subCategory as string[])];
    list[index] = id ? { name: value } : value;
    setSubCategory(list);
  };

  return (
    <Box className="sunCategoryWrap">
      {subCategory.map((data, index) => {
        return (
          <div className="row my-3" style={{ paddingTop: '1rem' }} key={index}>
            <OutlinedInput
              size="small"
              type="text"
              placeholder={t('category.add_category.sub_category') as string}
              name="subCategoryName"
              fullWidth={true}
              value={id ? (data as subCategories).name : data}
              onChange={(evnt) => handleChange(index, evnt)}
              endAdornment={
                subCategory.length !== 1 ? (
                  <InputAdornment position="end">
                    <Button
                      variant="text"
                      sx={{ color: '#fff' }}
                      onClick={() => removeInputFields(index)}>
                      <DeleteIcon />
                    </Button>
                  </InputAdornment>
                ) : (
                  ''
                )
              }
            />
          </div>
        );
      })}
      <Box textAlign="center">
        <Button
          variant="text"
          sx={{ color: '#fff', textTransform: 'none' }}
          size="small"
          onClick={addInputField}>
          <AddIcon />
          {t('category.add_category.add_new')}
        </Button>
      </Box>
    </Box>
  );
}
export default AddSubCategoryField;
