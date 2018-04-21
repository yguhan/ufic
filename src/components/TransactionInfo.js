import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import Balance from './Balance';
import { parseShortenString, decodeAttachment, getAssetAmountWithNameById } from '../lib/common';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/ko';

// korean timezone
moment.locale('ko');

class TransactionInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        const {tx, i} = this.props;

        return (        
            // 거래일시 / 입금액 / 출금액 / 수수료 / 보낸 주소 / 받는 주소 / 메모 / tx         
            <tr>
                <td>{moment(tx.timestamp).format('YYYY/MM/DD hh:mm:ss')}</td>
                <td>{tx.recipient == Constants.UFIC_WALLET_ADDRESS ? getAssetAmountWithNameById(tx.amount, tx.assetId) : 0}</td>
                <td>{tx.sender == Constants.UFIC_WALLET_ADDRESS ? getAssetAmountWithNameById(tx.amount, tx.assetId) : 0}</td>
                <td>{tx.sender == Constants.UFIC_WALLET_ADDRESS ? getAssetAmountWithNameById(tx.fee, Constants.WAVES_ASSET_ID) : 0}</td>
                <td><a href={`${Constants.WAVESEXPLORER_URI}/address/${tx.sender}`}>{ parseShortenString(tx.sender) }</a></td>
                <td><a href={`${Constants.WAVESEXPLORER_URI}/address/${tx.recipient}`}>{ parseShortenString(tx.recipient) }</a></td>
                <td>{ decodeAttachment(tx.attachment) }</td>
                <td><a href={`${Constants.WAVESEXPLORER_URI}/tx/${tx.id}`}>{ parseShortenString(tx.id) }</a></td>
            </tr>            
        );
        
    }
}

export default TransactionInfo;
