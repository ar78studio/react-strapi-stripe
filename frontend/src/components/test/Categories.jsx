// To make the categories clickable and display all other related blogs, we can modify the BlogContent component as follows:
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Blog from './Blog';
import BlogsAside from './BlogsAside';

const BLOG = gql`
	query GetBlog($id: ID!) {
		blog(id: $id) {
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
								slug
							}
						}
					}
				}
			}
		}
	}
`;

const CATEGORY = gql`
	query GetCategory($slug: String!) {
		categoryBySlug(slug: $slug) {
			data {
				id
				attributes {
					name
					slug
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
							}
						}
					}
				}
			}
		}
	}
`;

const BlogContent = () => {
	const { id } = useParams();
	const { loading, error, data } = useQuery(BLOG, {
		variables: { id: id },
	});

	if (loading) {
		return <p>Loading ...</p>;
	} else if (error) {
		return <p>Error ...</p>;
	}

	console.log(data);

	return (
		<>
			<main className='flex flex-wrap bg-purple-50'>
				<section className='w-full lg:max-w-[76%]'>
					<div className='bg-purple-50 p-6 lg:pl-10 w-full flex flex-col justify-center items-center pt-20'>
						<div className=''>
							<h4 className='text-3xl lg:text-5xl text-center pb-10'>{data.blog.data.attributes.title}</h4>
							<img className='w-full object-contain rounded-lg' src={`http://localhost:1337${data.blog.data.attributes.coverImage.data.attributes.formats}`} alt='Image' />

							<div className='pt-10'>
								<p className='text-base pb-2'>{data.blog.data.attributes.blogContent}</p>
								{data.blog.data.attributes.categories.data.map((category) => (
									<Link key={category.id} to={`/category/${category.attributes.slug}`}>
										<p className='text-md text-purple-500 pb-2 bg-white hover:bg-purple-500 hover:text-white cursor-pointer'>Category: {category.attributes.name}</p>
									</Link>
								))}
							</div>
						</div>
					</div>
				</section>
				{/* SIDE BAR WITH RECENT BLOGS  */}
				<aside className='w-full lg:max-w-[24%]'>
					<BlogsAside className='flex flex-col' />
				</aside>
			</main>
		</>
	);
};

const CategoryBlogs = ({ match }) => {
	const { slug } = match.params;
	const { loading, error, data } = useQuery(CATEGORY, {
		variables: { slug: slug },
	});

	if (loading) {
		return <p>Loading ...</p>;
	} else if (error) {
		return <p>Error ...</p>;
	}
};

return (
	<div>
		<h4>Category: {data.categoryBySlug.data.attributes.name}</h4>
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
			{data.categoryBySlug.data.attributes.blogs.data.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	</div>
);
