import useSWR from '@domains/Dapp/views/Pools/stabilizers/ThresholdCounterV2/swr';
import { formatEther, formatUnits } from '@domains/Dapp/views/Pools/stabilizers/ThresholdCounterV2/ethers/lib/utils';
import { useWeb3React } from '@domains/Dapp/views/Pools/stabilizers/ThresholdCounterV2/@web3-react/core';
import { contractAddress, fetcher, randomNumberAbi, thresholdCounterV2Abi, lpAbi, toNumberFormat } from '@domains/Dapp/views/Pools/stabilizers/ThresholdCounterV2/utils';

/* import components */
import { Spinner } from '@domains/Dapp/views/Pools/stabilizers/ThresholdCounterV2/domains/Dapp/views/DashboardView/components/common';
import { PoolCard } from '@domains/Dapp/views/Pools/stabilizers/ThresholdCounterV2/domains/Dapp/views/DashboardView/components/layout';
import ThresholdCounterV2Stake from './thresholdcounterv2-stake.component';

const ThresholdCounterV2Card = () => {
    
    const contract = contractAddress.debaseDaiPool;
    const { library } = useWeb3React();

    /* static data */
    const pooltooltip = 'This stabilizer counts the number of positive rebases until a random threshold, sampled from a normal distribution, is hit. Once the threshold is hit, counter is reset and the pool starts to reward DEBASE for staked DEBASE/ETH LPs, as per parameters decided by governance.';
    const poolInfo = '';

    /* fetch pool data */
    const { data: rewardPercentage } = useSWR([ contractAddress.thresholdCounterV2Eth, 'rewardPercentage' ], {
		fetcher: fetcher(library, thresholdCounterV2Abi)
	});
	const { data: countInSequence } = useSWR([ contractAddress.thresholdCounterV2Eth, 'countInSequence' ], {
		fetcher: fetcher(library, thresholdCounterV2Abi)
	});
	const { data: beforePeriodFinish } = useSWR([ contractAddress.thresholdCounterV2Eth, 'beforePeriodFinish' ], {
		fetcher: fetcher(library, thresholdCounterV2Abi)
	});
	const { data: blockDuration } = useSWR([ contractAddress.thresholdCounterV2Eth, 'blockDuration' ], {
		fetcher: fetcher(library, thresholdCounterV2Abi)
	});
	const { data: poolEnabled } = useSWR([ contractAddress.thresholdCounterV2Eth, 'poolEnabled' ], {
		fetcher: fetcher(library, thresholdCounterV2Abi)
	});
	const { data: poolLpLimit } = useSWR([ contractAddress.thresholdCounterV2Eth, 'poolLpLimit' ], {
		fetcher: fetcher(library, thresholdCounterV2Abi)
	});
	const { data: balance } = useSWR([ contractAddress.debase, 'balanceOf', contractAddress.thresholdCounterV2Eth ], {
		fetcher: fetcher(library, lpAbi)
	});
	const { data: userLpLimit } = useSWR([ contractAddress.thresholdCounterV2Eth, 'userLpLimit' ], {
		fetcher: fetcher(library, thresholdCounterV2Abi)
	});
	const { data: revokeRewardDuration } = useSWR([ contractAddress.thresholdCounterV2Eth, 'revokeRewardDuration' ], {
		fetcher: fetcher(library, thresholdCounterV2Abi)
	});
	const { data: revokeReward } = useSWR([ contractAddress.thresholdCounterV2Eth, 'revokeReward' ], {
		fetcher: fetcher(library, thresholdCounterV2Abi)
	});
	const { data: count } = useSWR([ contractAddress.thresholdCounterV2Eth, 'count' ], {
		fetcher: fetcher(library, thresholdCounterV2Abi)
	});
	const { data: totalSupply } = useSWR([ contractAddress.thresholdCounterV2Eth, 'totalSupply' ], {
		fetcher: fetcher(library, thresholdCounterV2Abi)
	});
	const { data: randomNumber } = useSWR([ contractAddress.randomNumber, 'randomResult' ], {
		fetcher: fetcher(library, randomNumberAbi)
	});
	const { data: randomThreshold } = useSWR([ contractAddress.thresholdCounterV2Eth, 'normalDistribution', randomNumber ? parseInt(formatEther(randomNumber)) % 100 : 0 ], {
		fetcher: fetcher(library, thresholdCounterV2Abi)
	});

    /* calculate data */
    

    /* list data */
    const linkData = [
        {
            icon: 'contract',
            url: 'https://etherscan.io/address/0xA36206621e6F14E6D4fCD9B3426209530c9c5f30'
        },
        {
            icon: 'school',
            url: 'https://debaseonomics.medium.com/randomness-in-debaseonomics-mainnet-integration-with-chainlink-vrf-523e45ab5571'
        },
        {
            icon: 'exchange',
            url: 'https://app.uniswap.org/#/add/0x9248c485b0B80f76DA451f167A8db30F33C70907/0x6B175474E89094C44Da98b954EedeAC495271d0F'
        }
    ];
    const listData = [
        {
			label: 'Reward',
			value: rewardPercentage ? formatEther(rewardPercentage) + '%' : '...',
			tooltip: 'Percentage of stabilizer rewards contract requested as reward per reward duration'
		},
		{
			label: 'Threshold Condition',
			value: 'Indicator (y ≥ X), X ~ N(5,2)',
			tooltip: 'Condition to check if threshold is hit for rewards period to start. y is number of positive rebases since last reward period start'
		},
		{
			label: 'Count In Sequence',
			value: countInSequence !== undefined ? (countInSequence ? 'True' : 'False') : '...',
			tooltip: 'Count positive rebases in sequence'
		},
		{
			label: 'Before Period Finish',
			value: beforePeriodFinish !== undefined ? (beforePeriodFinish ? 'True' : 'False') : '...',
			tooltip: 'Award rewards before previous rewards have been distributed'
		},
		{
			label: 'Reward Period',
			value: blockDuration ? blockDuration + ' Blocks' : '...',
			tooltip: 'Period within which pool reward is distributed'
		},
		{
			label: 'Pool Enabled',
			value: poolEnabled !== undefined ? (poolEnabled ? 'True' : 'False') : '...',
			tooltip: 'Pool staking/withdraw usage status'
		},
		{
			label: 'User Pool Limit',
			value: userLpLimit ? formatEther(userLpLimit) + ' LP' : '...',
			tooltip: 'LP limit per wallet'
		},
		{
			label: 'Revoke Reward Enabled',
			value: revokeReward !== undefined ? (revokeReward ? 'True' : 'False') : '...',
			tooltip: 'Percentage of rewards that will be revoked if positive rebases stop'
		},
		{
			label: 'Revoke Reward Duration',
			value: revokeRewardDuration ? revokeRewardDuration + ' Blocks' : '...',
			tooltip: 'Percentage of rewards that will be revoked if positive rebases stop'
		},
		{
			label: 'Current Count',
			value: count ? parseInt(formatUnits(count, 0)) : '...',
			tooltip: 'The number of positive rebases since start of last rewards period'
		},
		{
			label: 'Last Random Threshold',
			value: randomThreshold ? randomThreshold.toNumber() : '...',
			tooltip: 'A number drawn every rebase from a normal distribution. If Count>= Random number, a reward period begins'
		},
		{
			label: 'Total Pool Limit',
			value: poolLpLimit && totalSupply ? parseFloat(formatEther(totalSupply)).toFixed(6) + ' / ' + formatEther(poolLpLimit) + ' LP' : '...',
			tooltip: 'Total LP limit per pool'
		},
		{
			label: 'Current Pool Reward',
			value: balance ? parseFloat(formatEther(balance)) : '...',
			tooltip: 'Current pool rewards available'
		},
		{
			label: 'TVL',
			value: '$' + toNumberFormat('125000')
		}
    ];
    const highlightData = [
        {
            label: 'APR',
            value: '270% (Approx.); 540% Temp (Approx.)'
        }
    ];

    return (
        <PoolCard 
            title="Pool 2"
            subtitle="Thresholdcounter V2 Eth/Debase"
            tooltip={pooltooltip}
            status={poolEnabled ? 'active' : 'inactive'}
            data={listData}
            highlightData={highlightData}
            links={linkData}
            sidepanelContent={<ThresholdCounterV2Stake info={poolInfo} />}
        />
    );
};

export default ThresholdCounterV2Card;