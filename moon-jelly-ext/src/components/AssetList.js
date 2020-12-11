import React from 'react'
import Asset from './Asset'

let assets = [{
    "@context": "https://w3id.org/did/v1",
    "id": "did:op:cb84534bfb4c45fcab2b7f199924e9f69292f45f6f274fd19b573cfe281c728f",
    "publicKey": [
        {
            "id": "did:op:cb84534bfb4c45fcab2b7f199924e9f69292f45f6f274fd19b573cfe281c728f",
            "type": "EthereumECDSAKey",
            "owner": "0xf80c24AE5EbF5d8D150656f89c062D1De9D1019a"
        }
    ],
    "authentication": [
        {
            "type": "RsaSignatureAuthentication2018",
            "publicKey": "did:op:cb84534bfb4c45fcab2b7f199924e9f69292f45f6f274fd19b573cfe281c728f"
        }
    ],
    "service": [
        {
            "type": "metadata",
            "serviceEndpoint": "https://aquarius.commons.oceanprotocol.com/api/v1/aquarius/assets/ddo/did:op:cb84534bfb4c45fcab2b7f199924e9f69292f45f6f274fd19b573cfe281c728f",
            "attributes": {
                "curation": {
                    "rating": 0,
                    "numVotes": 0,
                    "isListed": true
                },
                "main": {
                    "name": "Automobiles Expo San Diego 2020",
                    "dateCreated": "2019-12-25T00:00:12",
                    "author": "No author",
                    "license": "MIT",
                    "price": "0",
                    "files": [
                        {
                            "index": 0,
                            "contentType": "application/zip",
                            "checksum": "2bf9d229d110d1976cdf85e9f2256c7f",
                            "checksumType": "MD5",
                            "contentLength": "12057507",
                            "compression": "zip",
                            "encoding": "UTF-8"
                        }
                    ],
                    "type": "dataset",
                    "datePublished": "2020-01-13T08:27:00"
                },
                "additionalInformation": {
                    "publishedBy": "US5M45N9Y",
                    "checksum": "",
                    "categories": [],
                    "tags": [
                        "image"
                    ],
                    "description": "sample description",
                    "copyrightHolder": "No holder",
                    "workExample": "image path, id, label",
                    "links": [],
                    "inLanguage": "en"
                },
                "encryptedFiles": "0x094ee84adc5ead10e52e5a55bcb8db9d0d1cf286d368e08beeb0091397cd61c6c52edffdefc5eb64d12ee7330e1c6c65400b49b87d14ff136a212f0bc4fb5b5bd2ac4f4f45173419413cffcc9bc27fef88669111a717f4a06b0b724a002e207475af18e3f9372a463e2e4334cbeeb54c0980179641f7016173aefe0d26b4a53c853608f1012bae33680944698651c1513b61db007d20895c49ca5d44bf45077d637f0288cfcb8728ddb06467f0581de02b2c3a868116b2114b23780e4106d2b32bc2f9b7c45beef4ae164c25eb6af1cbbc38c73f847e86ec5855848af917a643da1ce133fe8606d6509db6709da888e2428e0056703d3eb11c9fe116f9b84ceb47bc1dfca236ddabb9c173a4128a61aab362091214ee2f1adba0"
            },
            "index": 2
        },
        {
            "type": "access",
            "serviceEndpoint": "https://brizo.commons.oceanprotocol.com/api/v1/brizo/services/consume",
            "templateId": "0x9BF43606d833489fbD568ace13f535fC41130c28",
            "attributes": {
                "main": {
                    "creator": "0xf80c24AE5EbF5d8D150656f89c062D1De9D1019a",
                    "name": "dataAssetAccessServiceAgreement",
                    "price": "0",
                    "timeout": 3600
                },
                "serviceAgreementTemplate": {
                    "contractName": "EscrowAccessSecretStoreTemplate",
                    "events": [
                        {
                            "name": "AgreementCreated",
                            "actorType": "consumer",
                            "handler": {
                                "moduleName": "escrowAccessSecretStoreTemplate",
                                "functionName": "fulfillLockRewardCondition",
                                "version": "0.1"
                            }
                        }
                    ],
                    "fulfillmentOrder": [
                        "lockReward.fulfill",
                        "accessSecretStore.fulfill",
                        "escrowReward.fulfill"
                    ],
                    "conditionDependency": {
                        "lockReward": [],
                        "accessSecretStore": [],
                        "escrowReward": [
                            "lockReward",
                            "accessSecretStore"
                        ]
                    },
                    "conditions": [
                        {
                            "name": "lockReward",
                            "timelock": 0,
                            "timeout": 0,
                            "contractName": "LockRewardCondition",
                            "functionName": "fulfill",
                            "parameters": [
                                {
                                    "name": "_rewardAddress",
                                    "type": "address",
                                    "value": "0xf80c24AE5EbF5d8D150656f89c062D1De9D1019a"
                                },
                                {
                                    "name": "_amount",
                                    "type": "uint256",
                                    "value": "0"
                                }
                            ],
                            "events": [
                                {
                                    "name": "Fulfilled",
                                    "actorType": "publisher",
                                    "handler": {
                                        "moduleName": "lockRewardCondition",
                                        "functionName": "fulfillAccessSecretStoreCondition",
                                        "version": "0.1"
                                    }
                                }
                            ]
                        },
                        {
                            "name": "accessSecretStore",
                            "timelock": 0,
                            "timeout": 0,
                            "contractName": "AccessSecretStoreCondition",
                            "functionName": "fulfill",
                            "parameters": [
                                {
                                    "name": "_documentId",
                                    "type": "bytes32",
                                    "value": "cb84534bfb4c45fcab2b7f199924e9f69292f45f6f274fd19b573cfe281c728f"
                                },
                                {
                                    "name": "_grantee",
                                    "type": "address",
                                    "value": ""
                                }
                            ],
                            "events": [
                                {
                                    "name": "Fulfilled",
                                    "actorType": "publisher",
                                    "handler": {
                                        "moduleName": "accessSecretStore",
                                        "functionName": "fulfillEscrowRewardCondition",
                                        "version": "0.1"
                                    }
                                },
                                {
                                    "name": "TimedOut",
                                    "actorType": "consumer",
                                    "handler": {
                                        "moduleName": "accessSecretStore",
                                        "functionName": "fulfillEscrowRewardCondition",
                                        "version": "0.1"
                                    }
                                }
                            ]
                        },
                        {
                            "name": "escrowReward",
                            "timelock": 0,
                            "timeout": 0,
                            "contractName": "EscrowReward",
                            "functionName": "fulfill",
                            "parameters": [
                                {
                                    "name": "_amount",
                                    "type": "uint256",
                                    "value": "0"
                                },
                                {
                                    "name": "_receiver",
                                    "type": "address",
                                    "value": ""
                                },
                                {
                                    "name": "_sender",
                                    "type": "address",
                                    "value": ""
                                },
                                {
                                    "name": "_lockCondition",
                                    "type": "bytes32",
                                    "value": ""
                                },
                                {
                                    "name": "_releaseCondition",
                                    "type": "bytes32",
                                    "value": ""
                                }
                            ],
                            "events": [
                                {
                                    "name": "Fulfilled",
                                    "actorType": "publisher",
                                    "handler": {
                                        "moduleName": "escrowRewardCondition",
                                        "functionName": "verifyRewardTokens",
                                        "version": "0.1"
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            "index": 0
        },
        {
            "type": "authorization",
            "service": "SecretStore",
            "serviceEndpoint": "https://secret-store.oceanprotocol.com",
            "attributes": {
                "main": {}
            },
            "index": 1
        }
    ],
    "created": "2020-01-13T08:26:56",
    "proof": {
        "created": "2020-01-13T08:26:56Z",
        "creator": "0xf80c24AE5EbF5d8D150656f89c062D1De9D1019a",
        "type": "DDOIntegritySignature",
        "signatureValue": "0x80185aae01dc420241a691a3ea0b20ec252757bfc6095a8578ae59e809dd2a2b54b7856e2ba02a871b98b4d5c59bd500383bc8a9af4e992aaf6855b036ae26201b"
    }
}]

async function parseResults(results) {
    let data = await Promise.all(results.map(r => {
        let metadata = findMetadata(r.service);
        let res = metadata.attributes.main;
        res.title = metadata.attributes.main.name;
        res.id = r.id;
        if (metadata.additionalInformation) {
            res.description = metadata.additionalInformation.description;
        }
        return res;
    }))
    return data;
}


function findMetadata(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type === "metadata") {
            return arr[i];
        }
    }
}

const AssetList = props => {
    let assets = props.data.map(d => {
        return <Asset key={d.id} data={d} />
    });
    return assets;
}

export default AssetList;



