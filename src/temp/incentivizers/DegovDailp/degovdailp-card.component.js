import { useContext } from 'react';

import useSWR from 'swr';
import { formatEther } from 'ethers/lib/utils';
import { useWeb3React } from '@web3-react/core';
import { contractAddress, poolAbi, fetcher } from '@utils';

/* import components */
import { PoolCard } from '@dapp/components';
import DegovDailpStake from './degovdailp-stake.component';

const DegovDailpCard = () => {
    
    const contract = contractAddress.degovDaiLpPool;
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
            url: 'https://etherscan.io/address/0xaB68de2a9d9A733F3c4CFE52Af7Fc4f6aa015637'
        },
        {
            icon: 'link',
            url: 'https://info.uniswap.org/pair/0xE98f89a2B3AeCDBE2118202826478Eb02434459A'
        }
    ];
    const listData = [
        {
            label: 'Total reward',
            value: '25,000',
            valueType: 'degov'
        },
        {
            label: 'Halving period',
            value: '1 week'
        },
        {
            label: 'Halving reward',
            value: getHalvingReward(),
            valueType: 'degov'
        },
        {
            label: 'Total claimed',
            value: getTotalClaimed(),
            valueType: 'degov'
        },
        {
            label: 'TVL',
            value: '$894,241'
        }
    ];
    const highlightData = [
        {
            label: 'APR',
            value: '80%'
        }
    ];

    return (
        <PoolCard 
            title="Pool 1"
            subtitle="Degov / Dai-lp"
            tooltip={poolTooltip}
            status="active"
            data={listData}
            highlightData={highlightData}
            links={linkData}
            sidepanelContent={<DegovDailpStake info={poolInfo} />}
        />
    );
};

export default DegovDailpCard;