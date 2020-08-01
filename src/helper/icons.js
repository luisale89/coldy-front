import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Icons = {
    solid: {
        home: <FontAwesomeIcon icon={['fas', 'home']} fixedWidth/>,
        code: <FontAwesomeIcon icon={['fas', 'code']} fixedWidth/>,
        exclamation: <FontAwesomeIcon icon={['fas', 'exclamation-circle']} fixedWidth/>,
        chart: <FontAwesomeIcon icon={['fas', 'chart-bar']} fixedWidth/>
    },
    spin: {
        dots: <FontAwesomeIcon icon={['fas', 'spinner']} spin/>,
    }
};