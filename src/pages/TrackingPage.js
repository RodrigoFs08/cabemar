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
  Typography
} from '@mui/material';
import {   
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';

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
    { id: 1, donor: 'Donor 1', quantity: '2kg', events: [{time: '2023-06-27 12:00:00', event: 'Event1'}, {time: '2023-06-28 13:00:00', event: 'Event2'}, {time: '2023-06-29 14:00:00', event: 'Event3'}] },
    { id: 2, donor: 'Donor 2', quantity: '3kg', events: [{time: '2023-06-27 12:00:00', event: 'Event1'}, {time: '2023-06-28 13:00:00', event: 'Event2'}] },
    { id: 3, donor: 'Donor 3', quantity: '1.5kg', events: [{time: '2023-06-27 12:00:00', event: 'Event1'}] },
  ];

  return (
    <Box display="flex" justifyContent="center" m={2}>
      <TableContainer component={Paper} style={{ maxWidth: '80%' }}>
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
                          {row.events.map((item, index) => (
                            <TimelineItem key={index}>
                              <TimelineOppositeContent>
                                <Typography color="textSecondary">{item.time}</Typography>
                              </TimelineOppositeContent>
                              <TimelineSeparator>
                                <TimelineDot />
                                {index < row.events.length - 1 && <TimelineConnector />}
                              </TimelineSeparator>
                              <TimelineContent>{item.event}</TimelineContent>
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
