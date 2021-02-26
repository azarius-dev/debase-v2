import { useState, useContext } from 'react';

import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from 'ethers/lib/utils';
import { Contract } from 'ethers';

import { Button, List, Spinner } from '@core/components';
import { LabeledCard, Grid, SnackbarManagerContext } from '@dapp/components';
import { StyledGridItem } from '../rebase.styles';
import { CONTRACT_ADDRESS, ABI_ORCHESTRATOR, ABI_DEBASEPOLICY, ABI_UNI } from '@constants';
import { fetcher, calcDateDifference } from '@utils';

const RebaseVariables = ()  => {

	const { library } = useWeb3React();
	
	const [ rebaseLoading, setRebaseLoading ] = useState(false);

	const { handleSnackbar } = useContext(SnackbarManagerContext);

	/* fetch rebase data */
	const { data: priceTargetRate } = useSWR([CONTRACT_ADDRESS.debasePolicy, 'priceTargetRate'], {
		fetcher: fetcher(library, ABI_DEBASEPOLICY)
	});
	const { data: upperDeviationThreshold } = useSWR([CONTRACT_ADDRESS.debasePolicy, 'upperDeviationThreshold'], {
		fetcher: fetcher(library, ABI_DEBASEPOLICY)
	});
	const { data: lowerDeviationThreshold } = useSWR([CONTRACT_ADDRESS.debasePolicy, 'lowerDeviationThreshold'], {
		fetcher: fetcher(library, ABI_DEBASEPOLICY)
	});
	const { data: useDefaultRebaseLag } = useSWR([CONTRACT_ADDRESS.debasePolicy, 'useDefaultRebaseLag'], {
		fetcher: fetcher(library, ABI_DEBASEPOLICY)
	});
	const { data: defaultPositiveRebaseLag } = useSWR([CONTRACT_ADDRESS.debasePolicy, 'defaultPositiveRebaseLag'], {
		fetcher: fetcher(library, ABI_DEBASEPOLICY)
	});
	const { data: defaultNegativeRebaseLag } = useSWR([CONTRACT_ADDRESS.debasePolicy, 'defaultNegativeRebaseLag'], {
		fetcher: fetcher(library, ABI_DEBASEPOLICY)
	});
	const { data: minRebaseTimeIntervalSec } = useSWR([CONTRACT_ADDRESS.debasePolicy, 'minRebaseTimeIntervalSec'], {
		fetcher: fetcher(library, ABI_DEBASEPOLICY)
	});
	const { data: rebaseWindowOffsetSec } = useSWR([CONTRACT_ADDRESS.debasePolicy, 'rebaseWindowOffsetSec'], {
		fetcher: fetcher(library, ABI_DEBASEPOLICY)
	});
	const { data: rebaseWindowLengthSec } = useSWR([CONTRACT_ADDRESS.debasePolicy, 'rebaseWindowLengthSec'], {
		fetcher: fetcher(library, ABI_DEBASEPOLICY)
	});

	const { data: reserves } = useSWR([CONTRACT_ADDRESS.debaseDaiLp, 'getReserves'], {
		fetcher: fetcher(library, ABI_UNI)
	});
	const { data: lastRebaseTimestampSec } = useSWR([CONTRACT_ADDRESS.debasePolicy, 'lastRebaseTimestampSec'], {
		fetcher: fetcher(library, ABI_DEBASEPOLICY)
	});

	/* list data */
	const rebaseParamsListData = [
		{
			label: 'Target price',
			value: priceTargetRate ? parseFloat(formatEther(priceTargetRate)) : <Spinner size="xsmall" />,
			valueType: 'dai',
			tooltip: 'The target price in dai debase must meet'
		},
		{
			label: 'Price upper deviation',
			value: upperDeviationThreshold && priceTargetRate ? parseFloat(formatEther(upperDeviationThreshold)) + parseFloat(formatEther(priceTargetRate)) : <Spinner size="xsmall" />,
			valueType: 'dai',
			tooltip: 'The positive deviation from the target price within not to rebase'
		},
		{
			label: 'Price lower deviation',
			value: lowerDeviationThreshold && priceTargetRate ? parseFloat(formatEther(priceTargetRate)) - parseFloat(formatEther(lowerDeviationThreshold)) : <Spinner size="xsmall" />,
			valueType: 'dai',
			tooltip: 'The negative deviation from the target price within not to rebase'
		},
		{
			label: 'Rebase time period',
			value: minRebaseTimeIntervalSec ? (minRebaseTimeIntervalSec.toNumber() / (60 * 60)).toString() + ' Hours' : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'Time period after which a rebase can occur'
		},
		{
			label: 'Rebase offset',
			value: rebaseWindowOffsetSec ? rebaseWindowOffsetSec.toNumber() : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'The number of seconds from the beginning of the rebase interval, where the rebase window begins'
		},
		{
			label: 'Rebase window',
			value: rebaseWindowLengthSec ? rebaseWindowLengthSec.toNumber() : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'The length of time within which a rebase can occur'
		},
		{
			label: 'Use default lag',
			value: useDefaultRebaseLag !== undefined ? (useDefaultRebaseLag ? 'True' : 'False') : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'Flag to allow usage of default supply smoothing'
		},
		{
			label: 'Default upper lag',
			value: defaultPositiveRebaseLag ? defaultPositiveRebaseLag.toNumber() : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'Default supply smoothing to use for positive supply changes'
		},
		{
			label: 'Default lower lag',
			value: defaultNegativeRebaseLag ? defaultNegativeRebaseLag.toNumber() : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'Default supply smoothing to use for negative supply changes'
		}
	];

	const liveData = [
		{
			label: 'Current price',
			value: reserves ? parseFloat(parseFloat(formatEther(reserves[0])) / parseFloat(formatEther(reserves[1]))).toFixed(2) : <Spinner size="xsmall" />,
			valueType: 'dai',
			tooltip: 'Current market price of debase in relation to dai'
		},
		{
			label: 'Last rebase',
			value: lastRebaseTimestampSec ? calcDateDifference(new Date(lastRebaseTimestampSec.toNumber() * 1000), new Date()).toFixed(2) + ' day(s) ago' : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'Time since the last rebase happened'
		}
	];

	const onClickFireRebase = async e => {
		setRebaseLoading(true);
		const orchestratorContract = new Contract(CONTRACT_ADDRESS.orchestrator, ABI_ORCHESTRATOR, library.getSigner());
		try {
			await orchestratorContract.rebase();
			handleSnackbar({
				id: 'fire-rebase-button',
				message: 'Rebase successfully executed',
				status: 'success'
			});
		} catch (error) {
			handleSnackbar({
				id: 'fire-rebase-button',
				message: 'Rebase failed, please try again',
				status: 'error'
			});
		}
		setRebaseLoading(false);
	};

    return (
        <Grid>
			<StyledGridItem>
				<LabeledCard
					isLoading={false}
					label="current data"
					color="primary"
				>
					<List data={liveData} />
				</LabeledCard>
				<Button
					isLoading={rebaseLoading}
					isDisabled={rebaseLoading}
					onClick={e => onClickFireRebase(e)}
				>
					fire rebase
				</Button>
			</StyledGridItem>
            <LabeledCard
                isLoading={false}
                label="rebasing parameters"
                color="primary"
            >
                <List data={rebaseParamsListData} />
            </LabeledCard>
        </Grid>
    );

};

export default RebaseVariables;