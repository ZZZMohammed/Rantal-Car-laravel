import { useTranslation } from "react-i18next";
import Typed from "typed.js";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import lporsche from "../assets/lporsche.png";
import { Link } from "react-router-dom"; // Import Link

function Home() {
  const { t } = useTranslation(); // Hook to access translations
  const typedRef = useRef(null); // Ref for typed text

  const [cars, setCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    // Fetch car brands from API
    axios
      .get("http://localhost:8000/api/cars")
      .then((response) => setCars(response.data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  // Update filtered cars when brand is selected
  useEffect(() => {
    if (selectedBrand) {
      setFilteredCars(cars.filter((car) => car.brand === selectedBrand));
    }
  }, [selectedBrand, cars]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [t("home.typing_text1"), t("home.typing_text2")],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
    });

    return () => typed.destroy();
  }, [t]);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-section d-flex align-items-center justify-content-center text-white text-center"
        style={{
          backgroundImage: `url('https://i.gifer.com/PSYr.gif')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
          position: "relative",
        }}
      >
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>

        <div className="container position-relative">
          <h1 className="display-4 fw-bold">
            <span ref={typedRef} style={{ color: "#FFCC00" }}></span>
          </h1>
          <p className="lead">{t("home.subtitle")}</p>
          <Link to="/Findcar" className="btn btn-warning btn-lg mt-3">
  {t("home.find_car_button")}
</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 text-center">
        <div className="container">
          <h2 className="mb-5 fw-bold">{t("home.features_title")}</h2>
          <div className="row">
            {[
              {
                img: "https://cdn-icons-png.flaticon.com/128/1476/1476897.png",
                title: t("home.feature1_title"),
                desc: t("home.feature1_desc"),
              },
              {
                img: "https://cdn-icons-png.flaticon.com/128/3729/3729463.png",
                title: t("home.feature2_title"),
                desc: t("home.feature2_desc"),
              },
              {
                img: "https://cdn-icons-png.flaticon.com/128/17244/17244749.png",
                title: t("home.feature3_title"),
                desc: t("home.feature3_desc"),
              },
              {
                img: "https://cdn-icons-png.flaticon.com/128/13636/13636417.png",
                title: t("home.feature4_title"),
                desc: t("home.feature4_desc"),
              },
            ].map((feature, index) => (
              <div key={index} className="col-md-3">
                <img src={feature.img} alt={feature.title} width="60" />
                <h5 className="mt-3">{feature.title}</h5>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking-section py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center">
              <img src={lporsche} alt="Car" className="img-fluid porsche-animation" />
            </div>
            <div className="col-lg-6">
              <h3 className="fw-bold mb-4">{t("home.book_your_car")}</h3>
              <form className="p-4 border rounded bg-white shadow">
                {/* Select Brand */}
                <div className="mb-3">
                  <label className="form-label">{t("home.choose_brand")}</label>
                  <select className="form-select" onChange={(e) => setSelectedBrand(e.target.value)}>
                    <option value="">{t("home.select_brand")}</option>
                    {Array.from(new Set(cars.map((car) => car.brand))).map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">{t("home.pickup_date")}</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">{t("home.pickup_time")}</label>
                  <input type="time" className="form-control" />
                </div>
                <Link to='/Book' type="submit" className="btn btn-warning w-100">
                  {t("home.continue")}
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
