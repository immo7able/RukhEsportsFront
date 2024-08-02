import React, { useState } from 'react';
import { Box, Button, Modal, Grid } from '@mui/material';
import CreateTeam from './CreateTeam';
import UpdateTeam from './UpdateTeam';
import DeleteTeam from './DeleteTeam';
import CreatePlayer from '../player/CreatePlayer';
import UpdatePlayer from '../player/UpdatePlayer';
import DeletePlayer from '../player/DeletePlayer';

const TeamManagement = () => {
  const [openCreateTeam, setOpenCreateTeam] = useState(false);
  const [openUpdateTeam, setOpenUpdateTeam] = useState(false);
  const [openDeleteTeam, setOpenDeleteTeam] = useState(false);
  const [openCreatePlayer, setOpenCreatePlayer] = useState(false);
  const [openUpdatePlayer, setOpenUpdatePlayer] = useState(false);
  const [openDeletePlayer, setOpenDeletePlayer] = useState(false);

  const handleOpenCreateTeam = () => setOpenCreateTeam(true);
  const handleCloseCreateTeam = () => setOpenCreateTeam(false);

  const handleOpenUpdateTeam = () => setOpenUpdateTeam(true);
  const handleCloseUpdateTeam = () => setOpenUpdateTeam(false);

  const handleOpenDeleteTeam = () => setOpenDeleteTeam(true);
  const handleCloseDeleteTeam = () => setOpenDeleteTeam(false);

  const handleOpenCreatePlayer = () => setOpenCreatePlayer(true);
  const handleCloseCreatePlayer = () => setOpenCreatePlayer(false);

  const handleOpenUpdatePlayer = () => setOpenUpdatePlayer(true);
  const handleCloseUpdatePlayer = () => setOpenUpdatePlayer(false);

  const handleOpenDeletePlayer = () => setOpenDeletePlayer(true);
  const handleCloseDeletePlayer = () => setOpenDeletePlayer(false);

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
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenCreateTeam}>Создать команду</Button>
        </Grid>
        <Grid item>
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenUpdateTeam}>Обновить команду</Button>
        </Grid>
        <Grid item>
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenDeleteTeam}>Удалить команду</Button>
        </Grid>
        <Grid item>
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenCreatePlayer}>Создать игрока</Button>
        </Grid>
        <Grid item>
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenUpdatePlayer}>Обновить игрока</Button>
        </Grid>
        <Grid item>
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenDeletePlayer}>Удалить игрока</Button>
        </Grid>
      </Grid>

      <Modal open={openCreateTeam} onClose={handleCloseCreateTeam}>
        <CreateTeam />
      </Modal>
      <Modal open={openUpdateTeam} onClose={handleCloseUpdateTeam}>
        <UpdateTeam />
      </Modal>
      <Modal open={openDeleteTeam} onClose={handleCloseDeleteTeam}>
        <DeleteTeam />
      </Modal>
      <Modal open={openCreatePlayer} onClose={handleCloseCreatePlayer}>
        <CreatePlayer />
      </Modal>
      <Modal open={openUpdatePlayer} onClose={handleCloseUpdatePlayer}>
        <UpdatePlayer />
      </Modal>
      <Modal open={openDeletePlayer} onClose={handleCloseDeletePlayer}>
        <DeletePlayer />
      </Modal>
    </Box>
  );
};

export default TeamManagement;
