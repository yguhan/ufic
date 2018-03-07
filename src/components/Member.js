import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import MemberInfoList from './MemberInfoList';
import * as API from '../lib/api';
import moment from 'moment';
import { parseShortenString, getAssetAmount } from '../lib/common';

class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            memberInfoList: [],
        }
    }

    componentDidMount() {
        this.getMemberInfoList();
    }

    getMemberInfoList = async() => {

        this.setState({
            fetching: true,
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
                '보유량': getAssetAmount(balance),
                tx: tx.id,
                '활동여부': isActing,
            }

        });

        const memberInfoList = await Promise.all(memberInfoPromiseList);

        this.setState({
            memberInfoList: memberInfoList,
            fetching: false,
        });

    }

    render() {
        const { memberInfoList, fetching } = this.state;
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
                </ul>
                <div className="tab-content">
                    <div id="total_member" className="tab-pane fade in active">
                        {!fetching &&
                            <MemberInfoList memberInfoList={memberInfoList} />
                        }
                    </div>
                    <div id="acting_member" className="tab-pane fade">
                        {!fetching &&
                            <MemberInfoList memberInfoList={actingMemberInfoList} />
                        }
                    </div>
                </div>
            </div>
        </div>
      );
    }   
}

export default Member;
