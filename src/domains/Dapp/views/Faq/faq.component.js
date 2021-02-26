import { Fragment } from 'react';

import { Accordion, Flexbox } from '@core/components';
import { Section } from '@dapp/components';
//import { StyledFaq } from './faq.styles';

const Faq = () => {

    return (
        <Fragment>
            <Section label="General">
                <Flexbox gap="30px">
                    <Accordion question="Question can be edited ofcourse">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Accordion>
                    <Accordion>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Accordion>
                    <Accordion question="Lorem ipsum dolor sit amet, consectetur adipiscing elit?">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Accordion>
                </Flexbox>
            </Section>
            <Section label="Rebase">
                <Flexbox gap="30px">
                    <Accordion question="Rebase question">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Accordion>
                </Flexbox>
            </Section>
            <Section label="Pools">
                <Flexbox gap="30px">
                    <Accordion question="Pools question #1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Accordion>
                    <Accordion question="Pools question #2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Accordion>
                </Flexbox>
            </Section>
        </Fragment>
    );
};

export default Faq;