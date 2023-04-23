import React from 'react';
import Blog from '../blog/Blog';

const Blogs = () => {
	return (
		<>
			<section className='pt-20 w-full bg-buttonColor lg:p-[5rem] md:p-[3rem] p-[1.5rem]'>
				<div className='w-full flex justify-center items-center mx-auto'>
					<h2 className='text-white text-5xl pt-4 pb-20'>VIP Safety First Blog</h2>
				</div>
				<div className='grid lg:grid-cols-3 md:grid-cols-2 gap-8 px-4 text-gray'>
					<Blog />
				</div>
			</section>
		</>
	);
};

export default Blogs;
