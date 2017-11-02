export const FILTER_POSTS_BY_CATEGORY = 'FILTER_POSTS_BY_CATEGORY';
export const SORT_POSTS_BY = 'SORT_POSTS_BY';

export function filterPostsByCategory(category) {
	return {
		type: FILTER_POSTS_BY_CATEGORY,
		category
	}
}

export function sortPostsBy(field) {
	return {
		type: SORT_POSTS_BY,
		field
	}
}
