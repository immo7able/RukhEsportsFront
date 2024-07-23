import React, { useState } from 'react';
import { Box, Button, Modal, Grid } from '@mui/material';
import CreateMatch from './CreateMatch';
import UpdateMatch from './UpdateMatch';
import DeleteMatch from './DeleteMatch';

const MatchManagement = () => {
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
    <Box>
      <Grid container spacing={2}>
        <Grid item>
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenCreate}>Создать матч</Button>
        </Grid>
        <Grid item>
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenUpdate}>Обновить матч</Button>
        </Grid>
        <Grid item>
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenDelete}>Удалить матч</Button>
        </Grid>
      </Grid>

      <Modal open={openCreate} onClose={handleCloseCreate}>
        <CreateMatch />
      </Modal>
      <Modal open={openUpdate} onClose={handleCloseUpdate}>
        <UpdateMatch />
      </Modal>
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <DeleteMatch />
      </Modal>
    </Box>
  );
};

export default MatchManagement;
