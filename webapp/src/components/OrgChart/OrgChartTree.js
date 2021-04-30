import React, { Component } from "react";
import OrgChartComponent from "./OrgChart";
import * as d3 from "d3";
import Cookies from "js-cookie";
import orgServices from '../../services/org.service'
import userService from '../../services/users.service'
import { getOrgDetails } from '../../actions/organizationActions'
import { getAllUsers } from '../../actions/usersActions'
import { connect } from 'react-redux';
import sample from './sample.json'
import utils from './../../utils/utils'
import { relativeTimeThreshold } from "moment";

class OrgChartTree extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            usersList: [],
            orgDetails: {}
        };
    }

    getFormattedData = (userList) => {
        console.log("getFormattedData", this.state.orgDetails)
        const nodeList = userList.map((user, index) => {
            return {
                "nodeId": `0-${index + 1}`,
                "email": user.email
            }
        })
        let rootNodeId;
        nodeList.forEach(node => {
            if (node.email.toUpperCase()
                === this.state.orgDetails.email.toUpperCase()) {
                rootNodeId = node.nodeId;
            }
        })
        console.log("rootNodeId", rootNodeId);

        const flist = userList.map(obj => {
            // console.log("obj", obj)
            let parentNodeId;
            let childNodeId;
            nodeList.forEach(u => {
                if (u.email.toUpperCase() === obj.email.toUpperCase()) {
                    childNodeId = u.nodeId;
                } else if (obj.managerDetail === undefined || obj.managerDetail.email === undefined) {
                    parentNodeId = rootNodeId;
                } else if (obj.managerDetail.email.toUpperCase() === u.email.toUpperCase()) {
                    parentNodeId = u.nodeId;
                }
            })
            // return obj
            if (obj.email.toUpperCase() === this.state.orgDetails.email.toUpperCase()) {
                return {
                    ...sample
                    , nodeId: childNodeId
                    , template: utils.getTemplate(obj.userName, obj.role === undefined ? "N/A" : obj.role)
                    , nodeImage: {
                        ...sample.nodeImage,
                        url: obj.picture
                    }
                }
            } else {
                return {
                    ...sample
                    , nodeId: childNodeId
                    , parentNodeId: parentNodeId
                    , template: utils.getTemplate(obj.userName, obj.role === undefined ? "N/A" : obj.role)
                    , nodeImage: {
                        ...sample.nodeImage,
                        url: obj.picture
                    }
                    , backgroundColor: {
                        ...sample.backgroundColor,
                        "red": 51,
                        "green": 182,
                        "blue": 208,
                        "alpha": 1

                    }
                }
            }
        });
        return flist;
    }

    render() {

        console.log("this.state orgtree-->", this.state);
        let userList = [...this.state.usersList];
        if (this.state.orgDetails.email !== undefined)
            userList.push({ email: this.state.orgDetails.email, userName: this.state.orgDetails.orgName })

        let finalDataList = [];
        if (this.state.orgDetails.email !== undefined && userList.length > 1)
            finalDataList = this.getFormattedData(userList);

        console.log("flist", finalDataList)

        return <OrgChartComponent data={finalDataList} />;
    }


    updateOrgDetails = (tokenId, orgID) => {
        orgServices
            .getOrgDetails(tokenId, orgID)
            .then(response => {
                this.setState({ orgDetails: response });
                this.props.getOrgDetails(response);
            })

    }

    getUsers = (tokenId, googleId) => {
        userService.getUsersByGoogleId(tokenId,
            { googleId: googleId })
            .then(response => {
                console.log("response", response);
                this.setState({ usersList: response });
                this.props.getAllUsers(response)
            })
    }


    componentDidMount() {
        const tokenId = Cookies.get('tokenId')
        const orgId = Cookies.get('orgId')
        const googleId = Cookies.get('googleId')
        this.updateOrgDetails(tokenId, orgId);
        this.getUsers(tokenId, googleId);
        console.log(this.state);
        // d3.json(
        //     "https://gist.githubusercontent.com/bumbeishvili/dc0d47bc95ef359fdc75b63cd65edaf2/raw/c33a3a1ef4ba927e3e92b81600c8c6ada345c64b/orgChart.json"
        // ).then(data => {
        //     console.log(data[0]);
        //     this.setState({ data: data });
        // });
    }
}

const mapStateToProps = (state) => ({
    usersList: state.globalStateReducer.usersList,
    orgDetail: state.globalStateReducer.orgDetail
});

const mapDispatchToProps = (dispatch) => ({
    getOrgDetails: (orgDetails) => getOrgDetails(dispatch, orgDetails),
    getAllUsers: (userList) => getAllUsers(dispatch, userList)
})

export default connect(mapStateToProps, mapDispatchToProps)(OrgChartTree);
