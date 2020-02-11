import React from 'react';

import { useParams } from 'react-router-dom';

function Profile() {
    let { screenName } = useParams();
    return (
        <div className={'container'}>
            <h1>{screenName}</h1>
        </div>
    )
}

export default Profile;