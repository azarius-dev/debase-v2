import { Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';

import { Section, DisconnectedWalletCard } from '@dapp/components';

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