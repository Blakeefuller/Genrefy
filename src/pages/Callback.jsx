import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";

export default function Callback() {
  useEffect(() => {
    const { code } = queryString.parse(window.location.search);

    if (code) {
      axios
        .get(`http://localhost:3000/api/getToken`, { params: { code } })
        .then((response) => {
          localStorage.setItem("accessToken", response.data.access_token);
          window.location.href = "http://localhost:5173/home"; // Redirect to home
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
          setError("Failed to fetch access token. Please try again.");
        });
    }
  }, []);

  return <div></div>;
}
