import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const NotePaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
  color: 'white',
  position: 'relative',
}));

const NotesManagement = () => {
  return (
    <Box
      sx={{
        p: 4,
        maxWidth: '800px',
        mx: 'auto',
        bgcolor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        boxShadow: 3,
        color: '#FFFFFF'
      }}
    >
      <NotePaper>
        <Typography variant="body1" paragraph>
          В обновлении новостей, удаление новости, управление комментариями есть поле: "Начните вводить название новости, чтобы отфильтровать", - которое служит фильтрацией для общего списка новостей, что облегчает поиск. Введя буквально несколько букв, вы отфильтруете новости, что содержат эти буквы в заголовке. Это могут быть слова и т.д. Вы можете ничего не вводить в поле для фильтрации и выбрать новость прямо в: "Выбрать новость из общего списка".
        </Typography>
      </NotePaper>
      <NotePaper>
        <Typography variant="body1" paragraph>
          Если удалить комментарий, у которого есть ответ(-ы), то все ответы к этому комментарию будут удалены вместе с главным комментарием.
        </Typography>
      </NotePaper>
      <NotePaper>
        <Typography variant="body1" paragraph>
          Если удалить турнир, то все матчи связанные с ним тоже удалятся.
        </Typography>
      </NotePaper>
      <NotePaper>
        <Typography variant="body1" paragraph>
          Если удалить команду, которая учавствует(-вала) в матче(-ах), то все матчи, в которых участвует(-вала) эта команда, удалятся.
        </Typography>
      </NotePaper>
      <NotePaper>
        <Typography variant="body1" paragraph>
          При создании турнира, матча есть поле "Результат", на тот случай, если вы хотите добавить уже состоявшиеся матчи, турниры с их результатом. 
          Обновления результата турнира, матча. Нажать кнопку обновить матч, турнир, в поле результат внести данные. Можно обновлять все что угодно
        </Typography>
      </NotePaper>
      <NotePaper>
        <Typography variant="body1" paragraph>
          Обложки - картинки переключателя (для пабга, хока, моб), что отображаются на сайте во вкладках: "Новости", "Турниры", "Матчи", "Команды" над самим переключателем.
        </Typography>
      </NotePaper>
      <NotePaper>
        <Typography variant="body1" paragraph>
          Карусель главная - картинка, что является всегда первой в слайдере (в котором после нее идут новости) на странице "Главаная".
        </Typography>
      </NotePaper>
    </Box>
  );
};

export default NotesManagement;
