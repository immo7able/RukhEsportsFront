import React, { useState } from 'react';
import { Box, Button, Modal, Grid } from '@mui/material';
import CreateTournament from './CreateTournament';
import UpdateTournament from './UpdateTournament';
import DeleteTournament from './DeleteTournament';

const TournamentManagement = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const buttonStyle = {
    fontSize: 20,
    bgcolor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: 'rgba(0, 0, 0,)',
    borderRadius: 2,
    p: 2,
    boxShadow: 3,
    '&:hover': {
      bgcolor: 'rgba(255, 255, 255, 0.5)',
    },
  };
  

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenCreate}>Создать турнир</Button>
        </Grid>
        <Grid item>
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenUpdate}>Обновить турнир</Button>
        </Grid>
        <Grid item>
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenDelete}>Удалить турнир</Button>
        </Grid>
      </Grid>

      <Modal open={openCreate} onClose={handleCloseCreate}>
        <CreateTournament />
      </Modal>
      <Modal open={openUpdate} onClose={handleCloseUpdate}>
        <UpdateTournament />
      </Modal>
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <DeleteTournament />
      </Modal>
    </Box>
  );
};

export default TournamentManagement;
