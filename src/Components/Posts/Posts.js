import React, { useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

import Heart from "../../assets/Heart";
import "./Post.css";
import { UserContext } from "../../context/AuthContext";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs  } from "firebase/firestore";

function Posts() {
  const [products, setProducts] = useState([]);
  const { setUserCreatedData } = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRef = collection(db, "products");
        const snapshot = await getDocs(colRef);
        const allPosts = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        });

        setProducts(allPosts);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="postParentDiv">
        <div className="moreView">
          <div className="heading">
            <span>Quick Menu</span>
            <span>View more</span>
          </div>
          <div className="product__card">
            {products.map((product) => {
              return (
                <div
                  className="card"
                  onClick={() => {
                    setUserCreatedData(product);
                    navigate('/viewpost')
                  }}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>

                  <div className="image">
                    <img src={product.url} alt="" />
                  </div>

                  <div className="content">
                    <p className="rate">&#x20B9;{product.price} </p>
                    <span className="kilometer">{product.category} </span>
                    <p className="name">{product.name} </p>
                  </div>

                  <div className="date">
                    <span>{product.date} </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="recommendations">
          <div className="heading">
            <span>Fresh recommendations</span>
          </div>
          <div className="cards">
            <div className="card">
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src="../../../Images/R15V3.jpg" alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; 250000</p>
                <span className="kilometer">Two Wheeler</span>
                <p className="name"> YAMAHA R15V3</p>
              </div>
              <div className="date">
                <span>10/5/2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Posts;
