import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => (
    <div className="flex items-center justify-center h-screen">
        <ReactLoading type={'spin'} color={'red'} height={'20%'} width={'20%'} />
    </div>
);

export default Loading;
