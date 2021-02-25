import React, { useState, useEffect, useContext } from '@domains/Dapp/views/Pools/views/incentivizers/DebaseDailp/@domains/Dapp/views/Pools/Pools/incentivizers/DebaseDailp/react';

import useSWR from '@domains/Dapp/views/Pools/views/incentivizers/DebaseDailp/@domains/Dapp/views/Pools/Pools/incentivizers/DebaseDailp/swr';
import { formatEther, formatUnits, parseEther, parseUnits } from '@domains/Dapp/views/Pools/views/incentivizers/DebaseDailp/@domains/Dapp/views/Pools/Pools/incentivizers/DebaseDailp/ethers/lib/utils';
import { Contract } from '@domains/Dapp/views/Pools/views/incentivizers/DebaseDailp/@domains/Dapp/views/Pools/Pools/incentivizers/DebaseDailp/ethers';
import { useWeb3React } from '@domains/Dapp/views/Pools/views/incentivizers/DebaseDailp/@domains/Dapp/views/Pools/Pools/incentivizers/DebaseDailp/@web3-react/core';
import { contractAddress, poolAbi, lpAbi, fetcher } from '@domains/Dapp/views/Pools/views/incentivizers/DebaseDailp/@domains/Dapp/views/Pools/Pools/incentivizers/DebaseDailp/utils';

/* import components */
import { Button, Input, Flexbox } from '@domains/Dapp/views/Pools/views/incentivizers/DebaseDailp/@domains/Dapp/views/Pools/Pools/incentivizers/DebaseDailp/domains/Dapp/views/DashboardView/components/common';
import { PoolStake } from '@domains/Dapp/views/Pools/views/incentivizers/DebaseDailp/@domains/Dapp/views/Pools/Pools/incentivizers/DebaseDailp/domains/Dapp/views/DashboardView/components/layout';
/* import context */
import { SnackbarContext } from '@domains/Dapp/views/Pools/views/incentivizers/DebaseDailp/@domains/Dapp/views/Pools/Pools/incentivizers/DebaseDailp/domains/Dapp/views/DashboardView/components/common';

