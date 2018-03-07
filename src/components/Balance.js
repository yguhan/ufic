import React, { Component } from 'react';
import * as Constants from '../constants/constants';
import * as API from '../lib/api';
import _ from 'lodash';
import { getAssetAmount } from '../lib/common';

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balances: [],
            fetching: true,
        }
    }

    componentDidMount() {
        this.getBalances();
    }

    getBalances = async() => {

        this.setState({
            fetching: true,
        });

        const balances = await API.getBalances(Constants.UFIC_WALLET_ADDRESS);

        this.setState({
            balances: balances,
            fetching: false,
        });

    }
    
    render() {
        const {balances, fetching} = this.state;

        return (
            <div>
                <h5>@동아리 지갑 주소: <a href={`https://wavesexplorer.com/address/${Constants.UFIC_WALLET_ADDRESS}`}>{Constants.UFIC_WALLET_ADDRESS}</a></h5>
                <div className="alert alert-success" role="alert">
                    
                    {!fetching &&
                        balances.map((balance) => {
                            return <p>Total {_.get(balance, 'asset.name')} : {getAssetAmount(balance)} </p>
                        }) 
                    }
                </div>
            </div>
        );
    }
}

export default Balance;
