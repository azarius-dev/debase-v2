import useSWR from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/swr';
import { formatEther, formatUnits } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/ethers/lib/utils';
import { useWeb3React } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/@web3-react/core';
import { contractAddress, fetcher, mph88Abi, vestingAbi } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/utils';

/* import components */
import { Spinner } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/domains/Dapp/views/DashboardView/components/common';
import { PoolCard } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/domains/Dapp/views/DashboardView/components/layout';
import DM88Stake from './dm88-stake.component';

const DM88Card = () => {
    
    const contract = contractAddress.debaseDaiPool;
    const { library } = useWeb3React();

    /* static data */
    const pooltooltip = 'Uses 88MPH as yield layer to back DEBASE with reserves. Deposit DEBASE + DAI for 30 days to earn rewards in Debase, Dai and 88MPH.';
    const poolInfo = '';

    /* fetch pool data */
    const { data: debaseRewardPercentage } = useSWR([ contractAddress.mph88Pool, 'debaseRewardPercentage' ], {
		fetcher: fetcher(library, mph88Abi)
	});
    const { data: lockPeriod } = useSWR([ contractAddress.mph88Pool, 'lockPeriod' ], {
		fetcher: fetcher(library, mph88Abi)
	});
    const { data: daiFee } = useSWR([ contractAddress.mph88Pool, 'daiFee' ], {
		fetcher: fetcher(library, mph88Abi)
	});
    const { data: mphFee } = useSWR([ contractAddress.mph88Pool, 'mphFee' ], {
		fetcher: fetcher(library, mph88Abi)
	});
    const { data: blockDuration } = useSWR([ contractAddress.mph88Pool, 'blockDuration' ], {
		fetcher: fetcher(library, mph88Abi)
	});
    const { data: debaseRewardDistributed } = useSWR([ contractAddress.mph88Pool, 'debaseRewardDistributed' ], {
		fetcher: fetcher(library, mph88Abi)
	});
    const { data: allowEmergencyWithdraw } = useSWR([ contractAddress.mph88Pool, 'allowEmergencyWithdraw' ], {
		fetcher: fetcher(library, mph88Abi)
	});
    const { data: poolEnabled } = useSWR([ contractAddress.mph88Pool, 'poolEnabled' ], {
		fetcher: fetcher(library, mph88Abi)
	});
    const { data: maxDepositLimitEnabled } = useSWR([ contractAddress.mph88Pool, 'maxDepositLimitEnabled' ], {
		fetcher: fetcher(library, mph88Abi)
	});
    const { data: totalLpLimitEnabled } = useSWR([ contractAddress.mph88Pool, 'totalLpLimitEnabled' ], {
		fetcher: fetcher(library, mph88Abi)
	});
    const { data: maxDepositLimit } = useSWR([ contractAddress.mph88Pool, 'maxDepositLimit' ], {
		fetcher: fetcher(library, mph88Abi)
	});
    const { data: totalLpLimit } = useSWR([ contractAddress.mph88Pool, 'totalLpLimit' ], {
		fetcher: fetcher(library, mph88Abi)
	});
    const { data: totalLpLocked } = useSWR([ contractAddress.mph88Pool, 'totalLpLocked' ], {
		fetcher: fetcher(library, mph88Abi)
	});

    /* calculate data */
    

    /* list data */
    const linkData = [
        {
            icon: 'contract',
            url: 'https://etherscan.io/address/0x36f1F4125B4066cA4b768F9F5f9a737Bd4FA8f62'
        },
        {
            icon: 'exchange',
            url: 'https://app.uniswap.org/#/add/ETH/0xE98f89a2B3AeCDBE2118202826478Eb02434459A'
        }
    ];
    const listData = [
        {
			label: 'Debase Reward Percentage',
			value: debaseRewardPercentage ? formatEther(debaseRewardPercentage) + ' %' : '...',
			tooltip: 'Percentage of stabilizer rewards contract requested as reward per reward duration'
		},
		{
			label: 'Deposit Length',
			value: lockPeriod ? lockPeriod + ' Blocks (30 Days)' : '...',
			tooltip: 'Percentage of stabilizer rewards contract requested as reward per reward duration'
		},
		{
			label: 'Dai Yield Fee',
			value: daiFee ? formatUnits(daiFee, 1) + ' %' : '...',
			tooltip: 'Percentage of DAI yield sent to treasury'
		},
		{
			label: 'Mph Yield Fee',
			value: mphFee ? formatUnits(mphFee, 1) + ' %' : '...',
			tooltip: 'Percentage of MPH yield sent to treaury'
		},
		{
			label: 'Reward Duration',
			value: blockDuration ? blockDuration + ' Blocks' : '...',
			tooltip: 'Period within which pool reward is distributed'
		},
		{
			label: 'Debase Reward Distributed',
			value: debaseRewardDistributed ? formatEther(debaseRewardDistributed) : '...',
			tooltip: 'Period within which pool reward is distributed'
		},
		{
			label: 'Allow Emergency Withdraw',
			value: allowEmergencyWithdraw !== undefined ? (allowEmergencyWithdraw ? 'True' : 'False') : '...',
			tooltip: 'Period within which pool reward is distributed'
		},
		{
			label: 'Pool Enabled',
			value: poolEnabled !== undefined ? (poolEnabled ? 'True' : 'False') : '...',
			tooltip: 'Pool staking/withdraw usage status'
		},
		{
			label: 'Pool Lp Limit Enabled',
			value: maxDepositLimitEnabled !== undefined ? (maxDepositLimitEnabled ? 'True' : 'False') : '...',
			tooltip: 'Pool staking/withdraw usage status'
		},
		{
			label: 'User Lp Limit Enabled',
			value: totalLpLimitEnabled !== undefined ? (totalLpLimitEnabled ? 'True' : 'False') : '...',
			tooltip: 'Pool staking/withdraw usage status'
		},
		{
			label: 'User Lp Limit',
			value: maxDepositLimit ? formatEther(maxDepositLimit) + ' LP' : '...',
			tooltip: 'LP limit per wallet'
		},
		{
			label: 'Total Pool Limit',
			value: totalLpLimit && totalLpLocked ? parseFloat(formatEther(totalLpLocked)).toFixed(2) + ' / ' + formatEther(totalLpLimit) + ' LP' : '...',
			tooltip: 'Total LP limit per pool'
		}
    ];
    const highlightData = [
        {
            label: 'APR',
            value: '330% DEBASE, 40% MPH, 4.8% DAI',
			tooltip: 'POOL APR'
        }
    ];

    return (
        <PoolCard 
            title="Pool 5"
            subtitle="DM88 Debase/Dai-Lp"
            tooltip={pooltooltip}
            status={poolEnabled ? 'active' : 'inactive'}
            data={listData}
            highlightData={highlightData}
            links={linkData}
            sidepanelContent={<DM88Stake info={poolInfo} />}
        />
    );
};

export default DM88Card;