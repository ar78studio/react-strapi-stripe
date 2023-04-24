import React from 'react';
// import useFetch from '../../hooks/useFetch';
// useQuery is a hook that we can use to send a query to GraphQL server similar to useFetch hook we've used, but instead of passing an API endpoint argument like in in RestAPI approach, we pass a graphql query.
// gql is used by Apollo to convert a query string into a form it can use
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const BLOGS = gql`
	query GetBlogs {
		blogs {
			data {
				attributes {
					title
					urlSlug
					dateWritten
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

const Blog = () => {
	// Fetching data from Strapi hook from hooks folder
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
			<section className='pt-20 w-full bg-buttonColor lg:p-[5rem] md:p-[3rem] p-[1.5rem]'>
				<div className='w-full flex justify-center items-center mx-auto'>
					<h2 className='text-white text-5xl pt-4 pb-20'>VIP Safety First Blog</h2>
				</div>
				<div className='grid lg:grid-cols-3 md:grid-cols-2 gap-8 px-4 text-gray'>
					{data.blogs.data.map((data) => (
						// Blogs Card
						<div className='transition duration-300 ease-in-out hover:-translate-y-1' key={data.id}>
							<div className='bg-purple-200 rounded-xl overflow-hidden drop-shadow-2xl p-2'>
								<Link className='underline' to={`BlogContent/${data.id}`}>
									<img
										className='w-full object-contain rounded-lg transition duration-300 ease-in-out filter  brightness-75 hover:brightness-100'
										src={`http://localhost:1337${data.attributes.coverImage.data.attributes.formats}`}
										alt='Image'
									/>
								</Link>

								<div className='p-8'>
									<h4 className='text-2xl pb-10'>{data.attributes.title}</h4>
									<p className='text-md pb-2'>{data.attributes.dateWritten}</p>
									<p className='text-sm pb-2'>{data.attributes.blogContent.substring(0, 200)}...</p>

									<Link className='underline hover:text-linkOnWhiteColor' to={`BlogContent/${data.id}`}>
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

export default Blog;
