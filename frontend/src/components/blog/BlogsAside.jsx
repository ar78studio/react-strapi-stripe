import React from 'react';
// useQuery is a hook that we can use to send a query to GraphQL server similar to useFetch hook we've used, but instead of passing an API endpoint argument like in in RestAPI approach, we pass a graphql query.
// gql is used by Apollo to convert a query string into a form it can use
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const BLOGS = gql`
	query GetBlogs {
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
				}
			}
		}
	}
`;

const BlogsAside = () => {
	// RESTFUL - Fetching data from Strapi hook from hooks folder
	// const { loading, error, data } = useFetch('http://localhost:1337/api/blogs?populate=*');

	// we will distructure loading, error and data. We will pass the BLOGS query into the distructured const. It will make a query to Strapi which will send to use the three things in the const.
	const { loading, error, data } = useQuery(BLOGS);

	if (loading) {
		return <p>Loading ...</p>;
	} else if (error == []) {
		return <p>Error ...</p>;
	}
	console.log(data);

	return (
		<>
			<section className='pt-20 w-full bg-purple-50 lg:p-[2rem] p-8'>
				<div className='w-full flex justify-start items-center mx-auto border-b-2 border-buttonColor mb-6'>
					<h4 className='text-buttonColor text-xl pt-4 pb-2'>Latest Posts</h4>
				</div>
				<div className='grid lg:grid-cols-1 md:grid-cols-3 gap-6 text-gray'>
					{data.blogs.data.map((blogs) => (
						// Blogs Card
						<div className='transition duration-300 ease-in-out hover:-translate-y-1 drop-shadow-2xl' key={blogs.id}>
							<div className='bg-purple-200 rounded-lg overflow-hidden '>
								<Link className='underline' to={`/BlogContent/${blogs.id}`}>
									<img
										className='w-full rounded-bl-none rounded-br-none rounded-t-xl object-contain rounded-lg transition duration-300 ease-in-out filter  brightness-75 hover:brightness-100'
										src={`${process.env.REACT_APP_API_URL}:1337${blogs.attributes.coverImage.data.attributes.formats}`}
										alt='Image'
									/>
								</Link>

								<div className='p-4'>
									<h4 className='text-lg pb-4'>{blogs.attributes.title}</h4>
									<p className='text-md pb-2'>{blogs.attributes.dateWritten}</p>
									<p className='text-sm pb-2'>{blogs.attributes.blogContent.substring(0, 100)}...</p>

									<Link className='underline hover:text-linkOnWhiteColor' to={`/BlogContent/${blogs.id}`}>
										Read more...
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</>
	);
};

export default BlogsAside;
