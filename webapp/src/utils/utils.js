/**
 * format date to mm/dd/yyyy 
 * @param {*} date 
 * @returns 
 */
const formatDate = (date) => {

    let month = String(date.getMonth() + 1);
    let day = String(date.getDate() + 1);
    const year = String(date.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${month}/${day}/${year}`;
}

const getTemplate = (name, role) => {

    const template = `
"<div>
    <div style="margin-left:70px;margin-top:10px;font-size:50px;font-weight:bold;">
        ${name}
    </div>
    <div style="margin-left:70px;margin-top:3px;font-size:30px;">
           Role: ${role}
    </div>
</div>
`
    return template;


}


// eslint-disable-next-line import/no-anonymous-default-export
export default { formatDate, getTemplate }