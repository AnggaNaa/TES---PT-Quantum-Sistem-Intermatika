import React, { useEffect, useState } from "react";
import { Box, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";

const DataForm = ({
  data,
  addData,
  updateData,
  isUpdating,
  initialData,
  cancelUpdate,
}) => {
  const {
    id: initialId,
    nama = "",
    nip = "",
    jabatan = "",
  } = initialData || {};

  const [formId, setFormId] = useState(initialId);
  const [formNama, setFormNama] = useState(nama);
  const [formNip, setFormNip] = useState(String(nip));
  const [formJabatan, setFormJabatan] = useState(jabatan);

  useEffect(() => {
    if (initialData) {
      setFormId(initialData.id || null);
      setFormNama(initialData.nama || "");
      setFormNip(String(initialData.nip) || "");
      setFormJabatan(initialData.jabatan || "");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (formNama && formNip && formJabatan) {
      const newData = {
        id: formId || Date.now(),
        nama: formNama,
        nip: parseInt(formNip),
        jabatan: formJabatan,
      };

      if (isUpdating) {
        const updatedDataArray = data.rows.map((row) =>
          row.id === initialData.id ? newData : row
        );
        localStorage.setItem("storedData", JSON.stringify(updatedDataArray));
        updateData(newData);
      } else {
        const newDataArray = [...data.rows, newData];
        localStorage.setItem("storedData", JSON.stringify(newDataArray));

        addData(newData);
      }

      setFormId(null);
      setFormNama("");
      setFormNip("");
      setFormJabatan("");
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <Box w={"30em"} m={"3em auto"}>
      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input
          type="text"
          value={formNama}
          onChange={(e) => setFormNama(e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>NIP:</FormLabel>
        <Input
          type="number"
          value={formNip}
          onChange={(e) => setFormNip(e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>Title:</FormLabel>
        <Input
          type="text"
          value={formJabatan}
          onChange={(e) => setFormJabatan(e.target.value)}
          required
        />
      </FormControl>

      {isUpdating ? (
        <>
          <Button onClick={cancelUpdate} mr={2}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            isDisabled={!formNama || !formNip || !formJabatan}
          >
            Update Data
          </Button>
        </>
      ) : (
        <Button
          onClick={handleSubmit}
          isDisabled={!formNama || !formNip || !formJabatan}
        >
          Add Data
        </Button>
      )}
    </Box>
  );
};

export default DataForm;
