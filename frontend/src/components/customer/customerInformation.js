import React from 'react'
import { TextField, makeStyles, Container, Grid, Box, Paper, CircularProgress, Typography, ButtonBase } from '@material-ui/core';
import Budget from './components/card';
import EnhancedTable from './components/table';


const useStyles = makeStyles((theme) => ({
    layout: {
        flexGrow:1
        // width: 'auto',
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),

    }
}));


function CustomerInformation() {
    const classes = useStyles();


    return (
        <div>
            <Container className={classes.layout}>

                <Grid container fixed spacing={3}>

                    <Grid item xs >
                        {/* Toplam Satış */}
                        <Budget></Budget>
                    </Grid>
                    <Grid item xs>
                        {/* Toplam Ödeme */}
                        <Budget></Budget>
                    </Grid>
                    <Grid item xs>
                        {/* Kalan Borç */}
                        <Budget></Budget>
                    </Grid>
                    <Grid item xs>
                        {/* yaklaşan ödemeler */}
                        <Budget></Budget>
                    </Grid>

                </Grid>
                <Grid container fixed spacing={3}>
                <Grid item xs >
                        {/* Toplam Satış */}
                        <EnhancedTable></EnhancedTable>
                    </Grid>
                </Grid>

            </Container>

        </div>
    )
}

export default CustomerInformation
