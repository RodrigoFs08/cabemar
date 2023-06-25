import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Box, 
  Collapse, 
  Timeline,
  TimelineItem,
  TimelineSeparator,
//  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/material';
import { TimelineConnector } from '@mui/lab';


function TablePage() {
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleClick = (rowId) => {
    if (selectedRow === rowId) {
      setOpen(!open);
    } else {
      setSelectedRow(rowId);
      setOpen(true);
    }
  };

  const data = [
    { id: 1, donor: 'Donor 1', quantity: '2kg', events: ['Event1', 'Event2', 'Event3'] },
    { id: 2, donor: 'Donor 2', quantity: '3kg', events: ['Event1', 'Event2'] },
    { id: 3, donor: 'Donor 3', quantity: '1.5kg', events: ['Event1'] },
  ];

  return (
    <Box display="flex" justifyContent="center" m={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>DOADOR</TableCell>
              <TableCell>QUANTIDADE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow hover onClick={() => handleClick(row.id)}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.donor}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open && selectedRow === row.id} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Timeline>
                          {row.events.map((event, index) => (
                            <TimelineItem key={index}>
                              <TimelineSeparator>
                                <TimelineDot />
                                {index < row.events.length - 1 && <TimelineConnector />}
                              </TimelineSeparator>
                              <TimelineContent>{event}</TimelineContent>
                            </TimelineItem>
                          ))}
                        </Timeline>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TablePage;
