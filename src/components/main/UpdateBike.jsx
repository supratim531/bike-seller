import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authorizedAxios, domain, unauthorizedAxios } from "../../axios/axios";
import toast from 'react-hot-toast';
import Resizer from "react-image-file-resizer";
import BrowserTitleBar from "../BrowserTitleBar";

import {
  Ripple,
  Input,
  initTE,
} from "tw-elements";

function UpdateBike() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [bike, setBike] = useState(null);
  const [updatedBikeImage, setUpdatedBikeImage] = useState({
    b64: "",
    name: ""
  });
  const [newBikeImage, setNewBikeImage] = useState({
    b64: "",
    name: "",
  });
  const [extraBikeImages, setExtraBikeImages] = useState([]);
  const [updatedBikeImages, setUpdatedBikeImages] = useState([]);
  const [updatedBike, setUpdatedBike] = useState({
    bike_model: "",
    brand_name: "",
    bike_name: "",
    image_name: "",
    bike_meta: [],
    bike_image: []
  });
  const [updatedBikeMeta, setUpdatedBikeMeta] = useState({
    asking_price: "",
    year_of_model: "",
    engine_cc: "",
    engine_type: "",
    kms_run: "",
    no_of_owners: "",
    available: "",
    mileage: "",
    buy_year: "",
    color: "",
    details: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getBikeById = async model_id => {
    try {
      const res = await unauthorizedAxios.get(`/customer/get-bikes?model_id=${model_id}`);
      console.log("res:", res);
      const existingBike = res?.data?.bikes;
      console.log("data:", existingBike);
      setBike(existingBike);
      setUpdatedBike(existingBike);
      setUpdatedBikeMeta(existingBike?.bike_meta[0]);
      setUpdatedBikeImages(existingBike?.bike_image);
      setUpdatedBikeImage({ ...updatedBikeImage, name: existingBike?.image_name, b64: existingBike?.image_b64 });
    } catch (err) {
      console.log("err:", err);
    }
  }

  const getBikeFromURL = () => {
    const bike_model_id = searchParams.get("bike_model_id");
    getBikeById(bike_model_id);
  }

  const updateImages = async payload => {
    try {
      const res = await authorizedAxios.post(`/admins/upload/images/model_id=${bike?.bike_model_id}/`, payload);
      console.log("res:", res);
    } catch (err) {
      console.log("err:", err);
      toast.error("New slide images couldn't be updated");
    }
  }

  const updateExtraImages = () => {
    const payload = {
      bike_image: extraBikeImages
    }
    updateImages(payload);
  }

  const updateBike = async payload => {
    try {
      const res = await authorizedAxios.put("/admins/modify/", payload);
      console.log("res:", res);
      const data = res?.data;
      console.log("data:", data);
      setIsSubmitting(false);
      toast.success(`${bike?.bike_model} (${bike?.brand_name}) is now up-to-date`);
      navigate('/');
    } catch (err) {
      console.log("err:", err);
      console.log("err res:", err?.response?.data);
      setIsSubmitting(false);
      toast.error("Something went owner. Make sure no field is left (Contact +91 62914 62153)");
    }
  }

  const updateABike = e => {
    e.preventDefault();
    updatedBike.bike_meta = [updatedBikeMeta];
    updatedBike.bike_image = updatedBikeImages;

    if (newBikeImage.name !== "") {
      updatedBike.image_path = "";
      updatedBike.image_b64 = newBikeImage.b64;
      updatedBike.image_name = newBikeImage.name;
    } else {
      updatedBike.image_name = updatedBikeImage.name;
    }

    console.log("Updated Bike:", updatedBike);
    setIsSubmitting(true);
    updateBike(updatedBike);

    if (extraBikeImages.length !== 0) {
      updateExtraImages();
    }
  }

  const handleUpdatedBikeChange = e => {
    setUpdatedBike({ ...updatedBike, [e.target.name]: e.target.value });
  }

  const handleUpdatedBikeMetaChange = e => {
    setUpdatedBikeMeta({ ...updatedBikeMeta, [e.target.name]: e.target.value });
  }

  const discardImage = (id) => {
    if (window.confirm("Are you sure to discard this image? It'll be deleted permanently")) {
      const originalBikeImages = [...updatedBikeImages];

      const newUpdatedBikeImages = originalBikeImages.filter(e => {
        return e.bikeimage_id !== id;
      });

      setUpdatedBikeImages(newUpdatedBikeImages);
    }
  }

  const discardExtraImage = (timestamp) => {
    const originalBikeImages = [...extraBikeImages];

    const newExtraBikeImages = originalBikeImages.filter(e => {
      return e.timestamp !== timestamp;
    });

    setExtraBikeImages(newExtraBikeImages);
  }

  const imageFileChangedHandler = event => {
    let fileInput = false;

    if (event.target.files[0]) {
      fileInput = true;
    }

    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log("URI:", uri);
            setNewBikeImage({ ...newBikeImage, b64: uri, name: event.target.files[0].name.replaceAll(' ', '-').replace(/[^a-zA-Z0-9.]/g, '') });
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
        toast.error("Unable to compress image. Try again");
      }
    }
  };

  const imageFilesChangedHandler = event => {
    if ((updatedBikeImages.length + extraBikeImages.length) < 4) {
      let fileInput = false;

      if (event.target.files[0]) {
        fileInput = true;
      }

      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            event.target.files[0],
            300,
            300,
            "JPEG",
            100,
            0,
            (uri) => {
              console.log("Multiple URI:", uri);
              setExtraBikeImages(e => [...e, { timestamp: new Date().getTime(), image_name: event.target.files[0].name.replaceAll(' ', '-').replace(/[^a-zA-Z0-9.]/g, ''), image_b64: uri }]);
            },
            "base64",
            200,
            200
          );
        } catch (err) {
          console.log(err);
          toast.error("Unable to compress image. Try again");
        }
      }
    } else {
      toast.error("Maximum 4 slide images are allowed, to add one first delete one");
    }
  };

  useEffect(() => {
    getBikeFromURL();
  }, []);

  useEffect(() => {
    console.log("MAMA:", updatedBikeImages);

    if (updatedBike?.bike_model_id !== undefined) {
      Array.from(document.getElementsByTagName("input")).forEach(e => {
        e.focus();
      })
    }
  }, [updatedBike.bike_model_id]);

  useEffect(() => {
    initTE({ Ripple, Input }, { allowReinits: true });
  });

  return (
    <>
      <BrowserTitleBar title={`Update ${searchParams.get("bike_model")} - ${searchParams.get("bike_name")}, ${searchParams.get("brand_name")}`} />

      <div className="px-4 md:px-6 lg:px-20 py-10 bg-slate-200">
        <div className="mx-auto max-w-2xl pt-2 pb-6 px-2 xs:px-4 sm:px-6 lg:max-w-7xl lg:px-8 rounded-md shadow-md shadow-slate-400 bg-white">
          <h1 className="py-4 font-bold text-center text-lg xs:text-2xl lg:text-4xl [text-shadow:_1px_2px_0_rgb(0_0_0_/_40%)]">Modify {searchParams.get("bike_model")} ({searchParams.get("brand_name")})</h1>
          <form onSubmit={updateABike} className="py-4 sm:px-4 md:px-10 lg:px-20 space-y-6">
            <div className="relative font-roboto" data-te-input-wrapper-init>
              <input
                name="bike_model"
                value={updatedBike.bike_model}
                onChange={e => setUpdatedBike({ ...updatedBike, bike_model: e.target.value.toUpperCase().replaceAll(' ', '-') })}
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                placeholder="Bike Model"
              />
              <label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                Bike Model <b className="text-red-600">*</b>
              </label>
            </div>
            <div className="relative font-roboto" data-te-input-wrapper-init>
              <input
                name="brand_name"
                value={updatedBike.brand_name}
                onChange={handleUpdatedBikeChange}
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                placeholder="Brand Name"
              />
              <label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                Brand Name <b className="text-red-600">*</b>
              </label>
            </div>
            <div className="relative font-roboto" data-te-input-wrapper-init>
              <input
                name="bike_name"
                value={updatedBike.bike_name}
                onChange={handleUpdatedBikeChange}
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                placeholder="Bike Name"
              />
              <label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                Bike Name <b className="text-red-600">*</b>
              </label>
            </div>
            <hr />
            <div className="">
              <div className="mb-2 text-lg font-semibold text-slate-600">Engine Information</div>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 w-full">
                <div className="relative font-roboto w-full" data-te-input-wrapper-init>
                  <input
                    name="engine_cc"
                    value={updatedBikeMeta.engine_cc}
                    onChange={handleUpdatedBikeMetaChange}
                    onWheel={e => e.target.blur()}
                    type="number"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                    placeholder="CC"
                  />
                  <label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                    CC <b className="text-red-600">*</b>
                  </label>
                </div>
                <div className="relative font-roboto w-full" data-te-input-wrapper-init>
                  <input
                    name="engine_type"
                    value={updatedBikeMeta.engine_type}
                    onChange={handleUpdatedBikeMetaChange}
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                    placeholder="Type"
                  />
                  <label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                    Type <b className="text-red-600">*</b>
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div className="">
              <div className="mb-2 text-lg font-semibold text-slate-600">Timeline</div>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 w-full">
                <div className="relative font-roboto w-full" data-te-input-wrapper-init>
                  <input
                    name="year_of_model"
                    value={updatedBikeMeta.year_of_model}
                    onChange={handleUpdatedBikeMetaChange}
                    onWheel={e => e.target.blur()}
                    type="number"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                    placeholder="Year of Model"
                  />
                  <label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                    Year of Model <b className="text-red-600">*</b>
                  </label>
                </div>
                <div className="relative font-roboto w-full" data-te-input-wrapper-init>
                  <input
                    name="buy_year"
                    value={updatedBikeMeta.buy_year}
                    onChange={handleUpdatedBikeMetaChange}
                    onWheel={e => e.target.blur()}
                    type="number"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                    placeholder="Year of Purchase"
                  />
                  <label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                    Year of Purchase <b className="text-red-600">*</b>
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div className="relative font-roboto" data-te-input-wrapper-init>
              <input
                name="kms_run"
                value={updatedBikeMeta.kms_run}
                onChange={handleUpdatedBikeMetaChange}
                onWheel={e => e.target.blur()}
                type="number"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                placeholder="Kilometers Covered"
              />
              <label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                Kilometers Covered <b className="text-red-600">*</b>
              </label>
            </div>
            <div className="relative font-roboto" data-te-input-wrapper-init>
              <input
                name="mileage"
                value={updatedBikeMeta.mileage}
                onChange={handleUpdatedBikeMetaChange}
                onWheel={e => e.target.blur()}
                type="number"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                placeholder="Mileage"
              />
              <label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                Mileage <b className="text-red-600">*</b>
              </label>
            </div>
            <div className="relative font-roboto" data-te-input-wrapper-init>
              <input
                name="available"
                value={updatedBikeMeta.available}
                onChange={handleUpdatedBikeMetaChange}
                onWheel={e => e.target.blur()}
                type="number"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                placeholder="Available Quantity"
              />
              <label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                Available Quantity <b className="text-red-600">*</b>
              </label>
            </div>
            <div className="relative font-roboto" data-te-input-wrapper-init>
              <input
                name="no_of_owners"
                value={updatedBikeMeta.no_of_owners}
                onChange={handleUpdatedBikeMetaChange}
                onWheel={e => e.target.blur()}
                type="number"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                placeholder="Number of Owners"
              />
              <label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                Number of Owner(s) <b className="text-red-600">*</b>
              </label>
            </div>
            <div className="relative font-roboto" data-te-input-wrapper-init>
              <input
                name="color"
                value={updatedBikeMeta.color}
                onChange={handleUpdatedBikeMetaChange}
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                placeholder="Color"
              />
              <label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                Color <b className="text-red-600">*</b>
              </label>
            </div>
            <div className="relative font-roboto" data-te-input-wrapper-init>
              <input
                name="asking_price"
                value={updatedBikeMeta.asking_price}
                onChange={handleUpdatedBikeMetaChange}
                onWheel={e => e.target.blur()}
                type="number"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                placeholder="Asking Price"
              />
              <label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                Asking Price <b className="text-red-600">*</b>
              </label>
            </div>
            <div className="font-roboto">
              <div className="mb-2 text-lg font-semibold text-slate-600">Description</div>
              <textarea
                name="details"
                value={updatedBikeMeta.details}
                onChange={handleUpdatedBikeMetaChange}
                rows={3}
                className="p-3 w-full rounded outline outline-1 outline-slate-400 focus:outline focus:outline-2 focus:outline-blue-800"
                placeholder='Anything else...'
              ></textarea>
            </div>
            <div className="">
              <h2 className="mb-2 text-lg font-semibold text-slate-600">Profile Image of {searchParams.get("bike_model")} ({searchParams.get("brand_name")})</h2>
              <div><img src={domain + updatedBike?.image_path} /></div>
            </div>
            <div className="">
              <h2 className="mb-2 text-lg font-semibold text-slate-600">Choose New Profile Image for {searchParams.get("bike_model")} ({searchParams.get("brand_name")})</h2>
              <div>
                <input className="mb-2" type="file" onChange={imageFileChangedHandler} />
                <div><img src={newBikeImage.b64} /></div>
              </div>
            </div>
            <div className="">
              <h2 className="mb-2 text-lg font-semibold text-slate-600">Slide Images of {searchParams.get("bike_model")} ({searchParams.get("brand_name")})</h2>
              <div className="space-y-2">
                {
                  (updatedBikeImages.length === 0) &&
                  <div className="text-3xl font-bold text-red-400/40">No slide images available!</div>
                }
                {
                  (updatedBikeImages.length !== 0) && updatedBikeImages?.map(image =>
                    <div className="relative bg-black">
                      <div onClick={() => discardImage(image.bikeimage_id)} className="cursor-pointer absolute flex justify-center items-center top-2 right-2 h-6 w-6 rounded-full bg-white/50">
                        <i className="fa-solid fa-xmark font-bold"></i>
                      </div>
                      <img className="w-full h-52 object-contain object-center" src={domain + image.image_path} />
                    </div>
                  )
                }
              </div>
            </div>
            <div className="">
              <h2 className="mb-2 text-lg font-semibold text-slate-600">Add Slide Images for {searchParams.get("bike_model")} ({searchParams.get("brand_name")})</h2>
              <div>
                <input className="mb-2" type="file" onChange={imageFilesChangedHandler} />
                <div className="space-y-2">
                  {
                    extraBikeImages?.map(image =>
                      <div className="relative bg-black">
                        <div onClick={() => discardExtraImage(image.timestamp)} className="cursor-pointer absolute flex justify-center items-center top-2 right-2 h-6 w-6 rounded-full bg-white/50">
                          <i className="fa-solid fa-xmark font-bold"></i>
                        </div>
                        <img className="w-full h-52 object-contain object-center" src={image.image_b64} />
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              {
                isSubmitting ?
                  <button type="button" disabled={true} className="italic px-6 py-2 uppercase rounded-md font-semibold opacity-50 text-white bg-blue-800">updating...</button> :
                  <button type="submit" className="px-6 py-2 uppercase rounded-md hover:scale-125 duration-300 font-medium text-white bg-blue-800">update</button>
              }
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateBike;
