import { Fragment } from 'react';

import { Countdown, Input, Button, Flexbox, Progress } from '@core/components';
import { Section } from '@dapp/components';
import { StyledDev } from './dev.styles';

const Dev = () => {

    return (
        <Fragment>
            <Section>
                <Countdown 
                    endDate="2021-06-25"
                />
            </Section>
            <Section>
                <Flexbox gap="15px" direction="horizontal">
                    <Input />
                    <Button color="primary">max</Button>
                    <Button color="secundary">purchase</Button>
                </Flexbox>
            </Section>
            <Section>
                <Progress currentValue={513} totalValue={2000} label="eth" />
            </Section>
        </Fragment>
    );
};

export default Dev;