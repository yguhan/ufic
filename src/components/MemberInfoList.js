import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import * as API from '../lib/api';
import _ from 'lodash';
import { parseShortenString } from '../lib/common';

class MemberInfoList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container" style={{maxWidth: 1000}}>
                <div><h1></h1></div>
                <div className="panel panel-default">
                    <div className="panel-heading">동아리원 정보</div>
                    <table className="table" style={{textAlign: 'left'}}>
                        <thead>
                        <tr>
                            {_.keys(this.props.memberInfoList[0]).map((key, i) => {
                                return (
                                <td>{key}</td>
                                );
                            })}
                        </tr>
                        </thead>
                        <tbody>
                            {/* [{}, {}] */}
                            {this.props.memberInfoList.map((memberInfo, i) => {
                                // // {} -> <tr> ... <tr>
                                return (
                                    <tr>
                                        {_.keys(memberInfo).map((key, i) => {
                                            switch (key) {
                                                case '주소': {
                                                    return (
                                                        <td><a href={`${Constants.WAVESEXPLORER_URI}/address/${memberInfo[key]}`}>{parseShortenString(memberInfo[key])}</a></td>
                                                    )
                                                }
                                                case 'tx': {
                                                    return (
                                                        <td><a href={`${Constants.WAVESEXPLORER_URI}/tx/${memberInfo[key]}`}>{parseShortenString(memberInfo[key])}</a></td>
                                                    )
                                                }
                                                default : {
                                                    return (
                                                        <td>{memberInfo[key]}</td>
                                                    )
                                                }

                                            }
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            
            </div>
        );
    }
}

export default MemberInfoList;
