import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const PaginateComp = ({ data, itemsPerPage, renderItem }) => {
	const [pageNumber, setPageNumber] = useState(0);
	const pagesVisited = pageNumber * itemsPerPage;
	const pageCount = Math.ceil(data.length / itemsPerPage);

	const displayItems = data.slice(pagesVisited, pagesVisited + itemsPerPage).map(renderItem);

	const handlePageClick = ({ selected }) => {
		setPageNumber(selected);
	};

	return (
		<>
			<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>{displayItems}</div>
			<div className='flex justify-center pt-8'>
				<ReactPaginate
					previousLabel={'<'}
					nextLabel={'>'}
					pageCount={pageCount}
					onPageChange={handlePageClick}
					containerClassName={'paginationContainer'}
					previousLinkClassName={'previousButton'}
					nextLinkClassName={'nextButton'}
					disabledClassName={'paginationDisabledButton'}
					activeClassName={'paginationActiveButton'}
				/>
			</div>
		</>
	);
};

export default PaginateComp;
