import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import Balance from './Balance';
import { parseFormattedAssetNumber, parseShortenString, decodeAttachment } from '../lib/common';
import _ from 'underscore';
import moment from 'moment';
import 'moment/locale/ko';

// TO: korean timezone
moment.locale('ko');

class TransactionInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.getAssetAmount = this.getAssetAmount.bind(this);
    }


    render() {
        const {tx, i} = this.props;

        return (        
            // 거래일시 / 입금액 / 출금액 / 수수료 / 보낸 주소 / 받는 주소 / 메모 / tx         
            // TODO: 종류 없애고 1000 UFIC, 0.1 WAVES 형태로
            <tr>
                <td>{moment(tx.timestamp).format('YYYY hh:mm:ss')}</td>
                <td>{tx.recipient == Constants.UFIC_WALLET_ADDRESS ? this.getAssetAmount(tx.assetId, tx.amount) : 0}</td>
                <td>{tx.sender == Constants.UFIC_WALLET_ADDRESS ? this.getAssetAmount(tx.assetId, tx.amount) : 0}</td>
                <td>{this.getAssetAmount(null, tx.fee)}</td>
                <td><a href={`https://wavesexplorer.com/address/${tx.sender}`}>{ parseShortenString(tx.sender) }</a></td>
                <td><a href={`https://wavesexplorer.com/address/${tx.recipient}`}>{ parseShortenString(tx.recipient) }</a></td>
                <td>{ decodeAttachment(tx.attachment) }</td>
                <td><a href={`https://wavesexplorer.com/tx/${tx.id}`}>{ parseShortenString(tx.id) }</a></td>
            </tr>            
        );
    }

    getAssetAmount(assetId, amount) {
        switch(assetId) {
            case null: {
                return `${parseFormattedAssetNumber(Constants.WAVES_ASSET_ID, amount)} WAVES`;
            }
            case Constants.UFIC_ASSET_ID : {
                return `${parseFormattedAssetNumber(assetId, amount)} UFIC`;
            }
            default : {
                return `${amount} ?`;
            } 
        
        }
    }

}

export default TransactionInfo;
