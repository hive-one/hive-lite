import React, { useState, useEffect } from 'react';
import hive from 'hiveone-js';
import { useParams } from 'react-router-dom';

import './style.css';

const hiveAPI = hive({ apiKey: '5460ce138ce3d46ae5af00018c576af991e3054a' });

function Profile() {
    let { screenName } = useParams()
    const [influencer, setInfluencer] = useState(undefined);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const getInfluencerData = async () => {
            const profile = await hiveAPI.influencerDetails({influencerId: screenName, includeFollowers: 1});
            if (profile.hasPodcasts.host || profile.hasPodcasts.guest) {
                let podcastResponse = await hiveAPI.influencerPodcasts({influencerId: screenName});
                profile.podcasts = podcastResponse.podcasts.edges;
            }
            console.log(profile);
            setInfluencer(profile);
            setFollowers(profile.scores.find(item => item.name === 'Crypto').followers);
        }
        getInfluencerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderFollowers = () => {
        return followers.map((item, index) => (
            <div className={'follower'} key={index}>
                <img src={item.imageUrl} alt='Follower Avatar' />
                <p>{item.name}</p>
                <p>@{item.screenName}</p>
            </div>
        ))
    }

    const renderPodcasts = () => {
        if (influencer && influencer.podcasts) {
            const renderPodcastList = () => influencer.podcasts.map((item, index) => {
                let publishedAt = new Date(item.publishedAt * 1000);
                return (
                    <div key={index} className={'podcast'}>
                        <div>
                            <p className={'episode-name'}>{item.name}</p>
                            <p className={'podcast-name'}>{item.podcast.name}</p>
                        </div>

                        <div className={'date'}>
                            {publishedAt.getDay()}/{publishedAt.getMonth()}/{publishedAt.getFullYear()}
                        </div>
                    </div>
                )
            });
            return (
                <section className={'podcasts'}>
                    <h2>Recent Podcasts</h2>
                    {renderPodcastList()}
                </section>
            );
        };
    }

    if (influencer) {
        return (
            <div className={'profile-container'}>
                <section className={'influencer-details'}>
                    <div className={'profile'}>
                        <img src={influencer.imageUrl} alt='Avatar' />
                        <p>{influencer.name}</p>
                        <p>@{influencer.screenName}</p>
                    </div>
                    <hr />
                    <div className={'followers'}>
                        <h3>Top Followers</h3>
                        <div className={'followers-list'}>
                            {renderFollowers()}
                        </div>
                    </div>
                </section>
                {renderPodcasts()}
            </div>
        )
    }

    return (
        <div className={'container'}>
            <h1>Loading</h1>
        </div>
    )
}

export default Profile;