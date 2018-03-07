import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import Balance from './Balance';
import TransactionInfo from './TransactionInfo';
import _ from 'lodash';

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
                    <div className="panel-heading">거래 내역</div>
                    <table className="table" style={{textAlign: 'left'}}>
                        <thead>
                        <tr>
                            <td>거래일시</td><td>입금액</td><td>출금액</td><td>수수료</td><td>보낸 주소</td><td>받는 주소</td><td>메모</td><td>tx</td>
                        </tr>
                        </thead>
                        <tbody>
                            {txList.map((tx, i) => {
                                return <TransactionInfo tx={tx} key={i} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TransactionList;
