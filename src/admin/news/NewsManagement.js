import React, { useState } from 'react';
import { Box, Button, Modal, Grid } from '@mui/material';
import CreateNews from '../news/CreateNews';
import UpdateNews from '../news/UpdateNews';
import DeleteNews from '../news/DeleteNews';

const NewsManagement = () => {
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
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenCreate}>Создать новость</Button>
        </Grid>
        <Grid item>
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenUpdate}>Обновить новость</Button>
        </Grid>
        <Grid item>
          <Button sx={buttonStyle} variant="contained" onClick={handleOpenDelete}>Удалить новость</Button>
        </Grid>
      </Grid>

      <Modal open={openCreate} onClose={handleCloseCreate}>
        <CreateNews />
      </Modal>
      <Modal open={openUpdate} onClose={handleCloseUpdate}>
        <UpdateNews />
      </Modal>
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <DeleteNews />
      </Modal>
    </Box>
  );
};

export default NewsManagement;
