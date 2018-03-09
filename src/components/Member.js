import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import MemberInfoList from './MemberInfoList';
import TokenHolderList from './TokenHolderList';
import * as API from '../lib/api';
import moment from 'moment';
import { parseShortenString, getAssetAmountWithName } from '../lib/common';

class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchingMemberInfoList: true,
            fetchingTokenHolderMap: true,
            memberInfoList: [],
            tokenHolderMap: {},
        }   
    }

    componentDidMount() {
        this.getMemberInfoList();
        this.getTokenHolderMap();
    }

    getMemberInfoList = async() => {

        this.setState({
            fetchingMemberInfoList: true,
        });

        const txs = await API.getTxs(Constants.UFIC_REGISTER_ADDRESS);

        const memberInfoPromiseList = txs.map(async (tx) => {

            // NOTE: #register 0 Admin 2018-1
            // ['#register 0 Admin 2018-1', '0', 'Admin', ' 2018-1', '2018', '1']
            const matches = tx.attachment.match(/^#register (\d) ([a-zA-Z가-힣]+)( (\d{4})-(\d))?/);
            if (!matches) return ; 
            
            // month(3) -> 2
            // 1~6(->0~5) -> 0 / 7~12(->6~11) -> 1
            let isActing = moment().year() == matches[4] && (parseInt(moment().month()/6) + 1).toString() == matches[5];
            isActing = isActing? '활동' : '비활동';

            const balance = await API.getBalance(tx.sender, Constants.UFIC_ASSET_ID);
            
            return {
                '기수': matches[1],
                '이름': matches[2],
                '주소': tx.sender,
                '보유량': getAssetAmountWithName(balance),
                '활동여부': isActing,
                tx: tx.id,
            }

        });

        let memberInfoList = await Promise.all(memberInfoPromiseList);
        memberInfoList.sort((prevMemberInfo, currentMemberInfo) => prevMemberInfo.기수 < currentMemberInfo.기수);

        this.setState({
            memberInfoList: memberInfoList,
            fetchingMemberInfoList: false,
        });

    }

    getTokenHolderMap = async() => {
        
        this.setState({
            fetchingTokenHolderMap: true,
        })

        const tokenHolderMap = await API.getAssetDistribution(Constants.UFIC_ASSET_ID);

        this.setState({
            tokenHolderMap: tokenHolderMap,
            fetchingTokenHolderMap: false,
        })
    }

    render() {
        const { memberInfoList, fetchingMemberInfoList, tokenHolderMap, fetchingTokenHolderMap } = this.state;
        const actingMemberInfoList = memberInfoList.filter((member) => member['활동여부'] == '활동');

        return (
        <div className="container">
            <div><h1></h1></div>
            <div>
                <ul className="nav nav-tabs">
                    <li className="active">
                        <a data-toggle="tab" href="#total_member">전체 멤버</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#acting_member">활동 멤버</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#token_holder">토큰 홀더</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#register_process">등록 방법</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <h5>@등록 지갑 주소: <a href={`https://wavesexplorer.com/address/${Constants.UFIC_REGISTER_ADDRESS}`}>{Constants.UFIC_REGISTER_ADDRESS}</a></h5>
                    <div id="total_member" className="tab-pane fade in active">
                        {!fetchingMemberInfoList &&
                            <MemberInfoList memberInfoList={memberInfoList} />
                        }
                    </div>
                    <div id="acting_member" className="tab-pane fade">
                        {!fetchingMemberInfoList &&
                            <MemberInfoList memberInfoList={actingMemberInfoList} />
                        }
                    </div>
                    <div id="token_holder" className="tab-pane fade">
                        {!fetchingTokenHolderMap &&
                            <TokenHolderList tokenHolderMap={tokenHolderMap} />
                        }
                    </div>
                    <div id="register_process" className="tab-pane fade">
                        <div className="alert alert-success" role="alert">                            
                            <p>등록 지갑 주소에 아래 메시지와 함께 1 UFIC을 전송</p>
                            <p>#register [기수] [이름] [년도-학기]</p>
                            <br/>
                            <p>예시)</p>
                            <p>활동 멤버: #register 10 홍길동 2018-1</p>
                            <p>비활동 멤버: #register 5 홍길순</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }   
}

export default Member;
