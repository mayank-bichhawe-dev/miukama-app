import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Inter } from 'next/font/google';
import { getCategory } from '@/api/categoryAPI/category';
import { categoryItem } from '@/interfaces/categories';
import { Categories } from '@/interfaces/searchFilter';
import Autocomplete from '@mui/material/Autocomplete';
import { KeyPrefix, TFunction } from 'i18next';

const inter = Inter({ weight: '200', subsets: ['latin'] });

const SearchFilter = ({
  t,
  displayDropDown = false,
  setSearchQuery,
  setSelectedCategryId,
  isLoading,
}: {
  displayDropDown?: boolean;
  setSelectedCategryId?: React.Dispatch<React.SetStateAction<string>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}) => {
  const [categorie, setCategories] = useState<Categories[]>([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [isCategoryloading, setIsCategoryLoading] = useState(false);
  const [searchData, setSearchData] = useState<string>('');

  const handleCategoryChange = (
    e: any,
    newValue: Categories | null | string,
  ) => {
    const categoriesValue = newValue as Categories | null;
    setSelectedCategryId &&
      setSelectedCategryId(
        categoriesValue ? categoriesValue.value.toString() : '',
      );
  };

  useEffect(() => {
    const delayTime = setTimeout(() => {
      setSearchQuery(searchData);
    }, 1000);

    return () => clearTimeout(delayTime);
  }, [searchData]);

  const handleSearchCategory = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchCategory(event.target.value);
  };

  const getAllCategory = async () => {
    const response = await getCategory(null, null, searchCategory);
    if (response.data.success) {
      const rows = response.data.data.rows;
      const rowData = rows.map((item: categoryItem) => {
        return {
          value: item?.id,
          label: item?.categoryName,
        };
      });
      setCategories(rowData);
      setIsCategoryLoading(false);
    }
    return [];
  };

  useEffect(() => {
    if (searchCategory.length > 0) setIsCategoryLoading(true);
    const delayTime = setTimeout(() => {
      getAllCategory();
    }, 1000);

    return () => clearTimeout(delayTime);
  }, [searchCategory]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={8} md={6}>
        <TextField
          placeholder={t('gallery.searchGallery.search') as string}
          variant="outlined"
          onChange={(e) => setSearchData(e.target.value)}
          value={searchData}
          className="search_box"
          sx={{
            backgroundColor: '#00000099',
            '& .MuiOutlinedInput-input': {
              paddingLeft: '5px !important',
            },
          }}
          InputProps={{
            sx: {
              ...{
                height: '48px',
                lineHeight: '48px',
                fontSize: '16px',
                fontStyle: 'normal',
                fontFamily: inter.style,
                color: 'white',
              },
            },
            startAdornment: (
              <InputAdornment position="end">
                {searchData.length > 0 && isLoading ? (
                  <CircularProgress
                    sx={{
                      '& .MuiCircularProgress-circle': {
                        r: 10,
                        strokeWidth: 2,
                      },
                    }}
                  />
                ) : (
                  <SearchIcon sx={{ ml: '1rem' }} />
                )}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      {displayDropDown ? (
        <Grid item xs={4} md={6}>
          <Autocomplete
            freeSolo
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            options={categorie}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={t('category.allCategory') as string}
                InputProps={{
                  sx: {
                    ...{
                      height: '48px',
                      lineHeight: '48px',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontFamily: inter.style,
                      color: 'white',
                      '& .MuiInputBase-input': {
                        padding: '8px 20px!important',
                      },
                    },
                  },
                  ...params.InputProps,
                  onChange: (e) => handleSearchCategory(e),
                  endAdornment: (
                    <React.Fragment>
                      {searchCategory.length > 0 && isCategoryloading ? (
                        <CircularProgress
                          sx={{
                            '& .MuiCircularProgress-circle': {
                              r: 10,
                              strokeWidth: 2,
                            },
                          }}
                        />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            onChange={handleCategoryChange}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};
export default SearchFilter;
