import React from "react";
import useSWR from "swr";
import { useEffect, useState } from "react";
import axios from "axios";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";

export default function Posts() {
  // async function loadData() {
  //   const resp = await axios("https://www.breakingbadapi.com/api/characters");
  //   setData(resp.data);
  //   console.log(data);
  // }
  useEffect(() => {
    return () => {};
  }, []);

  const [currImg, setCurrImg] = useState(0);
  const { data } = useSWR(
    "https://www.breakingbadapi.com/api/characters",
    (url) => axios(url).then((r) => r.data)
  );
  if (data) {
    return (
      <div
        style={{
          width: "100%",
          height: 400,
          background: "black",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            color: "white",

            backgroundImage: `url(${data[currImg]?.img})`,
          }}
        >
          <div
            style={{
              flex: "5%",
              height: "96%",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              backgroundColor: "rgb(0,0,0,0.6)",
            }}
            onClick={() => {
              currImg > 0 && setCurrImg(currImg - 1);
            }}
          >
            <ArrowBack />
          </div>
          <div
            style={{
              flex: "90%",
              height: "100%",
            }}
          >
            <h1
              style={{
                padding: "20px",
                borderRadius: "9px",
              }}
            >
              {data[currImg]?.name}
            </h1>
            <p
              style={{
                padding: "20px",
                borderRadius: "9px",
              }}
            >
              {data[currImg]?.status}
            </p>
          </div>
          <div
            style={{
              flex: "5%",
              height: "96%",
              display: "grid",
              placeItems: "center",
              color: "white",
              cursor: "pointer",
              backgroundColor: "rgb(0,0,0,0.6)",
            }}
            onClick={() => {
              currImg < data.length - 1 && setCurrImg(currImg + 1);
            }}
          >
            <ArrowForward />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>...Cargando</div>;
  }
}
