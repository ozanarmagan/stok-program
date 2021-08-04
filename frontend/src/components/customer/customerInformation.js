import React from 'react'
import {makeStyles, Container, Grid} from '@material-ui/core';
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
        <div style={{marginTop:"20px"}}>
            <Container className={classes.layout}>

                <Grid container fixed spacing={3}>

                    <Grid item xs >
                        {/* Toplam Satış */}
                        <Budget
                            name="Toplam Hasılat"
                        ></Budget>
                    </Grid>
                    {/* <Grid item xs>
                        Toplam Ödeme
                        <Budget
                            name="Toplam Harcama"
                        ></Budget>
                    </Grid> */}
                    <Grid item xs>
                        {/* Kalan Borç */}
                        <Budget
                            name="Toplam Ödeme"
                        ></Budget>
                    </Grid>
                    <Grid item xs>
                        {/* yaklaşan ödemeler */}
                        <Budget
                            name="Kalan Borç"
                        ></Budget>
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
