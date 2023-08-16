import React, { useEffect, useState } from "react";
import Navbar from "../components/VideoPage/Navbar";
import VideoContainer from "../components/VideoPage/VideoContainer";
import ProductCard from "../components/VideoPage/ProductCard";
import ChatContainer from "../components/VideoPage/ChatContainer";
import { GetProductsAPI, Product } from "../types/Product";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GetVideoByIDAPI, Video } from "../types/Video";
import { BASE_URL } from "../config";

const VideoPage = () => {
  const { id } = useParams();
  console.log("id", id);

  const [video, setVideo] = useState<Video>();
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(true);

  const getVideoDetail = () => {
    axios
      .get<GetVideoByIDAPI>(`${BASE_URL}/videos/${id}`)
      .then((value) => {
        setVideo(value.data.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  const getProducts = () => {
    axios
      .get<GetProductsAPI>(`${BASE_URL}/products/video/${id}`)
      .then((value) => {
        setProducts(value.data.data);
      });
  };

  useEffect(() => {
    if (id) {
      getVideoDetail();
      getProducts();
    }
  }, [id]);

  if (loading === true) {
    return <div>loading...</div>;
  }

  if (!video) {
    return <div>Page not found!</div>;
  }

  return (
    <>
      <div className="flex" id="main">
        <div className="w-3/4" id="product-container">
          <VideoContainer videoURL={video.videoURL} title={video.title} />
          <div
            className="z-0 my-5 mr-5 flex flex-row gap-3 overflow-x-auto overflow-y-hidden scroll-smooth"
            id="productcard-container"
          >
            {products && (
              <>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    price={product.price}
                    title={product.title}
                    thumbnailURL={product.url}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <ChatContainer videoID={video.id} />
      </div>
    </>
  );
};

export default VideoPage;
