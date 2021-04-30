import React from 'react';
import TreeChart from "d3-org-chart";

class OrgChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.createDiagram = this.createDiagram.bind(this);
    }

    componentDidMount() {
        if (this.props.data.length > 0)
            this.createDiagram();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.data.length > 0)
            this.createDiagram();
    }

    render() {
        if (this.props.data.length > 0) {
            return (
                <div style={{ 'margin-top': '100px' }}>
                    <div ref={(node) => (this.node = node)} />
                </div>
            );
        }
        else {
            return (<div>No data </div>);
        }
    }

    createDiagram() {
        const node = this.node;
        if (!this.props.data) {
            return;
        }
        if (!this.chart) {
            this.chart = new TreeChart();
        }
        this.chart.container(node)
            .data(this.props.data)
            .svgWidth(500)
            .initialZoom(0.4)
            .onNodeClick(d => console.log(d + " node clicked"))
            .render();
    }
}

export default OrgChartComponent;