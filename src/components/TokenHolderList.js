import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import * as API from '../lib/api';
import _ from 'lodash';
import { parseShortenString, getAssetAmountById } from '../lib/common';

class TokenHolderList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.tokenHolderMap);

        return (
            <div className="container" style={{maxWidth: 1000}}>
               
                <div className="panel panel-default">
                    <div className="panel-heading">토큰 홀더 정보</div>
                    <table className="table" style={{textAlign: 'left'}}>
                        <thead>
                        <tr>
                            <td>주소</td><td>보유량</td>
                        </tr>
                        </thead>
                        <tbody>
                            {/* {address of A: assetAmount of A, ...} */}
                            {_.keys(this.props.tokenHolderMap).map((address, i) => {
                                return (
                                <tr key={i}>
                                    <td><a href={`${Constants.WAVESEXPLORER_URI}/address/${address}`}>{ parseShortenString(address) }</a></td>
                                    <td>{getAssetAmountById(this.props.tokenHolderMap[address], Constants.UFIC_ASSET_ID)}</td>
                                </tr>
                                );
                            })

                            }
                            
                        </tbody>
                    </table>
                </div>
            
            </div>
        );
    }
}

export default TokenHolderList;
