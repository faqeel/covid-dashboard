export default {
	app: {
		paginate: {
			perPage: parseInt(import.meta.env.VITE_APP_PAGINATE_PERPAGE) || 10,
		},
	},
};
