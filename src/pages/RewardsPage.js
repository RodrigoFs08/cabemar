import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  Paper,
  Typography
} from '@mui/material';

function VotePage() {
  const [candidates, setCandidates] = useState([
    { id: '1', name: 'Candidate 1', type: 'Type A', votes: 0 },
    { id: '2', name: 'Candidate 2', type: 'Type B', votes: 0 },
    { id: '3', name: 'Candidate 3', type: 'Type C', votes: 0 },
  ]);

  const handleVote = (index, voteType) => {
    const newCandidates = [...candidates];
    newCandidates[index].votes += voteType === 'upvote' ? 1 : -1;
    setCandidates(newCandidates);
  };

  return (
    <Box display="flex" justifyContent="center" m={2}>
      <Paper style={{ padding: 16, maxWidth: 500 }}>
        <Typography variant="h4" align="center">Community Entrance Voting</Typography>
        <List>
          {candidates.map((candidate, index) => (
            <ListItem key={candidate.id}>
              <ListItemText primary={`${candidate.name} (${candidate.votes} votes)`} secondary={`ID: ${candidate.id}, Type: ${candidate.type}`} />
              <ListItemSecondaryAction>
                <Button variant="outlined" color="primary" onClick={() => handleVote(index, 'upvote')}>
                  Upvote
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleVote(index, 'downvote')} style={{ marginLeft: 8 }}>
                  Downvote
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default VotePage;
