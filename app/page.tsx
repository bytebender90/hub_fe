"use client"
import React from 'react';
import {
  Container,
  Grid,
  Link as MaterialLink,
  Stack, 
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Card,
  Box,
} from '@mui/material';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';

import { getNftPrices, getTokenPrices } from '@/api/user';


export default function Home() {
  const [type, setType] = React.useState('token');
  const [tokenList, setTokenList] = React.useState([]);

  const getNftPricesMutation = useMutation({
    mutationFn: () => {
      return getNftPrices();
    },
    onSuccess: (data) => {
      setTokenList(data);
    }
  });

  const getTokenPricesMutation = useMutation({
    mutationFn: () => {
      return getTokenPrices();
    },
    onSuccess: (data) => {
      setTokenList(data);
    }
  });

  const onChangeType = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setType((e.target as HTMLInputElement).value);
  }, [setType]);

  React.useEffect(() => {
    if (type === 'nft')
      getNftPricesMutation.mutate();
    else if (type === 'token')
      getTokenPricesMutation.mutate();
  }, [type]); // eslint-disable-line

  return (
    <Container>
      <MaterialLink component={Link} sx={{ float: 'right' }} color='primary' href='/track'>Back</MaterialLink>
      <Stack spacing={3}>
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
        <Grid container>
          {tokenList.map((t: any) => {
            if (!t)
              return;
            return (
              <Grid item md={4} key={t.address}>
                <Card sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 1.5 }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Image width={32} height={32} src={t.avatar} alt={t.name}/>
                    <Typography>{t.name}</Typography>
                    {t.bookmark && <StarIcon sx={{ float: 'right'}}/>}
                  </Box>
                  <Typography fontSize={16}>{Math.floor(t.price)}</Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Container>
  );
}
