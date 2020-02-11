import React, { useState } from 'react';
import './style.css';

const CLUSTER_IMAGE_MAP = {
    'Bitcoin': require('../../assets/BTC.png'),
    'Ethereum': require('../../assets/ETH.png'),
    'Ripple': require('../../assets/XRP.png'),
    'All Crypto': require('../../assets/Crypto.png'),
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
            <img src={CLUSTER_IMAGE_MAP[props.name]} alt='Cluster Icon' />
            <span>{props.name}</span>
        </div>
    )
}

function Home() {
    const [activeCluster, setActiveCluster] = useState('Bitcoin');
    return (
        <div className={'container'}>
            <section className={'cluster-selection'}>
                <div className={'cluster-group'}>
                    <Cluster name={'Bitcoin'} activeCluster={activeCluster} setActiveCluster={setActiveCluster} />
                    <Cluster name={'Ethereum'} activeCluster={activeCluster} setActiveCluster={setActiveCluster} />
                    <Cluster name={'Ripple'} activeCluster={activeCluster} setActiveCluster={setActiveCluster} />
                    <Cluster name={'All Crypto'} activeCluster={activeCluster} setActiveCluster={setActiveCluster} />
                </div>
            </section>
            <section>

            </section>
            <section>

            </section>
        </div>
    )
}

export default Home;