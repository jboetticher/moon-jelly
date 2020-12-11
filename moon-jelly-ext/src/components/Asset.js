import React from 'react';
import { ReactComponent as Jellyfish } from '@oceanprotocol/art/creatures/jellyfish/jellyfish-full.svg';
import Dotdotdot from 'react-dotdotdot';
import '../styles/Asset.css';


function parseData(raw) {
    let data = raw.service[0].attributes.main;
    if (raw.service[0].attributes.additionalInformation) {
        data.description = raw.service[0].attributes.additionalInformation.description;

    }
    data.id = raw.id;
    data.title = raw.service[0].attributes.main.name;
    return data;
}

const Asset = props => {
    let { data } = props;
    let _data = parseData(data);
    let title = _data.title.length >= 18 ? `${_data.title.substring(0, 17)}...` : _data.title;
    return (
        <>

            <div className={"container"}>
                <div className={"textContainer"}>

                    <div className={"titleContainer"}> <a className={"title"} target="_blank" href={`https://commons.oceanprotocol.com/asset/${_data.id}`}>{title}</a> </div>



                    <div className={"metadata"}>type : {_data.type}</div>
                    <Dotdotdot clamp={1}><div className={"metadata"}>author : {_data.author}</div></Dotdotdot>
                    <div className={"metadata"}>license : {_data.license}</div>
                    <div className={"metadata"}>total files : {_data.files.length}</div>
                    <br />
                    <a className="link" target="_blank" href={`https://commons.oceanprotocol.com/asset/${_data.id}`}>
                        Download </a>
                </div>
                <div className={"logoContainer"}><Jellyfish style={{ margin: 0 }} /></div>
            </div>
            <hr />
        </>

    )
}

export default Asset
