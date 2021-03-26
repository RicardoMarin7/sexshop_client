import React from 'react'
import { Pagination as SemanticPagination } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import queryString from 'query-string'

const Pagination = ({totalProducts, page, limitPerPage, startItem, setLoader}) => {
    const totalPages = Math.ceil(totalProducts / limitPerPage)
    const router = useRouter()
    const urlParse = queryString.parseUrl(router.asPath)

    const goToPage = (newPage) =>{
        urlParse.query.page = newPage
        const url = queryString.stringifyUrl(urlParse)
        router.push(url)
    }

    return (
        <div className="Pagination">
            {/* <p>Showing {`${startItem}-${totalProducts-limitPerPage+startItem} of ${totalProducts}`} </p> */}
            {/* <div className="Pagination__container"> */}
                <SemanticPagination 
                    defaultActivePage={page}
                    totalPages={totalPages}
                    firstItem={null}
                    lastItem={null}
                    onPageChange={(_,data) => goToPage(data.activePage)}
                    boundaryRange={0}
                    siblingRange={1}
                    ellipsisItem={null}
                />
            {/* </div> */}
        </div>
    );
}
 
export default Pagination;