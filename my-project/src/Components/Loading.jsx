import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, color }) => (
    <div style={{ alignContent: 'center', alignSelf: 'center', justifyContent: 'center', width: '100%', 'height': '100%' }}>
        <ReactLoading type={'spin'} color={'red'} height={'20%'} width={'20%'} />
    </div>
);

export default Loading;