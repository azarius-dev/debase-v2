import { useContext } from 'react';

import useSWR from 'swr';
import { formatEther } from 'ethers/lib/utils';
import { useWeb3React } from '@web3-react/core';
import { contractAddress, poolAbi, fetcher } from '@utils';

/* import components */
import { PoolCard } from '@dapp/components';
import DaiStake from './dai-stake.component';

const DaiCard = () => {
    
    const contract = contractAddress.debaseDaiPool;
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
            url: 'https://etherscan.io/address/0xf5cB771023706Ca566eA6128b88e03A262737479'
        },
        {
            icon: 'link',
            url: 'https://app.uniswap.org/#/swap?inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&outputCurrency=ETH'
        }
    ];
    const listData = [
        {
            label: 'Total reward',
            value: '10,000',
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
            title="Pool 2"
            subtitle="Dai"
            tooltip={poolTooltip}
            status="inactive"
            data={listData}
            highlightData={highlightData}
            links={linkData}
            sidepanelContent={<DaiStake info={poolInfo} />}
        />
    );
};

export default DaiCard;