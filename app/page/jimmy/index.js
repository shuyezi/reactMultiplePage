/**
 * Created by Jimmy on 2016/6/27.
 */

import React from 'react';
import ReactDOM from 'react-dom';

//style of page
import './index.less';
//images of page
// import mobileWaterfall from './images/mobile-waterfall.png';

class DemoIndex extends React.Component {
    render() {
        return(
            <div>
                <div id='demoIndex'>jimmy111111111</div>
            </div>
        );
    }
}

ReactDOM.render(<DemoIndex />, document.getElementById("wrapper"));

