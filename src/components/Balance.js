import React, { Component } from 'react';
import * as Constants from '../constants/constants';
import * as API from '../lib/api';
import _ from 'lodash';
import { getAssetAmountWithName } from '../lib/common';

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
                <div className="alert alert-success" role="alert">
                    
                    {!fetching &&
                        balances.map((balance) => {
                            return <p>Total {_.get(balance, 'asset.name')} : {getAssetAmountWithName(balance)} </p>
                        }) 
                    }
                </div>
            </div>
        );
    }
}

export default Balance;
