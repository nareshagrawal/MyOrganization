import react from 'react'
import Calendar from '../components/Calendar/Calendar';
import NavigationHeader from '../components/Navigation/NavigationHeader';

const CalendarContainer = (props) => {

    return (<div>
        <NavigationHeader />
        <Calendar />
    </div>
    )

}

export default CalendarContainer;