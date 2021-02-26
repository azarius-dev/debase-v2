import { Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';

import { Countdown } from '@core/components';
import { Section, DisconnectedWalletCard, LabeledCard } from '@dapp/components';

import RebaseVariables from './components/rebase-variables.component';
import { StyledRebase, StyledGridItem } from './rebase.styles';

const Rebase = ()  => {

	const { active } = useWeb3React();

	const renderVariables = () => {
		if (!active) return <DisconnectedWalletCard />
		return <RebaseVariables />
	};

    return (
        <Fragment>
			<Section label="rebase time">
				<LabeledCard
					label="time remaining"
					gutter={40}
				>
					<Countdown endDate="2021-04-03" />
				</LabeledCard>
			</Section>
			<Section
				label="Variables"
				info="**update** info about rebase variables"
			>
				{renderVariables()}
			</Section>
        </Fragment>
    );

};

export default Rebase;