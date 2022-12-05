import React, { useContext, useEffect, useState } from "react";

import "./View.css";
import { UserContext } from "../../context/AuthContext";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
function View() {
  const { userCreatedData } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const q = query(
          collection(db, "users"),
          where("uid", "==", userCreatedData.userId)
        );

        const querySnapshot = await getDocs(q);

        const userData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        });

        setUserInfo(userData);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [userCreatedData]);

  

  return (
    <div>
      <div className="viewParentDiv">
        <div className="imageShowDiv">
          <img src={userCreatedData.url} alt="" />
        </div>
        <div className="rightSection">
          <div className="productDetails">
            <p>&#x20B9;{userCreatedData.price} </p>
            <span>{userCreatedData.name} </span>
            <p>{userCreatedData.category} </p>
            <span>{userCreatedData.date}</span>
          </div>

          {userInfo &&
            userInfo.map((user) => {
              return (
                <div className="contactDetails">
                  <p>Seller Details</p>
                  <p>{user.userName} </p>
                  <p>{user.phoneNumber} </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default View;
