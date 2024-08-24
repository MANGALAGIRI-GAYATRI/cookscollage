import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://cooks-collage-backend.onrender.com/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        content:inputs.content,
        user: id,
      });
      if (data?.success) {
        alert("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} >
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={2}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
          bgcolor="white"
        >
          <Typography sx={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black" }}
            variant="h2"
            textAlign={"center"}
            //fontWeight="bold"
            padding={3}
            //color="Black"
          >
            Create A Post
          </Typography>
          <InputLabel
            sx={{ fontFamily: "Georgia, serif",mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", color: "black"}}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ fontFamily: "Georgia, serif",mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold",color: "black" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ fontFamily: "Georgia, serif",mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold",color: "black" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ fontFamily: "Georgia, serif",mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold",color: "black" }}
          >
            Content
          </InputLabel>
          <TextField
            name="content"
            value={inputs.content}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="primary" variant="contained">
            SUBMIT
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;