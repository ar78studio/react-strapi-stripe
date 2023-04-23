import React from 'react';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

const Blog = () => {
	// Fetching data from Strapi hook from hooks folder
	const { loading, error, data } = useFetch('http://localhost:1337/api/blogs?populate=*');

	if (loading) {
		return <p>Loading ...</p>;
	} else if (error == []) {
		return <p>Error ...</p>;
	}
	console.log(data);

	return (
		<>
			{data.data.map((data) => (
				// Blogs Card
				<div className='transition duration-300 ease-in-out hover:-translate-y-1' key={data.id}>
					<div className='bg-purple-200 rounded-xl overflow-hidden drop-shadow-2xl p-2'>
						<Link className='underline' to={`../blog/BlogContent/${data.id}`}>
							<img
								className='w-full object-contain rounded-lg transition duration-300 ease-in-out filter  brightness-75 hover:brightness-100'
								src={`http://localhost:1337${data.attributes.coverImage.data.attributes.url}`}
								alt='Image'
							/>
						</Link>

						<div className='p-8'>
							<h4 className='text-2xl pb-10'>{data.attributes.title}</h4>
							<p className='text-md pb-2'>{data.attributes.dateWritten}</p>
							<p className='text-sm pb-2'>{data.attributes.blogContent.substring(0, 200)}...</p>

							<Link className='underline hover:text-linkOnWhiteColor' to={`../blog/BlogContent/${data.id}`}>
								Read more...
							</Link>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default Blog;
