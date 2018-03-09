import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import TransactionList from './TransactionList';
import * as API from '../lib/api';
import _ from 'lodash';

class Account extends Component {
    constructor(props) {
      super(props);
      this.state = {
        txList: [],
        fetching: true,
      }
    }

    componentDidMount() {
        this.getTxs();
    }

    getTxs = async() => {
        
        this.setState({
            fetching: true,
        });
        let txList = await API.getTxs(Constants.UFIC_WALLET_ADDRESS); 

        this.setState({
            txList: txList,
            fetching: false, // done
        });
    }

    render() {
        const {txList, fetching} = this.state;
        const depositTxList = txList.filter((tx) => tx.recipient === Constants.UFIC_WALLET_ADDRESS);
        const withdrawalTxList = txList.filter((tx) => tx.sender === Constants.UFIC_WALLET_ADDRESS);

        return (
            <div className="container">
                <div><h1></h1></div>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="active">
                            <a data-toggle="tab" href="#total_tx">전체 거래 내역</a>
                        </li>
                        <li>
                            <a data-toggle="tab" href="#deposit_tx">입금 내역</a>
                        </li>
                        <li>
                            <a data-toggle="tab" href="#withdrawal_tx">출금 내역</a>
                        </li>
                    </ul>
                    <div className="tab-content">

                        <h5>@동아리 지갑 주소: <a href={`https://wavesexplorer.com/address/${Constants.UFIC_WALLET_ADDRESS}`}>{Constants.UFIC_WALLET_ADDRESS}</a></h5>
                        <div id="total_tx" className="tab-pane fade in active">
                            { !fetching &&
                                <TransactionList txList={txList} />
                            }
                        </div>
                        <div id="deposit_tx" className="tab-pane fade">
                            { !fetching && 
                                <TransactionList txList={depositTxList} />
                            }
                        </div>
                        <div id="withdrawal_tx" className="tab-pane fade">
                            { !fetching && 
                                <TransactionList txList={withdrawalTxList} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;
