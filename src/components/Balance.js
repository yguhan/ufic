import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import * as API from '../lib/api';
import _ from 'underscore';

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wavesBalance: 0,
            uficBalance: 0,
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

        const wavesBalance = await API.getBalance(Constants.UFIC_WALLET_ADDRESS, Constants.WAVES_ASSET_ID);
        const uficBalance = await API.getBalance(Constants.UFIC_WALLET_ADDRESS, Constants.UFIC_ASSET_ID);

        this.setState({
            wavesBalance: wavesBalance.balance,
            uficBalance: uficBalance.balance,
            fetching: false,
        });
    }

    render() {
        const {wavesBalance, uficBalance, fetching} = this.state;

        return (
            <div>
                <h5>@동아리 지갑 주소: <a href={`https://wavesexplorer.com/address/${Constants.UFIC_WALLET_ADDRESS}`}>{Constants.UFIC_WALLET_ADDRESS}</a></h5>
                <div className="alert alert-success" role="alert">
                    
                    {!fetching && 
                        <div>
                            <p>Total WAVES: {wavesBalance}</p>
                            <p>Total UFIC : {uficBalance}</p> 
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Balance;
