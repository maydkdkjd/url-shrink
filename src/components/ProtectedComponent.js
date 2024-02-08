import { Box, Container } from '@mui/system';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Spinner } from '../media/spinner.svg'
import useUser from '../contexts/user';

const LoadingScreen = () => (
  <Container maxWidth="lg">
    <Box sx={{ position: 'relative' }}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        mt: 8
      }} >
        <Spinner width={32} height={32} />
      </Box>
    </Box>
  </Container>
);

const Unauthorized = () => (
  <Container maxWidth="lg">
    <Box sx={{ position: 'relative' }}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        mt: 8
      }} >
        <h1>Unauthorized</h1>
      </Box>
    </Box>
  </Container>
)

const ProtectedComponent = ({ children }) => {
  const history = useNavigate();
  const { user, checkAuthStatus, loading } = useUser();

  useEffect(() => {
    checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (loading) return;
    if (!user) {
      history('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return loading ? <LoadingScreen /> : user ? children : <Unauthorized />
};

export default ProtectedComponent;