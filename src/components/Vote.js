import React, { Component } from 'react';
import * as Constants from '../constants/constants';
import VoteInfoList from './VoteInfoList';
import * as API from '../lib/api';
import _ from 'lodash';

class Vote extends Component {
    constructor(props) {
      super(props);
      this.state = {
        txToVoteMap: {},
        fetching: true,
      }
    }

    componentDidMount() {
        this.getTxToVoteMap();
    }

    getTxToVoteMap = async() => {
        
        this.setState({
            fetching: true,
        });

        let txList = await API.getTxs(Constants.UFIC_VOTE_ADDRESS); 
        txList.filter((tx) => tx.recipient === Constants.UFIC_VOTE_ADDRESS && tx.attachment);

        const surveyTxList = txList.filter((tx) => /#survey/.test(tx.attachment));
        const voteTxList = txList.filter((tx) => /#vote/.test(tx.attachment));

        // {
        //     'front4TxId': {
        //         'survey': 'tx',
        //         'votes': [tx, ],
        //     },
        // }
        let txToVoteMap = _.reduce(surveyTxList, (map, tx)=> {
            const front4TxId = tx.id.slice(0, 4);
            map[front4TxId] = {
                'survey' : tx,
                'votes': [],
            };
            return map;
        }, {})

        voteTxList.forEach((tx) => {
            
            // attaachment = '#vote A32m 1'
            const matches = tx.attachment.match(/^#vote (\w{4}).*/);
            if (!matches) return ;

            const front4TxId = matches[1];
            if (!txToVoteMap[front4TxId]) return ;

            return txToVoteMap[front4TxId]['votes'].push(tx);

        });

        this.setState({
            txToVoteMap: txToVoteMap,
            fetching: false, // done
        });
    }



    render() {
        const {txToVoteMap, fetching} = this.state;

        return (
            <div className="container">
                <div><h1></h1></div>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="active">
                            <a data-toggle="tab" href="#total_vote">전체 투표 내역</a>
                        </li>
                        <li>
                            <a data-toggle="tab" href="#recent_vote">최근 투표 내역</a>
                        </li>
                        <li>
                            <a data-toggle="tab" href="#vote_process">투표 생성 방법</a>
                        </li>
                        
                    </ul>
                    <div className="tab-content">
                        <h5>@투표 지갑 주소: <a href={`https://wavesexplorer.com/address/${Constants.UFIC_VOTE_ADDRESS}`}>{Constants.UFIC_VOTE_ADDRESS}</a></h5>
                        <div id="total_vote" className="tab-pane fade in active">
                            { !fetching &&
                                <VoteInfoList txToVoteMap={txToVoteMap} />
                            }
                        </div>
                        <div id="recent_vote" className="tab-pane fade">
                            {/* TODO: recent_vote */}
                        </div>
                        <div id="vote_process" className="tab-pane fade">
                            <div className="alert alert-success" role="alert">
                                <p>투표 지갑 주소에 아래 메시지와 함께 1 UFIC을 전송</p>
                                <p>#survey '질문' '선택사항1/선택사항2/선택사항3'</p>
                                <br/>
                                <p>예시)</p>
                                <p>#survey '이번 주 모임 저녁 메뉴' '치킨/피자'</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Vote;
