"use client"
import React from 'react';
import {
  Container,
  Link as MaterialLink,
  Autocomplete,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  CircularProgress,
  Typography,
  Stack,
  FormGroup,
  Switch,
  Button,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'
import Image from 'next/image';

import { getTokenInfo, addToken } from '@/api/user';
import { ITrackToken } from '@/api/types/user.types';

const TrackPage: React.FC = () => {
  const [type, setType] = React.useState('nft');
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState<any | undefined>();
  const [bookmark, setBookmark] = React.useState(false);

  const router = useRouter();

  const { data: options } = useQuery({
    queryKey: ['tokens', type, inputValue],
    queryFn: () => {
      return getTokenInfo(type, inputValue);
    }
  });

  const addTokenMutation = useMutation({
    mutationFn: (data: ITrackToken) => {
      return addToken(data);
    },
    onSuccess: () => {
      router.push('/');
    }
  });

  const onChangeType = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setType((e.target as HTMLInputElement).value);
  }, [setType]);

  const onInputChange = React.useCallback((e, newInputValue: string) => {
    setInputValue(newInputValue);
  }, [setInputValue]);

  const onValueChange = React.useCallback((e: any, newValue: any) => {
    setValue(newValue);
  }, [setValue]);

  const onBookmarkChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBookmark(e.target.checked);
  }, [setBookmark]);

  const onSave = React.useCallback(() => {
    if (value) {
      addTokenMutation.mutate({
        type,
        ...value,
        bookmark
      });
    }
  }, [value, addTokenMutation, bookmark, type]);

  return (
    <Container>
      <MaterialLink component={Link} sx={{ float: 'right' }} color='primary' href='/'>Back</MaterialLink>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            row
            value={type}
            onChange={onChangeType}
          >
            <FormControlLabel value="nft" control={<Radio />} label="Nft" />
            <FormControlLabel value="token" control={<Radio />} label="Token" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Contract</FormLabel>
          <Autocomplete
            getOptionLabel={(option: any) => option.name}
            options={options || []}
            onInputChange={onInputChange}
            onChange={onValueChange}
            value={value}
            autoComplete
            includeInputInList
            filterSelectedOptions
            filterOptions={(x) => x}
            renderInput={(params) => (
              <TextField {...params} label="Input the address or symbol" fullWidth />
            )}
            renderOption={(props: any, option: any) => {
              return (
                <li {...props} >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      cursor: 'pointer',
                      alignItems: 'center'
                    }}
                  >
                    <Image width={32} height={32} src={option.avatar} alt={option.name}/>
                    <Typography>{option.name}</Typography>
                    <Typography>{option.address}</Typography>
                  </Stack>
                </li>
              )
            }}
          />
        </FormControl>
        <FormControl>
          <FormControlLabel required control={<Switch checked={bookmark} onChange={onBookmarkChange}/>} label="Bookmark"/>
        </FormControl>
        <Button color='primary' onClick={onSave}>Save</Button>
      </Stack>
    </Container>
  );
}

TrackPage.displayName = 'TrackPage';
export default TrackPage;