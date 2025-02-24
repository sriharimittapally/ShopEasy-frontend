import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { orange, red} from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useEffect } from "react";
import { getAllDeals } from "../../../State/admin/Dealslice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));



export default function DealTable() {
  const dispatch = useAppDispatch();
  const {deal}=useAppSelector(store=>store);


  useEffect(()=>{
      dispatch(getAllDeals())
  },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell align="right">Discount(%)</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deal.deals.map((deal, index) => (
            <StyledTableRow key={deal.id}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell>
                <img className='w-20 rounded-md' src={deal.category.image} alt="" />
              </StyledTableCell>
              <StyledTableCell>{deal.category.categoryId}</StyledTableCell>
              <StyledTableCell align="right">{deal.discount}</StyledTableCell>
              <StyledTableCell align="right">
                <Button>
                  <Edit sx={{ color: orange[400] }} />
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button>
                  <Delete sx={{ color: red[700] }} />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
