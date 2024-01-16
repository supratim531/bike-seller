import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { unauthorizedAxios } from '../axios/axios';
import { formattedPrice } from '../utils/formattedPrice';
import BikeCarousel from '../components/carousel/BikeCarousel';
import Loader from '../components/main/Loader';
import Card from '../components/product/Card';
import BrowserTitleBar from '../components/BrowserTitleBar';

function SpeceficProduct() {
  const [bike, setBike] = useState(null);
  const [bikes, setBikes] = useState([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const getBikeById = async model_id => {
    try {
      const res = await unauthorizedAxios.get(`/customer/get-bikes?model_id=${model_id}`);
      console.log("res:", res);
      const data = res?.data;
      setBike(data?.bikes);
      setIsLoading(false);
    } catch (err) {
      console.log("err:", err);
    }
  }

  const getBikesByModel = async (model_id, model_name) => {
    try {
      const res = await unauthorizedAxios.get(`/customer/get-bikes?model_name=${model_name}`);
      console.log("res:", res);
      const data = res?.data;
      const allBikes = [...data?.bikes];

      const newBikes = allBikes.filter(e => {
        return e.bike_model_id !== model_id
      });

      setBikes(newBikes);
    } catch (err) {
      console.log("err:", err);
    }
  }

  const getBikeFromURL = () => {
    const bike_model = searchParams.get("bike_model");
    const bike_model_id = searchParams.get("bike_model_id");
    getBikeById(bike_model_id);
    getBikesByModel(bike_model_id, bike_model);
  }

  useEffect(() => {
    getBikeFromURL();
  }, [searchParams]);

  return (
    <>
      {
        !isLoading &&
        <BrowserTitleBar title={`${bike?.bike_name} - ${bike?.brand_name}, ${bike?.bike_model}, ${bike?.bike_meta[0]?.engine_cc} CC`} />
      }
      <div>
        {
          isLoading ? <Loader /> :
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-4 flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 mb-4 md:mb-0">
                  <BikeCarousel bikeImages={bike?.bike_image} />
                </div>
                <div className="md:mx-2 md:flex-1">
                  <div className="p-2 rounded outline outline-1 outline-slate-300 bg-white">
                    <h2 className="text-3xl font-bold text-green-950 mb-2">₹ {formattedPrice(bike?.bike_meta[0]?.asking_price)}</h2>
                    <p className="text-gray-600">{bike?.bike_meta[0]?.buy_year} - {formattedPrice(bike?.bike_meta[0]?.kms_run)} km</p>
                    <p className="mb-2 text-gray-600">{`${bike?.bike_meta[0]?.engine_cc} CC bike, ${bike?.bike_meta[0]?.buy_year} model and it's covered ${formattedPrice(bike?.bike_meta[0]?.kms_run)} KM upto now, gives ${bike?.bike_meta[0]?.mileage} mileage`}</p>
                    <div className="flex flex-wrap gap-2">
                      <div className>
                        <span className="mr-1 font-bold text-gray-700">Brand:</span>
                        <span className="text-gray-600">{bike?.brand_name}</span>
                      </div>
                      <div>
                        <span className="mr-1 font-bold text-gray-700">Model:</span>
                        <span className="text-gray-600">{bike?.bike_model}</span>
                      </div>
                      <div>
                        <span className="mr-1 font-bold text-gray-700">Type:</span>
                        <span className="text-gray-600">{bike?.bike_meta[0]?.engine_type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 rounded outline outline-1 outline-slate-300 bg-white">
                    <div className="mb-4">
                      <span className="text-xl font-bold text-gray-700">Contact</span>
                      <div className="flex items-center gap-x-2">
                        <a href="mailto:supratimm531@gmail.com">
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="38" height="38" viewBox="0 0 48 48">
                            <linearGradient id="6769YB8EDCGhMGPdL9zwWa_ho8QlOYvMuG3_gr1" x1="15.072" x2="24.111" y1="13.624" y2="24.129" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e3e3e3"></stop><stop offset="1" stop-color="#e2e2e2"></stop></linearGradient><path fill="url(#6769YB8EDCGhMGPdL9zwWa_ho8QlOYvMuG3_gr1)" d="M42.485,40H5.515C4.126,40,3,38.874,3,37.485V10.515C3,9.126,4.126,8,5.515,8h36.969	C43.874,8,45,9.126,45,10.515v26.969C45,38.874,43.874,40,42.485,40z"></path><linearGradient id="6769YB8EDCGhMGPdL9zwWb_ho8QlOYvMuG3_gr2" x1="26.453" x2="36.17" y1="25.441" y2="37.643" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f5f5f5"></stop><stop offset=".03" stop-color="#eee"></stop><stop offset="1" stop-color="#eee"></stop></linearGradient><path fill="url(#6769YB8EDCGhMGPdL9zwWb_ho8QlOYvMuG3_gr2)" d="M42.485,40H8l37-29v26.485C45,38.874,43.874,40,42.485,40z"></path><linearGradient id="6769YB8EDCGhMGPdL9zwWc_ho8QlOYvMuG3_gr3" x1="3" x2="45" y1="24" y2="24" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d74a39"></stop><stop offset="1" stop-color="#c73d28"></stop></linearGradient><path fill="url(#6769YB8EDCGhMGPdL9zwWc_ho8QlOYvMuG3_gr3)" d="M5.515,8H8v32H5.515C4.126,40,3,38.874,3,37.485V10.515C3,9.126,4.126,8,5.515,8z M42.485,8	H40v32h2.485C43.874,40,45,38.874,45,37.485V10.515C45,9.126,43.874,8,42.485,8z"></path><linearGradient id="6769YB8EDCGhMGPdL9zwWd_ho8QlOYvMuG3_gr4" x1="24" x2="24" y1="8" y2="38.181" gradientUnits="userSpaceOnUse"><stop offset="0" stop-opacity=".15"></stop><stop offset="1" stop-opacity=".03"></stop></linearGradient><path fill="url(#6769YB8EDCGhMGPdL9zwWd_ho8QlOYvMuG3_gr4)" d="M42.485,40H30.515L3,11.485v-0.969C3,9.126,4.126,8,5.515,8h36.969	C43.874,8,45,9.126,45,10.515v26.969C45,38.874,43.874,40,42.485,40z"></path><linearGradient id="6769YB8EDCGhMGPdL9zwWe_ho8QlOYvMuG3_gr5" x1="3" x2="45" y1="17.73" y2="17.73" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f5f5f5"></stop><stop offset="1" stop-color="#f5f5f5"></stop></linearGradient><path fill="url(#6769YB8EDCGhMGPdL9zwWe_ho8QlOYvMuG3_gr5)" d="M43.822,13.101L24,27.459L4.178,13.101C3.438,12.565,3,11.707,3,10.793v-0.278	C3,9.126,4.126,8,5.515,8h36.969C43.874,8,45,9.126,45,10.515v0.278C45,11.707,44.562,12.565,43.822,13.101z"></path><linearGradient id="6769YB8EDCGhMGPdL9zwWf_ho8QlOYvMuG3_gr6" x1="24" x2="24" y1="8.446" y2="27.811" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e05141"></stop><stop offset="1" stop-color="#de4735"></stop></linearGradient><path fill="url(#6769YB8EDCGhMGPdL9zwWf_ho8QlOYvMuG3_gr6)" d="M42.485,8h-0.3L24,21.172L5.815,8h-0.3C4.126,8,3,9.126,3,10.515v0.278	c0,0.914,0.438,1.772,1.178,2.308L24,27.459l19.822-14.358C44.562,12.565,45,11.707,45,10.793v-0.278C45,9.126,43.874,8,42.485,8z"></path>
                          </svg>
                        </a>
                        <a href="tel:+916291776361">
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                            <path fill="#0f0" d="M13,42h22c3.866,0,7-3.134,7-7V13c0-3.866-3.134-7-7-7H13c-3.866,0-7,3.134-7,7v22	C6,38.866,9.134,42,13,42z"></path><path fill="#fff" d="M35.45,31.041l-4.612-3.051c-0.563-0.341-1.267-0.347-1.836-0.017c0,0,0,0-1.978,1.153	c-0.265,0.154-0.52,0.183-0.726,0.145c-0.262-0.048-0.442-0.191-0.454-0.201c-1.087-0.797-2.357-1.852-3.711-3.205	c-1.353-1.353-2.408-2.623-3.205-3.711c-0.009-0.013-0.153-0.193-0.201-0.454c-0.037-0.206-0.009-0.46,0.145-0.726	c1.153-1.978,1.153-1.978,1.153-1.978c0.331-0.569,0.324-1.274-0.017-1.836l-3.051-4.612c-0.378-0.571-1.151-0.722-1.714-0.332	c0,0-1.445,0.989-1.922,1.325c-0.764,0.538-1.01,1.356-1.011,2.496c-0.002,1.604,1.38,6.629,7.201,12.45l0,0l0,0l0,0l0,0	c5.822,5.822,10.846,7.203,12.45,7.201c1.14-0.001,1.958-0.248,2.496-1.011c0.336-0.477,1.325-1.922,1.325-1.922	C36.172,32.192,36.022,31.419,35.45,31.041z"></path>
                          </svg>
                        </a>
                        <a href="https://wa.me/+916291776361">
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                            <path fill="#fff" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path><path fill="#fff" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path><path fill="#cfd8dc" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path><path fill="#40c351" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path><path fill="#fff" fill-rule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clip-rule="evenodd"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                    {/* <hr className="mb-4" />
                  <div>
                    <span className="text-xl font-bold text-gray-700">Product Description:</span>
                    <p className="text-gray-600">{bike?.bike_meta[0]?.details}</p>
                  </div> */}
                  </div>
                </div>
              </div>
              <div className="my-6 p-4 leading-5 rounded outline outline-1 outline-slate-300 bg-white">
                <div className="mb-2 text-2xl font-bold text-[#002f34]">Description</div>
                <pre className="font-[Roboto] whitespace-pre-line text-[#2c393a]">{bike?.bike_meta[0]?.details}</pre>
              </div>
              {
                isLoading ?
                  <div className="my-6 sm:container sm:mx-auto flex flex-wrap justify-center gap-4">
                    {
                      <div className="spinner-container">
                        <div className="mx-1 loading-spinner"></div>
                        <span className="">Loading...</span>
                      </div>
                    }
                  </div>
                  :
                  <div className="py-4">
                    <div className="mb-2 text-xl sm:text-3xl font-semibold text-[#002f34]">Similar Results</div>
                    {
                      (bikes.length === 0) ?
                        <div className="text-4xl font-bold text-gray-400/40">No Such Similar Bike Found :")</div> :
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                          {
                            bikes.map(bike => {
                              return (
                                <Card product={bike} />
                              )
                            })
                          }
                        </div>
                    }
                  </div>
              }
            </div>
        }
      </div>
    </>
  );
}

export default SpeceficProduct;
