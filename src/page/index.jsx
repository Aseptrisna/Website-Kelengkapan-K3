import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { URL_SERVER } from "../server"; // Impor URL_SERVER dari file server
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    textAlign: "center",
    marginBottom: "20px",
    marginLeft: "100px",
    marginRight: "100px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "100%",
    },
  },
  media: {
    height: 130,
    borderRadius: "10%",
    objectFit: "cover",
    marginBottom: "10px",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "20px",
    justifyContent: "center",
    maxWidth: "100%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
  card: {
    maxWidth: "100%",
  },
  cardContent: {
    textAlign: "center",
  },
  pagination: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  },
}));

function Home() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${URL_SERVER}/distance?page=${currentPage}&pageSize=${itemsPerPage}`
        );
        const jsonData = await response.json();

        setTimeout(() => {
          setData(jsonData.data);
          setTotalPages(jsonData.totalPages);
          setLoading(false);
        }, 1000);
        const interval = setInterval(fetchData, 2000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error("Error fetching proctoring data:", error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
  };

  if (loading) {
    return (
      <div className={classes.centerContainer}>
        <div className={classes.root}>
          <Container>
            <Card>
              <CardContent>
                <Typography variant="h5">Loading...</Typography>
              </CardContent>
            </Card>
          </Container>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={classes.centerContainer}>
        <Container>
          <Typography variant="h5">Data tidak ditemukan</Typography>
        </Container>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              OPTIMALISASI SISTEM PEMANTAUAN KEAMANAN LIFT BERBASIS IoT
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <br />
      <Container>
        <div className={classes.container}>
          {data.map((item) => (
            <TestimonialCard key={item._id} item={item} classes={classes} />
          ))}
        </div>
      </Container>
      <br />
      <div className={classes.pagination}>
        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          Sebelumnya
        </Button>
        <Typography variant="body1" style={{ margin: "0 10px" }}>
          Halaman {currentPage} dari {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === totalPages}
          onClick={nextPage}
        >
          Berikutnya
        </Button>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={(e) => goToPage(parseInt(e.target.value))}
          style={{ marginLeft: "10px", width: "50px" }}
        />
        <Typography variant="body1">Halaman</Typography>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          style={{ marginLeft: "10px" }}
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
        <Typography variant="body1">Per Halaman</Typography>
      </div>
    </div>
  );
}

function TestimonialCard({ item, classes }) {
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <img
          src={`http://localhost:6012/${item.image}`}
          alt="Avatar"
          className={classes.media}
        />
        <Typography gutterBottom variant="h5" component="h2">
         LANTAI: {item.floor}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Jumlah Orang: {item.peopleTotal}
        </Typography>
        {/* <Typography>
          Access:{" "}
          {item.access ? (
            <CheckCircleOutlineIcon style={{ color: "green" }} />
          ) : (
            <CancelPresentationIcon style={{ color: "red" }} />
          )}
        </Typography> */}
        <Typography variant="body2" color="textSecondary" component="p">
          {item.date}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/detail/${item.guid}`}
        >
          Detail
        </Button>
      </CardContent>
    </Card>
  );
}

export default Home;
