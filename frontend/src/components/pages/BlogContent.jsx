import React from 'react';
import { useParams } from 'react-router-dom';
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
				<section className='max-w-[70%]'>
					<div className='bg-purple-50 p-2 pl-10 w-full flex flex-col justify-center items-center pt-20'>
						<div className=''>
							<h4 className='text-3xl lg:text-5xl text-center pb-10'>{data.blog.data.attributes.title}</h4>
							<img className='w-full object-contain rounded-lg' src={`http://localhost:1337${data.blog.data.attributes.coverImage.data.attributes.formats}`} alt='Image' />

							<div className='pt-10'>
								<p className='text-md pb-2'>{data.blog.data.attributes.dateWritten}</p>
								<p className='text-base pb-2'>{data.blog.data.attributes.blogContent}</p>
							</div>
						</div>
					</div>
				</section>
				{/* SIDE BAR WITH RECENT BLOGS  */}
				<aside className='max-w-[30%]'>
					<BlogsAside className='flex flex-col' />
				</aside>
			</main>
		</>
	);
};

export default BlogContent;
