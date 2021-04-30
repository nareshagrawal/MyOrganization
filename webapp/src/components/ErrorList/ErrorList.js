import './main.scss';

const ErrorList = ({ errorList }) => {

    return errorList.map((value, idx) => {
        return (<div key={idx} className="custom-alert alert-danger">
            {value}
        </div>)
    });

};


export default ErrorList;