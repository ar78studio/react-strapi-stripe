import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import BlogListByCategory from './BlogListByCategory';

const GET_BLOGS = gql`
	query {
		blogs {
			data {
				id
				attributes {
					title
					slug
					description
					coverImage {
						data {
							attributes {
								formats: url
							}
						}
					}
					blogContent
					categories {
						data {
							id
							attributes {
								name
							}
						}
					}
				}
			}
		}
	}
`;

const BlogCategories = () => {
	const { loading, error, data } = useQuery(GET_BLOGS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const categories = new Set();
	data.blogs.data.forEach((blog) => {
		blog.attributes.categories.data.forEach((category) => {
			categories.add(category.attributes.name);
		});
	});

	return (
		<div>
			<h2>Categories:</h2>
			<ul>
				{[...categories].map((category) => (
					<li key={category}>
						<Link className='hover:text-buttonColor' to={`/category/${category}`}>
							{category}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default BlogCategories;
