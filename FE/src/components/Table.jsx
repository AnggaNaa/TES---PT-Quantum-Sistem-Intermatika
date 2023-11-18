import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const DataTable = ({ columns, rows, onDelete, onUpdate }) => {
  return (
    <>
      <Table>
        <Thead backgroundColor={"gray.300"}>
          <Tr>
            {columns.map((column) => (
              <Th key={column.name} width={column.width}>
                {column.caption}
              </Th>
            ))}
            <Th width={10}>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row) => (
            <Tr key={row.id}>
              {columns.map((column) => (
                <Td key={column.nama}>{row[column.caption.toLowerCase()]}</Td>
              ))}
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => onDelete(row.id)}
                    aria-label="Delete"
                  />
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Update"
                    onClick={() => onUpdate(row.id)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default DataTable;
