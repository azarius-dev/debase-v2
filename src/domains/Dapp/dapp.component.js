import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import _ from 'lodash';
import { getWeb3ReactContext, UnsupportedChainIdError } from '@web3-react/core';
import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';

import {
	getDebasePrice,
	getDegovPrice,
	getUsdPrice,
	getDebaseCircSupply,
	getDegovCircSupply,
	getRebaseHistory,
	getDebaseYearHistory,
	getTreasuryBalance
} from '@api';
import { parseFloatFixed, parseNumToUsFormat } from '@utils';
import { ScrollArea } from '@core/components';
import {
	Background,
	Sidebar,
	Navigation,
	Topbar,
	SnackbarManager
} from '@dapp/components';
import {
	UIContext,
	WalletContext,
	TokenDataContext,
	TokenHistoryContext,
	TreasuryDataContext
} from '@dapp/contexts';
import { calcRebasePercentage, calcTotalSupply } from '@dapp/utils';
import DAPP_ROUTES from './dapp.routes';
import {
	StyledDapp,
	StyledPage,
	StyledPageInner,
	StyledContent
} from './dapp.styles';

const injectedConnector = new InjectedConnector({ supportedChainIds: [1] });

class Dapp extends React.Component {

	static contextType = getWeb3ReactContext();

	/* GLOBAL STATE */
	state = {
		ui: {
			activeRoute: {},
			activeRouteIndex: 0,
			isMobile: false,
			isLoading: {
				tokenData: true,
				tokenHistory: true,
				treasuryData: true
			}
		},

		tokenData: {
			debasePrice: 0,
			debaseCircSupply: 0,
			debaseMarketcap: 0,

			degovPrice: 0,
			degovCircSupply: 0,
			degovMarketcap: 0,
		},

		tokenHistory: [],

		treasuryData: {
			mph88Balance: 0,
			daiBalance: 0
		},

		wallet: {
			isConnecting: false,
			isUnsupportedChainIdError: false,
			isNoEthereumProviderError: false,
			isUserRejectedRequestError: false
		}
	}

	/* UI LOGIC */
	detectMobileViewport = e => {
		this.setState(() => {
			const prevState = _.cloneDeep(this.state);
			const { ui } = prevState;
			ui.isMobile = window.innerWidth < 576;
			return { ui };
		});
	};
	detectActiveRoute = path => {
		const localPath = path !== undefined ? path : window.location.pathname;
		const strippedLocalPath = localPath.split('/')[1];
		const index = DAPP_ROUTES.findIndex(route => route.path.split('/')[1] === strippedLocalPath);
		this.setState(prevState => {
			const { ui } = prevState;
			if (index === -1) {
				ui.activeRoute = DAPP_ROUTES[0];
				ui.activeRouteIndex = 0;
			} else {
				ui.activeRoute = DAPP_ROUTES[index];
				ui.activeRouteIndex = index;
			}
			return { ui }
		});
	};

	/* WALLET LOGIC */
	detectActiveAccount = () => {
		/* detect MetaMask account connection */
		/* if already connected, auto activate */
		const ethereum = window.ethereum;
		if (ethereum && ethereum.isMetaMask) {
			this.updateWalletStatus('isConnecting', true, () => {
				ethereum
				.request({ method: 'eth_accounts' })
				.then(data => {
					if (data.length !== 0) {
						this.connectAccount();
					} else {
						this.updateWalletStatus('isConnecting', false);
					}
				});
			});
		}
	}
	connectAccount = async () => {
		this.updateWalletStatus('isConnecting', true);
		await this.context.activate(injectedConnector);
		this.detectWalletError(() => {
			this.updateWalletStatus('isConnecting', false);
		});
	}
	updateWalletStatus = (status, value, callback) => {
		this.setState(() => {
			const prevState = _.cloneDeep(this.state);
			const { wallet } = prevState;
			wallet[status] = value;
			return { wallet };
		}, () => {
			if (callback) {
				callback()
			}
		});
	}
	detectWalletError = callback => {
		const { error } = this.context;
		this.setState(() => {
			const prevState = _.cloneDeep(this.state);
			const { wallet } = prevState;
			wallet.isUnsupportedChainIdError = false;
			wallet.isNoEthereumProviderError = false;
			wallet.isUserRejectedRequestError = false;
			return { wallet };
		}, () => {
			this.setState(() => {
				const prevState = _.cloneDeep(this.state);
				const { wallet } = prevState;
				wallet.isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;
				wallet.isNoEthereumProviderError = error instanceof NoEthereumProviderError;
				wallet.isUserRejectedRequestError = error instanceof UserRejectedRequestError;
				return { wallet };
			}, () => {
				if (callback) {callback()}
			});
		});
	}

