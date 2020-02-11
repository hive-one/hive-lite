import React, { useState, useEffect } from 'react';
import './style.css';
import hive from 'hiveone-js';
const hiveAPI = hive({ apiKey: '5460ce138ce3d46ae5af00018c576af991e3054a' });

const CLUSTER_ABBR_NAME_MAP = {
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'XRP': 'Ripple',
    'Crypto': 'All Crypto',
}

function InfluencerCard(props) {
    return (
        <div className={'influencer-card'}>
            <span className={'rank'}>
                {props.item.rank}
            </span>
            <div className={'profile'}>
                <img src={props.item.imageUrl} alt='avatar' />
                <div className={'info'}>
                    <span>{props.item.name}</span>
                    <span>{props.item.screenName}</span>
                </div>
            </div>
            <span className={'score'}>
                {props.item.score.toFixed(2)}
            </span>
            <span className={'following'}>
                {props.item.following}
            </span>
            <span className={'followers'}>
                {props.item.followers}
            </span>
            <span className={'change'}>
                {props.item.changeWeek.toFixed(2)}
            </span>
        </div>
    )
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

function Home() {
    const [activeCluster, setActiveCluster] = useState('BTC');
    const [after, setAfter] = useState(0);
    const [influencers, setInfluencers] = useState([]);

    useEffect(() => {
        const getLeaderBoard = async () => {
            try {
                const response = await hiveAPI.topInfluencers({
                    after,
                    cluster: activeCluster
                });
                setInfluencers(response);
            } catch (error) {
                throw new Error(error);
            }
        };
        getLeaderBoard();
    }, [activeCluster, after]);

    return (
        <div className={'container'}>
            <section className={'cluster-selection'}>
                <div className={'cluster-group'}>
                    <Cluster name={'BTC'} activeCluster={activeCluster} setActiveCluster={setActiveCluster} />
                    <Cluster name={'ETH'} activeCluster={activeCluster} setActiveCluster={setActiveCluster} />
                    <Cluster name={'XRP'} activeCluster={activeCluster} setActiveCluster={setActiveCluster} />
                    <Cluster name={'Crypto'} activeCluster={activeCluster} setActiveCluster={setActiveCluster} />
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
                    {influencers.map((item, index) => (
                        <InfluencerCard key={index} item={item} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home;