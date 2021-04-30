import react from 'react';
import OrgChartTree from '../components/OrgChart/OrgChartTree';
import NavigationHeader from '../components/Navigation/NavigationHeader';

const OrgChartContainer = (props) => {

    return (<div>
        <NavigationHeader />
        <OrgChartTree />
    </div>
    )

}

export default OrgChartContainer;