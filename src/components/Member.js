import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import MemberList from './MemberList';

class Member extends Component {
    constructor(props) {
      super(props);
      this.state = {
        uficHoldersMap: {},
        fetching: true,
      }
    }

    componentDidMount() {
        this.getUficHoldersMap();
    }

    getUficHoldersMap = async() => {
        
        this.setState({
            fetching: true,
        });
        const uficHoldersMap = await this.props.waves.API.Node.v1.assets.distribution(Constants.UFIC_ASSET_ID);

        this.setState({
            uficHoldersMap: uficHoldersMap,
            fetching: false, // done
        });
    }

    render() {
        const {uficHoldersMap, fetching} = this.state;

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
                            <MemberList uficHoldersMap={uficHoldersMap} />
                        }
                    </div>
                    <div id="acting_member" className="tab-pane fade">
                        {/* TODO: acting member */}
                    </div>
                </div>
            </div>
            <h1> </h1>
            <pre>
                UFIC Token Explorer v{Constants.UFICTOKENEXPLORER_VERSION}, created by <a href="http://steemit.com/@yguhan">@yguhan</a>
            </pre>
        </div>
      );
    }
}

export default Member;
