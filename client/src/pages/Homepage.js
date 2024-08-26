import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selecedCategory, setSelecedCategory] = useState("drinks");
  const categories = [
    {
      name: "STARTER",
      imageUrl: "https://www.pngarts.com/files/10/Non-Veg-Items-Transparent-Background-PNG.png",
    },
    
    {
      name: "MAIN-COURSE(NON_VEG)",
      imageUrl: "https://i.pinimg.com/originals/75/c5/da/75c5da0a6b50437e6c38fbc3566a5b62.png",
    },
    
    {
      name:"MAIN_COURSE(VEG)",
      imageUrl:"https://desichef.in/assets/img/product/slider-image/kadai_paneer.png",
    },
    {
      name: "ROTI",
      imageUrl: "https://www.pngarts.com/files/1/Naan-Bread-Free-PNG-Image.png",
    },
    {
      name: "RICE & NOODLES",
      imageUrl: "https://www.pngall.com/wp-content/uploads/5/Noodles-PNG-Photo.png",
    },
    {
      name: "DESSERTS",
      imageUrl: "https://www.pngmart.com/files/22/Dessert-PNG-Isolated-Photos.png",
    },
    {
      name: "SHAKE",
      imageUrl: "https://www.pngall.com/wp-content/uploads/5/Strawberry-Milkshake-Transparent.png",
    },
    
    {
      name: "OTHER",
      imageUrl: "https://www.freepnglogos.com/uploads/food-png/food-grass-fed-beef-foodservice-products-grass-run-farms-4.png",
    },
  ];
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);
  return (

    <DefaultLayout className="homepage">
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selecedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelecedCategory(category.name)}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="60"
              width="80"
            />
          </div>
        ))}
      </div>
      <Row className="Row">
        {itemsData
          .filter((i) => i.category === selecedCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
    
  );
};

export default Homepage;