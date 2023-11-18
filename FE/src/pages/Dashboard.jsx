import React, { useEffect, useState } from "react";
import { Alert, AlertIcon, Box, Button, Spinner } from "@chakra-ui/react";
import DataTable from "../components/Table";
import { API } from "../libs/api";
import DataForm from "../components/dataForm";
import { Navigate } from "react-router-dom";

export default function Dashboard({ setIsLoggedIn }) {
  const [data, setData] = useState({ columns: [], rows: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  async function getDataTable() {
    try {
      const response = await API.get("/pegawai");
      setData({ columns: response.data.columns, rows: response.data.rows });
    } catch (error) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const addData = (newData) => {
    const newDataArray = [...data.rows, newData];

    localStorage.setItem("storedData", JSON.stringify(newDataArray));

    setData((prevData) => ({ ...prevData, rows: newDataArray }));
  };

  const handleDelete = (id) => {
    const newDataArray = data.rows.filter((row) => row.id !== id);

    localStorage.setItem("storedData", JSON.stringify(newDataArray));

    setData((prevData) => ({ ...prevData, rows: newDataArray }));
  };

  const handleUpdate = (id) => {
    const updatingData = data.rows.find((row) => row.id === id);
    setUpdateData(updatingData);
    setIsUpdating(true);
  };

  const cancelUpdate = () => {
    setIsUpdating(false);
    setUpdateData(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    return <Navigate to="/login" />;
  };

  useEffect(() => {
    getDataTable();
  }, []);

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box
        my={"10em"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  return (
    <Box marginX={"20em"}>
      <DataForm
        data={data}
        addData={addData}
        updateData={handleUpdate}
        isUpdating={isUpdating}
        initialData={updateData}
        cancelUpdate={cancelUpdate}
      />
      <DataTable
        columns={data.columns}
        rows={data.rows}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      <Button
        w={"100%"}
        backgroundColor={"maroon"}
        color={"white"}
        onClick={handleLogout}
      >
        Logout
      </Button>{" "}
    </Box>
  );
}
