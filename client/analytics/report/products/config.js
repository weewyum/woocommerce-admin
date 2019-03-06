/** @format */
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { getProductLabels, getVariationLabels } from 'lib/async-requests';

export const charts = [
	{
		key: 'items_sold',
		label: __( 'Items Sold', 'wc-admin' ),
		order: 'desc',
		orderby: 'items_sold',
		type: 'number',
	},
	{
		key: 'net_revenue',
		label: __( 'Net Revenue', 'wc-admin' ),
		order: 'desc',
		orderby: 'net_revenue',
		type: 'currency',
	},
	{
		key: 'orders_count',
		label: __( 'Orders Count', 'wc-admin' ),
		order: 'desc',
		orderby: 'orders_count',
		type: 'number',
	},
];

const filterConfig = {
	label: __( 'Show', 'wc-admin' ),
	staticParams: [],
	param: 'filter',
	showFilters: () => true,
	filters: [
		{ label: __( 'All Products', 'wc-admin' ), value: 'all' },
		{
			label: __( 'Single Product', 'wc-admin' ),
			value: 'select_product',
			chartMode: 'item-comparison',
			subFilters: [
				{
					component: 'Search',
					value: 'single_product',
					chartMode: 'item-comparison',
					path: [ 'select_product' ],
					settings: {
						type: 'products',
						param: 'products',
						getLabels: getProductLabels,
						labels: {
							placeholder: __( 'Type to search for a product', 'wc-admin' ),
							button: __( 'Single Product', 'wc-admin' ),
						},
					},
				},
			],
		},
		{
			label: __( 'Comparison', 'wc-admin' ),
			value: 'compare-products',
			chartMode: 'item-comparison',
			settings: {
				type: 'products',
				param: 'products',
				getLabels: getProductLabels,
				labels: {
					helpText: __( 'Select at least two products to compare', 'wc-admin' ),
					placeholder: __( 'Search for products to compare', 'wc-admin' ),
					title: __( 'Compare Products', 'wc-admin' ),
					update: __( 'Compare', 'wc-admin' ),
				},
			},
		},
	],
};

const variationsConfig = {
	showFilters: query =>
		'single_product' === query.filter && !! query.products && query[ 'is-variable' ],
	staticParams: [ 'filter', 'products' ],
	param: 'filter-variations',
	filters: [
		{ label: __( 'All Variations', 'wc-admin' ), chartMode: 'item-comparison', value: 'all' },
		{
			label: __( 'Comparison', 'wc-admin' ),
			chartMode: 'item-comparison',
			value: 'compare-variations',
			settings: {
				type: 'variations',
				param: 'variations',
				getLabels: getVariationLabels,
				labels: {
					helpText: __( 'Select at least two variations to compare', 'wc-admin' ),
					placeholder: __( 'Search for variations to compare', 'wc-admin' ),
					title: __( 'Compare Variations', 'wc-admin' ),
					update: __( 'Compare', 'wc-admin' ),
				},
			},
		},
	],
};

export const filters = [ filterConfig, variationsConfig ];
