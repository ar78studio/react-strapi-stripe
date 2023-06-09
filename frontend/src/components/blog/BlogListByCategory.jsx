import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_BLOGS_BY_CATEGORY = gql`
	query GetBlogsByCategory($categoryName: String!) {
		blogs(where: { categories: { name: $categoryName } }) {
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
				}
			}
		}
	}
`;

const BlogListByCategory = ({ categoryName }) => {
	const { loading, error, data } = useQuery(GET_BLOGS_BY_CATEGORY, {
		variables: { categoryName },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div>
			<h2>{categoryName} blogs:</h2>
			<ul>
				{data.blogs.data.map((blog) => (
					<li key={blog.id}>
						<h3>{blog.attributes.title}</h3>
						<p>{blog.attributes.description}</p>
						<img src={`${process.env.REACT_APP_API_URL}:1337${blog.attributes.coverImage.data.attributes.formats}`} alt='Cover' />
					</li>
				))}
			</ul>
		</div>
	);
};

export default BlogListByCategory;
