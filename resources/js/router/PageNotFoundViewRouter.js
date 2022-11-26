const component = () => import('@/views/PageNotFoundView.vue');

export default {
	path: '/:pathMatch(.*)*',
	name: 'PageNotFound',
	component,
};
