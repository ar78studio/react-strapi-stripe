import React from 'react';
import BlogContent from '../blog/BlogContent';

const Blogs = () => {
	return (
		<>
			<section className='pt-20 w-full bg-buttonColor lg:p-[5rem] md:p-[3rem] p-[1.5rem]'>
				<div className='grid lg:grid-cols-3 md:grid-cols-2 gap-8 px-4 text-gray'>
					<BlogContent />
				</div>
			</section>
		</>
	);
};

export default Blogs;
