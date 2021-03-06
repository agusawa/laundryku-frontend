import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(
  menyerahkan: string,
  selesai: string,
  jumlahCucian: number,
  harga: number,
) {
  return {
    menyerahkan,
    selesai,
    jumlahCucian,
    harga,
    history: [
      { jenisCucian: 'Kaos (kering)', jumlah: 3, harga: 6000 },
      { jenisCucian: 'Celana pendek (kering)', jumlah: 3, harga: 9000 },
      { jenisCucian: 'Celana kerja (kering)', jumlah: 2, harga: 8000 },
      { jenisCucian: 'Jeans (kering)', jumlah: 1, harga: 8000 },
    ],
  };
}

interface Props {
  row: {
    menyerahkan: string;
    selesai: string;
    jumlahCucian: number;
    harga: number;
    history: Array<{
      jenisCucian: string;
      jumlah: number;
      harga: number;
    }>;
  };
}

function Row(props: Props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right" className="whitespace-nowrap">
          {row.selesai}
        </TableCell>
        <TableCell align="right">{row.jumlahCucian}</TableCell>
        <TableCell align="right">
          {row.harga.toLocaleString().replace(',', '.')}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Jenis Cucian</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Jumlah</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Harga (Rp)</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {historyRow.jenisCucian}
                      </TableCell>
                      <TableCell align="right">{historyRow.jumlah}</TableCell>
                      <TableCell align="right">
                        {historyRow.harga.toLocaleString().replace(',', '.')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('2021-07-14', '2021-07-16', 9, 31000),
  createData('2021-07-16', '2021-07-18', 9, 31000),
  createData('2021-07-18', '2021-07-20', 9, 31000),
  createData('2021-07-21', '2021-07-22', 9, 31000),
  createData('2021-07-25', '2021-07-30', 9, 31000),
];

export default function CustomerHistory(): JSX.Element {
  return (
    <div className="pt-8">
      <h1 className="text-xl text-center font-semibold">Riwayat Mencuci</h1>

      <TableContainer
        component={Paper}
        className="mt-7 shadow-lg"
        variant="outlined"
      >
        <Table aria-label="collapsible table">
          <TableHead className="bg-green-200">
            <TableRow>
              <TableCell />
              <TableCell>
                <strong>Tanggal</strong>
              </TableCell>
              <TableCell>
                <strong>Cucian</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Total Harga (Rp)</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
