const style = {
    'listStyleType': 'none',
    'padding': '0px'
}

const List = (props) => {
    console.log("list props", props)
    const list = props.attendees.map((attendee, idx) => {
        return (<li key={idx}>{attendee.email}</li>)
    })

    return (<ul style={style}>{list}</ul>);
}


export default List;