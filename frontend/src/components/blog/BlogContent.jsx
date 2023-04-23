import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const BlogContent = () => {
	const { id } = useParams();
	const { loading, error, data } = useFetch('http://localhost:1337/api/blogs?populate=*' + id);

	if (loading) {
		return <p>Loading ...</p>;
	} else if (error == []) {
		return <p>Error ...</p>;
	}

	//

	return (
		<>
			<div className='h-[100%]'>
				<p className='text-purple-500 text-base'>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium aspernatur nemo dolore quisquam odio veritatis sunt vero adipisci voluptatibus blanditiis deserunt
					illo nihil ipsum at rem ratione corporis eveniet fugit illum, sint, dolores voluptates. Cumque fugiat est rem, molestiae qui impedit placeat ullam quia at facere
					consequuntur architecto, atque quo quis dolores veniam quaerat mollitia alias quas? Aliquam officiis animi doloribus magni dignissimos iure qui quo, iste itaque.
					Inventore, repellat illo consequatur earum optio a voluptates sit autem, nemo distinctio voluptatem, eius hic molestias eum? Perspiciatis, voluptatum optio! Accusamus
					repellat maxime quae cum minus obcaecati quia unde, hic iure voluptatem?
				</p>
				{data.data.map((data) => (
					// Blogs Card
					<div className='transition duration-300 ease-in-out hover:-translate-y-1' key={data.id}>
						<div className='bg-purple-200 rounded-xl overflow-hidden drop-shadow-2xl p-2'>
							<img
								className='w-full object-contain rounded-lg transition duration-300 ease-in-out filter  brightness-75 hover:brightness-100'
								src={`http://localhost:1337${data.attributes.coverImage.data.attributes.url}`}
								alt='Image'
							/>

							<div className='p-8'>
								<h4 className='text-2xl pb-10'>
									{data.attributes.title} - {id}
								</h4>
								<p className='text-md pb-2'>
									{data.attributes.dateWritten} - {id}
								</p>
								<p className='text-sm pb-2'>
									{data.attributes.blogContent} - {id}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default BlogContent;
