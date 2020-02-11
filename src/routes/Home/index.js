import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import hive from 'hiveone-js';
import { Waypoint } from 'react-waypoint';

import InfluencerCard from '../../components/influencerCard';

const hiveAPI = hive({ apiKey: '5460ce138ce3d46ae5af00018c576af991e3054a' });

const CLUSTER_ABBR_NAME_MAP = {
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'XRP': 'Ripple',
    'Crypto': 'All Crypto',
}

function Cluster(props) {
    const isActive = props.activeCluster === props.name;
    const setActiveCluster = () => {
        props.setActiveCluster(props.name);
    }
    return (
        <div 
            className={`cluster${(isActive ? ' cluster-active': '')}`}
            onClick={setActiveCluster}
        >
            <img src={require(`../../assets/${props.name}.png`)} alt='Cluster Icon' />
            <span>{CLUSTER_ABBR_NAME_MAP[props.name]}</span>
        </div>
    )
}

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function Home() {
    const [activeCluster, setActiveCluster] = useState('BTC');
    const [after, setAfter] = useState(0);
    const [influencers, setInfluencers] = useState([]);
    const prevCluster = usePrevious({activeCluster, setActiveCluster});

    const waypointEnter = (e) => {
        if (e.event) {
            setAfter(after + 50);
        }
    }

    const changeCluster = (clusterName) => {
        setActiveCluster(clusterName);
        setAfter(0);
    }

    useEffect(() => {
        const getLeaderBoard = async () => {
            try {
                const response = await hiveAPI.topInfluencers({
                    after,
                    cluster: activeCluster
                });
                let newInfluencers;
                if (prevCluster && prevCluster.activeCluster === activeCluster) {
                    newInfluencers = influencers.concat(response);
                } else {
                    newInfluencers = response;
                };
                setInfluencers(newInfluencers);
            } catch (error) {
                throw new Error(error);
            }
        };
        getLeaderBoard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCluster, after]);

    const renderInfluencers = () => {
        const rows = influencers.map((item, index) => (
            <InfluencerCard key={index} item={item} />
        ));


        rows.push(
            <Waypoint
                key={rows.length + 1}
                onEnter={waypointEnter}
            />
        )

        return rows;
    }

    return (
        <div className={'container'}>
            <section className={'cluster-selection'}>
                <div className={'cluster-group'}>
                    <Cluster name={'BTC'} activeCluster={activeCluster} setActiveCluster={changeCluster} />
                    <Cluster name={'ETH'} activeCluster={activeCluster} setActiveCluster={changeCluster} />
                    <Cluster name={'XRP'} activeCluster={activeCluster} setActiveCluster={changeCluster} />
                    <Cluster name={'Crypto'} activeCluster={activeCluster} setActiveCluster={changeCluster} />
                </div>
            </section>
            <section className={'big-cluster'}>
                <img src={require(`../../assets/${activeCluster}.png`)} alt='Big Cluster Icon' />
                <h2>{CLUSTER_ABBR_NAME_MAP[activeCluster]}</h2>
            </section>
            <section className={'leaderboard'}>
                <div className={'table'}>
                    <div className={'header'}>
                        <span>Rank</span>
                        <span>Name</span>
                        <span>Score</span>
                        <span>Following</span>
                        <span>Followers</span>
                        <span>1W*</span>
                    </div>
                    {renderInfluencers()}
                </div>
            </section>
        </div>
    )
}

export default Home;