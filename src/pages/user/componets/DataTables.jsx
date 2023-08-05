import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";



function DataTables() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchData(1, perPage);
  }, [perPage]);

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button onClick={() => deleteData(row.id)} variant="danger">
          Hapus
        </Button>
      ),
    },
  ];
  const deleteData = async (id) => {
    axios.delete(`http://127.0.0.1:8000/users/${id}`).then(
      (result) => {
        setIsLoaded(true);
        handlePageChange(1);
        console.log("deleted");
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  };
  const fetchData = async (page, per_page) => {
    axios
      .get(`http://127.0.0.1:8000/users?page=${page}&per_page=${per_page}`)
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.data);
          setTotalRows(result.data.total);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const handlePageChange = (page) => {
    fetchData(page, perPage);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Spinner animation="border" variant="primary" />;
  } else {
    return (
      <DataTable
        title="Data Pengguna"
        columns={columns}
        data={items}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
      />
    );
  }
}

export default DataTables;
