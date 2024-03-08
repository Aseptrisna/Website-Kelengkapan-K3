import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { URL_SERVER } from "../server";


const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    margin: "auto",
    padding: "5px",
    textAlign: "center",
    // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Menambahkan bayangan
  },
  profileSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Menambahkan warna latar belakang
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px", // Menambahkan jarak antara kontainer
  },
  profileImage: {
    marginRight: "20px",
  },
  profileDetails: {
    textAlign: "left",
  },
  cardDetail: {
    maxWidth: "100%",
  },
  image: {
    height: 400,
    borderRadius: "8%", // Membuat gambar profil bundar
    objectFit: "cover",
  },
});

function Detail() {
  const classes = useStyles();
  const { username } = useParams();
  const [data, setData] = useState([]);
  const [list, setList] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL_SERVER}/pir/${username}`);
        const jsonData = await response.json();
        setData(jsonData.data);
        setList(jsonData.data[0]);
      } catch (error) {
        console.error("Error fetching proctoring data:", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className={classes.root}>
      <Container>
        <Box className={classes.profileSection}>
          <Box className={classes.profileImage}>
            <img
              src={`http://localhost:6012/${list.image}`}
              alt="Profile"
              className={classes.image}
            />
          </Box>
          <Box className={classes.profileDetails}>
            <Typography variant="h4" gutterBottom>
              {list.date}
            </Typography>
            {/* <Typography variant="h6" gutterBottom>
              Jabatan: {list.position}
            </Typography>
            <Typography variant="h6" gutterBottom>
              ID: {list.id}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Access:{" "}
              {list.access ? (
                <CheckCircleOutlineIcon style={{ color: "green" }} />
              ) : (
                <CancelPresentationIcon style={{ color: "red" }} />
              )}
            </Typography> */}
          </Box>
        </Box>
      </Container>

      {/* <Container>
        <Typography variant="h4" gutterBottom style={{ textAlign: "left" }}>
          Log
        </Typography>
      </Container>

      <Container>
        <Grid container spacing={3}>
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <TestimonialCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container> */}
    </div>
  );
}

function TestimonialCard({ item }) {
  const classes = useStyles();

  return (
    <Card className={classes.cardDetail}>
      {/* <CardContent> */}
        <img
          src={`http://localhost:6012/${item.image}`}
          alt="Avatar"
          className={classes.image}
        />
        <Typography variant="body2" color="textSecondary" component="p">
          {item.name}
        </Typography>
        <Typography>
          Access:{" "}
          {item.access ? (
            <CheckCircleOutlineIcon style={{ color: "green" }} />
          ) : (
            <CancelPresentationIcon style={{ color: "red" }} />
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.date}
        </Typography>
      {/* </CardContent> */}
    </Card>
  );
}

export default Detail;
