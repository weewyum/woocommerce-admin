/** @format */
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';
import DashboardCharts from './dashboard-charts';
import Header from 'header';
import Leaderboards from './leaderboards';
import { ReportFilters } from '@woocommerce/components';
import StorePerformance from './store-performance';
import TaskList from './task-list';
import ProfileWizard from './profile-wizard';

export default class Dashboard extends Component {
	render() {
		const { query, path } = this.props;

		// @todo This should be replaced by a check to see if the wizard was completed or skipped (#1884, #1883).
		const profileWizardComplete = true;
		// @todo This should be replaced by a check of tasks from the REST API response from #1897.
		const requiredTasksComplete = true;

		let dashboardOutput;
		if ( window.wcAdminFeatures.onboarding && ! profileWizardComplete ) {
			dashboardOutput = <ProfileWizard />;
		} else if ( window.wcAdminFeatures.onboarding && ! requiredTasksComplete ) {
			dashboardOutput = <TaskList />;
		} else {
			dashboardOutput = (
				<Fragment>
					<ReportFilters query={ query } path={ path } />
					<StorePerformance query={ query } />
					<DashboardCharts query={ query } path={ path } />
					<Leaderboards query={ query } />
				</Fragment>
			);
		}

		return (
			<Fragment>
				<Header sections={ [ __( 'Dashboard', 'woocommerce-admin' ) ] } />
				{ dashboardOutput }
			</Fragment>
		);
	}
}
