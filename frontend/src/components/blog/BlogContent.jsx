import React from 'react';
import { useParams } from 'react-router';
import { useQuery, gql } from '@apollo/client';

const BLOG = gql`
	query GetBlog($id: ID!) {
		blog(id: $id) {
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
			<div>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero, ea! Aliquid a enim aliquam nisi autem error officiis atque voluptate eveniet! Veniam quibusdam veritatis
				consequatur, iure ex, atque illo nihil, animi blanditiis expedita nemo odit perferendis quae eius voluptatibus. Amet eveniet, corrupti dicta quaerat enim non facilis
				laboriosam voluptatibus repellendus dolore tenetur officiis qui id. Reiciendis, sint suscipit adipisci, at molestias animi officiis placeat hic minus consectetur, vero
				harum est autem nam minima enim voluptates ut molestiae repellendus id omnis! Sequi ratione sint aliquam molestiae error cumque blanditiis, explicabo, obcaecati facilis
				itaque quas! Ab aspernatur, aperiam minus et at neque.
			</div>
			<div className='bg-purple-50 p-2'>
				<img className='w-full object-contain rounded-lg' src={`http://localhost:1337${data.attributes.coverImage.data.attributes.formats}`} alt='Image' />

				<div className='p-8'>
					<h4 className='text-2xl pb-10'>{data.attributes.title}</h4>
					<p className='text-md pb-2'>{data.attributes.dateWritten}</p>
					<p className='text-sm pb-2'>{data.attributes.blogContent}</p>
				</div>
			</div>
		</>
	);
};

export default BlogContent;
