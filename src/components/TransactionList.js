import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import Balance from './Balance';
import _ from 'underscore';

class TransactionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {txList} = this.props;

        return (
            <div className="container">

                <Balance />
                
                <div className="panel panel-default">
                    <div className="panel-heading">거래일시 / 종류 / 입금액 / 출금액 / 보낸 주소 / 받는 주소 / tx </div>
                    <table className="table" style={{textAlign: 'left'}}>
                        <thead>
                        <tr>
                            <td>거래일시</td><td>종류</td><td>입금액</td><td>출금액</td><td>보낸 주소</td><td>받는 주소</td><td>tx</td>
                        </tr>
                        </thead>
                        <tbody>
                            {txList.map((tx, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{tx.timestamp}</td>
                                        <td>{tx.assetId == null ? 'WAVES' : 'UFIC'}</td>
                                        <td>{tx.sender == Constants.UFIC_WALLET_ADDRESS ? 0 : tx.amount}</td>
                                        <td>{tx.sender !== Constants.UFIC_WALLET_ADDRESS ? 0 : tx.amount}</td>
                                        <td><a href={`https://wavesexplorer.com/address/${tx.sender}`}>보낸 주소</a></td>
                                        <td><a href={`https://wavesexplorer.com/address/${tx.recipient}`}>받는 주소</a></td>
                                        <td><a href={`https://wavesexplorer.com/tx/${tx.id}`}>tx</a></td>
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TransactionList;
