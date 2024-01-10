import React, { useEffect, useState } from 'react';
import { unauthorizedAxios } from '../axios/axios';
import Card from '../components/products/Card';
import Search from '../components/products/Search';
import Loader from '../components/main/Loader';
import ProductContext from '../context/ProductContext';
import BrowserTitleBar from '../components/BrowserTitleBar';
import ReactPaginate from "react-paginate";

function ProductsTest() {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [totalBikes, setTotalBikes] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchBikes, setSearchBikes] = useState("");

  const getBikes = async (pageNumber, itemsPerPage) => {
    try {
      const res = await unauthorizedAxios.get(`/customer/get-bikes?page=${pageNumber}&page-size=${itemsPerPage}`);
      console.log("res:", res);
      const data = res?.data;
      console.log("data:", data);
      const bikes = data?.bikes;
      setBikes(bikes);
      setFilteredBikes(bikes);
      setTotalBikes(data?.total_bikes);
      setIsLoading(false);
    } catch (err) {
      console.log("err:", err);
      setIsLoading(false);
    }
  }

  const filterBikes = () => {
    const searchedBikes = bikes.filter(bike => {
      return bike.bike_model.toLowerCase().match(searchBikes.toLowerCase().trim()) || bike.brand_name.toLowerCase().match(searchBikes.toLowerCase().trim()) || bike.bike_name.toLowerCase().match(searchBikes.toLowerCase().trim()) || bike.bike_meta[0].engine_type.toLowerCase().match(searchBikes.toLowerCase().trim()) || bike.bike_meta[0].color.toLowerCase().match(searchBikes.toLowerCase().trim()) || bike.bike_meta[0].mileage.toLowerCase().match(searchBikes.toLowerCase().trim());
    });
    setFilteredBikes(searchedBikes);
  }

  const handlePageClick = event => {
    setIsLoading(true);
    setCurrentPageNumber(event.selected + 1);
    console.log("page no. requested:", (event.selected + 1));
  };

  useEffect(() => {
    getBikes(currentPageNumber, itemsPerPage);
  }, [currentPageNumber]);

  useEffect(() => {
    filterBikes();
  }, [searchBikes]);

  useEffect(() => {
    setPageCount(Math.ceil(totalBikes / itemsPerPage));
  }, [totalBikes]);

  const contextData = {
    getBikes, itemsPerPage, currentPageNumber
  };

  return (
    <>
      <BrowserTitleBar title="Marketplace For Second Hand Bike" />

      <ProductContext.Provider value={contextData}>
        <div className="mx-auto max-w-2xl py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <Search setSearchBikes={setSearchBikes} />
        </div>
        {
          isLoading ? <Loader /> : <>
            <div className="">
              {
                (filteredBikes.length === 0 && bikes.length !== 0) &&
                <div className="mx-auto max-w-2xl pt-2 pb-6 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                  <div className="p-1 break-all bg-gray-50">No result found for "<b>{searchBikes}</b>"</div>
                </div>
              }
              {
                (filteredBikes.length === 0 && bikes.length === 0) &&
                <div className="h-[60vh] flex justify-center items-center text-4xl font-bold text-gray-400/40">No Bikes Found 😩</div>
              }
              <div className="mx-auto max-w-2xl pt-2 pb-6 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {
                    filteredBikes.map(bike => (
                      <Card product={bike} />
                    ))
                  }
                </div>
              </div>
            </div>
          </>
        }
      </ProductContext.Provider>

      <ReactPaginate
        breakClassName="px-2 flex flex-wrap items-center text-white bg-[#51bae8]"
        pageClassName="flex items-center text-white bg-[#51bae8]"
        pageLinkClassName="px-3"
        nextClassName="px-3 py-3 rounded-r-full bg-[#51bae8]"
        previousClassName="px-3 py-3 rounded-l-full bg-[#51bae8]"
        className="flex justify-center my-6"
        breakLabel="..."
        nextLabel={<i className="fa-solid fa-angle-right text-lg text-[#2184c3]"></i>}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel={<i className="fa-solid fa-angle-left text-lg text-[#2184c3]"></i>}
        renderOnZeroPageCount={null}
        pageRangeDisplayed={0}
      />
    </>
  );
}

export default ProductsTest;
