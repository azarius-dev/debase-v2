import useSWR from '@domains/Dapp/views/Pools/stabilizers/ThresholdCounter/swr';
import { formatEther, formatUnits } from '@domains/Dapp/views/Pools/stabilizers/ThresholdCounter/ethers/lib/utils';
import { useWeb3React } from '@domains/Dapp/views/Pools/stabilizers/ThresholdCounter/@web3-react/core';
import { contractAddress, fetcher, randomNumberAbi, thresholdCounterAbi, lpAbi, toNumberFormat } from '@domains/Dapp/views/Pools/stabilizers/ThresholdCounter/utils';

/* import components */
import { Spinner } from '@domains/Dapp/views/Pools/stabilizers/ThresholdCounter/domains/Dapp/views/DashboardView/components/common';
import { PoolCard } from '@domains/Dapp/views/Pools/stabilizers/ThresholdCounter/domains/Dapp/views/DashboardView/components/layout';
import ThresholdCounterStake from './thresholdcounter-stake.component';

const ThresholdCounterCard = () => {
    
    const contract = contractAddress.debaseDaiPool;
    const { library } = useWeb3React();

    /* static data */
    const pooltooltip = 'This stabilizer counts the number of positive rebases until a random threshold, sampled from a normal distribution, is hit. Once the threshold is hit, counter is reset and the pool starts to reward DEBASE for staked DEBASE/DAI LPs, as per parameters decided by governance.';
    const poolInfo = '';

    /* fetch pool data */
    const { data: rewardPercentage } = useSWR([ contractAddress.stabilizerPool, 'rewardPercentage' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: countInSequence } = useSWR([ contractAddress.stabilizerPool, 'countInSequence' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: beforePeriodFinish } = useSWR([ contractAddress.stabilizerPool, 'beforePeriodFinish' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: duration } = useSWR([ contractAddress.stabilizerPool, 'duration' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: poolEnabled } = useSWR([ contractAddress.stabilizerPool, 'poolEnabled' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: poolLpLimit } = useSWR([ contractAddress.stabilizerPool, 'poolLpLimit' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: balance } = useSWR([ contractAddress.debase, 'balanceOf', contractAddress.stabilizerPool ], {
		fetcher: fetcher(library, lpAbi)
	});
	const { data: userLpLimit } = useSWR([ contractAddress.stabilizerPool, 'userLpLimit' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: revokeRewardPrecentage } = useSWR([ contractAddress.stabilizerPool, 'revokeRewardPrecentage' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: count } = useSWR([ contractAddress.stabilizerPool, 'count' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: totalSupply } = useSWR([ contractAddress.stabilizerPool, 'totalSupply' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: randomNumber } = useSWR([ contractAddress.randomNumber, 'randomResult' ], {
		fetcher: fetcher(library, randomNumberAbi)
	});
	const { data: randomThreshold } = useSWR([ contractAddress.stabilizerPool, 'normalDistribution', randomNumber ? parseInt(formatEther(randomNumber)) % 100 : 0 ], {
        fetcher: fetcher(library, thresholdCounterAbi)
    });

    /* calculate data */
    

    /* list data */
    const linkData = [
        {
            icon: 'contract',
            url: 'https://etherscan.io/address/0x800479a76dc74c3a9FAAE25320A0EE4E8740996b'
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
			value: rewardPercentage ? formatEther(rewardPercentage) * 100 + '%' : '...',
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
			value: duration ? (duration.toNumber() / (60 * 60)).toString() + ' Hours' : '...',
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
			label: 'Revoke Reward',
			value: revokeRewardPrecentage ? parseFloat(formatEther(revokeRewardPrecentage) * 100).toFixed(2) + '%' : '...',
			tooltip: 'Percentage of rewards that will be revoked if positive rebases stop'
		},
		{
			label: 'Current Count',
			value: count ? parseInt(formatUnits(count, 0)) : '...',
			tooltip: 'The number of positive rebases since start of last rewards period'
		},
		{
			label: 'Last Random Threshold',
			value: randomThreshold ? 5 : '...',
			tooltip: 'A number drawn every rebase from a normal distribution. If Count>= Random number, a reward period begins'
		},
		{
			label: 'Total Pool Limit',
			value: poolLpLimit && totalSupply ? parseFloat(formatEther(totalSupply)).toFixed(2) + ' / ' + formatEther(poolLpLimit) + ' LP' : '...',
			tooltip: 'Total LP limit per pool'
		},
		{
			label: 'Current Pool Reward',
			value: balance ? parseFloat(formatEther(balance)) : '...',
			tooltip: 'Current pool rewards available'
		},
		{
			label: 'TVL',
			value: '$' + toNumberFormat('752037.01057')
		}
    ];
    const highlightData = [
        {
            label: 'APR',
            value: '573% (Approx.)'
        }
    ];

    return (
        <PoolCard 
            title="Pool 1"
            subtitle="Thresholdcounter"
            tooltip={pooltooltip}
            status={poolEnabled ? 'active' : 'inactive'}
            data={listData}
            highlightData={highlightData}
            links={linkData}
            sidepanelContent={<ThresholdCounterStake info={poolInfo} />}
        />
    );
};

export default ThresholdCounterCard;