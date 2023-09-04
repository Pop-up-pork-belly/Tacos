import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    
    imgPath:
      'https://s3.amazonaws.com/thespike.gg-production/blubs%2F51213659346_02d251d116_k_1637835190763.jpg',
  },
  {
    imgPath:
      'https://i.redd.it/cfggdaq2l5b11.jpg',
  },
  {
   
    imgPath:
      'https://dotesports.com/wp-content/uploads/2022/11/02055306/20221031_Stephanie-Lindgren_IEM-Rio-2022_00724-1-scaled-1.jpg',
  },
  {
    imgPath:
      'https://staticg.sportskeeda.com/editor/2021/08/bda43-16293583546031-800.jpg',
  },
];

const  Homepage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <Box sx={{ maxWidth: 600, maxWidth:1000, flexGrow: 1 }}>

          <Typography>{images[activeStep].label}</Typography>

        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 500,
                    display: 'block',
                    maxWidth: 1000,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </Box>
    </div>
  );
}

export default Homepage;