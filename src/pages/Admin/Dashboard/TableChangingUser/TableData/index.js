import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs};
}

const rows = [
  createData('Bùi Anh Thư', "Cập nhật", 6.0, 24),
  createData('Ice cream sandwich', "Cập nhật", 9.0, 37,),
  createData('Eclair', "Cập nhật", 16.0, 24, 6.0),
  createData('Cupcake', "Vừa mới", 3.7, 67),
  createData('Gingerbread', "Vô hiệu hóa", 16.0, 49),
];

export default function TableData() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Họ tên</TableCell>
            <TableCell align="center">Thao tác</TableCell>
            <TableCell align="center">Chi tiết</TableCell>
            <TableCell align="center">Thời gian</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}