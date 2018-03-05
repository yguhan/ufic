import React, { Component } from 'react';
import _ from 'underscore';

class MemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="container" style={{maxWidth: 1000}}>
                
                <div className="panel panel-default">
                    <div className="panel-heading">주소 / 보유 UFIC</div>
                    <table className="table" style={{textAlign: 'left'}}>
                        <thead>
                        <tr>
                            <td>주소</td><td>보유 UFIC</td>
                        </tr>
                        </thead>
                        <tbody>
                            {_.keys(this.props.uficHoldersMap).map((key, i) => {
                                return (
                                <tr key={i}>
                                    <td>{key}</td>
                                    <td>{this.props.uficHoldersMap[key]}</td>
                                </tr>);
                            })}  
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MemberList;
