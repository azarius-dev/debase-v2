import { useContext } from 'react';

import useSWR from 'swr';
import { formatEther } from 'ethers/lib/utils';
import { useWeb3React } from '@web3-react/core';
import { contractAddress, poolAbi, fetcher } from '@utils';

/* import components */
import { PoolCard } from '@dapp/components';
import DebaseDailpStake from './debasedailp-stake.component';

const DebaseDailpCard = () => {
    
    const contract = contractAddress.debaseDaiLpPool;
    const { library } = useWeb3React();

    /* static data */
    const poolTooltip = '';
    const poolInfo = '';

    /* fetch pool data */
	const { data: currentReward } = useSWR([contract, 'initReward'], {
		fetcher: fetcher(library, poolAbi)
	});
	const { data: getRewardDistributed } = useSWR([contract, 'rewardDistributed'], {
		fetcher: fetcher(library, poolAbi)
    });

    /* calculate data */
    const getHalvingReward = () => {
        if (!currentReward) {return '/'}
        return parseFloat(formatEther(currentReward)).toFixed(6)
    };
    const getTotalClaimed = () => {
        if (!getRewardDistributed) {return '/'}
        return parseFloat(formatEther(getRewardDistributed)).toFixed(2)
    };

    /* list data */
    const linkData = [
        {
            icon: 'contract',
            url: 'https://etherscan.io/address/0xF4168cc431e9a8310e595dB9F7E2564cC96F5D51'
        },
        {
            icon: 'link',
            url: 'https://info.uniswap.org/pair/0xE98f89a2B3AeCDBE2118202826478Eb02434459A'
        }
    ];
    const listData = [
        {
            label: 'Total reward',
            value: '20,000',
            valueType: 'debase'
        },
        {
            label: 'Halving period',
            value: '1 day'
        },
        {
            label: 'Halving reward',
            value: getHalvingReward(),
            valueType: 'debase'
        },
        {
            label: 'Total claimed',
            value: getTotalClaimed(),
            valueType: 'debase'
        },
        {
            label: 'TVL',
            value: '$0'
        }
    ];
    const highlightData = [
        {
            label: 'APR',
            value: '0%'
        }
    ];

    return (
        <PoolCard 
            title="Pool 3"
            subtitle="Debase / Dai-lp"
            tooltip={poolTooltip}
            status="inactive"
            data={listData}
            highlightData={highlightData}
            links={linkData}
            sidepanelContent={<DebaseDailpStake info={poolInfo} />}
        />
    );
};

export default DebaseDailpCard;