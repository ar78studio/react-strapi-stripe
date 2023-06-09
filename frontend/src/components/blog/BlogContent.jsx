import { React, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { motion } from 'framer-motion';
import ReactPaginate from 'react-paginate';

import BlogsAside from './BlogsAside';
// import BlogCategories from './BlogCategories';

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

	// console.log(data);

	return (
		<>
			{/* DARK BAR UNDER MENU  */}
			<motion.div
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 1 }}
				variants={{
					hidden: { opacity: 1, y: 30 },
					visible: { opacity: 1, y: 0 },
				}}
			>
				<div className='w-full flex-row bg-underNavBar p-3'></div>
			</motion.div>
			<main className='flex flex-wrap bg-purple-50'>
				<section className='w-full lg:max-w-[70%]'>
					<div className='bg-purple-50 p-6 lg:pl-10 w-full flex flex-col justify-center items-center pt-20'>
						<div className='flex flex-col justify-center items-center'>
							<h4 className='text-3xl lg:text-5xl text-center text-buttonColor pb-10'>{data.blog.data.attributes.title}</h4>
							<img className='max-w-screen-md object-cover rounded-lg' src={`${process.env.REACT_APP_API_URL}:1337${data.blog.data.attributes.coverImage.data.attributes.formats}`} alt='Image' />

							<div className='pt-10'>
								<p className='text-base pb-2 text-buttonColor'>{data.blog.data.attributes.blogContent}</p>
								<p className='text-md text-purple-500 py-6 '>
									Categories:
									{data.blog.data.attributes.categories.data.map((category) => (
										<Link key={category.id} to={`/category/${category.id}`} className='ml-2'>
											{category.attributes.name}
										</Link>
									))}
								</p>
								{/* <BlogCategories /> */}
							</div>
						</div>
					</div>
				</section>
				{/* SIDE BAR WITH RECENT BLOGS  */}
				<aside className='w-full lg:max-w-[30%] pt-10'>
					<BlogsAside className='flex flex-col' />
				</aside>
			</main>
		</>
	);
};

export default BlogContent;
