import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

function InfluencerCard(props) {
    let score = props.item.score ? props.item.score.toFixed(2) : '';
    let changeWeek = props.item.changeWeek ? props.item.changeWeek.toFixed(2) : '';

    const history = useHistory();

    const onClick = () => {
        history.push(`/profile/${props.item.screenName}`);
    }
    
    return (
        <div 
            className={'influencer-card'}
            onClick={onClick}
        >
            <span className={'rank'}>
                {props.item.rank}
            </span>
            <div className={'profile'}>
                <img src={props.item.imageUrl} alt='avatar' />
                <div className={'info'}>
                    <span className={'name'}>{props.item.name}</span>
                    <span className={'screen-name'}>@{props.item.screenName}</span>
                </div>
            </div>
            <span className={'score'}>
                {score}
            </span>
            <span className={'following'}>
                {props.item.following}
            </span>
            <span className={'followers'}>
                {props.item.followers}
            </span>
            <span className={'change'}>
                {changeWeek}
            </span>
        </div>
    )
}

export default InfluencerCard;