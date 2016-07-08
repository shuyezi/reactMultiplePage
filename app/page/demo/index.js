/**
 * Created by Jimmy on 2016/6/27.
 */

import React from 'react';
import ReactDOM from 'react-dom';

//style of page
import './index.less';
//images of page
import mobileWaterfall from './images/mobile-waterfall.png';

class DemoIndex extends React.Component {
    render() {
    	console.log("GLOBAL", GLOBAL, GLOBAL.DOMAIN, GLOBAL.CDN);
        console.log('$(document)', $(document));
        console.log('$(window)', $(window));
        return(
            <div>
                <div id='demoIndex'>demoIndex</div>
                <div className='img'></div>
                <img src={mobileWaterfall} style={{width: '100%'}} />
            </div>
        );
    }
}

ReactDOM.render(<DemoIndex />, document.getElementById("wrapper"));