const DegovDailpStake = ({ info }) => {

    const { account, library } = useWeb3React();

    const { handleSnackbarQueue } = useContext(SnackbarContext);

    /* input value state */
    const [ stakeInputValue, setStakeInputValue ] = useState('');
    const [ withdrawInputValue, setWithdrawInputValue ] = useState('');

    /* loading state */
    const [ stakingLoading, setStakingLoading ] = useState(false);
	const [ withdrawLoading, setWithdrawLoading ] = useState(false);
	const [ claimLoading, setClaimLoading ] = useState(false);
	const [ claimUnstakeLoading, setClaimUnstakeLoading ] = useState(false);

    /* static data */
    const rewardTokenAddress = contractAddress.debase;
    const stakeTokenAddress = contractAddress.debaseDaiLp;
    const poolAddress = contractAddress.debaseDaiLpPool;
    const percents = false;
    const unit = 18;

    /* fetch pool data */
    const { data: rewardTokenBalance, mutate: getRewardTokenBalance } = useSWR([ rewardTokenAddress, 'balanceOf', account ], {
        fetcher: fetcher(library, lpAbi)
    });
    const { data: tokenBalance, mutate: getTokenBalance } = useSWR([ stakeTokenAddress, 'balanceOf', account ], {
        fetcher: fetcher(library, lpAbi)
    });
    const { data: tokenSupply, mutate: getTokenSupply } = useSWR([ rewardTokenAddress, 'totalSupply' ], {
        fetcher: fetcher(library, lpAbi)
    });
    const { data: stakeBalance, mutate: getStakeBalance } = useSWR([ poolAddress, 'balanceOf', account ], {
        fetcher: fetcher(library, poolAbi)
    });
    const { data: rewardBalance, mutate: getRewardBalance } = useSWR([ poolAddress, 'earned', account ], {
        fetcher: fetcher(library, poolAbi)
    });

    /* list data */
    const listData = [
        {
            label: 'Balance',
            value: rewardBalance ? parseFloat(formatEther(rewardTokenBalance)).toFixed(8) * 1 + ' Debase' : '0 Debase',
            valueType: 'debase'
        },
        {
            label: 'Claimable',
            value: percents ? rewardBalance && tokenSupply ? parseFloat(formatEther(rewardBalance.mul(tokenSupply).div(parseEther('1')))).toFixed(8) * 1 + ' Debase' : '0 Debase' : rewardBalance ? parseFloat(formatEther(rewardBalance)).toFixed(8) * 1 + ' Debase' : '0 Debase',
            valueType: 'debase'
        },
        {
            label: 'To stake',
            value: tokenBalance ? parseFloat(formatUnits(tokenBalance, unit)).toFixed(10) * 1 + ' Dai-lp' : '0 Dai-lp',
            valueType: 'placeholder'
        },
        {
            label: 'Staked',
            value: stakeBalance ? parseFloat(formatUnits(stakeBalance, unit)).toFixed(10) * 1 + ' Dai-lp' : '0 Dai-lp',
            valueType: 'placeholder'
        },
    ];

    /* async handling */
    const handleStake = async () => {
        setStakingLoading(true);

		const tokenContract = new Contract(stakeTokenAddress, lpAbi, library.getSigner());
		const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());

		try {
			const toStake = parseUnits(stakeInputValue, unit);
			let allowance = await tokenContract.allowance(account, poolAddress);
			let transaction;
			if (allowance.lt(toStake)) {
				transaction = await tokenContract.approve(poolAddress, toStake);
				await transaction.wait(1);
			}
			transaction = await poolContract.stake(toStake);
			await transaction.wait(1);

			let newTokenBal = await tokenContract.balanceOf(account);
			let newStakeBal = await poolContract.balanceOf(account);

			await getStakeBalance(newStakeBal);
			await getTokenBalance(newTokenBal);

			handleSnackbarQueue({
				id: new Date() + Math.random(),
				message: 'Staking successfully executed',
				status: 'success'
			});
		} catch (error) {
			handleSnackbarQueue({
				id: new Date() + Math.random(),
				message: 'Staking failed, please try again',
				status: 'error'
			});
		}
		setStakingLoading(false);
    };
    const handleWithdraw = async () => {
        setWithdrawLoading(true);
		const tokenContract = new Contract(stakeTokenAddress, lpAbi, library.getSigner());
		const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());
		try {
			const toWithdraw = parseUnits(withdrawInputValue, unit);
			let transaction = await poolContract.withdraw(toWithdraw);
			await transaction.wait(1);

			let newTokenBal = await tokenContract.balanceOf(account);
			let newStakeBal = await poolContract.balanceOf(account);
			await getTokenBalance(newTokenBal);
			await getStakeBalance(newStakeBal);

            handleSnackbarQueue({
				id: new Date() + Math.random(),
				message: 'Withdraw successfully executed',
				status: 'success'
			});
		} catch (error) {
			console.log(error);
            handleSnackbarQueue({
				id: new Date() + Math.random(),
				message: 'Withdraw failed, please try again',
				status: 'error'
			});
		}
		setWithdrawLoading(false);
    };
    const handleClaimReward = async () => {
        setClaimLoading(true);
		const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());
		try {
			const transaction = await poolContract.getReward();
			await transaction.wait(1);

			let newRewardBal = await poolContract.earned(account);
			await getRewardBalance(newRewardBal);

            handleSnackbarQueue({
				id: new Date() + Math.random(),
				message: 'Claim reward successful',
				status: 'success'
			});
		} catch (error) {
            handleSnackbarQueue({
				id: new Date() + Math.random(),
				message: 'Claim reward failed, please try again',
				status: 'error'
			});
		}
		setClaimLoading(false);
    };
    const handleClaimRewardThenUnstake = async () => {
        setClaimUnstakeLoading(true);
		const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());
		const tokenContract = new Contract(stakeTokenAddress, lpAbi, library.getSigner());

		try {
			const transaction = await poolContract.exit();
			await transaction.wait(1);

			let newTokenBal = await tokenContract.balanceOf(account);
			let newStakeBal = await poolContract.balanceOf(account);
			let newRewardBal = await poolContract.earned(account);

			await getStakeBalance(newStakeBal);
			await getTokenBalance(newTokenBal);
			await getRewardBalance(newRewardBal);

            handleSnackbarQueue({
				id: new Date() + Math.random(),
				message: 'Claim and unstake successfully executed',
				status: 'success'
			});
		} catch (error) {
            handleSnackbarQueue({
				id: new Date() + Math.random(),
				message: 'Claim and unstake failed, please try again',
				status: 'error'
			});
		}
		setClaimUnstakeLoading(false);
    };

    /* input events */
    const onChangeStakeInput = value => {
        setStakeInputValue(value);
    };
    const onChangeWithdrawInput = value => {
        setWithdrawInputValue(value);
    };
    const onClickStakeMaxButton = () => {
        setStakeInputValue(formatUnits(tokenBalance, unit));
    };
    const onClickWithdrawMaxButton = () => {
        setWithdrawInputValue(formatUnits(stakeBalance, unit));
    };

    /* renders */
    const renderForms = () => {
        return (

            <Flexbox
                direction='column'
                gap='30px'
            >
                <Flexbox
                    direction='column'
                    gap='10px'
                >
                    <Flexbox
                        direction='row'
                        gap='10px'
                    >
                        <Input 
                            size="normal"
                            placeholder="stake amount"
                            value={stakeInputValue}
                            onChange={onChangeStakeInput}
                        />
                        <Button
                            size="small"
                            onClick={onClickStakeMaxButton}
                        >
                            max
                        </Button>
                    </Flexbox>
                    <Button
                        color="secundary"
                        isLoading={stakingLoading}
                        onClick={handleStake}
                    >
                        stake amount
                    </Button>
                </Flexbox>
                <Flexbox
                    direction='column'
                    gap='10px'
                >
                    <Flexbox
                        direction='row'
                        gap='10px'
                    >
                        <Input 
                            size="normal"
                            placeholder="withdraw amount"
                            value={withdrawInputValue}
                            onChange={onChangeWithdrawInput}
                        />
                        <Button
                            size="small"
                            onClick={onClickWithdrawMaxButton}
                        >
                            max
                        </Button>
                    </Flexbox>
                    <Button
                        color="secundary"
                        isLoading={withdrawLoading}
                        onClick={handleWithdraw}
                    >
                        withdraw amount
                    </Button>
                </Flexbox>
            </Flexbox>
        );
    };
    const renderClaimActions = () => {
        return (
            <Flexbox
                direction='column'
                gap='10px'
            >
                <Button
                    variant="default"
                    color="primary"
                    isLoading={claimLoading}
                    onClick={handleClaimReward}
                >
                    claim reward
                </Button>
                <Button
                    variant="default"
                    color="primary"
                    isLoading={claimUnstakeLoading}
                    onClick={handleClaimRewardThenUnstake}
                >
                    claim reward & unstake
                </Button>
            </Flexbox>
        );
    };

    /* lifecycle */
    useEffect(() => {
        library.on('block', () => {
            getRewardTokenBalance(undefined, true);
            getTokenBalance(undefined, true);
            getRewardBalance(undefined, true);
            getStakeBalance(undefined, true);
            getTokenSupply(undefined, true);
        });
        
        return () => {
            library.removeAllListeners('block');
        };

	}, [library, getStakeBalance, getRewardBalance, getTokenBalance, getRewardTokenBalance, getTokenSupply]);

    return (
        <PoolStake
            info={info}
            listData={listData}
            stakeForms={renderForms()}
            claimActions={renderClaimActions()}
        />
    );

};

export default DegovDailpStake;