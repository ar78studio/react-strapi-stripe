import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

const Blog = () => {
	const { loading, error, data } = useQuery(BLOGS);

	if (loading) {
		return <p>Loading ...</p>;
	} else if (error == []) {
		return <p>Error ...</p>;
	}
	console.log(data);

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
			<section className='pt-20 w-full bg-purple-300 lg:p-[5rem] md:p-[3rem] p-[1.5rem]'>
				<div className='w-full flex justify-center items-center mx-auto'>
					<h2 className='text-white text-5xl pt-4 pb-20'>VIP Safety First Blog</h2>
				</div>
				<div className='grid lg:grid-cols-3 md:grid-cols-2 gap-8 px-4 text-gray '>
					{data.blogs.data.map((blogs) => (
						// Blogs Card
						<div className='transition duration-300 ease-in-out hover:-translate-y-1 drop-shadow-2xl' key={blogs.id}>
							<div className='bg-purple-200 rounded-t-xl rounded-bl-none overflow-hidden '>
								<Link key={blogs.id} className='underline' to={`/BlogContent/${blogs.id}`}>
									<img
										className='w-full rounded-bl-none rounded-br-none rounded-t-xl object-contain rounded-lg transition duration-300 ease-in-out filter  brightness-75 hover:brightness-100'
										src={`http://localhost:1337${blogs.attributes.coverImage.data.attributes.formats}`}
										alt='Image'
									/>
								</Link>

								<div className='p-8 rounded-b-x'>
									<h4 className='text-2xl pb-2'>{blogs.attributes.title}</h4>
									{/* <p className='text-md py-6 font-semibold'>{blogs.attributes.description}</p> */}
									<p className='text-sm pb-2'>{blogs.attributes.blogContent.substring(0, 200)}...</p>

									<Link key={blogs.id} className='underline hover:text-linkOnWhiteColor' to={`/BlogContent/${blogs.id}`}>
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
