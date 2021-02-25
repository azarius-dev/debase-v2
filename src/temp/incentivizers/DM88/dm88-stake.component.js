import React, { useState, useEffect, useContext } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/react';

import useSWR from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/swr';
import { request, gql } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/graphql-request';
import { formatEther, formatUnits, parseUnits, parseEther } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/ethers/lib/utils';
import { Contract, BigNumber } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/ethers';
import { useWeb3React } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/@web3-react/core';
import { contractAddress, mph88Abi, lpAbi, fetcher } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/utils';

/* import components */
import { Button, Input, Flexbox } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/domains/Dapp/views/DashboardView/components/common';
import { PoolStake } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/domains/Dapp/views/DashboardView/components/layout';
/* import context */
import { SnackbarContext } from '@domains/Dapp/views/Pools/views/incentivizers/DM88/@domains/Dapp/views/Pools/Pools/incentivizers/DM88/domains/Dapp/views/DashboardView/components/common';

const DM88Stake = ({ info }) => {

    const { account, library } = useWeb3React();

    const { handleSnackbarQueue } = useContext(SnackbarContext);

    /* input value state */
    const [ stakeInputValue, setStakeInputValue ] = useState('');

    /* loading state */
    const [ stakingLoading, setStakingLoading ] = useState(false);
	const [ withdrawLoading, setWithdrawLoading ] = useState(false);
	const [ withdrawAllLoading, setWithdrawAllLoading ] = useState(false);
    const [ selectedDepositIndex, setSelectedDepositIndex ] = useState(0);
	const [ depositIds, setDepositIds ] = useState([]);

    /* static data */
    const rewardTokenAddress = contractAddress.debase;
    const stakeTokenAddress = contractAddress.debaseDaiLp;
    const poolAddress = contractAddress.mph88Pool;
    const percents = true;
    const unit = 18;
    const tokenText = 'Debase/Dai Lp';
    const rewardText = 'Debase';
    const TOTAL_GONS = BigNumber.from('115792089237316195423570985008687907853269984665640564000000000000000000000000');
    const deposit = depositIds[0] ? depositIds[0] : null;

    /* QraphQL query */
    const depositsQuery = gql`
		query getDeposit($nftID: Int!) {
			deposits(
				where: {
					pool: "0xdc86ac6140026267e0873b27c8629efe748e7146"
					user: "0x36f1f4125b4066ca4b768f9f5f9a737bd4fa8f62"
					nftID: $nftID
				}
			) {
				fundingID
				interestEarned
				mintMPHAmount
			}
		}
	`;

    /* fetch pool data */
	const { data: stakedBalance, mutate: getStakedBalance } = useSWR([ contractAddress.mph88Pool, 'lpDeposits', account ], {
        fetcher: fetcher(library, mph88Abi)
    });
	const { data: debaseBalance, mutate: getDebaseBalance } = useSWR([ contractAddress.debase, 'balanceOf', account ], {
		fetcher: fetcher(library, lpAbi)
	});
	const { data: lpBalance, mutate: getLPBalance } = useSWR([ contractAddress.debaseDaiLp, 'balanceOf', account ], {
		fetcher: fetcher(library, lpAbi)
	});
    const { data: debaseSupply, mutate: getDebaseSupply } = useSWR([ rewardTokenAddress, 'totalSupply' ], {
		fetcher: fetcher(library, lpAbi)
	});
	const { data: debaseAccrued, mutate: getDebaseAccrued } = useSWR(deposit ? [ poolAddress, 'earned', deposit.id ] : null, {
		fetcher: fetcher(library, mph88Abi)
	});

    /* list data */
    const listData = [
        {
            label: 'Balance',
            value: debaseBalance ? parseFloat(formatEther(debaseBalance)).toFixed(8) * 1 + ` ${rewardText}` : `0 ${rewardText}`,
            valueType: 'debase'
        },
        {
            label: 'To Deposit',
            value: lpBalance  ? parseFloat(formatEther(lpBalance)).toFixed(8) * 1 + ` ${tokenText}` : `0 ${tokenText}`,
            valueType: 'placeholder'
        },
        {
            label: 'Total Lp Deposited',
            value: stakedBalance ? parseFloat(formatEther(stakedBalance)).toFixed(8) * 1 + ` ${tokenText}` : `0 ${tokenText}`,
            valueType: 'placeholder'
        }
    ];

    /* condional list data */
    if (depositIds.length !== 0) {
        listData.push({
            label: 'Deposit Id',
            value: depositIds,
            valueType: 'placeholder'
        });
        listData.push({
            label: 'Deposit unlocks in',
            value: 'err'
        });
        listData.push({
            label: 'Deposit Lp Staked',
            value: parseFloat(formatEther(deposit.amount)).toFixed(8) * 1 + ` ${tokenText}`,
            valueType: 'debase'
        });
        listData.push({
            label: 'Dai Unlocked From Lp',
            value: parseFloat(formatEther(deposit.daiAmount)).toFixed(8) * 1 + ' Dai',
            valueType: 'dai'
        });
        listData.push({
            label: 'Dai earned from deposit',
            value: parseFloat(deposit.interestEarnedOnDai).toFixed(8) * 1 + ' Dai',
            valueType: 'dai'
        });
        listData.push({
            label: 'Debase Unlocked From Lp',
            value: debaseSupply ? parseFloat(formatEther(deposit.debaseReward.div(TOTAL_GONS.div(debaseSupply)))).toFixed(4) + ` ${rewardText}` : '...' + ` ${rewardText}`,
            valueType: 'debase'
        });
        listData.push({
            label: '88Mph Reward',
            value: parseFloat(deposit.mphReward).toFixed(8) * 1 + ' 88MPH',
            valueType: 'mph88'
        });
        listData.push({
            label: 'Debase Accrued',
            value: debaseAccrued && debaseSupply ? parseFloat(formatEther(debaseAccrued.mul(debaseSupply).div(parseEther('1')))).toFixed(8) * 1 + ` ${rewardText}` : `0 ${rewardText}`,
            valueType: 'debase'
        });
    }

    /* async handling */
    const handleStake = async () => {
        setStakingLoading(true);
		const tokenContract = new Contract(stakeTokenAddress, lpAbi, library.getSigner());
		const poolContract = new Contract(poolAddress, mph88Abi, library.getSigner());
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

			await getStakedBalance();

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
        const poolContract = new Contract(stakeTokenAddress, mph88Abi, library.getSigner());
		if (depositIds[selectedDepositIndex].withdrawed === false) {
			try {
				let transaction = await poolContract.withdraw(
					depositIds[selectedDepositIndex].id.toNumber(),
					parseInt(depositIds[selectedDepositIndex].fundingID)
				);
				await transaction.wait(1);
                
                handleSnackbarQueue({
                    id: new Date() + Math.random(),
                    message: 'Deposit withdraw successfully',
                    status: 'success'
                });
			} catch (error) {
				console.log(error);
                handleSnackbarQueue({
                    id: new Date() + Math.random(),
                    message: 'Deposit withdraw failed, please try again',
                    status: 'error'
                });
			}
		} else {
            handleSnackbarQueue({
                id: new Date() + Math.random(),
                message: 'Deposit already withdrawn',
                status: 'error'
            });
		}
		setWithdrawLoading(false);
    };
    const findDepositID = async () => {
        const poolContract = new Contract(stakeTokenAddress, mph88Abi, library.getSigner());

		let arr = [];
		let x = 0;

		while (true) {
			try {
				let depositId = await poolContract.depositIds(account, x);
				let depositInfo = await poolContract.deposits(depositId);
				let fundingInfo = await request(
					'https://api.thegraph.com/subgraphs/name/bacon-labs/eighty-eight-mph',
					depositsQuery,
					{
						nftID: depositInfo[6].toNumber()
					}
				);

				let data = {
					id: depositId,
					fundingId: fundingInfo.deposits[0].fundingID,
					amount: depositInfo[1],
					daiAmount: depositInfo[2],
					interestEarnedOnDai: fundingInfo.deposits[0].interestEarned,
					debaseReward: depositInfo[3],
					mphReward: fundingInfo.deposits[0].mintMPHAmount,
					maturationTimestamp: depositInfo[9],
					withdrawed: depositInfo[10]
				};

				arr.push(data);
			} catch (error) {
				console.log(error);
				break;
			}
			x++;
		}
		setDepositIds(arr);
    };
    const handleWithdrawAll = async () => {
        setWithdrawAllLoading(true);
		const poolContract = new Contract(stakeTokenAddress, mph88Abi, library.getSigner());
		if (depositIds.length) {
			let allDepositIds = depositIds.map((ele) => {
				if (ele.withdrawed === false) {
					return ele.id.toNumber();
				}
				return null;
			});
			let allFundingIds = depositIds.map((ele) => {
				if (ele.withdrawed === false) {
					return parseInt(ele.fundingId);
				}
				return null;
			});
			try {
				const transaction = await poolContract.multiWithdraw(allDepositIds, allFundingIds);
				await transaction.wait(1);
                handleSnackbarQueue({
                    id: new Date() + Math.random(),
                    message: 'Withdraw all deposits successfully executed',
                    status: 'success'
                });
			} catch (error) {
                handleSnackbarQueue({
                    id: new Date() + Math.random(),
                    message: 'Withdraw all deposits failed, please try again',
                    status: 'success'
                });
			}
		} else {
            handleSnackbarQueue({
                id: new Date() + Math.random(),
                message: 'No deposits remaining to withdraw',
                status: 'success'
            });
		}

		setWithdrawAllLoading(false);
    };

    /* input events */
    const onChangeStakeInput = value => {
        setStakeInputValue(value);
    };
    const onClickStakeMaxButton = () => {
        setStakeInputValue(formatUnits(lpBalance, unit));
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
                        deposit amount
                    </Button>
                </Flexbox>
            </Flexbox>
        );
    };
    const renderClaimActions = () => {
        if (depositIds.length === 0) return null;
        return (
            <Flexbox
                direction='column'
                gap='10px'
            >
                <Button
                    variant="default"
                    color="primary"
                    isLoading={withdrawLoading}
                    onClick={handleWithdraw}
                >
                    withdraw selected deposit
                </Button>
                <Button
                    variant="default"
                    color="primary"
                    isLoading={withdrawAllLoading}
                    onClick={handleWithdrawAll}
                >
                    withdraw all deposits
                </Button>
            </Flexbox>
        );
    };

    /* lifecycle */
    useEffect(
		() => {
            findDepositID();
			library.on('block', () => {
				getDebaseBalance(undefined, true);
				getStakedBalance(undefined, true);
				getLPBalance(undefined, true);
                getDebaseSupply(undefined, true);
				getDebaseAccrued(undefined, true);
			});
			return () => {
				library.removeAllListeners('block');
			};
		},
		[ library, getDebaseBalance, getLPBalance, getStakedBalance, getDebaseSupply, getDebaseAccrued ]
	);

    return (
        <PoolStake
            info={info}
            listData={listData}
            stakeForms={renderForms()}
            claimActions={renderClaimActions()}
        />
    );

};

export default DM88Stake;