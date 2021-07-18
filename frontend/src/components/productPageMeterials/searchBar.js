import React from 'react'
import { FormControl, InputLabel, Input, ButtonGroup, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Container, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(1600 + theme.spacing(2) * 2)]: {
            width: 1600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }
}));

function SearchBar(props) {
    const classes = useStyles();
    return (
        <Container className={classes.layout}>
            <FormControl >
                <InputLabel htmlFor="product_barcode_label">Barkod</InputLabel>
                <Input id="product_barcode" aria-describedby="product_barcode" />

            </FormControl>
            <ButtonGroup disableElevation variant="contained" color="primary" style={{padding:"10px"}}>
                <Button>Ürünü Getir</Button>
                <Button>Yeni Barkod Üret</Button>
            </ButtonGroup>
        </Container>
    )
}

export default SearchBar