	/* ASYNC METHODS */
	initTokenData = async callback => {
		const debasePrice = await getDebasePrice();
		const degovPrice = await getDegovPrice();
		const UsdPrice = await getUsdPrice();

		const debaseCircSupply = await getDebaseCircSupply();
		const degovCircSupply = await getDegovCircSupply();

		this.setState(() => {
			const prevState = _.cloneDeep(this.state);
			const { ui, tokenData } = prevState;

			tokenData.debasePrice = debasePrice !== 0 ? parseFloatFixed(debasePrice) : 'err';
			tokenData.degovPrice = debasePrice !== 0 ? parseFloatFixed(degovPrice * UsdPrice) : 'err';

			tokenData.debaseCircSupply = parseNumToUsFormat(debaseCircSupply);
			tokenData.degovCircSupply = parseNumToUsFormat(degovCircSupply);

			tokenData.debaseMarketcap = debasePrice !== 0 ? parseNumToUsFormat(debasePrice * debaseCircSupply) : 'err';
			tokenData.degovMarketcap = debasePrice !== 0 ? parseNumToUsFormat(degovPrice * UsdPrice * degovCircSupply) : 'err';

			ui.isLoading.tokenData = false;

			return { ui, tokenData };
		}, () => {
			if (callback) {callback()}
		});
	}
	initTokenHistory = async callback => {
		const dateToday = new Date();

		const debaseHistory = await getDebaseYearHistory();
		const rebaseHistory = await getRebaseHistory();

		const yearHistory = [];

		for (let i = 0; i <= 365; i++) {
			const date = new Date(dateToday);
			date.setDate(date.getDate() - i);
			yearHistory.push({
				date: date.toLocaleDateString(),
				price: 0,
				marketcap: 0,
				totalSupply: null,
				rebasePercentage: 0
			});
		}
		yearHistory.reverse();

		/* price */
		debaseHistory.prices.forEach((day, i) => {
			const [ timestamp, price ] = day;
			const date = new Date(timestamp).toLocaleDateString();
			const index = yearHistory.findIndex(obj => obj.date === date);
			yearHistory[index].price = parseFloat(parseFloatFixed(price));
		});

		/* marketcap */
		debaseHistory.market_caps.forEach((day, i) => {
			const [ timestamp, marketcap ] = day;
			const date = new Date(timestamp).toLocaleDateString();
			const index = yearHistory.findIndex(obj => obj.date === date);
			yearHistory[index].marketcap = marketcap;
		});

		/* total supply & rebase percentage */
		rebaseHistory.rebases.reverse().forEach((rebase, i, arr) => {
			const { timestamp } = rebase;
			const date = new Date(timestamp * 1000).toLocaleDateString();
			const index = yearHistory.findIndex(obj => obj.date === date);
			yearHistory[index].totalSupply = calcTotalSupply(i, arr);
			yearHistory[index].rebasePercentage = calcRebasePercentage(i, arr);
		});

		yearHistory.forEach((day, i) => {
			if (i === 0 && !day.totalSupply) {
				yearHistory[0].totalSupply = 0;
			} else if (!day.totalSupply) {
				yearHistory[i].totalSupply = yearHistory[i - 1].totalSupply;
			}
		});
		yearHistory.forEach((day, i) => {
			if (!day.totalSupply) {
				yearHistory[i].totalSupply = 0;
			}
		});

		this.setState(() => {
			const prevState = _.cloneDeep(this.state);
			const { ui } = prevState;
			ui.isLoading.tokenHistory = false;
			return { ui, tokenHistory: yearHistory };
		}, () => {
			if (callback) {callback()}
		});
	}
	initTreasuryData = async callback => {
		const treasuryBalance = await getTreasuryBalance();

		this.setState(() => {
			const prevState = _.cloneDeep(this.state);
			const { ui, treasuryData } = prevState;

			treasuryData.mph88Balance = treasuryBalance.totalMPHEarned ? parseNumToUsFormat(treasuryBalance.totalMPHEarned * 0.21) : 'err';
			treasuryData.daiBalance = treasuryBalance.totalDepositByPool && treasuryBalance.totalDepositByPool[0] && treasuryBalance.totalDepositByPool[0].totalActiveDeposit ? parseNumToUsFormat(treasuryBalance.totalDepositByPool[0].totalActiveDeposit * 0.21) : 'err';

			ui.isLoading.treasuryData = false;

			return { ui, treasuryData };
		}, () => {
			if (callback) callback();
		});
	}

	/* LIFECYCLE */
	componentDidMount() {

		this.detectMobileViewport();
		this.detectActiveAccount();
		this.detectActiveRoute();

		/* detect if mobile device viewport */
		window.addEventListener('resize', this.detectMobileViewport);

		/* init data */
		this.initTokenData();
		this.initTokenHistory();
		this.initTreasuryData();

	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.detectMobileViewport);
	}

	/* COMPONENT RETURN RENDER */
	render() {

		const { wallet, ui, tokenData, tokenHistory, treasuryData } = this.state;

		const uiMethods = {
			detectActiveRoute: this.detectActiveRoute
		};

		const walletMethods = {
			updateWalletStatus: this.updateWalletStatus,
			connectAccount: this.connectAccount,
			disconnectAccount: this.disconnectAccount,
			switchAccount: this.switchAccount
		};

		return (
			<UIContext.Provider value={{ ui, uiMethods }}>
				<WalletContext.Provider value={{ wallet, walletMethods }}>
					<TokenDataContext.Provider value={{ tokenData }}>
						<TokenHistoryContext.Provider value={{ tokenHistory }}>
							<TreasuryDataContext.Provider value={{ treasuryData }}>

								<SnackbarManager offset={40}>
									<Background />
									<StyledDapp>
										<Router>
											<Sidebar>
												<Navigation routes={DAPP_ROUTES} />
											</Sidebar>
											<StyledPage>
													<StyledPageInner>
														<Topbar routes={DAPP_ROUTES} />
														<StyledContent>
															<Switch>
																{DAPP_ROUTES.map((route, i) => {
																	const { label, path, component } = route;
																	return (
																		<Route
																			exact={i === 0}
																			key={label}
																			path={path}
																		>
																			{component}
																		</Route>
																	);
																})}
															</Switch>
														</StyledContent>
													</StyledPageInner>
												
											</StyledPage>
										</Router>
									</StyledDapp>
								</SnackbarManager>

							</TreasuryDataContext.Provider>
						</TokenHistoryContext.Provider>
					</TokenDataContext.Provider>
				</WalletContext.Provider>
			</UIContext.Provider>
		);
	}

}

export default Dapp;