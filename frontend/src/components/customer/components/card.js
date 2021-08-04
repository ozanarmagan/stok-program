import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';
  import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
  import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
  import { red } from '@material-ui/core/colors';
  
  const Budget = (props) => (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              {props.name}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {props.price}
            </Typography>
          </Grid>
          {/* <Grid item>
            <Avatar
              sx={{
                backgroundColor: red[600],
                height: 56,
                width: 56
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid> */}
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {props.percent<0?<ArrowDownwardIcon sx={{ color: red[900] }} />:<ArrowUpwardIcon sx={{ color: red[900] }} />}
          <Typography
            sx={{
              color: red[900],
              mr: 1
            }}
            variant="body2"
          >
            {props.percent}
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            {props.lastChangeDate}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
  
  export default Budget;